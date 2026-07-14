import { createBrowserRouter } from "react-router-dom";
  import Layout from "../components/layout/Layout";
  import HomePage from "../pages/Home/HomePage";
  

  export const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
      ],
    },
  ]);