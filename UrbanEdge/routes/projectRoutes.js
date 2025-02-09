const express = require('express');
const { User, Contact, CartItem } = require('../models/Project');
const bcrypt = require('bcrypt');
const router = express.Router();

router.use(express.json());

router.get('/signup', (req, res) => {
  res.render('signup', { user: req.session.user || null, success: null, error: null });
});

router.post('/signup', async (req, res) => {
  try {
    const { password, repeatPassword, ...rest } = req.body;

  
    if (password !== repeatPassword) {
      return res.render('signup', {
        error: 'Passwords do not match',
        success: null,
      });
    }
    const newUser = new User({ ...rest, password });

    await newUser.save();
    res.redirect('/login');
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.render('signup', { error: messages.join('<br>'), success: null });
    }
    res.status(400).send(error.message);
  }
});


router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('login', { error: 'Invalid email or password.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render('login', { error: 'Invalid email or password.' });
    }

    req.session.user = user;
    res.redirect('/home'); 
  } catch (error) {
    res.render('login', { error: error.message });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

router.get('/', (req, res) => {
  res.render('home', { user: req.session.user || null, success: null, error: null });
});

router.get('/contact', (req, res) => {
  res.render('contact', { user: req.session.user || null, success: null, error: null });
});


router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.render('contact', { user: req.session.user || null, error: 'All fields are required', success: null });
    }

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();
    res.render('contact', { user: req.session.user || null, success: 'Message sent successfully!', error: null });
  } catch (error) {
    console.error(error);
    res.render('contact', { user: req.session.user || null, error: 'An error occurred while sending your message.', success: null });
  }
});

router.get('/about', (req, res) => {
  res.render('about', { user: req.session.user || null });
});

router.get('/shoes', (req, res) => {
  res.render('shoes', { user: req.session.user || null });
});

router.get('/jewellery', (req, res) => {
  res.render('jewellery', { user: req.session.user || null });
});

router.get('/clothes', (req, res) => {
  res.render('clothes', { user: req.session.user || null });
});

router.get('/cart', (req, res) => {
  res.render('cart', { user: req.session.user || null });
});


router.get('/shoesdetails', (req, res) => {
  res.render('shoesdetails', { user: req.session.user || null });
});
router.get('/jewellerydetails', (req, res) => {
  res.render('jewellerydetails', { user: req.session.user || null });
});
router.get('/clothesdetails', (req, res) => {
  res.render('clothesdetails', { user: req.session.user || null });
});


router.get('/api/cart', async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/api/cart', async (req, res) => {
  const itemData = req.body;
  try {
    const newCartItem = new CartItem(itemData);
    await newCartItem.save();
    res.status(201).json(newCartItem);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: Object.values(error.errors).map((err) => err.message).join(', ') });
    }
    res.status(500).json({ message: 'Failed to add item to cart', error: error.message });
  }
});

router.put('/api/cart/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedItem = await CartItem.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/api/cart/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await CartItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/api/cart', async (req, res) => {
  try {
    await CartItem.deleteMany({});
    res.status(200).json({ message: 'All cart items deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;