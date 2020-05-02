import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import SudokuBoard from './components/SudokuBoard';
import ManuelSudokuBoard from './components/ManuelSudokuBoard';
import { withAlert } from 'react-alert'
import Switch from 'react-ios-switch';
import SudokuSolver from './functions/SudokuSolver'

const blankBoard = [
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '']
];

const blankBoard2 = [
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '']
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      board: blankBoard,
      manualBoard: blankBoard2,
      checked: false,
    };
  }

  solver = new SudokuSolver()

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
        this.setState({ board: res.data })
      })

  };

  butts = async () => {
    let copy = [...this.state.manualBoard]
    for (let i = 0; i < copy.length; i++) {
      for (let j = 0; j < copy.length; j++) {
        if (!copy[i][j]) copy[i][j] = '0'
      }
    }
    let stringBoard = [].concat(...copy).join('')
    return this.solver.solve(stringBoard, { result: 'chunks' });
  }

  handleSolve = () => {
    //console.log(await this.butts())
    this.butts().then(x => {
      this.setState({ manualBoard: x })
      this.setState({ checked: false })
      this.setState({ checked: true })
      console.log(this.state.manualBoard)
    })
  }


  render() {
    const alert = this.props.alert;


    return (
      <div className='App'>
        <h1>Seppuku Sudoku</h1>
        {
          this.state.checked ?
            <ManuelSudokuBoard className='SudokuBoard' output={this.state.manualBoard}/> :
            <SudokuBoard className='SudokuBoard' output={this.state.board}/>
        }

        <div className='Buttons'>
          <button className='button' onClick={() => window.location.reload()}>Try Again!</button>
          <Switch checked={this.state.checked}
                  onChange={checked => this.setState({ checked: checked })}/>
          {
            this.state.checked ?
              <button className='button' onClick={() => {
                this.handleSolve()
                alert.show('Solved!')
              }}>Solve!
              </button> :
              <button className='disabled'>
                Solve!
              </button>
          }
        </div>
        <input
          style={{ display: 'none' }}
          type='file'
          onChange={this.fileSelectedHandler}
          ref={fileInput => this.fileInput = fileInput}/>
        {
          !this.state.checked ?
            <button style={{ borderRadius: '8px 0 0 8px' }} className='upload'
                    onClick={() => this.fileInput.click()}>Pick File
            </button>:
            <button style={{ borderRadius: '8px 0 0 8px' }} className='disabledupload'>
              Pick File
            </button>
        }
        {
          !this.state.checked ?
            <button style={{ borderRadius: '0 8px 8px 0' }} className='upload'
                    onClick={this.fileUploadHandler}>Upload
            </button>:
            <button style={{ borderRadius: '0 8px 8px 0' }} className='disabledupload'>
              Upload
            </button>
        }

      </div>
    );
  }
}

export default withAlert()(App);


// !!! CURSED PROJECT !!!

