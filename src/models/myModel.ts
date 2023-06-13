import mongoose, { Document, Schema } from 'mongoose';

// Define Interface
interface Article {
  _id: mongoose.Types.ObjectId;
  name: String;
  description: String;
  image: String;
  price: Number;
}

interface Menu {
  _id: mongoose.Types.ObjectId;
  name: String;
  description: String;
  image: String;
  articles: [Schema.Types.ObjectId];
}

interface Catalog extends Document {
  _id: mongoose.Types.ObjectId;
  restorerId: mongoose.Types.ObjectId;
  description: String;
  image: String;
  menus: [Menu];
  articles: [Article];
}


// Define schema for Catalog
const CatalogSchema = new mongoose.Schema({
  restorerId: { type: Schema.Types.ObjectId, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  menus: [{
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    articles: [{ type: Schema.Types.ObjectId, required: true }]
  }],
  articles: [{
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true }
  }]
});

// Export model
export default mongoose.model<Catalog>('Catalog', CatalogSchema);
