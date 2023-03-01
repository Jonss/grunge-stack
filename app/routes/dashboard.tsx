import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.services";
import { getSession } from "~/services/session.server";

const CONTAINER_STYLES = {
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
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

interface CreateFileResponse {
  kind: string;
  id: string;
  name: string;
  mimeType: string;
}

interface CreatePermissionResponse {
  id: string;
}

export const loader: LoaderFunction = async ({ request }) => {
  // authenticator.isAuthenticated function returns the user object if found
  // if user is not authenticated then user would be redirected back to homepage ("/" route)
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  return {
    user,
  };
};

const Dashboard = () => {
  // getting user from loader data
  const { user } = useLoaderData();
  

  // displaying authenticated user data 
  return (
    <div style={CONTAINER_STYLES}>
        <p>{JSON.stringify(user)}</p>
      <Form action="/logout" method="post">
        <button style={BUTTON_STYLES}>Logout</button>
      </Form>

    </div>
  );
};


export default Dashboard;
