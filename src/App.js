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

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  componentDidMount(){
    fetch('http://localhost:3000/toys/')
    .then(resp => resp.json())
    .then(toys => this.setState({
      toys: toys
    }))
  }

  addToy = (e) => {
    e.preventDefault()
    let name = e.target[0].value
    let imageUrl = e.target[1].value

    let newToy = {
      name: name,
      image: imageUrl,
      likes: 0
    }

    fetch('http://localhost:3000/toys/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(
        newToy 
      )
    })
    .then(resp => resp.json())
    .then(addedToy => this.setState({
      toys: [addedToy, ...this.state.toys]
    },
    () => console.log(addedToy)
    ))
  }

  moreLikes = (toy) => {
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    fetch(`http://localhost:3000/toys/${toy.id}`,{
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        likes: toy.likes + 1
      })
    })
    .then(resp => resp.json())
    .then(toy => {let newToys = this.state.toys.map(toyObj =>{
     if (toyObj.id === toy.id){
        return toy
     } 
    else 
    return toyObj})
  
  this.setState({
    toys: newToys
  })
 console.log(toy)} 
  )}

  deleteToy = (toy) => {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "DELETE"
    })
    let toysAgain = this.state.toys.filter(toyObj => toyObj !== toy)
    this.setState({
      toys:toysAgain
    })
    
  }

  

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addToy={this.addToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} moreLikes={this.moreLikes} deleteToy={this.deleteToy}/>
      </>
    );
  }

}

export default App;
