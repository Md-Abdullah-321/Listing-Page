const express = require('express');
const { create, get, getListing } = require('../controller/listing.controller');
const listingRouter = express.Router();


listingRouter.post('/create', create);
listingRouter.get('/get', get);
listingRouter.get('/get/:id', getListing);



module.exports = listingRouter;