import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
import styles from './styles';

const TextButton = ({ onPress = () => {}, children = '' }) => {
    return (
        <TouchableHighlight underlayColor='rgba(0, 0, 0, .1)' onPress={onPress}>
            <Text style={styles.textButton}>{children}</Text>
        </TouchableHighlight>
    );
}

export default TextButton;
