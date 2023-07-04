import React,{useState} from "react";
import './Signin.css'

function Signin  ({onRouteChange,curUser}) {
    const [signInEmail,setSignEmail]=useState('')
    const [signInPassword,setSignPassword]=useState('')

    const onEmailChange = (event) =>{
        setSignEmail(event.target.value)
    }

    const onPasswordChange = (event) =>{
        setSignPassword(event.target.value)
    }

    const onSubmitSignIn = () =>{
        fetch('http://localhost:3000/signin',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                email:signInEmail,
                password:signInPassword
            })
        })
        .then(response => response.json())
        .then(data =>{
            if(data !=='wrong'){
                // console.log(data)
                curUser(data)
                onRouteChange('home')}
            else{
                onRouteChange('signin')
            }})
        }

    return (
        <article className="br3 bg-washed-yellow shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
            <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input onChange={onEmailChange} 
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input  onChange={onPasswordChange} 
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                </div>
                </fieldset>
                <div className="">
                <input 
                onClick={onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black white bg-black grow pointer f6 dib" 
                type="submit" 
                value="Sign in"/>
                </div>
                <div className="lh-copy mt3">
                <p onClick={()=>onRouteChange('register')} className="f6 link dim black db">Register</p>
                </div>
            </div>
            </main>
            </article>
    );
}
 export default Signin