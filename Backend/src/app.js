const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Import routes
const authRoutes = require("./routes/auth.routes");
const interviewRoutes = require("./routes/interview.routes");

const app = express();

// ============================================================
// MIDDLEWARE CONFIGURATION
// ============================================================

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser Middleware
app.use(cookieParser());

// CORS Middleware
// This allows your frontend to make requests to this backend
const corsOptions = {
    origin: [
        "http://localhost:5173",
        process.env.FRONTEND_URL
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// ============================================================
// ROUTES MOUNTING
// ============================================================

// Auth routes - /api/auth/register, /api/auth/login, etc.
app.use("/api/auth", authRoutes);

// Interview routes - /api/interview/*, etc.
app.use("/api/interview", interviewRoutes);

// ============================================================
// HEALTH CHECK ROUTE
// ============================================================

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is running successfully",
        timestamp: new Date().toISOString()
    });
});

// ============================================================
// 404 NOT FOUND HANDLER
// ============================================================

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
        path: req.originalUrl,
        method: req.method
    });
});

// ============================================================
// ERROR HANDLING MIDDLEWARE
// ============================================================

app.use((err, req, res, next) => {
    console.error("Error:", err);

    const status = err.status || 500;
    const message = err.message || "Internal server error";

    res.status(status).json({
        message,
        status,
        ...(process.env.NODE_ENV === "development" && { error: err })
    });
});

module.exports = app;