import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
    return ( <button className = "square"
        onClick = { props.onClick } > { props.value } </button>
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
    // constructor(props){
    //   super(props);
    //   this.state = {
    //     values:this.props.values,
    //     isNextX:false,
    //   }
    // }
    renderSquare(i) {
        return <Square
            value = { this.props.values[i]}
            onClick = {
            () => this.props.onClick(i)
            }
            />;
    }

    render() {
        return ( <
            div >
            <
            div className = "board-row" > { this.renderSquare(0)} { this.renderSquare(1)} { this.renderSquare(2)} <
            /div> <
            div className = "board-row" > { this.renderSquare(3)} { this.renderSquare(4)} { this.renderSquare(5)} <
            /div> <
            div className = "board-row" > { this.renderSquare(6)} { this.renderSquare(7)} { this.renderSquare(8)} <
            /div> < /
            div >
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                values: Array(9).fill(null),
            }],
            xIsNext: true,
        };
    }
    // 处理点击时间
    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.values.slice();
        if (tellMeWhoWin(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                values: squares,
            }]),
            xIsNext: !this.state.xIsNext,
        });
    }
    // 跳转到指定步骤
    jumpTo(i) {
        var his = this.state.history;
        var cur = his[i];
        var squ = cur.values.slice();
        var flag = ((his.length - i) % 2 == 0);
        this.setState({
            history: his.concat([{
                values: squ,
            }]),
            xIsNext: flag ? !this.state.xIsNext : this.state.xIsNext,
        });
    }
    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = tellMeWhoWin(current.values);
        // 这个map函数可以说很高级了
        const moves = history.map(
            (step, move) => {
                const desc = move ?
                    'Go to move #' + move :
                    'Go to game start';
                return ( <
                    li >
                    <
                    button onClick = {
                    () => this.jumpTo(move)
                    } > { desc } < /button> < /
                    li >
                );
            }
        );

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return ( <
            div className = "game" >
            <
            div className = "game-board" >
            <
            Board values = { current.values } onClick = {
            (i) => this.handleClick(i)
            }
            /> < /
            div > <
            div className = "game-info" >
            <
            div > { status } < /div> <
            ol > { moves } < /ol> < /
            div > <
            /div>
        );
    }
}

// ========================================

ReactDOM.render(<
Game / >,
    document.getElementById('root')
);

// 计算输赢结果
function tellMeWhoWin(values) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (var i = 0; i < lines.length; i++) {
        var j,
            q,
            k;
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