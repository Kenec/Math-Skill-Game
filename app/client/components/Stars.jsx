import React from 'react';

/**
 * Displays random stars for the Game
 * @method Stars
 * @param {object} props 
 */
const Stars = (props) => {
	return(
  	<div className="col-5">
    	{_.range(props.numberOfStars).map(i => 
      	<i key={i} className="fa fa-star"></i>
      )}
  	</div>
  );
}

export default Stars;