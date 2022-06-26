const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views', 'views');
const port = 3333;

// this will be called and parse body prior to...
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminData.routes);
app.use(shopRoutes);
app.use((req, res,next)=>{
    // res.status(404).send('<h1>Page not found</h1>');
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', {
        pageTitle: '404',
        path: '',
        formCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
})


/**
//this will be executed every incoming request
app.use((req, res, next)=>{
    console.log('In first middleware');
    
    //this allows request to continue its journy
    next();
});
app.use((req, res, next)=>{
    console.log('In second middleware');
    res.send('<h1>hello from the other side</h1>');
});
*/

/*
app.use('/',(req, res, next)=>{
    console.log('<h1>this shoud be called always</h1>');
    next();
});
*/

/*
// order matters since we are not calling next 
app.use('/add-product', (req, res, next)=>{
    console.log('in the other middleware');
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">add product</button></input></form>');
});

app.post('/product',(req, res, next)=>{
    // get body
    console.log(req.body);
    res.redirect('/');
})
*/


// app.use('/', (req, res, next)=>{
//     res.send('<h1>Hello from the other side~</h1>');
// });

// const server = http.createServer(app);
/**alternatively */
app.listen(port);


/** 
    function reqListener(req, req){
    }
    http.createServer(reqListener);
*/

/**alternatively */
// const server = http.createServer(routes);
// server.listen(3333);