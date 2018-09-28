import React from 'react';

/**
 * Display the answer that the player selected
 * @method Answer
 * @param {object} props 
 */
const Answer = (props) => {
	return (
  	<div className="col-5">
    	{props.selectedNumbers.map((number, i) => 
      	<span
        	onClick={() => props.unselectNumber(number)}
        	key={i}>
        	{number}
        </span>
      )}
    </div>
  );
}

export default Answer;