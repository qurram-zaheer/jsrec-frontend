import React from 'react';
import './FaceRecog.css';

export const FaceRecog = (props) => {
    return(
        <div className = 'center ma'>
            <div className = 'absolute mt2'>
            <img id = 'inputimage' alt = '' src = {props.imageUrl} width = '300px' height = 'auto'></img>
            <div className = 'bounding-box' style = {{top: props.box.topRow, right:props.box.rightCol, left:props.box.leftCol, bottom: props.box.bottomRow}}>
            </div>
        </div>
        </div>
    )
}
