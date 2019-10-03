const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');

const router = express.Router();

const adminProducts = require('./admin');

router.get('/', (req, res, next) => {
    const products = adminProducts.products;
    res.render('shop', {prods: products, docTitle: 'Shop', path: "/"});
});

module.exports = router;