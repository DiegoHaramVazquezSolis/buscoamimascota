import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import GlobalStyles from '../../../utils/GlobalStyles';
import styles from './styles';

const ContainedButton = ({ children = '', onPress = () => {}, size = '', style = {} }) => (
    <TouchableOpacity
        style={[ GlobalStyles.backgroundColorPrimary, size === 'sm' ? styles.containerSm : styles.containerMd, style]}
        onPress={onPress}
        activeOpacity={.6}>
        <Text style={size === 'sm' ? styles.contentSm : styles.contentMd}>{children}</Text>
    </TouchableOpacity>
);

export default ContainedButton;
