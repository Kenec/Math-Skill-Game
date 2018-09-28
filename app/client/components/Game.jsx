import React, { Component } from 'react';
import { render } from 'react-dom';
import Numbers from './Numbers';
import Stars from './Stars';
import Answer from './Answer';
import Button from './Button';
import DoneFrame from './DoneFrame';
import possibleCombinationSum from '../js/possibleCombination';

Numbers.list = _.range(1, 10);

export default class Game extends Component {
	static randomNumber = () => 1 + Math.floor(Math.random() * 9);
  static initialState = () => ({
  	selectedNumbers: [],
    numberOfStars: Game.randomNumber(),
    usedNumbers: [],
    answerIsCorrect: null,
    redraws: 5,
    doneStatus: null,
  });
	state = Game.initialState();
  
  selectNumber = (clickedNumber) => {
  	if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
    if (this.state.usedNumbers.indexOf(clickedNumber) >= 0) { return; }
  	this.setState(prevState => ({
    	answerIsCorrect: null,
    	selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  };
  
  unselectNumber = (clickedNumber) => {
  	this.setState(prevState => ({
    	answerIsCorrect: null,
    	selectedNumbers: prevState.selectedNumbers
      	.filter(number => number !== clickedNumber)
    }));
  }
  
  checkAnswer = () => {
  	this.setState(prevState => ({
    	answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers
      	.reduce((acc, n) => acc + n, 0)
    }));
  }
  
  acceptAnswer = () => {
  	this.setState(prevState => ({
    	usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect: null,
      numberOfStars: Game.randomNumber()
    }), this.updateDoneStatus);
  }
  
  redraw = () => {
  	if (this.state.redraws === 0) { return; }
  	this.setState(prevState => ({
    	selectedNumbers: [],
      answerIsCorrect: null,
      numberOfStars: Game.randomNumber(),
      redraws: prevState.redraws - 1,
    }), this.updateDoneStatus);
  }
  
  possibleSolutions = ({numberOfStars, usedNumbers}) => {
  	const possibleNumbers = _.range(1,10).filter(number => 
    	usedNumbers.indexOf(number) === -1
    );
    
    return possibleCombinationSum(possibleNumbers, numberOfStars);
  };
  
  updateDoneStatus = () => {
  	this.setState(prevState => {
    	if(prevState.usedNumbers.length === 9) {
      	return { doneStatus: 'Done. Nice!' };
      }
      if(prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
      	return { doneStatus: 'Game Over!' };
      }
    });
  }
  
  resetGame = () => this.setState(Game.initialState());
  
	render() {
  	const { 
    	numberOfStars,
      selectedNumbers,
      answerIsCorrect,
      usedNumbers,
      redraws,
      doneStatus,
    } = this.state;
    
  	return (
     <div className="container">
    	<h3>Play Nine</h3>
       <hr />
       <div className="row">
         <Stars numberOfStars={numberOfStars} />
         <Button
        	answerIsCorrect={answerIsCorrect}
        	checkAnswer={this.checkAnswer}
        	selectedNumbers={selectedNumbers}
          redraw={this.redraw}
          redraws={redraws}
          acceptAnswer={this.acceptAnswer}
          />
        <Answer
        	unselectNumber={this.unselectNumber}
        	selectedNumbers={selectedNumbers} 
          />
      </div>
      <br />
      { doneStatus ?
      	<DoneFrame
        	resetGame={this.resetGame}
        	doneStatus={doneStatus} 
        /> :
        <Numbers 
          selectedNumbers={selectedNumbers}
          selectNumber={this.selectNumber}
          usedNumbers={usedNumbers}
          />
      }
    </div>
    );
  }
}