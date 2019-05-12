import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';

const INITIAL_STATE = {
  breakLength: 5,
  sessionLength: 25,
  maxLength: 60,
  minLength: 1,
  isPlaying: false,
  isInSession: true, // if false means that Break is ongoing
  timeRemaining: null,
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
    this.toggleStartStop = this.toggleStartStop.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.addZero = this.addZero.bind(this);
    this.setInitialTime = this.setInitialTime.bind(this);
    this.switchSession = this.switchSession.bind(this);
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
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
  }

  toggleStartStop() {
    if (!this.state.isPlaying) {
      this.updateTimer();
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
    let time = new Date();

    if (!this.state.timeRemaining) {
      time = this.setInitialTime(time);
      return;
    } else {
      time.setTime(this.state.timeRemaining);

      if (time.getMinutes() + time.getSeconds() === 0) {
        this.switchSession();
      } else {
        time.setTime(time.getTime() - 1000);
        this.setState({
          timeRemaining: time
        });
      }
    }
  }

  setInitialTime(time) {
    console.log('creating date');
    time.setMinutes(
      this.state.isInSession
        ? this.state.sessionLength
        : this.state.breakLength,
      0
    );
    this.setState({
      timeRemaining: time
    });
  }

  switchSession() {
    console.log('switching break/session!');
    this.setState({
      timeRemaining: null,
      isInSession: !this.state.isInSession
    });
    document.getElementById('beep').play();
    this.updateTimer();
  }

  addZero(i) {
    return i < 10 ? `0${i}` : i;
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
                size='sm'
              >
                +
              </Button>
              <Button
                id='break-decrement'
                variant='light'
                onClick={this.decrementBreak}
                size='sm'
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
                size='sm'
              >
                +
              </Button>
              <Button
                id='session-decrement'
                variant='light'
                onClick={this.decrementSession}
                size='sm'
              >
                -
              </Button>{' '}
              <div id='session-length'>{this.state.sessionLength}</div>
            </div>
          </div>
        </div>

        <div id='timer-label'>
          {this.state.isInSession ? `Session` : `Break`}
        </div>
        <div id='time-left'>
          {this.state.timeRemaining
            ? `${this.addZero(
                this.state.timeRemaining.getMinutes()
              )}:${this.addZero(this.state.timeRemaining.getSeconds())}`
            : `${this.addZero(this.state.sessionLength)}:00`}
        </div>
        <Button id='start_stop' size='xxl' onClick={this.toggleStartStop}>
          {this.state.isPlaying ? 'Stop' : 'Start'}
        </Button>
        <Button id='reset' size='xxl' onClick={this.resetTimer}>
          Reset
        </Button>
        <audio id='beep' preload='auto' src='https://goo.gl/65cBl1' />
      </div>
    );
  }
}

export default App;
