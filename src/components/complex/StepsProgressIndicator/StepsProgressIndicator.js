import React from 'react';
import { View } from 'react-native';

import { PRIMARY_COLOR } from './../../../utils/Constants';
import styles from './styles';

const StepsProgressIndicator = ({ steps, currentIndex }) => {
    let progressIcons = [];
    for (let index = 0; index < steps; index++) {
        progressIcons.push(
            <View
                key={`progress-indicator-${index}`}
                style={[ styles.indicator, { backgroundColor: currentIndex === index ? PRIMARY_COLOR : 'rgba(72, 158, 186, .5)' } ]} />
        );
    }
    return progressIcons;
}

export default StepsProgressIndicator;
