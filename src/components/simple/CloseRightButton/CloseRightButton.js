import React from 'react';
import { View, TouchableHighlight } from 'react-native';

import styles from './styles';

import Assets from '../../../../assets/Assets';

const CloseRightButton = ({ onPress = () => {} }) => (
    <View style={styles.container}>
        <TouchableHighlight
            onPress={onPress}
            underlayColor='rgba(0, 0, 0, .1)'
            style={styles.iconContainer}>
            <Assets.svg.CloselIcon
                fill='#FFF'
                style={styles.icon} />
        </TouchableHighlight>
        <View style={styles.iconSeparator} />
    </View>
);

export default CloseRightButton;
