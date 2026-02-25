const Blog = require('./models/Blog');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;
const multer = require('multer');

// View engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session middleware
app.use(session({
  secret: 'mamo-blog-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 24 * 60 * 60 * 1000 
  }
}));

// Multer configuration
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (_req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

// MongoDB Connection
const connectDB = async () => {
  try {
    // Use MongoDB Atlas connection string from environment variable
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mamoBlog';
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB Connected Successfully');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    if (!process.env.MONGODB_URI) {
      console.log('Make sure MongoDB is running locally or set MONGODB_URI environment variable');
    }
    // Don't exit in serverless environment
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};

// Connect to MongoDB
connectDB();

// Admin credentials (in production, use environment variables and hashed passwords)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin@123';

// Authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.isAdmin) {
    return next();
  }
  res.redirect('/admin/login');
};

// Routes
app.get('/', async (_req, res) => {
  try {
    // Fetch latest 3 blogs for homepage
    const latestBlogs = await Blog.find().sort({ createdAt: -1 }).limit(3);
    res.render('index', { 
      title: 'Home',
      blogs: latestBlogs
    });
  } catch (error) {
    console.error('Error fetching blogs for homepage:', error);
    res.render('index', { 
      title: 'Home',
      blogs: []
    });
  }
});

app.get('/about-us', (_req, res) => {
  res.render('about-us', { title: 'About Us' });
});

app.get('/contact', (_req, res) => {
  res.render('contact', { title: 'Contact' });
});

app.get('/blog', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    console.log('Blogs found:', blogs.length);

    res.render('Blog', {
      blogs: blogs || [],
      title: 'Blog'
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).send('Error loading blogs: ' + error.message);
  }
});

app.get('/blog/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).send('Blog not found');
    }

    res.render('blogdetails', {
      blog,
      title: blog.metaTitle || blog.title,
      metaTitle: blog.metaTitle || blog.title,
      metaDescription: blog.metaDescription,
      focusKeywords: blog.focusKeywords || [],
      canonicalUrl: blog.canonicalUrl || `${req.protocol}://${req.get('host')}/blog/${blog.slug}`
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).send('Error loading blog');
  }
});

app.get('/custom-app', (_req, res) => {
  res.render('customapp', { title: 'Custom App' });
});

// Admin login page
app.get('/admin/login', (req, res) => {
  if (req.session && req.session.isAdmin) {
    return res.redirect('/admin/dashboard');
  }
  res.render('admin-login', { title: 'Admin Login', error: null });
});

// Admin login POST
app.post('/admin/login', (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    req.session.isAdmin = true;
    req.session.adminEmail = email;
    return res.redirect('/admin/dashboard');
  }

  res.render('admin-login', { 
    title: 'Admin Login', 
    error: 'Invalid email or password' 
  });
});

// Admin logout
app.get('/admin/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/admin/login');
  });
});

// Protected admin dashboard
app.get('/admin/dashboard', isAuthenticated, (req, res) => {
  res.render('admin-dashboard', { 
    title: 'Admin Dashboard',
    adminEmail: req.session.adminEmail
  });
});

// Protected blog creation
app.post('/admin/blog', isAuthenticated, upload.single('bannerImage'), async (req, res) => {
  try {
    const { title, metaTitle, metaDescription, content, focusKeywords } = req.body;

    if (!title || !content) {
      return res.status(400).send('Title and content are required');
    }

    const slug = title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    const bannerImage = req.file ? `/uploads/${req.file.filename}` : null;

    // Process focus keywords (split by comma and trim)
    const keywordsArray = focusKeywords 
      ? focusKeywords.split(',').map(k => k.trim()).filter(k => k.length > 0)
      : [];

    // Generate canonical URL
    const canonicalUrl = `${req.protocol}://${req.get('host')}/blog/${slug}`;

    await Blog.create({
      title,
      slug,
      bannerImage,
      metaTitle: metaTitle || title,
      metaDescription,
      content,
      focusKeywords: keywordsArray,
      canonicalUrl,
      author: 'MaMo TechnoLabs',
      publisher: {
        name: 'MaMo TechnoLabs',
        logo: '/images/logo.webp'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.redirect('/blog');
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).send('Error creating blog');
  }
});


app.get('/digital-transformation', (_req, res) => {
  res.render('digitaltransformation', { title: 'Digital Transformation' });
});

app.get('/frontend-development', (_req, res) => {
  res.render('frontend', { title: 'Frontend' });
});

app.get('/itstaff-augmentation', (_req, res) => {
  res.render('itstaff', { title: 'IT Staff' });
});

app.get('/packaging-design', (_req, res) => {
  res.render('pds', { title: 'PDS' });
});

app.get('/privacy-policy', (_req, res) => {
  res.render('privacy-policy', { title: 'Privacy Policy' });
});

app.get('/qa-testing', (_req, res) => {
  res.render('qa', { title: 'QA' });
});

app.get('/software-development', (_req, res) => {
  res.render('software', { title: 'Software' });
});

app.get('/term-conditions', (_req, res) => {
  res.render('term-conditions', { title: 'Terms & Conditions' });
});

app.get('/uiuxdesign', (_req, res) => {
  res.render('uiuxdesign', { title: 'UI/UX Design' });
});

app.get('/virtual-assistant-services', (_req, res) => {
  res.render('vas', { title: 'VAS' });
});

app.get('/web-portal', (_req, res) => {
  res.render('webporttal', { title: 'Web Portal' });
});

app.get('/website-development', (_req, res) => {
  res.render('websitedevelopment', { title: 'Website Development' });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).send('Page not found');
});

// Start server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('If you see MongoDB connection errors, make sure MongoDB is running');
  });
}

// Export for Vercel
module.exports = app;
