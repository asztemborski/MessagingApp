import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import VideoPlayer from 'expo-video-player';
import Colors from '../../constants/Colors';
import {Video} from 'expo-av';

interface Props {
  isMe: boolean | null | undefined;
  sameOwner: boolean | undefined;
  videoUri: string;
}

const MessageVideoPlayer: React.FunctionComponent<Props> = ({
  isMe,
  sameOwner,
  videoUri,
}) => {
  const {width} = useWindowDimensions();
  const videoPlayerWidth = width * 0.6 - 12;
  return (
    <View
      style={{
        marginLeft: isMe ? 'auto' : 10,
        marginVertical: sameOwner ? 2 : 10,
        margin: 10,
        borderRadius: 10,
      }}>
      <VideoPlayer
        style={{
          height: 300,
          width: videoPlayerWidth,
          videoBackgroundColor: Colors.background,
        }}
        videoProps={{
          shouldPlay: false,
          resizeMode: Video.RESIZE_MODE_COVER,
          source: {uri: videoUri},
          style: {width: '100%', height: '100%', borderRadius: 10},
        }}
        timeVisible={false}
        slider={{visible: false}}
        fullscreen={{visible: false}}
      />
    </View>
  );
};

export default MessageVideoPlayer;
