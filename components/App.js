import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class App extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Pomodora Clock</h1>
        <div id='container'>
          <div class='row'>
            <div class='col-sm' id='break-container'>
              <div id='break-label'>Break Length</div>
              <Button id='break-increment' variant='light'>
                +
              </Button>
              <Button id='break-decrement' variant='light'>
                -
              </Button>
              <div id='break-length'>5</div>
            </div>
            <div class='col-sm' id='session-container'>
              <div id='session-label'>Session Length</div>
              <Button id='session-increment' variant='light'>
                +
              </Button>
              <Button id='session-decrement' variant='light'>
                -
              </Button>{' '}
              <div id='session-length'>25</div>
            </div>
          </div>
        </div>

        <div id='timer-label'>Session</div>
        <div id='time-left'>25:00</div>
        <Button id='start_stop'>Start</Button>
        <Button id='reset'>Reset</Button>
      </div>
    );
  }
}

export default App;
