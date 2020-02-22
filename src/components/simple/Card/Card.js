import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

import styles from './styles';

const Card = ({ children = <View />, style = {}, onPress = null }) => {
    return (
        <TouchableWithoutFeedback
            disabled={!onPress}
            onPress={onPress}>
            <View style={[styles.card, style]}>
                {children}
            </View>
        </TouchableWithoutFeedback>
    );
}

export default Card;
