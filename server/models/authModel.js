import monogoose from "mongoose";

const authSchema = new monogoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const authModel = monogoose.model("user", authSchema);

export default authModel;
