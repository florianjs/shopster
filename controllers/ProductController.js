const Product = require("../models/ProductModel");

exports.add = (req, res) => {
  if (req.isAuthenticated()) {
    const product = new Product(req.body);
    const sendDatas = product.create();
    if (sendDatas) {
      res.redirect("/products/add");
    } else {
      res.send("Error");
    }
  } else {
    res.redirect("/");
  }
};

exports.getAdd = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("add-product", { authenticate: req.isAuthenticated() });
  } else {
    res.redirect("/");
  }
};

exports.getProducts = (req, res) => {
  const condition = { available: "on" };

  Product.fetchAll(condition, (products) => {
    // console.log(products);
    res.render("homepage", {
      products: products,
      authenticate: req.isAuthenticated()
    });
  });
};

exports.edit = (req, res) => {
  if (req.isAuthenticated()) {
    const id = req.params.id;
    Product.fetch(id, (product) => {
      res.render("edit-product", {
        product: product,
        authenticate: req.isAuthenticated()
      });
    });
  } else {
    res.redirect("/");
  }
};

exports.editAll = (req, res) => {
  if (req.isAuthenticated()) {
    const condition = {};
    Product.fetchAll(condition, (products) => {
      // console.log(products);
      res.render("edit-all", {
        products: products,
        authenticate: req.isAuthenticated()
      });
    });
  } else {
    res.redirect("/");
  }
};

exports.update = (req, res) => {
  if (req.isAuthenticated()) {
    const product = new Product(req.body);
    const id = req.params.id;
    const update = product.update(id);
    if (update) {
      res.redirect("/");
    } else {
      res.send("Error");
    }
  } else {
    res.redirect("/");
  }
};

exports.delete = (req, res) => {
  if (req.isAuthenticated()) {
    const id = req.params.id;
    console.log(id);
    Product.delete(id);
    res.redirect("/products/edit");
  } else {
    res.redirect("/");
  }
};
