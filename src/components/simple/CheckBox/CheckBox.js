import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import * as RNCCheckBox from '@react-native-community/checkbox';

import styles from './styles';
import { SECONDARY_COLOR } from '../../../utils/Constants';

const CheckBox = ({ value = '', label = '', disabled = false, onChange = () => {} }) => (
    <View style={styles.checkBoxContainer}>
        <RNCCheckBox
            disabled={disabled}
            tintColors={{ true: SECONDARY_COLOR }}
            value={value}
            onChange={onChange} />
        {disabled ?
            <Text style={styles.checkBoxLabel}>{label}</Text>
            :
            <TouchableWithoutFeedback onPress={onChange}>
                <Text style={styles.checkBoxLabel}>{label}</Text>
            </TouchableWithoutFeedback>
        }
    </View>
);

export default CheckBox;
