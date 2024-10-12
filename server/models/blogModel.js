import monogoose from "mongoose";
import { title } from "process";

const blogSchema = new monogoose.Schema({
  title: {
    type: String,
  },
  category: {
    type: monogoose.Schema.Types.ObjectId,
    refer: "categories",
  },
  description: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  user_name: {
    type: string,
  },
  user: {
    type: monogoose.Schema.Types.ObjectId,
    refer: "users",
  },
});

const blogModel = monogoose.model("blogs", blogSchema);

export default blogModel;
