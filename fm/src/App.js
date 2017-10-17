import React, { Component } from 'react';
import logo from './csk.jpg';
import sig from './sig.png';

import { Row, Col, Image } from 'react-bootstrap';
import './App.css';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const carrier = audioContext.createOscillator();
      carrier.type = 'sine';
      carrier.frequency.value = 220;

const modulator = audioContext.createOscillator();
      modulator.frequency.value = 1.0;

const modulatorGain = audioContext.createGain();
      modulatorGain.gain.value = 50;

const carrierGain = audioContext.createGain();
      carrierGain.gain.value = .6;

      modulator.connect(modulatorGain);
      modulatorGain.connect(carrier.detune);
      carrier.connect(carrierGain);
      carrierGain.connect(audioContext.destination);
      
      carrier.start(0);
      modulator.start(0);

function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
  return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
}

var style = {
  width: '75%',
  paddingLeft: '25%',
  textAlign: 'center'
}

export class App extends Component {
    constructor() {
        super();
        this.changeCarGainA = this.changeCarGainA.bind(this); 
        this.changeCarFreqA = this.changeCarFreqA.bind(this);
        this.changeModGainA = this.changeModGainA.bind(this); 
        this.changeModFreqA = this.changeModFreqA.bind(this);        
    }  

    changeCarGainA(event){
      var rescaleSlider = scaleBetween(event, 0, 1, 0, 127);
      carrierGain.gain.value = rescaleSlider;
    }

    changeCarFreqA(event){
      const now = audioContext.currentTime;
      var rescaleSlider = scaleBetween(event, 0, 290, 0, 127);
      carrier.frequency.linearRampToValueAtTime(rescaleSlider, now + 0.01);
      carrier.frequency.value = rescaleSlider;
    }

    changeModGainA(event){
      var rescaleSlider = scaleBetween(event, 0, 300, 0, 127);
      modulatorGain.gain.value = rescaleSlider;
    }

    changeModFreqA(event){
      const now = audioContext.currentTime;
      var rescaleSlider = scaleBetween(event, 0, 13, 0, 127);
      console.log(rescaleSlider);
      modulator.frequency.linearRampToValueAtTime(rescaleSlider, now + 0.01);
      modulator.frequency.value = rescaleSlider;
    }    

  render() {
    return (
      <div className="App">
      <br/>
        <Row>
        <Col md={12}>
          <Image src={logo} className="App-logo" alt="logo" rounded />
        </Col>         
        </Row>
        <Row>
        <Col md={12}>
          <Image src={sig} className="App-sig" alt="logo" />
        </Col>
        </Row>
        <Row>
        <Col md={12}>
          <h1 className="App-title"><em>React + Web Audio : Basic FM-Synthesis</em></h1>
        </Col>  
        </Row>  
        <div style={style}>
        <Row>
        <Col md={3}>
        <h4>carrier gain</h4>
        <Slider 
          min={0}
          max={127}
          onChange={this.changeCarGainA}
        />
        <br/>
        </Col>
                <Col md={3}>
        <h4>carrier freq</h4>        
        <Slider 
          min={0}
          max={127}
          onChange={this.changeCarFreqA}
        />
        <br/> 
        </Col>
                <Col md={3}>
        <h4>modulator amp</h4>        
        <Slider 
          min={0}
          max={127}
          onChange={this.changeModGainA}
        />
        <br/> 
        </Col>
                <Col md={3}>
        <h4>modulator freq</h4>        
        <Slider 
          min={0}
          max={127}
          onChange={this.changeModFreqA}
        />
        <br/> 
        </Col>
        </Row>

        </div>


      </div>
    );
  }
}

export default App;
