import React from "react";
import './FaceRecognition.css'
const FaceRecognition = ({imageUrl,box,noimage}) =>{
    return (
        <div className="center">
            {noimage ? (
                <div >
                <div className="f2 underline center ttu tracked mt0" >
                    No Face Found in the Image
                </div>
                <div className="center">
                <img  id="inputImage" alt="will be shown here" src={imageUrl} width="500px" height='auto'/>
                </div>
                </div>
            ) :(
            
            <div className="absolute ba bw2 b--green shadow-5">
            <img  id="inputImage" alt="will be shown here" src={imageUrl} width="500px" height='auto'/>
            {Array.isArray(box) && box.map((boundingBox,index)=>(
                <div key={index+1} className="bounding-box red" style={{
                    top:boundingBox.topRow,
                    right:boundingBox.rightCol,
                    bottom:boundingBox.bottomRow,
                    left:boundingBox.leftCol
                    }}>{index+1}
            </div>
            ))}
            
        </div>)}
        </div>


    );
}

export default FaceRecognition