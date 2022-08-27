const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const oAuthController = require("../controllers/oAuth");
const passport = require("passport");

router.get("/google", oAuthController.loadGoogleLogin);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/campgrounds",
    failureFlash: true,
    successFlash: true,
  }),
  catchAsync(oAuthController.googleRegisterOrLogin)
);

module.exports = router;