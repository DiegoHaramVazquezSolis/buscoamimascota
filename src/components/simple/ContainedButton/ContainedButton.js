import React from 'react';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import GlobalStyles from '../../../utils/GlobalStyles';
import styles from './styles';

const ContainedButton = ({ children = '', onPress = () => {}, size = '' }) => (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={[ GlobalStyles.backgroundColorPrimary, size === 'sm' ? styles.containerSm : styles.containerMd ]}>
            <Text style={size === 'sm' ? styles.contentSm : styles.contentMd}>{children}</Text>
        </View>
    </TouchableWithoutFeedback>
);

export default ContainedButton;
