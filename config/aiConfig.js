// This contains configuration for the AI services
const aiConfig = {
    openai: {
        apiKey: process.env.OPENAI_API_KEY,
        model: "gpt-4o-mini", // This is cost efficient for learning
        maxTokens: 100, // Reasonable length for descriptions
        temperature: 0.7 // Balance between creativity and consistency
    },
    // Rate limit to prevent API from overuse
    rateLimiting: {
        maxRequestsPerHour: 100, 
        maxRequestsPerDay: 500,  
    },
    // Description generation settings
    descriptionSettings: {
        minLength: 50,
        maxLength: 200,
        tone: "engaging", // professional, casual, engaging
        includePrice: false, 
    }
};

module.exports = aiConfig;