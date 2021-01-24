import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import linkedinOAuth from "passport-linkedin-oauth2"
import config from "../constants/env";
import User from "../models/user.model";

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET
};

export default new Strategy(opts, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);

        if (user) {
            return done(null, user);
        }

        return done(null, false);
    } catch (error) {
        console.log(error);
    }
});

const LinkedInStrategy = linkedinOAuth.Strategy;

const linkedInOpts = {
    clientID: "LINKEDIN_KEY",
    clientSecret: "LINKEDIN_SECRET",
    callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_liteprofile'],
}

export const linkedinMiddleware = new LinkedInStrategy(linkedInOpts, function (accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
        // To keep the example simple, the user's LinkedIn profile is returned to
        // represent the logged-in user. In a typical application, you would want
        // to associate the LinkedIn account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
    });
});