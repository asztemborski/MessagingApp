import React, {ReactNode} from 'react';
import {Text, View} from 'react-native';
import {Switch} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import Colors from '../../constants/Colors';

interface SettingsButtonProps {
  text: string;
  icon: ReactNode;
  iconColor: string;
  type?: 'switch' | 'normal' | 'navigate';
}

const SettingsButton: React.FunctionComponent<SettingsButtonProps> = ({
  text,
  icon,
  iconColor,
  type,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <View style={[styles.iconContainer, {backgroundColor: iconColor}]}>
          {icon}
        </View>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.rightContent}>
        {type === 'navigate' && (
          <MaterialIcons
            name="keyboard-arrow-right"
            size={20}
            color={'white'}
          />
        )}
        {type === 'switch' && (
          <Switch
            style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}], left: 5}}
            value={true}
            thumbColor={'white'}
            trackColor={{false: Colors.background, true: Colors.green}}
          />
        )}
      </View>
    </View>
  );
};
export default SettingsButton;
