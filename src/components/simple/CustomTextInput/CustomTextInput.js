import React from 'react';
import { TextInput } from 'react-native';

import { SECONDARY_TEXT_COLOR } from '../../../utils/Constants';
import styles from './styles';

const CustomTextInput = ({ onChangeText = () => {}, placeholder = '', editable = true }) => (
    <TextInput
        editable={editable}
        placeholder={placeholder}
        onChangeText={onChangeText}
        style={styles.textInput}
        placeholderTextColor={SECONDARY_TEXT_COLOR} />
);

export default CustomTextInput;
