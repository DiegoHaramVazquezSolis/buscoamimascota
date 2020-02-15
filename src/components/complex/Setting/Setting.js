import React from 'react';
import { TouchableWithoutFeedback, View, Text, Switch } from 'react-native';

import { SECONDARY_COLOR, PRIMARY_COLOR } from '../../../utils/Constants';

import GlobalStyles from '../../../utils/GlobalStyles';
import styles from './styles';

const Setting = ({ children, value, onValueChange }) => {
    return (
        <TouchableWithoutFeedback onPress={() => onValueChange(!value)}>
            <View style={[GlobalStyles.row, GlobalStyles.justifyContentSpaceBetween]}>
                <Text style={[GlobalStyles.colorParagraphText, GlobalStyles.ml24, GlobalStyles.mt12, styles.settingTitle]}>
                    {children}
                </Text>
                <Switch
                    value={value}
                    onValueChange={onValueChange}
                    style={GlobalStyles.ml24}
                    thumbColor={SECONDARY_COLOR}
                    trackColor={PRIMARY_COLOR} />
            </View>
        </TouchableWithoutFeedback>
    );
}

export default Setting;
