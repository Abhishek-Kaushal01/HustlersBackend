const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/contact', require('./routes/contactRoutes')); // Add this line

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});
app.get('/',(req,res)=>{
  res.send("Backend is live!");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));