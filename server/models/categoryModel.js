import monogoose from "mongoose";

const categorySchema = new monogoose.Schema({
  title: {
    type: String,
  },
});

const categoryModel = monogoose.model("categories", categorySchema);

export default categoryModel;
