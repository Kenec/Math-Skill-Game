import React from 'react';

/**
 * Frame to show when the game ends either by win or loose
 * @method DoneFrame
 * @param {object} props 
 */
const DoneFrame = (props) => {
	return (
  	<div className="text-center">
  	  <h2>{props.doneStatus}</h2>
      <button className="btn btn-secondary" onClick={props.resetGame}>
      	Play Again
      </button>
  	</div>
  );
}

export default DoneFrame;