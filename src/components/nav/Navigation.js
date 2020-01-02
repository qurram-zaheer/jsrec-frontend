import React from 'react';
import {Logo} from '../logo/Logo';


export const Navigation = (props) => {
    return(
        <div>
        {
        props.isSignedin ? 
        (
        <div style = {{display: 'flex', justifyContent: 'space-between'}}>
            <div>
                <Logo />
            </div>
            <div> 
                <p onClick = {() => props.onRouteChange('signout')} className = 'f3 link dim black underline pa2 pointer'>Sign Out</p>
            </div>
        </div> ) 
        : (
        <div style = {{display: 'flex', justifyContent: 'space-between'}}>
            <div>
                <Logo />
            </div>
            <div>
            <p onClick = {() => props.onRouteChange('register')} className = 'f3 link dim black underline pa2 pointer'>Register</p>
            </div>
        </div> )
        
        }
        </div>
    )
        
    
}
