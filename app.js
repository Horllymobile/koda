const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const mongoDb = require('./database/mongo');
const app = express();

// Layout
app.use(expressLayouts);
app.use(express.urlencoded({extended:false}));
app.use(flash());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

require('./configs/passport.strategy')(passport);

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    //res.locals.error = req.flash('error');
    next();
});

app.set('view engine', 'ejs');
mongoDb();

// Static files
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => {
    res.redirect('/home');
})

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`);
})
