const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');  // Moved up

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Error:', err));

// ============ ROUTES - MUST COME BEFORE STATIC FILES ============
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);  // Review routes BEFORE static

// ============ STATIC FILES ============
// Client site static files
app.use(express.static('client'));
// Admin dashboard static files
app.use(express.static('public'));

// ============ PAGE ROUTES ============
// Root route - serve client homepage
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'client' });
});

// Admin dashboard route
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server: http://localhost:${PORT}`);
    console.log(`📊 Admin: http://localhost:${PORT}/admin`);
    console.log(`🌐 Client: http://localhost:${PORT}`);
});