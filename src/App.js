import React from 'react';
import './App.scss';
import cn from 'classnames';

class App extends React.Component {
  state = {
    data: [
      [2,0,0,0],
      [0,0,0,0],
      [0,0,2,0],
      [0,0,0,2]
    ],
    total: 0,
  }

  onPress = (e) => {
    if(!this.state.data.flat().includes(0)) {
      alert("GAME OVER!");
      this.setState({
        data: [
          [2,0,0,0],
          [0,0,0,0],
          [0,0,2,0],
          [0,0,0,2]
        ],
        total: 0,
      })
    }

    if(this.state.data.flat().includes(2048)) {
      alert("YOU WIN!");
      this.setState({
        data: [
          [2,0,0,0],
          [0,0,0,0],
          [0,0,2,0],
          [0,0,0,2]
        ],
        total: 0,
      })
    }

    if(e.keyCode === 37) {
      //key === arrow left
      this.setState(prevState => ({
        data: prevState.data.map(row => {
          let k = 0;
          for(let i = 0; i < row.length; i++) {
            if(row[i] !== 0) {
              let temp = row[i];
              row[i] = row[k];
              row[k] = temp;
              k++;
            }
          }
          row.map((cell, index) => {
            if(cell === row[index+1] && cell !== 0) {
              cell += row[index+1];
              row[index] = cell;
              row[index+1] = row[index+2] || 0;
            }

            return cell;
          })             
        
          return row;
        }),
        total: this.state.data.map(i=>i.reduce((a,b)=>a+b)).reduce((a,b)=>a+b),
      })   
      ) 
      this.setState(prevState => {
        let i = Math.floor(Math.random()*4);
        let search = this.state.data[i].indexOf(0);  
        return prevState.data[i][search] = 2;
      })      
      console.log(this.state.data)     
    }

    if(e.keyCode === 38) {
      //key === arrow up
      this.setState(prevState => {
        const { data } = prevState;
        for(let y = 0; y <data.length; y++) {
          let k = 0;
          for (let x = 0; x < data.length; x++) {    
            if(data[x][y] !== 0) {
              let temp = data[x][y]
              data[x][y] = data[k][y]
              data[k][y] = temp;   
              k++;
            }
          }
        }
        
        for(let y = 0; y < data.length; y++) {
          for (let x = 1; x < data.length; x++) { 
            if(data[x][y] === data[x-1][y] && data[x][y] !== 0) { 
              data[x - 1][y] += data[x][y];
              console.log(x)
              data[x][y] = 0;      
            }
          }
        }
        
        return {
        data: data,
        total: this.state.data.map(i=>i.reduce((a,b)=>a+b)).reduce((a,b)=>a+b),
      }})
      this.setState(prevState => {
        let i = Math.floor(Math.random()*4);
        let search = this.state.data[i].indexOf(0);  
        return prevState.data[i][search] = 2;
      })   
    }

    if(e.keyCode === 39) {
      //key === arrow right
      this.setState(prevState => ({
        data: prevState.data.map(row => {
          let k= row.length - 1;
          for(let i = row.length - 1; i >= 0; i--) {
            if(row[i] !== 0) {
              let temp = row[i];
              row[i] = row[k];
              row[k] = temp;
              k--;
            }
          }
          row.map((cell, index) => {
            if(cell === row[index-1] && cell !== 0) {
              cell += row[index-1];
              row[index] = cell;
              row[index-1] = row[index-2] || 0;
            }

            return cell;
          })
          
          return row;
        }),
        total: this.state.data.map(i=>i.reduce((a,b)=>a+b)).reduce((a,b)=>a+b),
      }))  
      this.setState(prevState => {
        let i = Math.floor(Math.random()*4);
        let search = this.state.data[i].indexOf(0);  
        return prevState.data[i][search] = 2;
      })   
    }

    if(e.keyCode === 40) {
      //key === arrow down
      this.setState(prevState => {
        const { data } = prevState
        for(let y = 0; y < data.length; y++) {
          for (let x = 0; x < data.length; x++) { 
            if(data[x][y] !== 0 && x<=2 && data[x+1][y] === 0) {
              console.log(data[x])
              let temp = data[x+1][y]
              data[x+1][y] = data[x][y]
              data[x][y] = temp;   
            }
          }
        }
        
        for(let y = 0; y< data.length; y++) {
          for (let x = 1; x < data.length; x++) { 
            if(data[x][y] === data[x-1][y] && data[x][y] !== 0) { 
              data[x][y] += data[x-1][y];
              console.log(x)
              data[x-1][y] = 0;      
            }
          }
        }
        return {
        data: data, 
        total: this.state.data.map(i=>i.reduce((a,b)=>a+b)).reduce((a,b)=>a+b),
      }})
      this.setState(prevState => {
        let i = Math.floor(Math.random()*4);
        let search = this.state.data[i].indexOf(0);  
        return prevState.data[i][search] = 2;
      })
    }
  };

  render() {
    const { data, total } = this.state
    return (
      <div 
        className="App"
        // role="button"
        tabIndex="0"
        onKeyDown={(e) => this.onPress(e)}
        autofocus='true'
      >
        <h1>2048</h1>
        <div className="score-container">{total}</div>
        <div className="game-container">
          <div 
            className="grid-container"
          >
            {data.map(row => 
              <div className="grid-row">
                {row.includes(2048)
                  ? alert("you win")
                  :row.map(cell => 
                <div 
                  className={cn({ 
                    'grid-cell': cell === 0,
                    'two': cell === 2,
                    'four': cell === 4,
                    'eight': cell === 8,
                    'sixteen': cell === 16,
                    'thirty-two': cell === 32,
                    'sixty-four': cell === 64,
                    'one-twenty-eight': cell === 128,
                    'two-fifty-six': cell === 256,
                    'five-twelve': cell === 512,
                    'one-zero-forty-two': cell === 1024,
                    'two-zero-forty-eight': cell === 2048,
                  })}
                >{ cell===0 ? null : cell}</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
