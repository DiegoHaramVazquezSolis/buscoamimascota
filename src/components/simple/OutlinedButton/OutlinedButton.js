import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import styles from './styles';

const OutlinedButton = ({ onPress = () => {}, children = '', size = '' }) => (
    <TouchableOpacity
        style={[ styles.bordersStyles, size === 'sm' ? styles.containerSm : styles.containerMd ]}
        onPress={onPress}
        activeOpacity={.6}>
        <Text style={size === 'sm' ? styles.contentSm : styles.contentMd}>{children}</Text>
    </TouchableOpacity>
);

export default OutlinedButton;
