import React from 'react'
import './ImageLinkForm.css'

export const ImageLinkForm = (props) => {
    return (
        <div>
            <p className = 'f3'>
                {'Enter a picture with a face for detection'}
            </p>
            <div className = 'center'>
                <div className = 'center form shadow-5 pa4 br3'>
                    <input className = 'left f4 pa2 center w-70' type = 'text' 
                    onChange = {props.onInputChange}/>
                    <button className = 'right pa2 w-30 grow f4 link ph3 pv2 dib white bg-light-purple' 
                    onClick = {props.onButtonSubmit}>
                        Detect!
                    </button>
                </div>
            </div>
        </div>
    )
}
