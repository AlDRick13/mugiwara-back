const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const authConfig = require('../database/config/auth');
const UserServices = require('../src/services/user.services');

const userServices = new UserServices();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: authConfig.secret
};

passport.use(
    new JwtStrategy(options, (tokenDecoded, done) => {
        userServices.getUser(tokenDecoded.id)
            .then((user) => {
                if (user) {
                    done(null, tokenDecoded);
                } else {
                    done(null, false);
                }
            })
            .catch((err) => {
                done(err, false);
            });
    })
);

module.exports = passport;
