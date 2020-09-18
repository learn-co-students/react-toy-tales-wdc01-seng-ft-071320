import React, { Component } from 'react';

class ToyCard extends Component {

  render() {
    let toy = this.props.toy
    return (
      <div className="card">
        <h2>{toy.name}</h2>
        <img src={toy.image} alt={toy.name} className="toy-avatar" />
        <p>{toy.likes} Likes </p>
        <button onClick={()=> this.props.like(toy)} className="like-btn">Like {'<3'}</button>
        <button onClick={()=>this.props.delete(toy)} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
