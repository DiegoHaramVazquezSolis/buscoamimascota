import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';
import GlobalStyles from '../../../utils/GlobalStyles';
import { SECONDARY_COLOR } from '../../../utils/Constants';

const RadioButton = ({ selected = false, label = '', onPress = (label) => {}, lastChild = false }) => (
    <TouchableOpacity
        style={[GlobalStyles.row, { marginRight: !lastChild ? 24 : 0 }]}
        activeOpacity={.6}
        onPress={(e) => onPress(label)}>
        <View style={[styles.radioButton, { backgroundColor: selected ? SECONDARY_COLOR : 'transparent' }]} />
        <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
);

export default RadioButton;
