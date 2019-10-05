import React, { useState } from 'react';
import { TextInput } from 'react-native';

import { SECONDARY_TEXT_COLOR, PRIMARY_COLOR, DISABLED_COLOR } from '../../../utils/Constants';
import styles from './styles';

const CustomTextInput = ({ onChangeText = () => {}, onSubmitEditing = () => {}, placeholder = '', editable = true, secureTextEntry = false, reference = null }) => {
    const [Focus, setFocus] = useState(false);

    return (
        <TextInput
            ref={reference}
            onSubmitEditing={onSubmitEditing}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            secureTextEntry={secureTextEntry}
            editable={editable}
            placeholder={placeholder}
            onChangeText={onChangeText}
            style={[styles.textInput, { borderBottomColor: Focus ? PRIMARY_COLOR : DISABLED_COLOR }]}
            placeholderTextColor={SECONDARY_TEXT_COLOR} />
        )
};

export default CustomTextInput;
