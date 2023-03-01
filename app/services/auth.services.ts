import { Authenticator } from 'remix-auth';
import { GoogleStrategy } from 'remix-auth-google';
import { SocialsProvider } from 'remix-auth-socials';
import invariant from 'tiny-invariant';
import { sessionStorage } from './session.server';

invariant(process.env.APP_URL, "APP_URL must be set");
invariant(process.env.GOOGLE_CLIENT_ID, "GOOGLE_CLIENT_ID must be set");
invariant(process.env.GOOGLE_CLIENT_SECRET, "GOOGLE_CLIENT_SECRET must be set");

const scopes = 'openid email profile';

export const authenticator = new Authenticator(sessionStorage);

const strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    scope: scopes,
    callbackURL: `${process.env.APP_URL}/auth/${SocialsProvider.GOOGLE}/callback`,
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    return {
      accessToken,
      refreshToken,
      extraParams,
      profile,
    };
  }
);

authenticator.use(strategy);
