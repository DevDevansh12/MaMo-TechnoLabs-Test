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
      default: '/images/logo.png'
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
