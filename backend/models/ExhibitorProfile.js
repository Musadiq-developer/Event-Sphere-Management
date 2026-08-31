import mongoose from "mongoose";

const exhibitorProfileSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true,
  },
  companyName: { type: String, required: true },
  industry: { type: String, required: true },
  description: { type: String, required: true },
  contactPhone: { type: String, required: true },
  logo: { type: String },
  documents: [{ type: String }],
  // Dono ko merge karke ek array of objects bana diya
  productShowcase: [{
    name: { type: String },
    image: { type: String }
  }]
}, { timestamps: true });

export default mongoose.model("ExhibitorProfile", exhibitorProfileSchema);