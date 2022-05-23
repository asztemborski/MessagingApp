import React from 'react';
import {Text, TextInput, View} from 'react-native';

interface Props {
  defaultValue: any;
  text: string;
  onInputChange?: (value: string) => void;
  value?: string;
}

const ProfileSettingsInput: React.FunctionComponent<Props> = ({
  defaultValue,
  text,
  value,
  onInputChange,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        borderColor: 'gray',
      }}>
      <Text style={{color: 'gray'}}>{text}</Text>
      <TextInput
        style={{color: 'white'}}
        defaultValue={defaultValue}
        value={value}
        onChangeText={onInputChange}
      />
    </View>
  );
};

export default ProfileSettingsInput;
