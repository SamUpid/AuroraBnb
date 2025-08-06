// map.js - Airbnb-style Marker with Black Background
console.log("[DEBUG] Coordinates received - Lat:", window.listingLat, "Lng:", window.listingLng);

// Parse coordinates
const parseCoord = (val, fallback) => {
  return val !== undefined && val !== null ? 
    (typeof val === 'string' ? parseFloat(val) : val) : 
    fallback;
};

const lat = parseCoord(window.listingLat, 47.4979);
const lng = parseCoord(window.listingLng, 19.0402);

// Initialize map
const map = L.map('map').setView([lat, lng], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19,
}).addTo(map);

// Create Airbnb-style home icon with black background
const homeIcon = L.divIcon({
  className: 'airbnb-marker',
  html: `
    <div style="
      position: relative;
      background: #000000;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    ">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="#ffffff">
        <path d="M12 2L4 7v12h5v-7h6v7h5V7z"></path>
      </svg>
      <div style="
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid #000000;
      "></div>
    </div>
  `,
  iconSize: [28, 28],
  popupAnchor: [0, -16]
});

// Add marker
const marker = L.marker([lat, lng], { 
  icon: homeIcon,
  riseOnHover: true
}).addTo(map);

// Airbnb-style popup content
marker.bindPopup(`
  <div style="
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 14px;
    padding: 8px 12px;
    text-align: center;
    border-radius: 4px;
  ">
    Exact location provided after booking
  </div>
`).openPopup();

// zoom control
L.control.zoom({
  position: 'topright'
}).addTo(map);