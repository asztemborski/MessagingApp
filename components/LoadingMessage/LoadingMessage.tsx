import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

const LoadingMessage: React.FunctionComponent = () => {
  const RandomWidth = Math.floor(Math.random() * (60 - 10)) + 10;
  const RandomHeight = Math.floor(Math.random() * (60 - 30) + 30);
  const isMine = Math.random() < 0.5;
  return (
    <View style={[styles.container]}>
      <View style={styles.image} />
      <View
        style={[
          styles.textContainer,
          {
            width: `${RandomWidth}%`,
            height: RandomHeight,
            marginLeft: isMine ? 'auto' : 10,
          },
        ]}></View>
    </View>
  );
};

export default LoadingMessage;
