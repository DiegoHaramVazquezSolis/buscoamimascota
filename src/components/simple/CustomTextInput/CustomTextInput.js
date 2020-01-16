import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

import { SECONDARY_TEXT_COLOR, PRIMARY_COLOR, DISABLED_COLOR } from '../../../utils/Constants';
import styles from './styles';
import GlobalStyles from '../../../utils/GlobalStyles';

const CustomTextInput = ({ onChangeText = (text) => {}, onSubmitEditing = () => {}, placeholder = '', editable = true, secureTextEntry = false, reference = null, keyboardType = 'default', style = {}, multiline = false, numberOfLines = 1, Icon = null, returnKeyType = 'done' }) => {
    const [Focus, setFocus] = useState(false);

    if (!Icon) {
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
                numberOfLines={numberOfLines}
                returnKeyType={returnKeyType} />
        );
    } else {
        return (
            <View style={GlobalStyles.row}>
                <View style={[GlobalStyles.justifyContentCenter, GlobalStyles.mr16]}>
                    <Icon height={32} width={32} />
                </View>
                <View>
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
                        numberOfLines={numberOfLines}
                        returnKeyType={returnKeyType} />
                </View>
            </View>
        );
    }
};

export default CustomTextInput;
