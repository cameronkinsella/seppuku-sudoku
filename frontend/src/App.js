import React, {Component} from 'react';
import './App.scss';
import axios from 'axios';
import SudokuBoard from "./Components/SudokuBoard";
import ManuelSudokuBoard from "./Components/ManuelSudokuBoard";
import {withAlert} from 'react-alert'
import Switch from 'react-ios-switch';

const blankBoard = [
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "]
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      board: blankBoard,
      checked: false,
    };
  }


  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  };

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
    axios.post('https://us-central1-seppuku-sudoku.cloudfunctions.net/solve-board', fd, {
      onUploadProgress: progressEvent => {
        console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
      }
    })
      .then(res => {
        console.log(res);
        this.setState({board: res.data})
      })

  };


  render() {
    const alert = this.props.alert;


      return (
        <div className="App">
          <h1>Seppuku Sudoku</h1>
          {
            this.state.checked ?
              <ManuelSudokuBoard className="SudokuBoard" output={this.state.board}/>:
            <SudokuBoard className="SudokuBoard" output={this.state.board}/>
          }

          <div className="Buttons">
            <button className="button" onClick={() => window.location.reload()}>Try Again!</button>
            <Switch checked={this.state.checked}
                    onChange={checked => this.setState({checked: checked})}/>
            {
              this.state.checked ?
              <button className="button" onClick={() => {
              alert.show('Solved!')
            }}>Solve!
            </button>:
                <button className="disabled">
                  Solve!
                </button>
            }
          </div>
          <input
            style={{display: 'none'}}
            type="file"
            onChange={this.fileSelectedHandler}
            ref={fileInput => this.fileInput = fileInput}/>
          <button style={{borderRadius: "8px 0 0 8px"}} className="upload"
                  onClick={() => this.fileInput.click()}>Pick File
          </button>
          <button style={{borderRadius: "0 8px 8px 0"}} className="upload"
                  onClick={this.fileUploadHandler}>Upload
          </button>
        </div>
      );
    }
  }


const output = [
  [5.0, 8.0, 3.0, 6.0, 9.0, 4.0, 7.0, 2.0, 1.0],
  [7.0, 1.0, 6.0, 8.0, 3.0, 2.0, 5.0, 4.0, 9.0],
  [2.0, 9.0, 4.0, 1.0, 7.0, 5.0, 3.0, 8.0, 6.0],
  [6.0, 7.0, 1.0, 5.0, 2.0, 8.0, 4.0, 9.0, 3.0],
  [8.0, 2.0, 9.0, 7.0, 4.0, 3.0, 1.0, 6.0, 5.0],
  [4.0, 3.0, 5.0, 9.0, 1.0, 6.0, 8.0, 7.0, 2.0],
  [1.0, 5.0, 8.0, 2.0, 6.0, 7.0, 9.0, 3.0, 4.0],
  [3.0, 6.0, 7.0, 4.0, 5.0, 9.0, 2.0, 1.0, 8.0],
  [9.0, 4.0, 2.0, 3.0, 8.0, 1.0, 6.0, 5.0, 7.0]
];

export default withAlert()(App);
