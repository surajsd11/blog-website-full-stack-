import express from "express";
import AuthoController from "../controllers/authController.js";
import BlogController from "../controllers/blogController.js";
import categoryController from "../controllers/categoryController.js";
import multer from "multer";
import checkIsUserAuthenticated from "../middlewares/authMiddleware.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public/upload/`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/user/register", AuthoController.userRegistration);
router.post("/user/login", AuthoController.userLogin);

router.get(
  "/get/allblogs",
  checkIsUserAuthenticated,
  BlogController.getAllBlogs,
);
router.post(
  "/add/blog",
  upload.single("thumbnail"),
  checkIsUserAuthenticated,
  BlogController.addNewBlog,
);
router.get(
  "/get/blog/:id",
  checkIsUserAuthenticated,
  BlogController.getSingleBlog,
);

router.get(
  "/get/categories",
  checkIsUserAuthenticated,
  categoryController.getAllCategories,
);
router.post(
  "/add/category",
  checkIsUserAuthenticated,
  categoryController.addNewCategory,
);

export default router;
