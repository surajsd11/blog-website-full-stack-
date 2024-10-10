import categoryModel from "../models/categoryModel.js";

class categoryController {
  static getAllCategories = async (req, res) => {
    try {
      const fetchAllCategories = await categoryModel.find({});
      return res.status(200).json({
        categories: fetchAllCategories,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  };

  static addNewCategory = async (req, res) => {
    const { title } = req.body;
    try {
      if (title) {
        const newCategory = new categoryModel({
          title,
        });
        const savedCategory = await newCategory.save();
        if (savedCategory) {
          return res.status(200).json({
            message: "Category added successfully",
          });
        }
      } else {
        return res.status(400).json({
          message: "Please enter all fields",
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  };
}

export default categoryController;
