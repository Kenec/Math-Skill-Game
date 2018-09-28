import React from 'react';

/**
 * Button to display correct and incorrect choice by the player
 * @method Button
 * @param {object} props 
 */
const Button = (props) => {
	let button;
  switch(props.answerIsCorrect) {
  	case true:
    	button = 
        <button 
        	onClick={props.acceptAnswer}
        	className="btn btn-success">
        		<i className="fa fa-check"></i>
        </button>
    	break;
    case false:
    	button = 
        <button 
        	className="btn btn-danger">
          	<i className="fa fa-times"></i>
        </button>
    	break;
    
    default:
    	button = 
        <button
        		className="btn btn-secondary"
        		onClick={props.checkAnswer}
            disabled={props.selectedNumbers.length === 0}>
          =
        </button>
    	break;
  }
	return (
  	<div className="col-2 text-center">
  		{button}
      <br/><br/>
      <button 
        	className="btn btn-warning btn-sm"
          disabled={props.redraws === 0 || props.doneStatus}
          onClick={props.redraw}>
          	<i className="fa fa-refresh"></i> {props.redraws}
        </button>
  	</div>
  );
}

export default Button;