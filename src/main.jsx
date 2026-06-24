import { lazy, Suspense } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";

import { ThemeProvider } from "./components/Context/ThemeContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageLoader from "./components/PageLoader.jsx";
import Test from "./pages/Test.jsx";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const SigninPage = lazy(() => import("./pages/SigninPage.jsx"));
const VideoWatchPage = lazy(() => import("./pages/VideoWatchPage.jsx"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/watch/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <VideoWatchPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/signin",
    element: (
      <Suspense fallback={<PageLoader />}>
        <SigninPage />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path:"/test",
    element:<Test/>
  }
]);

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <RouterProvider router={appRouter} />
  </ThemeProvider>,
);
