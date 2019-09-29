import React from 'react';
import { TouchableWithoutFeedback, View, Text } from 'react-native';

import styles from './styles';
import { returnTextBasedOnMaxLengthWithLimit } from '../../../utils/Utils';
import { DISABLED_COLOR } from '../../../utils/Constants';

const Chip = ({ onPress = () => {}, children = '', maxLength = 0, limit = 0, tag = false }) => (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.container, { backgroundColor: tag ? '#C4C4C4' : '' }]}>
                <Text style={styles.chipText}>{returnTextBasedOnMaxLengthWithLimit(children, maxLength, limit)}</Text>
            </View>
        </TouchableWithoutFeedback>
);

export default Chip;
