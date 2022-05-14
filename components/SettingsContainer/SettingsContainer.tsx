import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import Colors from '../../constants/Colors';
import SettingsButton, {
  SettingsButtonProps,
} from '../SettingsButton/SettingsButton';

interface SettingsContainerProps {
  options: Array<SettingsButtonProps>;
}

const SettingsContainer: React.FunctionComponent<SettingsContainerProps> = ({
  options,
}) => {
  return (
    <View style={styles.container}>
      {options.map((option: SettingsButtonProps) => (
        <SettingsButton
          text={option.text}
          icon={option.icon}
          iconColor={option.iconColor}
          type={option.type}
        />
      ))}
    </View>
  );
};
export default SettingsContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkGray,
    borderRadius: 5,
    marginVertical: 5,
  },
});
