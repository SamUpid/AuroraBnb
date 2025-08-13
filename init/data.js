const sampleListings = [

   {
      title: "Night View at Gellért",
      description:
      "Experience the enchanting nightscape of Budapest from the heights of the Gellért Hotel. Gaze upon the shimmering Danube, the beautifully illuminated bridges, and the city’s historic skyline glowing under the evening sky — a truly unforgettable panorama of Hungary’s capital",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1523650126631-9fafa6ed33fc?q=80&w=1734&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      price: 250,
      location: "Budapest",
      country: "Hungary",
      geometry: {
        type: "Point",
        coordinates: [19.0516, 47.4839],
    },
    category: "Iconic cities"
  },

    {
        title: "Desert Camp in Jaisalmer",
        description:
          "Experience the golden sands of the Thar Desert with this luxurious desert camp under the stars.",
        image: {
          filename: "listingimage",
          url: "https://images.unsplash.com/photo-1527419105721-af1f23c86dec?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        price: 140,
        location: "Jaisalmer",
        country: "India",
        geometry: {
        type: "Point",
        coordinates: [70.9025, 26.9157],
        },

        category: "Camping",
  },

   {
      title: "Glamping Dome in Patagonia",
      description:
        "Get close to nature with comfort in a glamping dome with views of the majestic Patagonian peaks.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1721886473357-1563de6e6883?q=80&w=1867&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      price: 140,
      location: "Patagonia",
      country: "Chile",
      geometry: {
      type: "Point",
      coordinates: [-72.9333, -51.2500],
    },
    category: "Domes"
},

 

  {
      title: "Eilean Donan Castle, Scotland",
      description: "Step into a fairy tale at this iconic 13th-century castle, perched on a picturesque island where history meets breathtaking Highland scenery. Explore ancient stone walls, dramatic archways, and legendary Scottish charm.",
      image: {
          filename: "listingimage",
          url: "https://images.unsplash.com/photo-1694085637025-6e4f9cb27d94?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      price: 320,
      location: "Dornie",
      country: "Scotland",
      geometry: {
      type: "Point",
      coordinates: [-5.5167, 57.2742], 
    },
    category: "Castles",
},

  {
        title: "Modern Loft in Downtown",
        description:
          "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
        image: {
          filename: "listingimage",
          url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        },
        price: 120,
        location: "New York City",
        country: "United States",
        geometry: {
          type: "Point",
          coordinates: [-74.0060, 40.7128], 
    },

    category: "Iconic cities"

  },


 {
      title: "Riad in Marrakech",
      description: "Stay in a traditional Moroccan riad in the heart of the medina, with mosaic-tiled interiors and a tranquil courtyard.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
      },
      price: 950,
      location: "Marrakech",
      country: "Morocco",
      geometry: {
      type: "Point",
      coordinates: [-8.0081, 31.6295], 
    },

    category: "Iconic cities"

},




    {
      title: "Floating Villa in Bora Bora",
      description: "Enjoy the turquoise waters of Bora Bora in this luxurious overwater villa. Perfect for honeymoons and romantic escapes.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
      },
      price: 750,
      location: "Bora Bora",
      country: "French Polynesia",
      geometry: {
      type: "Point",
      coordinates: [-151.7420, -16.5004], 
    },
    category: "Amazing pools"
},


  {
      title: "Secluded Treehouse Getaway",
      description:
        "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      },
      price: 800,
      location: "Portland",
      country: "United States",
      geometry: {
      type: "Point",
      coordinates: [-122.6765, 45.5231],
    },
    category: "Camping"
  },


  {
      title: "Beachfront Paradise",
      description:
        "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      },
      price: 200,
      location: "Cancun",
      country: "Mexico",
      geometry: {
      type: "Point",
      coordinates: [-86.7633, 21.1619], 
    },

    category: "Amazing pools"
  },

 {
      title: "Santorini Cliffside Suite",
      description:
        "Wake up to iconic whitewashed walls and endless views of the Aegean Sea from this cliffside suite.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1683836145612-c5f827737bca?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      price: 320,
      location: "Santorini",
      country: "Greece",
      geometry: {
      type: "Point",
      coordinates: [25.4615, 36.3932],
    },
    category: "Iconic cities",
},


  {
      title: "Luxury Penthouse with City Views",
      description:
        "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      },
      price: 350,
      location: "Los Angeles",
      country: "United States",
      geometry: {
      type: "Point",
      coordinates: [-118.2437, 34.0522], 
    },

    category: "Iconic cities",
  },


  {
      title: "Ski-In/Ski-Out Chalet",
      description:
        "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      },
      price: 300,
      location: "Verbier",
      country: "Switzerland",
      geometry: {
      type: "Point",
      coordinates: [7.2269, 46.1009], 
    },
    category: "Mountains",
  },


 {
    title: "Alpine Chalet in Bavaria",
    description:
      "Relax in this cozy wooden chalet surrounded by the Bavarian Alps, ideal for hikers and winter lovers.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1657545165198-dfc38f164156?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 170,
    location: "Bavaria",
    country: "Germany",
    geometry: {
      type: "Point",
      coordinates: [11.1545, 47.5162], 
    },
    category: "Mountains"
},


 {
      title: "Icelandic Cabin with Northern Lights",
      description:
        "Watch the Aurora Borealis from this modern cabin nestled in Iceland's breathtaking landscapes.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1513786704796-b35842f0dca6?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      price: 210,
      location: "Reykjavik",
      country: "Iceland",
      geometry: {
      type: "Point",
      coordinates: [-21.9426, 64.1466], 
    },
    category: "Arctic"
  },


  {
      title: "Private Island Retreat",
      description:
        "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      },
      price: 1000,
      location: "Fiji",
      country: "Fiji",
      geometry: {
      type: "Point",
      coordinates: [177.4234, -17.7774], 
    },
    category: "Boats"
  },


  {
      title: "Historic Brownstone in Boston",
      description:
        "Step back in time in this elegant historic brownstone located in the heart of Boston.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      },
      price: 220,
      location: "Boston",
      country: "United States",
      geometry: {
      type: "Point",
      coordinates: [-71.0589, 42.3601], 
    },
    category: "Iconic cities"
  },


  {
      title: "Famous Treehouse in Nusa Penida",
      description:
        "Live a dream in this iconic Bali treehouse, perched above lush jungle canopies with stunning ocean views. Perfect for adventurers and photographers seeking a unique tropical escape.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1644027622521-d0ca669c40d7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      price: 180,
      location: "Nusa Penida",
      country: "Indonesia",
      geometry: {
      type: "Point",
      coordinates: [115.5444, -8.7278], 
    },
    category: "Camping"
  },


    {
        title: "Historic Stay Near Chittorgarh Fort",
        description:
          "Immerse yourself in Rajasthan's royal legacy with a stay near the iconic Chittorgarh Fort. This heritage property blends medieval grandeur with modern comforts, offering breathtaking views of the fortress and its storied past. (26,465+ views, 779+ downloads)",
        image: {
          filename: "listingimage",
          url: "https://images.unsplash.com/photo-1717329162563-2f93e83cc717?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        price: 280,
        location: "Chittorgarh", 
        country: "India",
        geometry: {
      type: "Point",
      coordinates: [74.6396, 24.8799], 
    },
    category: "Castles"
},


  {
      title: "Mountain View Cabin in Banff",
      description:
        "Enjoy breathtaking mountain views from this cozy cabin in the Canadian Rockies.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      },
      price: 150,
      location: "Banff",
      country: "Canada",
      geometry: {
      type: "Point",
      coordinates: [-115.5708, 51.1784], 
    },
    category: "Mountains",
  },

    {
        title: "Desert Oasis in Dubai",
        description:
          "Experience luxury in the middle of the desert in this opulent oasis in Dubai with a private pool.",
        image: {
          filename: "listingimage",
          url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        },
        price: 500,
        location: "Dubai",
        country: "United Arab Emirates",
        geometry: {
      type: "Point",
      coordinates: [55.2708, 25.2048], 
    },
    category: "Amazing pools"
  },


  {
      title: "Tropical Villa in Phuket",
      description:
        "Escape to a tropical paradise in this luxurious villa with a private infinity pool in Phuket.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      },
      price: 300,
      location: "Phuket",
      country: "Thailand",
      geometry: {
      type: "Point",
      coordinates: [98.3381, 7.8804], 
    },
    category: "Amazing pools"
  },


  {
      title: "Rustic Log Cabin in Montana",
      description:
        "Unplug and unwind in this cozy log cabin surrounded by the natural beauty of Montana.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      },
      price: 110,
      location: "Montana",
      country: "United States",
       geometry: {
        type: "Point",
        coordinates: [-110.3626, 46.8797], 
    },
     category: "Mountains"
  },


    {
          title: "Luxury Lodge in Queenstown",
          description:
            "Nestled among the mountains, this lakeside lodge offers unmatched views and world-class adventure sports.",
          image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1600466403153-50193d187dde?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          price: 310,
          location: "Queenstown",
          country: "New Zealand",
          geometry: {
            type: "Point",
            coordinates: [168.6626, -45.0312], 
      },
      category: "Mountains",
  },


  {
      title: "Historic Cottage in Charleston",
      description:
        "Experience the charm of historic Charleston in this beautifully restored cottage with a private garden.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      },
      price: 160,
      location: "Charleston",
      country: "United States",
      geometry: {
      type: "Point",
      coordinates: [-79.9311, 32.7765], 
    },
    category: "Iconic cities"
  },


  {
      title: "Modern Apartment in Tokyo",
      description:
        "Explore the vibrant city of Tokyo from this modern and centrally located apartment.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRva3lvfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      },
      price: 200,
      location: "Tokyo",
      country: "Japan",
      geometry: {
      type: "Point",
      coordinates: [139.6917, 35.6895], 
    },
    category: "Iconic cities"
  },


  {
      title: "Lakefront Cabin in New Hampshire",
      description:
        "Spend your days by the lake in this cozy cabin in the scenic White Mountains of New Hampshire.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      },
      price: 1200,
      location: "New Hampshire",
      country: "United States",
      geometry: {
        type: "Point",
        coordinates: [-71.3162, 43.6860], 
    },
    category: "Camping"
  },


  {
      title: "Luxury Villa in the Maldives",
      description:
        "Indulge in luxury in this overwater villa in the Maldives with stunning views of the Indian Ocean.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1675154092378-1ca4978ec6a5?q=80&w=1020&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      price: 600,
      location: "Maldives",
      country: "Maldives",
      geometry: {
      type: "Point",
      coordinates: [73.5361, 4.1755], 
    },
    category: "Amazing pools"
  },


   {
      title: "Houseboat Stay in Alleppey",
      description:
        "Cruise through the serene backwaters of Kerala in a traditional houseboat with all modern comforts.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      price: 190,
      location: "Alleppey",
      country: "India",
      geometry: {
      type: "Point",
      coordinates: [76.3388, 9.4981], 
    },
    category: "Boats"
  },


];

module.exports = { data: sampleListings };
