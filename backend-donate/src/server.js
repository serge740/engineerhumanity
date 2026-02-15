require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const donationRoutes = require('./routes/donations');

const app = express();
const PORT = process.env.PORT || 5400;

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/donations', donationRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
async function start() {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected');

        // Sync models (creates tables if they don't exist)
        await sequelize.sync({ alter: true });
        console.log('✅ Database synced');

        app.listen(PORT, () => {
            console.log(`🚀 Donation API running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Unable to start server:', error);
        process.exit(1);
    }
}

start();
