import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class Square2 extends React.Component {
    render() {
      return (
        <button className="square"
            onClick={() => this.props.onClick()}
            >
          {this.props.value}
        </button>
      );
    }
  }
function Square(props) {
    return (
        <button className="square"
            onClick={props.onClick}
            >
          {props.value}
        </button>
      )
}
const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
function calculateWinner(squares) {
    console.log(squares);
    let result = null;
    lines.forEach(line => {
        const [a, b, c] = line;
        //console.log(a,b,c, squares[a],squares[b],squares[c],  squares[a] == squares[b], squares[a] === squares[c], squares[a] == squares[b] && squares[a] === squares[c]);
        if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            console.log(squares[a] + " :V")
            result = squares[a];
        }
    })
    return result;
}
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        }
    }

    renderSquare(i) {
      return <Square value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}/>;
    }
    handleClick(i) {
        const squaresCopy = [...this.state.squares];
        if(calculateWinner(squaresCopy) || squaresCopy[i]) {
            return;
        }
        squaresCopy[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares:squaresCopy,
            xIsNext: !this.state.xIsNext,
        });
    }
    render() {
        let result = calculateWinner(this.state.squares);
        console.log(result);
        let status;
        if(result) {
            status = result + ' has won';
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        console.log(status);
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }

  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
        </div>
      );
    }
  }

  // ========================================

  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
