import React, { useState } from 'react';
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Register from './components/Register/Register.js';
import Signin from './components/Signin/Signin.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js'
import ImagelinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js';
import './App.css';



// here We are defining our particles properties
const ParticleOption={
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: false,
                mode: "push",
            },
            onHover: {
                enable: false,
                mode: "repulse",
            },
            resize: true,
        },
        modes: {
            push: {
                quantity: 4,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
        },
    },
    particles: {
        color: {
            value: "#ffff00",
        },
        links: {
            color: "#f1001f",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
        },
        collisions: {
            enable: true,
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "bounce",
            },
            random: false,
            speed: 6,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 800,
            },
            value: 80,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: "square",
        },
        size: {
            value: { min: 1, max: 5 },
        },
    },
    detectRetina: true,
}


function App () {
    const particlesInit=useCallback(async engine => {
        // console.log(engine);
        await loadFull(engine);
    }, []);
    const particlesLoaded = useCallback(async container => {
        // await console.log(container);
    }, []);
    const [input,setName]=useState('')
    const [imageUrl,setimageUrl]=useState('')
    const [data1,setdata]=useState({})
    const [noimage,setnoimage]=useState(false)
    const [route,setRoute]=useState('signin')
    const [isSignedIn,setisSignedIn]=useState(false)
    const [Users,addUser]=useState({ 
        id:"",
        name:"",
        email:"",
        entries:0,
        joined:""
    })

    const loadUser = (user) => {
        addUser({
            id:user.id,
            name:user.name,
            email:user.email,
            entries:user.entries,
            joined:user.joined
    })
    }

    const CalculateImagePosition = (data) =>{
        // console.log(data)
        if('regions' in data.outputs[0].data){
        const allImage = data.outputs[0].data.regions
        const image = document.getElementById('inputImage')
        const width = Number(image.width)
        const height = Number(image.height)
        // console.log(allImage)
        var alldata=[]
       
        for (let index = 0; index < allImage.length; index++) {
            const element = allImage[index].region_info.bounding_box;
            alldata[index]=
                {
                    leftCol:element.left_col*width, 
                   topRow:element.top_row* height,
                    rightCol:width-(element.right_col*width),
                    bottomRow:height- (element.bottom_row*height)
                }
            }
            // console.log({alldata})
            
        }
        else setnoimage(true)
        return alldata
    }
    
    const DisplayFaceBox =(box)=>{
        // console.log(box)
        setdata(box)
        if(box){
        return true}
        else{
            return false
        }
    } 
    
    const onInputChange = (event) => {
        setName(event.target.value);

    };

    const onButtonSubmit = () =>{
        // console.log('click!');
        
        setdata({})
        setnoimage(false)
        setimageUrl(input)
        
        
        const IMAGE_URL = input;

        const raw = JSON.stringify({
            "user_app_id": {
              "user_id": "clarifai",
              "app_id": "main"
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": IMAGE_URL
                        }
                    }
                }
            ]
          });
          
          const requestOptions = {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Authorization': 'Key 0fd558c8d41e4da7a2648f761aac3d81'
              },
              body: raw
          };
          fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
            .then(response => response.json())
            .then(result => DisplayFaceBox(CalculateImagePosition(result)))

            .then(Exist =>{
                if(Exist){
                    fetch("http://localhost:3000/image",{
                    method:'put',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({
                        id:Users.id
                    })
                })
                .then(response => response.json())
                .then(user =>{
                    if(user){   
                        // console.log(user)
                        loadUser(user)
                        onRouteChange('home')}
                    })   
                }})
            // .then(result => console.log(result))
            .catch(error => console.log('dhruv error', error));
    
              };

    const onRouteChange = (route) =>{
        if(route==='signout'){
            setisSignedIn(false);
        }
        else if(route==='home'){
            setisSignedIn(true);
        }
        setRoute(route);
    }

    return (
        <div className="App">
        <Particles className='particles'
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={ParticleOption}
            />
        <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn}/>
        {route === 'home' 
        ? <div>
        <Logo />
       <Rank name={Users.name} entries={Users.entries}/> 
       <ImagelinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
       <FaceRecognition box={data1} imageUrl={imageUrl} noimage={noimage}/>
       </div>
        :((route==='signin')
        ?<Signin onRouteChange={onRouteChange} curUser={loadUser}/>
        :<Register onRouteChange={onRouteChange} loadUser={loadUser}/>)
        }
        </div>
    );}

export default App;
