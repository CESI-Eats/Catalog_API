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
  _id: String;
  name: String;
  restorerId: String;
  description: String;
  image: String;
  menus: Array<Menu>;
  articles: Array<Article>;
}

const ArticleSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true }
})

const MenuSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  articles: {
    type: [String],
    required: false
  }
})

// Define schema for Catalog
const CatalogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  restorerId: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  menus: [MenuSchema],
  articles: [ArticleSchema]
});

// Export model
//export default mongoose.model<Catalog>('Catalog', CatalogSchema);

// Export models
export const Catalog = mongoose.model<Catalog>('Catalog', CatalogSchema);
export const Menu = mongoose.model<Menu>('Menu', MenuSchema);
export const Article = mongoose.model<Article>('Article', ArticleSchema);