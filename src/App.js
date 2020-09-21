import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import toyData from './data'


class App extends React.Component{

  state = {
    display: false,
    toys: toyData
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean,
      
    })
  }

  componentDidMount(){
    fetch('http://localhost:3000/toys')
    .then(res => res.json() )
    .then(toyData => this.setState({
      toys: toyData
    }))
  }

  handleToyForm = (e) => {
    // e.persist()
    e.preventDefault()

    let name  = e.target[0].value
    let image = e.target[1].value
    console.log(e.target[1].value)

    let postRequest = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json', 
        Accept: 'application/json'
      },
      body: JSON.stringify({name, image, likes:0})
    }

    fetch('http://localhost:3000/toys', postRequest)
    .then( res => res.json() )
    .then( updatedToy => this.setState({
      ...this.state.toys, updatedToy
    }))
  }

  updateLikes =(clickedToy) =>{
    
    let patchRequest = {
      method: "PATCH",
      headers: {
      'Content-Type': 'application/json', 
      Accept: 'application/json'
    }, 
    body: JSON.stringify({
      likes: toy.like +=1
    })
  }
}



  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm handleToyForm={this.handleToyForm}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys= {this.state.toys} 
        updateLikes={this.updateLikes}/>
      </>
    );
  }

}

export default App;
