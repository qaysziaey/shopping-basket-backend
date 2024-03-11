const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  profileImg: { type: String, default: "default.png" },
  cartItem: [{ product: { type: Schema.Types.ObjectId, ref: "Product" } }],
});

// model the collection
const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
