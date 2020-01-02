import React from 'react';
import Tilt from 'react-tilt'
import './logo.css'


export const Logo = () => {
    return(
        <div className = 'ma2 mt2'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 35 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner pt-4"><img alt = '' style = {{paddingTop : '15px'}} src="https://img.icons8.com/wired/64/000000/dome-camera.png"></img></div>
            </Tilt>
        </div>
    )
}
