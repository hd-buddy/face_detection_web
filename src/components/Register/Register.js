import React,{useState} from "react";

function Register ({onRouteChange,loadUser}) {
    const [RegisterEmail,setRegEmail]=useState('')
    const [RegisterPassword,setRegPassword]=useState('')
    const [RegisterName,setRegName]=useState('')

    const onNameEnter = (event) =>{
        setRegName(event.target.value);
    }

    const onEmailEnter = (event) =>{
        setRegEmail(event.target.value);
    }

    const onPasswordEnter = (event) =>{
        setRegPassword(event.target.value);
    }

    const onRegister = () =>{
        fetch("http://localhost:3000/register",
        {
        method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                email:RegisterEmail,
                password:RegisterPassword,
                name:RegisterName,
            })
        })
        .then(response => response.json())
        .then(user =>{
            if(user !=="user already exist"){
                // console.log(user)
                loadUser(user)
                onRouteChange('home')}
            else{
                onRouteChange('register')
            }
            })   
        }
    return (
        <article className=" bg-washed-yellow br3 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
            <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                    <input onChange={onNameEnter}
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input onChange={onEmailEnter}
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input onChange={onPasswordEnter} 
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                </div>
                </fieldset>
                <div className="">
                <input 
                onClick={onRegister}
                className="b ph3 pv2 input-reset ba b--black white bg-black grow pointer f6 dib" 
                type="submit" 
                value="Register"/>
                </div>
               
            </div>
            </main>
            </article>
    );
}

export default Register