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
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toysArray => {
      this.setState({
        toys: toysArray
      })
    })
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  createToy = (e) => {
    e.preventDefault()
    let name = e.target[0].value
    let image = e.target[1].value
    let likes = 0
    e.target.reset()
    let configObj = {method: 'POST', headers: {'Content-Type': 'application/json', Accept: 'application/json'},
                    body: JSON.stringify({name, image, likes})}
    fetch('http://localhost:3000/toys', configObj)
    .then(res => res.json())
    .then(newToy => {  
      let newToysArray = [...this.state.toys, newToy]
      this.setState({
        toys: newToysArray,
        display: !this.state.display
      })
    })
  }

  donateToy = (clickedToy) => {
    fetch('http://localhost:3000/toys/' + clickedToy.id, {method: 'DELETE'})
    .then(() => {
      let updatedToysArray = this.state.toys.filter(toy => toy !== clickedToy)
      this.setState({
        toys: updatedToysArray
      })
    })
  }

  likeToy = (clickedToy) => {
    let updatedLikes = clickedToy.likes + 1
    let configObj = {method: 'PATCH', headers: {'Content-Type': 'application/json', Accept: 'application/json'},
                      body: JSON.stringify({likes: updatedLikes})}
    fetch('http://localhost:3000/toys/' + clickedToy.id, configObj)
    .then(res => res.json())
    .then(updatedToy => {
      let updatedToysArray = this.state.toys.map(toy => {
        if (toy === clickedToy)
        {toy = updatedToy}
        return toy
      })
      this.setState({
        toys: updatedToysArray
      })
    })

  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm createToy={this.createToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} donateToy={this.donateToy} likeToy={this.likeToy}/>
      </>
    );
  }

}

export default App;
