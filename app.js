const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const port = 3000;

// this will be called and parse body prior to...
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res,next)=>{
    res.status(404).render('404', {
        pageTitle: '404',
        path: '',
        formCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
})
app.listen(port);