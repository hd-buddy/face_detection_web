import React from "react";

const Rank = ({name,entries}) =>{
    return (
        <div>
            <div className="white f1">
                {`Welcome ${name},`}
            </div>
            <div className="white f3">
                {`you have used ${entries}/20 free trials..`}
            </div>
        </div>
    );
}

export default Rank