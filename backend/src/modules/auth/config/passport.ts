import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { env } from "../../../common/env.js";
import User from "../auth.models.js";

passport.serializeUser((user: any, done) => {
    return done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id).exec();
        return done(null, user);
    } catch (error) {
        return done(error);
    }
})

passport.use(new GoogleStrategy({
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
},
    async function (request, accessToken, refreshToken, profile, done) {
        try {
            const googleId = profile.id;
            const email = profile.emails?.[0]?.value;
            const avatar = profile.photos?.[0]?.value;

            if (!email) {
                return done(new Error("Google account did not provide an email"));
            }


            let user = await User.findOne({ googleId }).exec();

            if (!user) {
                user = await User.create({
                    googleId,
                    username: profile.displayName,
                    email,
                    ...(avatar ? { avatar }: {})
                })
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

export default passport;