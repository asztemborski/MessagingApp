import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import Colors from '../../constants/Colors';
import SettingsButton from '../SettingsButton/SettingsButton';

export type Option = {
  text: string;
  icon: ReactNode;
  iconColor: string;
  type?: 'normal' | 'switch' | 'navigate';
};

interface SettingsContainerProps {
  options: Array<Option>;
}

const SettingsContainer: React.FunctionComponent<SettingsContainerProps> = ({
  options,
}) => {
  return (
    <View style={styles.container}>
      {options.map((option: Option) => (
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
