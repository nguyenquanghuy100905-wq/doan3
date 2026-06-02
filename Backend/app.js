var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require("dotenv").config();

var indexRouter = require('./routes/index');
var usersRoutes = require('./routes/usersRoutes');
var categorysRoutes = require('./routes/categoriesRoutes');
var typesRoutes = require('./routes/typesRoutes');
var promotions = require('./routes/promotionsRoutes');
var paymentmethods = require('./routes/paymentmethodsRoutes'); 
var contacts = require('./routes/contactsRoutes');
var feedback = require('./routes/feedbacksRoutes');
var products = require('./routes/productsRoutes');
var orders = require('./routes/ordersRoutes');
var orderdetails = require('./routes/orderdetailsRoutes');
var cart = require('./routes/cartRoutes');
var content = require('./routes/contenttypesRoutes');
var Image = require('./routes/imageproductsRoutes');
var Banners = require('./routes/bannersRoutes');
var login = require('./routes/loginRoutes');
var thongke = require('./routes/thongkeRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public/images', express.static(path.join(__dirname, 'public/images')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRoutes);
app.use('/categories', categorysRoutes);
app.use('/types', typesRoutes);
app.use('/promotions', promotions);
app.use('/paymentmethods',paymentmethods);
app.use('/contacts', contacts);
app.use('/feedbacks', feedback);
app.use('/products', products);
app.use('/orders', orders);
app.use('/ordersdetail', orderdetails);
app.use('/cart', cart);
app.use('/contenttypes', content);
app.use('/image',Image);
app.use('/banners', Banners);
app.use('/login', login);
app.use('/thongke', thongke);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
