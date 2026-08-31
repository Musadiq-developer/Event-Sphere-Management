import ExhibitorProfile from "../models/ExhibitorProfile.js";

export const updateExhibitorProfile = async (req, res) => {
  try {
    const cleanPath = (filePath) => filePath.replace(/\\/g, "/");

    // 1. Purani products list aur docs
    const existingProducts = JSON.parse(req.body.existingProducts || "[]");
    const existingDocs = JSON.parse(req.body.existingDocuments || "[]");
    
    // Naye names jo frontend se aaye hain
    // Agar single item ho to wo string hota hai, array banane ke liye hum check karenge
    let productNames = req.body.productNames;
    if (productNames && !Array.isArray(productNames)) {
      productNames = [productNames];
    }

    let updateData = {
      companyName: req.body.companyName,
      industry: req.body.industry,
      description: req.body.description,
      contactPhone: req.body.contactPhone,
      productShowcase: existingProducts, 
      documents: existingDocs,
    };

    if (req.files) {
      // Logo update
      if (req.files['logo']) {
        updateData.logo = cleanPath(req.files['logo'][0].path);
      }

      // Mapping New Product Images with their Names
      if (req.files['productImages'] && productNames) {
        const newProducts = req.files['productImages'].map((file, index) => ({
          name: productNames[index],
          image: cleanPath(file.path)
        }));
        updateData.productShowcase = [...updateData.productShowcase, ...newProducts];
      }

      // Documents update
      if (req.files['documents']) {
        const newDocs = req.files['documents'].map(f => cleanPath(f.path));
        updateData.documents = [...updateData.documents, ...newDocs];
      }
    }

    const profile = await ExhibitorProfile.findOneAndUpdate(
      { userId: req.user._id },
      { ...updateData, userId: req.user._id },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const profile = await ExhibitorProfile.findOne({ userId: req.user._id });
    res.status(200).json(profile || null);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllExhibitors = async (req, res) => {
  try {
    // .populate('userId', 'email') se admin ko user ka email bhi mil jayega
    const exhibitors = await ExhibitorProfile.find().populate('userId', 'email'); 
    res.status(200).json(exhibitors);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching exhibitors" });
  }
};