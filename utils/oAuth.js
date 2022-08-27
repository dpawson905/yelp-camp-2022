const GoogleUser = require('../models/googleUser');

exports.authUser = async (req, accessToken, refreshToken, profile, done) => {
  try {
    if (!req.user) {
      const googleUser = await GoogleUser.findOne({ gogleId: profile.id });
      if (googleUser) {
        return done(null, googleUser);
      }
      const newGoogleUser = new GoogleUser({
        googleId: profile.id,
        token: accessToken,
        email: profile.email,
        firstName: profile.given_name,
        lastName: profile.family_name,
        picture: profile.picture
      });
      await newGoogleUser.save();
      return done(null, newGoogleUser);
    } else {
      return done(null, false, req.flash('error', 'You are already logged in'));
    }
  } catch(err) {
    req.flash('error', err.message);
    return done(err, null);
  }
}