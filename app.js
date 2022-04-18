const express = require('express')
const fs = require('fs');
const path = require('path');

const app = express()
const port = 3000

let pricedata = fs.readFileSync(path.resolve(__dirname, 'jdmock/jdprice.json'));
let productdata = fs.readFileSync(path.resolve(__dirname, 'ecommmock/products.json'));
let userdata = fs.readFileSync(path.resolve(__dirname, 'ecommmock/users.json'));

//console.log(rawdata);
// Defining get request at '/multiple' route
app.get('/product', function(req, res) {
   res.json(JSON.parse(productdata));
});

app.get('/users', function(req, res) {
   res.json(JSON.parse(userdata));
});

app.post('/jdprice', function(req, res) {
   sleep(500).then(() => {
      console.log("3 second has elapsed")
      res.json(JSON.parse(pricedata));
    });
    
 });

 app.get('/price', function(req, res) {
   res.json(JSON.parse(pricedata));
});

function sleep(millis) {
   return new Promise(resolve => setTimeout(resolve, millis));
 }
 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})