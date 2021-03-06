const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');


// connect to db
mongoose.connect('mongodb+srv://username:username@cluster0.uuu2u.mongodb.net/shoppingCartData?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected to db'));

// session variables
const NODE_ENV = 'development';
const SESS_NAME = 'user';
const SESS_SECRET = 'secret';
const SESS_LIFETIME = 1000 * 60 * 60; //setting session lifetime for an hour


// session
app.use(
    session({
        name: SESS_NAME,
        secret: SESS_SECRET,
        saveUninitialized: false,
        resave: false,
        store: MongoStore.create({
            mongoUrl:
                'mongodb+srv://username:username@cluster0.uuu2u.mongodb.net/shoppingCartData?retryWrites=true&w=majority',
            collection: 'sessions',
            ttl: parseInt(SESS_LIFETIME),
        }),

        cookie: {
            sameSite: true,
            secure: NODE_ENV === 'production',
            maxAge: parseInt(SESS_LIFETIME),
        },
    })
);

const sessionMiddleware = (req, res, next) => {
    const user = req.session.username;
    if (!user) res.status(401).send('Please login into your user');
    else next();
};


// routes

app.use(express.json());
app.use('/user', userRoute);
app.use('/cart', sessionMiddleware, cartRoute);
app.use('/order', sessionMiddleware, orderRoute);
app.use('/product', productRoute);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


//server
app.listen(3000);