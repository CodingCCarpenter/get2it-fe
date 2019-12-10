import React, { useState, useEffect } from 'react';
import './Timer.css';

export default class Timer extends React.Component {
    state = {
      isActive: false,
      secondsElapsed: 0 / 1000 //time in seconds
    };
  
    getHours() {
      return ("0" + Math.floor(this.state.secondsElapsed / 3600)).slice(-2);
    }
  
    getMinutes() {
      return ("0" + Math.floor((this.state.secondsElapsed % 3600) / 60)).slice(
        -2
      );
    }
  
    getSeconds() {
      return ("0" + (this.state.secondsElapsed % 60)).slice(-2);
    }
  
    startTime = () => {
      this.setState({ isActive: true });
  
      this.countdown = setInterval(() => {
        this.setState(({ secondsElapsed }) => ({
          secondsElapsed: secondsElapsed + 1
        }));
      }, 1000);
    };
  
    resetTime = () => {
      clearInterval(this.countdown);
      this.setState({
        secondsElapsed: 0 / 1000,
        isActive: false
      });
    };
  
    pauseTime = () => {
      clearInterval(this.countdown);
      this.setState({ isActive: false });
    };
  
    render() {
      return (
        <div className="TimerCont">
          <div className="Timer-container">
            <span className="Bloc-timer"> {this.getHours()}</span>
            <span className="Bloc-timer"> :{this.getMinutes()}</span>
            <span className="Bloc-timer"> :{this.getSeconds()}</span>
          </div>
          <div>
            <button
              className="Button StartButton"
              onClick={this.state.isActive ? this.pauseTime : this.startTime}
            >
              Start/Pause
            </button>
            <button className="Button PauseButton" onClick={this.resetTime}>
              Reset
            </button>
          </div>
        </div>
      );
    }
  }