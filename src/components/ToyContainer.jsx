import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
      {props.toys.map(toy => <ToyCard toy={toy} like={props.like} delete={props.delete}/>)}
    </div>
  );
}

export default ToyContainer;
