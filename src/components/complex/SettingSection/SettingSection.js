import React from 'react';
import { View, Text } from 'react-native';

import GlobalStyles from '../../../utils/GlobalStyles';
import styles from './styles';

const SettingSection = ({ title, children, firstChild = false, style = {} }) => (
    <View style={style}>
        <Text style={[GlobalStyles.colorTitleText, GlobalStyles.ml12, firstChild ? GlobalStyles.mt12 : GlobalStyles.mt16, styles.sectionTitle]}>
            {title}
        </Text>
        {children}
    </View>
);

export default SettingSection;
