import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createServer } from 'http'; 
import { Server } from 'socket.io';

// Routes Imports
import adminRoutes from './routes/adminRoutes.js';
import authrouter from './routes/authRoutes.js';
import boothrouter from './routes/boothRoute.js';
import exhibitorRoute from './routes/exhibitorRoutes.js';
import attendeeRoutes from './routes/attendeeRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import notificationRoutes from './routes/notificationRoute.js';
import bookmarkRoutes from './routes/bookmarkRoutes.js';
// Load Env Variables
dotenv.config();

const app = express();

// 1. Create HTTP Server (Socket.io ke liye zaroori hai)
const httpServer = createServer(app);

// 2. Initialize Socket.io with CORS
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Production mein yahan apne frontend ka URL daal dena
    methods: ["GET", "POST"]
  }
});
-
// Middlewares
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" Database Connected Successfully"))
  .catch(error => console.log(" Connection Error:", error));
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'MERN Backend API is running successfully '
    });
});
// Static Files
app.use('/uploads', express.static('uploads'));

// 3. API Routes
app.use('/auth', authrouter);
app.use('/admin', adminRoutes); 
app.use('/api/booths', boothrouter);
app.use('/api/exhibitor', exhibitorRoute);
app.use('/api/messages', messageRoutes);
app.use('/attendee', attendeeRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/rating', ratingRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
// 4. Socket.io Connection Logic
io.on('connection', (socket) => {
  console.log(' User Connected:', socket.id);

  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(` User joined room: ${userId}`);
  });

  socket.on('disconnect', () => {
    console.log(' User Disconnected');
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(` Server running on: http://localhost:${PORT}`);
});