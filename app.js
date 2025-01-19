const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Authentication routes
const path = require('path'); // Useful for serving static files if needed

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies

// MongoDB Connection
mongoose
  .connect('mongodb://127.0.0.1:27017/loginSignupDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection failed:', err));

// Define Routes
app.use('/auth', authRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.send({ message: 'Server is running!' });
});

// Static File Serving (Optional: For production)
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, 'client', 'build');
  app.use(express.static(staticPath));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(staticPath, 'index.html'));
  });
}

// Start Server
const PORT = process.env.PORT || 5000; // Use environment variable if available
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
