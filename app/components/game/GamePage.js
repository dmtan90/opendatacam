import React from 'react';
import { connect } from 'react-redux';

import Video from '../shared/Video'; 
import Loading from '../shared/Loading'; 
import Canvas from '../shared/Canvas'; 
import Mask from './Mask'; 
import Sound from './Sound'; 
import SettingsControl from '../shared/SettingsControl';
import TrackerUI from '../shared/TrackerUI';
import GameIndicators from './GameIndicators';
import GameInstructions from './GameInstructions';

import Title from '../shared/Title';
import VideoSelector from '../shared/VideoSelector';

import { updateSettings } from '../../statemanagement/app/SettingsStateManagement';

import { selectDefaultVideo } from '../../statemanagement/app/AppStateManagement';

class GamePage extends React.Component {

  constructor(props) {
    super(props);
    props.dispatch(updateSettings({ showDebugUI: false }));
  }

  componentDidMount() {
    this.props.dispatch(selectDefaultVideo());
  }

  render () {
    return (
      <div className="landing-page">
        {process.env.NODE_ENV !== 'production' &&
          <SettingsControl />
        }
        <GameIndicators />
        {!this.props.isGamePlaying &&
          <GameInstructions />
        }
        <Canvas />
        <Sound />
        <Mask />
        <Video />
      </div>
    )
  }
}

export default connect((state) => {
  return {
    isGamePlaying: state.game.getIn(['status','isPlaying'])
  }
})(GamePage);
