import mongoose from 'mongoose';

// Define schema for Catalog
const CatalogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  menus: {
    type: mongoose.Types.ObjectId,
    ref: 'Menu',
  }
});

// Define schema for Menu
const MenuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  menus: {
    type: mongoose.Types.ObjectId,
    ref: 'Articles',
  }
});

// Define schema for Articles
const ArticlesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
});

// Export model
export default mongoose.model('MyModel', CatalogSchema);
