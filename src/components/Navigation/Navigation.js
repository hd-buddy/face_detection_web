import React from "react";

const Navigation= ({onRouteChange,isSignedIn}) =>{
    
        if(isSignedIn){
            return (
        <nav className='ba bw1 b--gray shadow-5'
        style={{display:'flex',justifyContent:'flex-end'}}>
            <p onClick={()=>onRouteChange('signout')}
             className="f3 link dim black ba underline ma1 br3 pa2 pointer">Sign Out</p>
        </nav>)}
        else{
            return (
            <nav className='ba bw1 b--gray shadow-5'
            style={{display:'flex',justifyContent:'flex-end'}}>
            <p onClick={()=>onRouteChange('register')}
             className="f3 link dim black ba underline ma1 br3 pa2 pointer">Register</p>
             <p onClick={()=>onRouteChange('signin')}
             className="f3 link dim black ba underline ma1 br3 pa2 pointer">Sign in</p>
            </nav>)}
}

export default Navigation