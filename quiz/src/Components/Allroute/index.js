import React from 'react';
import {routers} from '../../routers/index'
import{useRoutes} from 'react-router-dom'

function AllRoute(){
    const element =useRoutes(routers)
    return(
        <>
       {element}
        </>
    )
}
export default AllRoute;