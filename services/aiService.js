/**
 * AI Service for generating property descriptions using OpenAI GPT
 * Handles rate limiting, error management, and content generation
 */

require('dotenv').config();
const axios = require('axios');
const aiConfig = require('../config/aiConfig');

// Class for AI-related services
class AIService {
    constructor() {
        this.apiKey = aiConfig.openai.apiKey;
        this.baseURL = 'https://api.openai.com/v1/chat/completions';
        this.requestCount = new Map(); // Simple in-memory rate limiting
        
         // Validate API key on initialization
        if (!this.apiKey) {
            console.error('OPENAI_API_KEY not found in environment variables!');
        } else {
             console.log('OpenAI API initialized successfully');
        }
    }

    /**
     * Check if user has exceeded rate limits
     * @param {string} userId - User identifier for rate limiting
     * @returns {boolean} - True if within limits
     */
    checkRateLimit(userId = 'anonymous') {
        const now = Date.now();
        const hourAgo = now - (60 * 60 * 1000); // 1 hour ago

        if (!this.requestCount.has(userId)) {
            this.requestCount.set(userId, []);
        }

        const userRequests = this.requestCount.get(userId);
        // Remove old requests
        const recentRequests = userRequests.filter(time => time > hourAgo);
        this.requestCount.set(userId, recentRequests);

        return recentRequests.length < aiConfig.rateLimiting.maxRequestsPerHour;
    }

    /**
     * Build the prompt for description generation
     * * @param {Object} listingData - Property information
     * @returns {string} - Formatted prompt for AI
     */
    buildDescriptionPrompt(listingData) {
        const { title, location, country, category, price } = listingData;

        const prompt = `Write an engaging property description for a vacation rental listing.

        Property Details:
        - Title: ${title}
        - Location: ${location}, ${country}
        - Category: ${category}
        - Price: $${price} per night

        Requirements:
        - Write 100-150 words
        - Use an engaging, welcoming tone
        - Highlight the location and property type
        - Make it appealing to travelers
        - Don't mention the price directly
        - Focus on the experience guests will have

        Write only the description, no additional text:`;

            return prompt;
    }

    /**
     * Generate property description using OpenAI
     * @param {Object} listingData - Property information
     * @param {string} userId - User identifier for rate limiting
     * @returns {Object} - Generation result with success status
     */
    async generateDescription(listingData, userId = 'anonymous') {
    try {

        if (!listingData.title || !listingData.location) {
            throw new Error('Title and location are required for description generation');
        }

        if (!this.apiKey) {
            throw new Error('OpenAI API key not configured');
        }

        if (!this.checkRateLimit(userId)) {
            throw new Error('Rate limit exceeded. Please try again later.');
        }

        const prompt = this.buildDescriptionPrompt(listingData);
        

        // ---  Retry Logic for 429 errors ---
        let retries = 5;
        let response;
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                //Debug
                 console.log(` Attempt ${attempt}/${retries} - Making request to OpenAI...`);
                response = await axios.post(this.baseURL, {
                    model: aiConfig.openai.model,
                    messages: [{ role: "user", content: prompt }],
                    max_tokens: aiConfig.openai.maxTokens,
                    temperature: aiConfig.openai.temperature,
                }, {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json',
                    },
                    timeout: 30000,
                });
                 
                break; // success
            } catch (err) {
                    // Handle different types of 429 errors
                    if (err.response?.status === 429) {
                        const errorData = err.response.data;
                        console.log(' 429 Error Details:', errorData);
                        
                        // Check if it's a quota/billing issue
                        if (errorData?.error?.message?.includes('quota') || 
                            errorData?.error?.message?.includes('billing')) {
                            throw new Error(`Quota/Billing Issue: ${errorData.error.message}`);
                        }
                        
                        // Check if it's a rate limit issue
                        if (attempt < retries) {
                            // Exponential backoff with jitter
                            const baseDelay = Math.pow(2, attempt) * 1000;
                            const jitter = Math.random() * 1000;
                            const delay = baseDelay + jitter;
                            
                            console.warn(` 429 received. Retrying in ${Math.round(delay)}ms... (attempt ${attempt}/${retries})`);
                            await new Promise(res => setTimeout(res, delay));
                            continue;
                        }
                    }
                    
                    // For other errors or last retry, throw immediately
                    if (attempt === retries || err.response?.status !== 429) {
                        throw err;
                    }
                }
            }


        if (!response) {
            throw new Error('Failed to get response from OpenAI after retries');
        }

        const generatedText = response.data.choices[0]?.message?.content?.trim();
        if (!generatedText) {
            throw new Error('No description generated from AI service');
        }

        const userRequests = this.requestCount.get(userId) || [];
        userRequests.push(Date.now());
        this.requestCount.set(userId, userRequests);

        console.log('Description generated successfully');

        return {
            success: true,
            description: generatedText,
            metadata: {
                model: aiConfig.openai.model,
                tokens: response.data.usage?.total_tokens || 'unknown',
                generatedAt: new Date().toISOString()
            }
        };

    } catch (error) {
        console.error('AI Description Generation Error:', error.message);

        if (error.response?.status === 401) {
            return { success: false, error: 'Invalid API key configuration' };
        } else if (error.response?.status === 429) {
            return { success: false, error: 'OpenAI API rate limit exceeded' };
        } else if (error.code === 'ECONNABORTED') {
            return { success: false, error: 'AI service timeout' };
        } else {
            return { success: false, error: error.message || 'Failed to generate description' };
        }
    }
}


    /**
     * Enhance existing property description
     * @param {string} existingDescription - Current description
     * @param {Object} listingData - Property information
     * @param {string} userId - User identifier for rate limiting
     * @returns {Object} - Enhancement result with success status
     */
    async enhanceDescription(existingDescription, listingData, userId = 'anonymous') {
        try {

            if (!this.checkRateLimit(userId)) {
                throw new Error('Rate limit exceeded. Please try again later.');
            }

            const prompt = `Improve this vacation rental description to make it more engaging and detailed:

    Original Description: "${existingDescription}"

    Property Details:
    - Location: ${listingData.location}, ${listingData.country}
    - Category: ${listingData.category}

    Make it more appealing while keeping the same general length. Focus on the experience guests will have:`;

            const response = await axios.post(this.baseURL, {
                model: aiConfig.openai.model,
                messages: [{ role: "user", content: prompt }],
                max_tokens: aiConfig.openai.maxTokens,
                temperature: 0.8,
            }, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
                timeout: 30000,
            });

            const enhancedText = response.data.choices[0]?.message?.content?.trim();

            // Record the request for rate limiting
            const userRequests = this.requestCount.get(userId) || [];
            userRequests.push(Date.now());
            this.requestCount.set(userId, userRequests);

            return {
                success: true,
                description: enhancedText,
                original: existingDescription,
                metadata: {
                    model: aiConfig.openai.model,
                    enhancedAt: new Date().toISOString()
                }
            };
        } catch (error) {
            console.error('AI Enhancement Error:', error.message);
            return {
                success: false,
                error: error.message || 'Failed to enhance description'
            };
        }
    }

    /**
     * Reset rate limits for a specific user (development/testing)
     * @param {string} userId - User identifier
     */
    resetRateLimits(userId = 'anonymous') {
        this.requestCount.delete(userId);
        console.log(`Rate limits reset for user: ${userId}`);
    }

    /**
     * Get current rate limit status for a user
     * @param {string} userId - User identifier
     * @returns {Object} - Current usage and limits
     */

    getRateLimitStatus(userId = 'anonymous') {
        const now = Date.now();
        const hourAgo = now - (60 * 60 * 1000);
        const userRequests = this.requestCount.get(userId) || [];
        const recentRequests = userRequests.filter(time => time > hourAgo);
        
        return {
            userId,
            recentRequests: recentRequests.length,
            maxAllowed: aiConfig.rateLimiting.maxRequestsPerHour,
            remaining: Math.max(0, aiConfig.rateLimiting.maxRequestsPerHour - recentRequests.length)
        };
    }

    // Test method to check API connection
    async testConnection() {
        try {
            const response = await axios.post(this.baseURL, {
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: "Say hello" }],
                max_tokens: 5,
            }, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            
            return {
                success: true,
                message: 'OpenAI API connection successful',
                response: response.data.choices[0]?.message?.content
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || error.message,
                status: error.response?.status
            };
        }
    }

       /**
     * Clean up old rate limit entries.
     * Call this periodically to prevent memory buildup
     */
    cleanupRateLimits() {
        const now = Date.now();
        const hourAgo = now - (60 * 60 * 1000);
        let cleaned = 0;
        
        for (const [userId, requests] of this.requestCount.entries()) {
            const recentRequests = requests.filter(time => time > hourAgo);
            if (recentRequests.length === 0) {
                this.requestCount.delete(userId);
                cleaned++;
            } else {
                this.requestCount.set(userId, recentRequests);
            }
        }
        
        if (cleaned > 0) {
            console.log(`Cleaned up rate limits for ${cleaned} inactive users`);
        }
    }
}



// Export a singleton instance
const aiService = new AIService();
module.exports = aiService;