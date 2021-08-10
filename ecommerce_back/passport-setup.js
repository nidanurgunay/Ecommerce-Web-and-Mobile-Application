const passport = require('passport');
const GooglStrategy = require('passport-google-oauth20').Strategy;
passport.serializeUser(function (user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
    done(null, user);
});
passport.use(new GooglStrategy({
    clientID: "368655781792-qtf6sft1gj4kev5rutmk191e5h815luh.apps.googleusercontent.com",
    clientSecret: "f8JwFyWOaW_bu9bZOPraONBd",
    callbackURL: "http://localhost/5002/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        /*
         use the profile info (mainly profile id) to check if the user is registerd in ur db
         If yes select the user and pass him to the done callback
         If not create the user and then select him and pass to callback
        */
        return done(null, profile);
    }
))