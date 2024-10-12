import blogsModel from "../models/blogModel.js";

class BlogController {
  static getAllBlogs = async (req, res) => {
    try {
      const fetchAllBlogs = await blogsModel.find({});
      return res.status(200).json({
        fetchAllBlogs,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  };

  static addNewBlog = async (req, res) => {
    const { title, category, description, thumbnail, user_name} = req.body;
    try {
      if (title && description ) {
        const addBlog = new blogsModel({
          title: title,
          category: category,
          description: description,
          user_name: user_name,
          thumbnail: req.file.filename,
          user: req.user._id,
        });

        const savedBlog = await addBlog.save();
        if (savedBlog) {
          return res.status(200).json({
            message: "Blog added successfully",
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

  static getSingleBlog = async (req, res) => {
    const { id } = req.params;
    try {
      if (id) {
        const fetchBlogsById = await blogsModel.findById(id);
        return res.status(200).json({
          fetchBlogsById,
        });
      } else {
        return res.status(400).json({
          message: "Invalid Url",
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  };
}

export default BlogController;
