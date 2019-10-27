import React from 'react';
import { View } from 'react-native';

import styles from './styles';

import RadioButton from '../../simple/RadioButton/RadioButton';

const RadioGroup = ({ selected = '', options = [], onChangeSelection = (option) => {} }) => (
    <View style={styles.container}>
        {options.map((option, index) => (
            <RadioButton
                key={`radio-button-${option}-${index}`}
                selected={selected === option}
                label={option}
                onPress={onChangeSelection}
                lastChild={index === options.length - 1} />
        ))}
    </View>
);

export default RadioGroup;
