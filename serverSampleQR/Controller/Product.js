let product = {};
let {Product} = require('../Model/Product');

product.getProduct =  async (req,res) =>{
try{
         console.log(req.body);
         console.log("Hii");
        let product = await Product.find({});
        console.log(product);
        return product;
    
}catch(err){
    console.log(err);
}
}

product.getProductByCategory = async(req,res) => {
    try{
            console.log(req.body);
            let product = await Product.find({categoryID:req.body.categoryID});
            return product;
    }catch(err){
        console.log(err);
    }
}

product.getSingleProduct = async(req,res)=> {
    try{

        let product = await Product.find({_id:req.body.ProductID});
        return product;

    }catch(err){
        console.log(err);
    } 
}


module.exports = product;