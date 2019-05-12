import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

const INITIAL_STATE = {
  breakLength: 5,
  sessionLength: 25,
  maxLength: 60,
  minLength: 1,
  isPlaying: false,
  isInSession: true, // if false means that Break is ongoing
  timeRemaining: [25, 0],
  interval: null
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.incrementBreak = this.incrementBreak.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
  }

  incrementBreak() {
    if (this.state.breakLength >= this.state.maxLength) {
      return;
    }
    this.setState({ breakLength: this.state.breakLength + 1 });
  }

  incrementSession() {
    if (this.state.sessionLength >= this.state.maxLength) {
      return;
    }
    this.setState({ sessionLength: this.state.sessionLength + 1 });
  }

  decrementBreak() {
    if (this.state.breakLength <= this.state.minLength) {
      return;
    }
    this.setState({ breakLength: this.state.breakLength - 1 });
  }

  decrementSession() {
    if (this.state.sessionLength <= this.state.minLength) {
      return;
    }
    this.setState({ sessionLength: this.state.sessionLength - 1 });
  }

  resetTimer() {
    clearInterval(this.state.interval);
    this.setState({ ...INITIAL_STATE });
  }

  toggleTimer() {
    if (!this.state.isPlaying) {
      this.setState({
        interval: setInterval(this.updateTimer, 1000),
        isPlaying: true
      });
    } else {
      clearInterval(this.state.interval);
      this.setState({
        interval: null,
        isPlaying: false
      });
    }
  }

  updateTimer() {
    console.log('timer running');
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Pomodora Clock</h1>
        <div id='container'>
          <div className='row'>
            <div className='col-sm' id='break-container'>
              <div id='break-label'>Break Length</div>
              <Button
                id='break-increment'
                variant='light'
                onClick={this.incrementBreak}
              >
                +
              </Button>
              <Button
                id='break-decrement'
                variant='light'
                onClick={this.decrementBreak}
              >
                -
              </Button>
              <div id='break-length'>{this.state.breakLength}</div>
            </div>
            <div className='col-sm' id='session-container'>
              <div id='session-label'>Session Length</div>
              <Button
                id='session-increment'
                variant='light'
                onClick={this.incrementSession}
              >
                +
              </Button>
              <Button
                id='session-decrement'
                variant='light'
                onClick={this.decrementSession}
              >
                -
              </Button>{' '}
              <div id='session-length'>{this.state.sessionLength}</div>
            </div>
          </div>
        </div>

        <div id='timer-label'>Session</div>
        <div id='time-left'>
          {this.state.isPlaying ? 'playing' : `${this.state.sessionLength}:00`}
        </div>
        <Button id='start_stop' onClick={this.toggleTimer}>
          {this.state.isPlaying ? 'Stop' : 'Start'}
        </Button>
        <Button id='reset' onClick={this.resetTimer}>
          Reset
        </Button>
      </div>
    );
  }
}

export default App;
