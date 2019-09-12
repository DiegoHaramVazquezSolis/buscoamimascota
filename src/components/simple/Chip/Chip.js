import React from 'react';
import { TouchableWithoutFeedback, View, Text } from 'react-native';

import styles from './styles';
import { returnTextBasedOnMaxLengthWithLimit } from '../../../utils/Utils';

const Chip = ({ onPress = () => {}, children = '', maxLength = 0, limit = 0 }) => (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <Text style={styles.chipText}>{returnTextBasedOnMaxLengthWithLimit(children, maxLength, limit)}</Text>
            </View>
        </TouchableWithoutFeedback>
);

export default Chip;
