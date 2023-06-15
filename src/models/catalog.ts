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
  menus: Array<Menu>;
  articles: Array<Article>;
}

const ArticleSchema = new mongoose.Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true }
})

const MenuSchema = new mongoose.Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }]
})

// Define schema for Catalog
const CatalogSchema = new mongoose.Schema({
  restorerId: { type: Schema.Types.ObjectId, required: true },
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