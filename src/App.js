import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import data from './data'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }
  componentDidMount(){
    fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(toys => this.setState({toys: toys}))
  }


  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  handleFormSubmission = (event) => {
    event.preventDefault()
    this.handleClick()
    let newToy = {
      name: event.target[0].value,
      image: event.target[1].value,
      likes: 0
    }
    let allToys = this.state.toys
    let config={
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newToy)
    }
    fetch("http://localhost:3000/toys", config)
    .then(res=> res.json())
    .then(newToy => this.setState({toys: [...allToys, newToy]}))
    event.target.reset()
  }

  handleDeleteToy = (deletedToy) => {
    let config = {
      method: "DELETE"
    }
    fetch(`http://localhost:3000/toys/${deletedToy.id}`, config)
    let toys = this.state.toys.filter(toy => toy!==deletedToy)
    this.setState({
      toys: toys
    })
  }

  handleLikeBtn = (likedToy) => {
    let newLikeTotal = likedToy.likes + 1
    let config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: newLikeTotal
      })
    }
    fetch(`http://localhost:3000/toys/${likedToy.id}`, config)
    let updatedToys = this.state.toys.map(toy=>{
      if(toy === likedToy){
        return {...toy, likes: toy.likes+1}
      }}
    )
    this.setState({
      toys: updatedToys
    })
  }

  render(){
    return (
      <>
        <Header />
        { this.state.display
            ?
          <ToyForm submit={this.handleFormSubmission}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} delete={this.handleDeleteToy} like={this.handleLikeBtn}/>
      </>
    );
  }

}

export default App;
