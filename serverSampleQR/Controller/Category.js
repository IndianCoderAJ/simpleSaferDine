let category = {};

let {Category} = require('../Model/Category');

category.getCategory =  async (req,res) =>{
try{
    let category =  await Category.find({});
     return category
}catch(err){
    console.log(err);
}
}


module.exports = category;