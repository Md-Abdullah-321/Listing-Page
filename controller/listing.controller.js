const Listing = require("../models/listing.model.js");
const errorHandler = require("../utils/error.js");

const create = async (req, res, next) => {
    try {
        console.log(req.body);
        const listing = await Listing.create(req.body);

        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
}


const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return next(errorHandler(404, 'Listing not found!'))
        }

        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}



const get = async (req, res, next) => {
    try {
      
    
    


    const limit = parseInt(req.query.limit || 6);
    const startIndex = parseInt(req.query.startIndex || 0);
    const searchTerm = req.query.searchTerm || '';

    let category = req.query.category || "";
    if (category === "" || category === "all") {
        category = {$in: ["pants", "shirt"]}
    }
        
    let free_delivery = req.query.free_delivery || "";
    if (free_delivery.trim() === "false") {
        free_delivery = {$in: [true, false]}
    }
        
    let offer = req.query.offer || "";
    if (offer.trim() === "false") {
        offer = {$in: [true, false]}
    }

    // let types = req.query.types || ""; 
      
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';
        
    if (req.query.searchTerm === undefined) {
        const listings = await Listing.find({}).sort({ [sort]: order }).limit(limit).skip(startIndex);
        res.status(200).json(listings);
    }

    const listings = await Listing.find({
        title: { $regex: searchTerm, $options: 'i' },
        category,
        offer,
        free_delivery,
    }).sort({ [sort]: order }).limit(limit).skip(startIndex);

    res.status(200).json(listings);
  } catch (error) {
      next(error);
  }
}

module.exports = {
    create,
    get,
    getListing
}