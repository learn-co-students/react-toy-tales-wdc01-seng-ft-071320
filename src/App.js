import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import data from './data'


class App extends React.Component{

  state = {
    display: false,
    toys: data
  }

  componentDidMount(){
    fetch("http://localhost:3001/toys/")
    .then(res => res.json())
    .then(toyData => this.setState({
      toys: toyData
    })
  )}

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    let name = e.target[0].value
    let image = e.target[1].value

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name, image, 
        likes: 0
      })
    }

    fetch("http://localhost:3001/toys", configObj)
    .then(res => res.json())
    .then(toy => this.setState({
      toys: [...this.state.toys, toy]
    }))

  }

  handleDelete = (id) => {
    fetch(`http://localhost:3001/toys/${id}`, {method: "DELETE"})
    .then(this.setState({
      toys: this.state.toys.filter(toy => toy.id !== id)
    }))

  }

  handleLikes = (id, likes) => {

    //let foundToy = this.state.toys.find(toy => toy.id === id)

    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        likes: likes + 1
      })
    }

    fetch(`http://localhost:3001/toys/${id}`, configObj)
    .then(res => res.json())
    .then(toy => this.setState({
      toys: this.state.toys.map(toy => {
        if (toy.id === id){
          toy.likes += 1
        }
        return toy
      })
    }))

    
  }

  render(){

    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm handleSubmit={this.handleSubmit}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} handleDelete={this.handleDelete} handleLikes={this.handleLikes}/>
      </>
    );
  }

}

export default App;
