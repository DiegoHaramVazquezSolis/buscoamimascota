import React, { useState } from 'react';
import { TextInput } from 'react-native';

import { SECONDARY_TEXT_COLOR, PRIMARY_COLOR, DISABLED_COLOR } from '../../../utils/Constants';
import styles from './styles';

const CustomTextInput = ({ onChangeText = (text) => {}, onSubmitEditing = () => {}, placeholder = '', editable = true, secureTextEntry = false, reference = null, keyboardType = 'default', style = {}, multiline = false, numberOfLines = 1 }) => {
    const [Focus, setFocus] = useState(false);

    return (
        <TextInput
            keyboardType={keyboardType}
            ref={reference}
            onSubmitEditing={onSubmitEditing}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            secureTextEntry={secureTextEntry}
            editable={editable}
            placeholder={placeholder}
            onChangeText={onChangeText}
            style={[styles.textInput, style, { borderBottomColor: Focus ? PRIMARY_COLOR : DISABLED_COLOR }]}
            placeholderTextColor={SECONDARY_TEXT_COLOR}
            multiline={multiline}
            numberOfLines={numberOfLines} />
        )
};

export default CustomTextInput;
