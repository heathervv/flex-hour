import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Arrows from './Arrows'

const Wrapper = styled.div`
  position: absolute;
  top: 62%;
  width: 100%;
  height: 180px;
`

const Button = styled.button`
  position: absolute;
  top: ${props => props.top}%;
  right: ${props => props.right}%;
  width: 45px;
  height: 45px;
  padding: 0 0 0 10px;
  background: #222;
  border-radius: 50%;
  border: 3px solid #000;
  color: #000;
  text-shadow: -1px 1px 2px #555;
  text-align: left;
  font-size: 25px;
  cursor: pointer;
  &:active {
    background: #000;
  }
  &:focus {
    outline: none;
  }
`

const Pill = styled.button`
  position: absolute;
  bottom: 16px;
  left: ${props => props.left}%;
  width: 33px;
  height: 15px;
  padding: 0;
  background: #222;
  border: 3px solid #000;
  border-radius: 90px/35px 35px;
  cursor: pointer;
  &:after {
    content: "${props => props.text}";
    display: block;
    position: absolute;
    top: calc(100% + 5px);
    left: 50%;
    transform: translateX(-50%);
    color: #ffd947;
    font-family: 'Lato', sans-serif;
    font-size: 15px;
    font-weight: 800;
    text-shadow: -1px -1px 1px #e0bc31;
    text-transform: uppercase;
    cursor: default;
  }
  &:active {
    background: #000;
  }
  &:focus {
    outline: none;
  }
`

class Controls extends Component {
  constructor() {
    super()

    this.aButton = React.createRef()
    this.bButton = React.createRef()
    this.upArrow = React.createRef()
    this.downArrow = React.createRef()
    this.leftArrow = React.createRef()
    this.rightArrow = React.createRef()

    this.KEY_VALUES = {
      65: this.aButton,
      66: this.bButton,
      38: this.upArrow,
      40: this.downArrow,
      37: this.leftArrow,
      39: this.rightArrow
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', event => {
      const keyCode = event.keyCode.toString()
      if (Object.keys(this.KEY_VALUES).includes(keyCode)) {
        this.triggerControl(this.KEY_VALUES[keyCode])
      }
    })
  }

  triggerControl = (ref) => {
    console.log('control has been clicked', ref);

    if (ref === this.aButton || ref === this.bButton) {
      this.props.setYesNoControl(ref === this.aButton)
    }
  }

  render() {
    return (
      <Wrapper>
        <Arrows
          refs={{
            up: this.upArrow,
            down: this.downArrow,
            left: this.leftArrow,
            right: this.rightArrow
          }}
          onClick={this.triggerControl}
        />
        <Button
          ref={this.aButton}
          onClick={() => this.triggerControl(this.aButton)}
          top={7}
          right={11}
        >
          A
        </Button>
        <Button
          ref={this.bButton}
          onClick={() => this.triggerControl(this.bButton)}
          top={24}
          right={27}
        >
          B
        </Button>
        <Pill text="Select" left={38} />
        <Pill text="Start" left={53} />
      </Wrapper>
    )
  }
}

Controls.propTypes = {
  setYesNoControl: PropTypes.func.isRequired
}

export default Controls;
