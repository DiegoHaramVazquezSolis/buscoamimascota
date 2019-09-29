import React from 'react';
import { View, TouchableHighlight } from 'react-native';

import styles from './styles';
import Assets from '../../../../assets/Assets';

const PublicationDetailsRightButtons = ({ onShareIconPress = () => {}, onMoreOptionsIconPress = () => {} }) => (
    <View style={styles.container}>
        <TouchableHighlight
            onPress={onShareIconPress}
            underlayColor='rgba(0, 0, 0, .1)'
            style={styles.iconContainer}>
            <Assets.svg.ShareIcon
                fill='#FFF'
                style={styles.icon} />
        </TouchableHighlight>
        <View style={styles.iconSeparator} />
        <TouchableHighlight
            onPress={onMoreOptionsIconPress}
            underlayColor='rgba(0, 0, 0, .1)'
            style={styles.iconContainer}>
            <Assets.svg.MoreOptionsIcon
                fill='#FFF'
                style={styles.icon} />
        </TouchableHighlight>
        <View style={styles.iconSeparator} />
    </View>
);

export default PublicationDetailsRightButtons;
