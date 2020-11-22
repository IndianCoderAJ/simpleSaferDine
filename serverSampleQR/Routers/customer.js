const express = require('express');
const router = express.Router();
const Category = require('../Controller/Category');
const Product = require('../Controller/Product');


router.post('/getCategory', async (req, res) => {
    try{
        let category  = await Category.getCategory(req,res);
        res.status(200).json({category});
    }catch(err){
        console.log(err);
    }
});

router.post('/getProduct', async (req, res) => {
    try{
        let product  = await Product.getProduct(req,res);
        res.status(200).json({product});
    }catch(err){
        console.log(err);
    }
});

router.post('/getProductByCategory',async(req,res)=> {
    try{
        let product  = await Product.getProductByCategory(req,res);
        res.status(200).json({product});
    }catch(err){
        console.log(err);
    }
});



router.post('/getSingleProduct',async (req, res) => {
    try{
        let SingleProduct  = await Product.getSingleProduct(req,res);
        res.status(200).json({SingleProduct});
    }catch(err){
        console.log(err);
    }
});


module.exports = router;