import React from 'react';
import { TouchableOpacity } from 'react-native';

import styles from './styles';

const FloatingActionButton = ({ Icon = null, onPress = () => {} }) => (
    <TouchableOpacity
        style={styles.container}
        activeOpacity={.6}
        onPress={onPress}>
            <Icon height={36} width={36} />
    </TouchableOpacity>
);

export default FloatingActionButton;
