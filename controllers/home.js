var config = require('../config');

exports.index = function(req, res, next) {
  res.render('index', {

  });
};

exports.productSearch = function(req,res,next) {
  res.render('product');
};
