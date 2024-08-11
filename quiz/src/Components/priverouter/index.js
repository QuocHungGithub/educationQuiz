import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute(){
    const islogin =true;
    return(
        <>
        {islogin ? <Outlet /> : <Navigate to="/login/"/>}
      
        </>
    )
    
}
export default PrivateRoute;