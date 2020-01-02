import React from 'react';
import './App.css';
import {Navigation} from './components/nav/Navigation';
import {ImageLinkForm} from './components/imagelinkform/ImageLinkForm'
import {Rank} from './components/rank/Rank'
import {FaceRecog} from './components/facerecog/FaceRecog'
import {Register} from './components/register/Register'
import Particles from 'react-particles-js';

import {Signin} from './components/signin/Signin';


const particleOptions = {
  particles:{
    number:{
      value:80,
      density:{
        enable:true,
        value_area:800
      }
    },
    line_linked:{
      shadow:{
        enable: true,
        color: "#3CA9D1",
        blur:5
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedin: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: '',
  }
}
class App extends React.Component {
  constructor(){
    super();
    this.state= initialState;
  }
  
  calculateFacelocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById('inputimage');
    const width = Number(img.width);
    const height = Number(img.height);
    return {
      leftCol:clarifaiFace.left_col * width,
      topRow:clarifaiFace.top_row * height,
      rightCol:width - (clarifaiFace.right_col*width),
      bottomRow:height - (clarifaiFace.bottom_row*height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box:box})
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('https://cryptic-falls-11765.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://cryptic-falls-11765.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }
        this.displayFaceBox(this.calculateFacelocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState)
        
    }
    else if(route === 'home'){
      this.setState({isSignedin:true,route:route})
    }
    else {
      this.setState({route:route})
    }
    
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined

    }})
  }

  render(){
      return (
      <div className="App">
        <Particles params = {particleOptions} className = 'particles' />
        <Navigation onRouteChange = {this.onRouteChange} isSignedin = {this.state.isSignedin}/>
        {this.state.route === 'home' ? 
          (<div>
              <Rank name = {this.state.user.name}
                    entries = {this.state.user.entries} />
              <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
              <FaceRecog box = {this.state.box} imageUrl = {this.state.imageUrl}/> 
            </div>) 
            : (this.state.route === 'signin') ? 
              <Signin loadUser = {this.loadUser}
                          onRouteChange = {this.onRouteChange}/>
              : <Register onRouteChange = {this.onRouteChange} 
                          loadUser = {this.loadUser}
                          />
      }
      </div>
    );
  }
}

export default App;
