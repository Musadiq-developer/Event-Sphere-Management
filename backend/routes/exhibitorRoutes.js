import express from 'express';
import { updateExhibitorProfile, getMyProfile, getAllExhibitors } from '../controllers/exhibitorcontroller.js';
import { protect, isExhibitor, isAdmin } from '../middleware/authmiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const exhibitorRoute = express.Router();

// Note: server.js mein base path '/api/exhibitor' hai, 
// to yahan sirf '/' ya '/my-profile' likhna kafi hai.
exhibitorRoute.post('/update-profile', 
  protect, 
  isExhibitor, 
  upload.fields([
    { name: 'logo', maxCount: 1 }, 
    { name: 'productImages', maxCount: 5 },
    { name: 'documents', maxCount: 1 }
  ]), 
  updateExhibitorProfile
);

exhibitorRoute.get('/my-profile', protect, isExhibitor, getMyProfile);
exhibitorRoute.get('/all-exhibitors', protect, isAdmin, getAllExhibitors);

export default exhibitorRoute;