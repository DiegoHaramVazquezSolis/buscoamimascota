import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

const ScreenTitle = ({ children = '' }) => (
    <Text style={styles.title}>
        {children}
    </Text>
);

export default ScreenTitle;
