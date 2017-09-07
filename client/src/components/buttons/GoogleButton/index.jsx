import React from 'react';
import pressed from './pressed.png';
import unpressed from './unpressed.png';
import ImageButton from '../ImageButton.jsx';

class GoogleButton extends React.Component {
  render () {
    return <ImageButton onClick={this.props.onClick} pressedImage={pressed} unpressedImage={unpressed} />
  }
}

export default GoogleButton;