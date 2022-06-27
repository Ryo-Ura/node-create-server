const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFile = (callback) => {
    fs.readFile(p, (err, fileContent) => {
        let products = [];
        if (err) {
            callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
    });
}

module.exports = class Product{
    constructor(title) {
        this.title = title;
    }
    
    save() {
        getProductsFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(callback) {
        getProductsFile(callback);
    }
}