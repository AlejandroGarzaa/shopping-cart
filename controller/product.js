const Product = require('../model/products');



const addProduct = async (
    product_name,
    product_code,
    description,
    price,
    rating,
    manufacturer,
    osType) => {
    
    const product = new Product({
        product_name,
        product_code,
        description,
        price,
        rating,
        manufacturer,
        osType
    });
    return product.save();
  };


  const findProduct = async (osType) => {
    
        const products = await Product.find({osType: osType})
        return products;
      };





  module.exports = { addProduct, findProduct};