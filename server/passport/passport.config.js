import passport from "passport";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

import { GraphQLLocalStrategy } from "graphql-passport";

export const configurePassword = async () => {
  // this is when the user enter in the session
  passport.serializeUser((user, done) => {
    console.log("serialize User");
    done(null, user.Id);
  });

  // this is when the user goes out of the session
  passport.deserializeUser(async (id, done) => {
    console.log("deserialize User");

    // here we add the try and catch for the user
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      console.log(error);
    }
  });

  // here come the passport middleware

  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });

        if (!user) {
          throw new Error("Invalid username and password");
        }

        const isValidPassword = await bcrypt(password, user.password);

        if (!isValidPassword) {
          throw new Error("Invalid username and password");
        }

        done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
};
