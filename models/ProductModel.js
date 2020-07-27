const mongoose = require("mongoose");
const products = require("../app/schemas/ProductSchemas");

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

// CRUD

const ProductCallback = (err) => {
  if (err) {
    return false;
  } else {
    return true;
  }
};

const fetchAllProductCallback = (condition, product) => {
  products.find(condition, (err, results) => {
    let productsMap = {};
    if (!err) {
      results.forEach(function (product) {
        productsMap[product._id] = product;
      });
    }
    product(productsMap);
  });
};

const fetchProductCallback = (product, id) => {
  products.findById(id, (err, result) => {
    if (err) {
      console.log(err);
    }
    product(result);
  });
};

const fetchUrlCallback = (product, url) => {
  products.findOne(url, (err, result) => {
    if (err) {
      console.log(err);
    }
    product(result);
  });
};

module.exports = class Product {
  constructor(p) {
    this.product = p;

    this.product_schema = {
      product_name: this.product.product_name,
      product_price: this.product.product_price,
      product_url: this.product.product_url,
      product_img: this.product.product_img,
      product_details: this.product.product_details,
      product_short_details: this.product.product_short_details,
      available: this.product.available,
      product_category: this.product.product_category,
      product_id: this.product.product_name.replace(/\s/g, "_"),
      product_colors: this.product.product_colors.split(","),
      product_sizes: this.product.product_sizes.split(","),
    };
  }

  create() {
    products.insertMany(this.product_schema, ProductCallback);
    return ProductCallback;
  }
  static fetchAll(condition, cb) {
    fetchAllProductCallback(condition, cb);
  }
  static fetch(id, cb) {
    fetchProductCallback(cb, id);
  }
  static fetchSingle(url, cb) {
    fetchUrlCallback(cb, url);
  }
  update(id) {
    products.updateOne({ _id: id }, this.product_schema, ProductCallback);
    return ProductCallback;
  }
  static delete(id) {
    products.findByIdAndDelete(id, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    });
  }
};
