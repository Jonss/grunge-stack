import type { LoaderFunction } from "@remix-run/node";
import {  redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { SocialsProvider } from "remix-auth-socials";
import { authenticator } from "~/services/auth.services";

const CONTAINER_STYLES = {
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const BUTTON_STYLES = {
  padding: "15px 25px",
  background: "#dd4b39",
  border: "0",
  outline: "none",
  cursor: "pointer",
  color: "white",
  fontWeight: "bold",
};

const IndexPage = () => {
  return (
    <Form
      method="post"
      action={`/auth/${SocialsProvider.GOOGLE}`}
      style={CONTAINER_STYLES}
    >
      <button style={BUTTON_STYLES}>Login with Google</button>
    </Form>
  );
};

export const loader: LoaderFunction = async ({ request }) => {
  // authenticator.isAuthenticated function returns the user object if found
  // if user is not authenticated then user would be redirected back to homepage ("/" route)
  const user = await authenticator.isAuthenticated(request, {});

  if (user) {
    return redirect("/dashboard");
  }

  return {};
};

export default IndexPage;
