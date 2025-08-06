if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const dbUrl = process.env.ATLASDB_URL;

main().then(() => {
    console.log("Connected to DB");
}).catch(err => {
    console.log("DB connection error:", err);
});

async function main() {
    await mongoose.connect(dbUrl);
}

console.log("ATLASDB_URL is:", dbUrl);


const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "6893496efa8820f36ac85baf"
    }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

initDB().then(() => {
    mongoose.connection.close();
});


