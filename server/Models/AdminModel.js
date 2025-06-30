import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { Schema } from "mongoose";

const AdminSchema = new Schema({
  name: {
    type : String,
    required : [true,"name is Required"]
},
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
});

AdminSchema.pre("save", async function name(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const AdminModel = mongoose.model("Admins", AdminSchema);

export default AdminModel;