import React from 'react';
import { TouchableOpacity } from 'react-native';

import styles from './styles';

const FloatingActionButton = ({ Icon = null, onPress = () => {}, mini = false }) => (
    <TouchableOpacity
        style={mini ? styles.containerMini : styles.container}
        activeOpacity={.6}
        onPress={onPress}>
            {mini ?
                <Icon height={24} width={24} />
                :
                <Icon height={36} width={36} />
            }
    </TouchableOpacity>
);

export default FloatingActionButton;
