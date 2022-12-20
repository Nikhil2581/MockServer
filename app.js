const express = require('express')
const fs = require('fs');
const path = require('path');
const https = require("https");
var cors = require('cors');


const app = express()
app.use(cors()); // Use this after the variable declaration
const port = 3001

const options = {
   key: fs.readFileSync("./config/cert.key"),
   cert: fs.readFileSync("./config/cert.crt"),
 };

let pricedata = fs.readFileSync(path.resolve(__dirname, 'jdmock/jdprice.json'));
let productdata = fs.readFileSync(path.resolve(__dirname, 'ecommmock/products.json'));
let userdata = fs.readFileSync(path.resolve(__dirname, 'ecommmock/users.json'));
let categoriesdata = fs.readFileSync(path.resolve(__dirname, 'ecommmock/categories.json'));
let mediasdata = fs.readFileSync(path.resolve(__dirname, 'ecommmock/medias.json'));
let serialdata = fs.readFileSync(path.resolve(__dirname, 'jdmock/serialdata.json'));
let serialdatahybris = fs.readFileSync(path.resolve(__dirname, 'jdmock/serialdatahybris.json'));
let serialdatahybris45555 = fs.readFileSync(path.resolve(__dirname, 'jdmock/serialdatahybris_45555.json'));

//console.log(rawdata);
// Defining get request at '/multiple' route
app.get('/product', function(req, res) {
   res.json(JSON.parse(productdata));
});

app.get('/users', function(req, res) {
   res.json(JSON.parse(userdata));
});

app.post('/jdprice', function(req, res) {
   sleep(10).then(() => {
      console.log("3 second has elapsed")
      res.json(JSON.parse(pricedata));
    });
    
 });

 app.post('/jdserial', function(req, res) {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Credentials", "true");
   res.setHeader("Access-Control-Max-Age", "1800");
   res.setHeader("Access-Control-Allow-Headers", "content-type");
   res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
   sleep(50).then(() => {
      console.log("3 second has elapsed")
      res.json(JSON.parse(serialdata));
    });
    
 });

 app.get('/jdserialhybris/:serialId', function(req, res) {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Credentials", "true");
   res.setHeader("Access-Control-Max-Age", "1800");
   res.setHeader("Access-Control-Allow-Headers", "content-type");
   res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
   const productId = req.params.serialId;
   sleep(500).then(() => {
      console.log("3 second has elapsed")
      if(productId != '45555') {
      console.log(productId);
      res.json(JSON.parse(serialdatahybris));
      } else {
      console.log(productId);
      res.json(JSON.parse(serialdatahybris45555));
      }
    });
    
 });


 app.post('/categories', function(req, res) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   sleep(500).then(() => {
      console.log("3 second has elapsed")
      res.json(JSON.parse(categoriesdata));
    });
    
 });

 app.post('/medias', function(req, res) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   sleep(500).then(() => {
      console.log("3 second has elapsed")
      res.json(JSON.parse(mediasdata));
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

https.createServer(options, app).listen(3000, () => {
   console.log(`HTTPS server started on port 3000`);
 });