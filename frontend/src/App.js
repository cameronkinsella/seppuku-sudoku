import React, {Component} from 'react';
import './App.scss';
import axios from 'axios';
import SudokuBoard from "./Components/SudokuBoard";
import {withAlert} from 'react-alert'

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
  state= {
    selectedFile: null,
      board: blankBoard,
  };

    fileSelectedHandler = event => {
      this.setState ({
          selectedFile: event.target.files[0]
      })
  };

   fileUploadHandler = () => {
      const fd = new FormData();
      fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
      axios.post('/solve-board', fd, {
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
            <SudokuBoard className="SudokuBoard" output={this.state.board}/>

            <div className="Buttons">
                <button className="button" onClick={() => window.location.reload()}>Try Again!</button>
                <button className="button" onClick={() => {
                    alert.show('Solved!')
                }}>Solve!</button>
            </div>
          <input
              style={{display: 'none'}}
              type="file"
              onChange={this.fileSelectedHandler}
              ref={fileInput => this.fileInput = fileInput}/>
          <button onClick={() => this.fileInput.click()}>Pick File</button>
          <button onClick={this.fileUploadHandler}>Upload</button>
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
