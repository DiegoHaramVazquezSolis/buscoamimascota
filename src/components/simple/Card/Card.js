import React from 'react';
import { View, ViewPropTypes } from 'react-native';

import styles from './styles';

const Card = ({ children = <View />, style = {} }) => {
    return (
        <View style={[styles.card, style]}>
            {children}
        </View>
    );
}

export default Card;
