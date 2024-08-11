import React from "react";
import PrivateRoute from "../Components/priverouter";
import LayoutDefau from "../Layout/LayoutDefau";
import Home from "../Pages/Home";
import Topic from "../Pages/Topic";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Answer from "../Pages/Answer";
import Quiz from "../Pages/Quiz";
import Result from "../Pages/Result";
import Logout from "../Pages/Logout";


export const routers = [
  {
    path: "/",
    element: <LayoutDefau />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "answer",
            element: <Answer />,
          },
          {
            path: "quiz/:id",
            element: <Quiz />,
          },
          {
            path: "topic",
            element: <Topic />,
          },
          {
            path: "result/:id",
            element: <Result />,
          },
        ],
      },
    ],
  },
]
