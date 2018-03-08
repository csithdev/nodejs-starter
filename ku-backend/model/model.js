import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  descr: String,
  price: Number,
  photo: String
});

export default {
  Product: mongoose.model('Product', productSchema, 'product')
};
