import React from 'react';
import { Text } from 'react-native';

import styles from './styles';

const ScreenSubtitle = ({ children }) => (
    <Text style={styles.subtitle}>
        {children}
    </Text>
);

export default ScreenSubtitle;
