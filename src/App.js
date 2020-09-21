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

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys= {this.state.toys}/>
      </>
    );
  }

}

export default App;
