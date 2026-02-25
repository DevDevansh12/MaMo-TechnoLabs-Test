const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  slug: String,
  bannerImage: String,   
  content: String,       
  metaTitle: String,
  metaDescription: String,
  focusKeywords: [String],
  canonicalUrl: String,
  author: {
    type: String,
    default: 'MaMo TechnoLabs'
  },
  publisher: {
    name: {
      type: String,
      default: 'MaMo TechnoLabs'
    },
    logo: {
      type: String,
      default: '/public/images/logo.webp'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Blog', blogSchema);
