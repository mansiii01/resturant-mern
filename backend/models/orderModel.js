import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount:{
    type : Number,
    required:true,
  },
  address:{
   type : String,
    required:true, 
  },
  
  paymentMethod:{
    type:String,
    default:"Cash On Delivey",
  },
  status:{
    type : String,
    enum : ["Pending" , "Preparing","Delivered"],
    default : "Pending",
  },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;