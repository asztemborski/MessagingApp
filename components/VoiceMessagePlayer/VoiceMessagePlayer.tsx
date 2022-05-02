import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Audio, AVPlaybackStatus} from 'expo-av';
import styles from './styles';
import Colors from '../../constants/Colors';

interface Props {
  soundUri: string;
  styleRoot?: {};
  styleAudioProgressBG?: {};
  styleAudioProgressFG?: {};
  iconsColor?: string;
}

const VoiceMessagePlayer: React.FunctionComponent<Props> = ({
  soundUri,
  styleRoot,
  styleAudioProgressBG,
  styleAudioProgressFG,
  iconsColor,
}) => {
  const [paused, setPaused] = useState(true);
  const [audioProgress, setAudioProgress] = useState(0);
  const [voiceMessage, setVoiceMessage] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    loadSound();
    () => {
      if (voiceMessage) {
        voiceMessage.unloadAsync();
      }
    };
  }, [soundUri]);

  const loadSound = async () => {
    if (!soundUri) return;

    const {sound} = await Audio.Sound.createAsync(
      {uri: soundUri},
      {},
      onPlaybackStatusUpdate,
    );
    setVoiceMessage(sound);
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;

    setAudioProgress(status.positionMillis / (status.durationMillis || 1));

    setPaused(!status.isPlaying);
  };

  const playPauseSound = async () => {
    if (!voiceMessage) return;

    if (paused && audioProgress === 1) {
      await voiceMessage.playFromPositionAsync(0);
    } else if (paused) {
      await voiceMessage.playAsync();
    } else {
      await voiceMessage.pauseAsync();
    }
  };

  return (
    <View style={[styles.root, styleRoot]}>
      <FontAwesome5
        name={paused ? 'play' : 'pause'}
        size={14}
        color={!iconsColor ? Colors.green : iconsColor}
        onPress={playPauseSound}
      />
      <View style={[styles.audioProgressBG, styleAudioProgressBG]}>
        <View
          style={[
            styles.audioProgressFG,
            {left: `${audioProgress * 100}%`},
            styleAudioProgressFG,
          ]}></View>
      </View>
    </View>
  );
};

export default VoiceMessagePlayer;
