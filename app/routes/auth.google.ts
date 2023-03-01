import { SocialsProvider } from "remix-auth-socials";
import type { ActionFunction } from "@remix-run/node";
import { authenticator } from "~/services/auth.services";

export const action: ActionFunction = async ({ request }) => {
  // initiating authentication using Google Strategy
  // on success --> redirect to dasboard
  // on failure --> back to homepage/login
  return await authenticator.authenticate(SocialsProvider.GOOGLE, request, {
    successRedirect: "/dashboard",
    failureRedirect: "/",
  });
};
