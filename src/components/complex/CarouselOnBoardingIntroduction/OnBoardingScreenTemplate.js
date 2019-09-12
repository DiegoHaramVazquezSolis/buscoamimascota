import React from 'react';
import { View, Text } from 'react-native';

import GlobalStyles from '../../../utils/GlobalStyles';
import styles from './styles';

const OnBoardingScreenTemplate = ({ Icon = () => {}, title = '', description = '' }) => (
    <View style={[ GlobalStyles.col, GlobalStyles.justifyContentCenter, GlobalStyles.alignItemsCenter, styles.screenContainer ]}>
        <View>
            <Icon style={styles.iconStyle} />
        </View>
        <Text style={GlobalStyles.title}>{title}</Text>
        <View style={styles.marginDescription}>
            <Text style={[ GlobalStyles.paragraph, GlobalStyles.textAlignCenter, styles.description ]}>
                {description}
            </Text>
        </View>
    </View>
);

export default OnBoardingScreenTemplate;
