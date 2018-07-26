import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// class Square extends React.Component {
//   render() {
//     return (
//       <button 
//       className="square" 
//       onClick={()=>this.props.onClick()}
//       >
//         {
//           this.props.value
//         }
//       </button>
//     );
//   }
// }

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      values:Array(9).fill(null),
      isNextX:false,
    }
  }
  // 处理点击时间
  handleClick(i){
      const squares = this.state.values.slice();
      squares[i] = this.state.isNextX?'X':'O';
      if(tellMeWhoWin(this.state.values)){
        return;
      }
      this.setState({
        values: squares,
        isNextX:!this.state.isNextX,
      });
  }
  renderSquare(i) {
    return <Square 
    value={this.state.values[i]}
    onClick = {()=>this.handleClick(i)}
    />;
  }

  render() {
    //const是什么意思，而且为什么函数放在这里，每次都能够执行，不是应该只能执行一次吗
    const winner = tellMeWhoWin(this.state.values);  

    let status;   //这个let是什么意思
    if (winner) {
        status = 'winner is  ' + winner;
    }
    else{
        status = 'Next player: ' + (this.state.isNextX?'X':'O');
    }
    
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
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
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
// 计算输赢结果
  function tellMeWhoWin(values){
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    for(var i = 0;i < lines.length;i ++){
      var j,q,k;
      j = lines[i][0];
      q = lines[i][1];
      k = lines[i][2];
      if (values[j]) {
        if (values[j] === values[q] && values[q] === values[k]) {
           return values[j];
        }
      }
      
    }
    return null;
  }