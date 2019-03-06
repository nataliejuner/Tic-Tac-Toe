import React, { Component } from 'react';
import './App.css';
import Status from './Status'

class Board extends Component {
    constructor (props){
        super(props)
        this.state = {
            spaces: Array(9).fill(null),
            player: null,
            winner: null,
            xWins: 0,
            oWins: 0
        }
    }

    clickHandle = (index) => {
            if(this.state.winner === null && this.state.player !== null){
            let newSpaces = this.state.spaces
            if(newSpaces[index] === null){
                newSpaces[index] = this.state.player
                this.setState({spaces: newSpaces, player: this.state.player === "X" ? "O" : "X" })
            }
            this.checkWinner()
        }
     }
     checkWinner = () => {
         let winningCombo = [
             [0,1,2],
             [3,4,5],
             [6,7,8],
             [0,3,6],
             [1,4,7],
             [2,5,8],
             [0,4,8],
             [2,4,6]
         ]
         this.finalWinner(winningCombo)
     }
     finalWinner = (winningCombo) => {
         let {player, spaces, winner, xWins, oWins} = this.state
         for(let i=0; i < winningCombo.length; i++){
             const [a,b,c] = winningCombo[i]
             if(spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]){
                 (player === 'X') ? xWins += 1 : oWins += 1
                 this.setState({ winner: player, xWins: xWins, oWins: oWins})
             }
         }
         if(!this.state.winner && this.state.spaces.indexOf(null) === -1){
             this.state.winner = 'No one!'
         }
     }
     gameReset = () => {
         this.setState({ spaces: Array(9).fill(null), player: null, winner: null})
     }


    renderBoxes = () => {
        return this.state.spaces.map((box, index) =>
            <div className='box' key={index} onClick={() => this.clickHandle(index)}>{box}</div>
    )}

    chooseX = () => {
        this.setState({player: 'X'})
    }
    chooseO = () => {
        this.setState({player: 'O'})
    }
  render() {

    return (
<div>
<h1>Tic-Tac-Toe Game</h1>
    <Status
        winner={this.state.winner}
        player={this.state.player}
         />
        <div className='container-1'>
        <div className='board'>
            {this.renderBoxes()}
        </div>
        </div>

    <div className='player-choice'>
        <button type='button' className='btn btn-secondary' disabled={this.state.player} onClick={() => this.chooseX()}>Choice X</button>
        <button type='button' className='btn btn-secondary' disabled={this.state.player} onClick={() => this.chooseO()}>Choice O</button>
    </div>

    <div className="button-div">
        <button type='button' className='btn btn-success' disabled={!this.state.winner} onClick={() => this.gameReset()}>New Game</button>
    </div>

    <div className='container'>
        <div className='row'>
            <div className='col-sm'>
                X Wins: {this.state.xWins}
            </div>
            <div className='col-sm'>
                O Wins: {this.state.oWins}
            </div>
        </div>
    </div>
        <div className="copy">
    <p>&copy; Tucker, CJ, & Natalie | Alpha 2019</p>
        </div>
</div>


    );
  }
}

export default Board;
