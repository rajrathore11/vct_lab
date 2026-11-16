const express = require("express");
const { createClient } = require("redis");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const redisClient = createClient({
url: process.env.REDIS_URL || "redis://localhost:6379"
});

redisClient.on("error", (err) => {
console.error("Redis Error:", err.message);
});

// Redis Rate Limiter Middleware
async function rateLimiter(req, res, next) {
try {
const userIP = req.ip;
const redisKey = `rate-limit:${userIP}`;


    // Increment the request count for this IP
    const requestCount = await redisClient.incr(redisKey);

    // Set expiry when the key is created
    if (requestCount === 1) {
        await redisClient.expire(redisKey, 60);
    }

    // Allow only 5 requests per 60-second window
    if (requestCount > 5) {
        return res.status(429).json({
            success: false,
            message: "Too Many Requests. Please try again after the rate limit resets."
        });
    }

    next();
} catch (error) {
    console.error("Rate Limiter Error:", error.message);

    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
}


}

// Protected API Endpoint
app.get("/api/data", rateLimiter, (req, res) => {
res.status(200).json({
success: true,
message: "Data fetched successfully!"
});
});

// Start Server
async function startServer() {
try {
await redisClient.connect();


    console.log("Redis connected successfully!");

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
} catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
}


}

startServer();
