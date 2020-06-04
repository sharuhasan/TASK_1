import React from 'react';
import { Route,Redirect } from 'react-router-dom';

const Protectedrouter=({component,...some}:any)=>{
    var Rendercomponent=component;
    var hastoken=localStorage.getItem("auth-token")
   
    return(
        <Route
            {...some} 
            render={ props=>{
                return hastoken ? < Rendercomponent {...props} /> : <Redirect to={{pathname:'/login'}} /> 
            }}
        />
    )
}

export default Protectedrouter;