const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const path = require('path');
const User = require('./models/user');

app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// MongoDB connection setup
const uri = process.env.MONGODB_URI;

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

app.use((req, res, next) => {
    res.locals.messages = {
    success: req.flash('success'),
    error: req.flash('error')
    };
    next();
});


// Passport local strategy setup
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username: username });

        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password.' });
        }
    } catch (error) {
        console.log("not working", error);
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err, null);
      });
  });
  

// Use the Routes
const homeRoute = require('./routes/home');
const aboutRoute = require('./routes/about');
const classesRoute = require('./routes/classes');
const trainersRoute = require('./routes/trainers');
const pricingRoute = require('./routes/pricing');
const contactRoute = require('./routes/contact');
const loginRoute = require('./routes/login');
const signupRoute = require('./routes/signup');
const logoutRoute = require('./routes/logout');
const profileRoute = require('./routes/profile');
const passwordChangeRoute = require('./routes/passwordChange');
const membershipFormRoute = require('./routes/membershipForm');
const membershipDetailsRoute = require('./routes/membershipDetails');
const membershipChangeRoute = require('./routes/membershipChange');
const saunaSessionFormRoute = require('./routes/saunaSessionForm');
const newsLetterRoute = require('./routes/newsletter');


app.use('/', homeRoute);
app.use('/about', aboutRoute);
app.use('/classes', classesRoute);
app.use('/trainers', trainersRoute);
app.use('/pricing', pricingRoute);
app.use('/contact', contactRoute);
app.use('/login', loginRoute);
app.use('/signup', signupRoute);
app.use('/logout', logoutRoute);
app.use('/profile', profileRoute);
app.use('/passwordchange', passwordChangeRoute);
app.use('/membershipform', membershipFormRoute);
app.use('/membershipdetails', membershipDetailsRoute);
app.use('/membershipchange', membershipChangeRoute);
app.use('/saunasessionform', saunaSessionFormRoute);
app.use('/newsletter', newsLetterRoute);


//Start the server
if (require.main === module) {
    connect().then(isConnected => {
        if (isConnected) {
            app.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            });
        }
    })
}

module.exports = app;