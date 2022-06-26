const express = require('express');
const router = express.Router();
const products = [];

router.get('/add-product', (req, res, next)=>{
    console.log('in the other middleware');
    // res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">add product</button></input></form>');
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
});

router.post('/add-product',(req, res, next)=>{
    // get body
    console.log(req.body);
    products.push({title: req.body.title});
    res.redirect('/');
});

exports.routes = router;
exports.products = products;