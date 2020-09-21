import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  // console.log(props)
  return(
   
    <div id="toy-collection">
      
     {props.toys.map(toy => <ToyCard toy={toy} key={toy.id} updateLikes={props.updateLikes} deleteToy={props.deleteToy} />)}
      
    </div>
  )
}

export default ToyContainer;
