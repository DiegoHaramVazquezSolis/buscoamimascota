import React from 'react';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

import { View } from 'react-native';
import { PRIMARY_COLOR } from '../../../utils/Constants';

const Grid = ({ show }) => ( show ?
    <View style={{ flex: 1, flexDirection: 'row', position: 'absolute' }}>
        <View style={{ height: heightPercentageToDP('100%'), width: widthPercentageToDP(4), backgroundColor: PRIMARY_COLOR }} />
        <View style={{ height: heightPercentageToDP('100%'), width: widthPercentageToDP(20), backgroundColor: 'rgba(255, 0, 0, .1)' }} />
        <View style={{ height: heightPercentageToDP('100%'), width: widthPercentageToDP(4), backgroundColor: 'rgba(112, 196, 196, .25)' }} />

        <View style={{ height: heightPercentageToDP('100%'), width: widthPercentageToDP(20), backgroundColor: 'rgba(255, 0, 0, .1)' }} />
        <View style={{ height: heightPercentageToDP('100%'), width: widthPercentageToDP(4), backgroundColor: 'rgba(112, 196, 196, .25)' }} />

        <View style={{ height: heightPercentageToDP('100%'), width: widthPercentageToDP(20), backgroundColor: 'rgba(255, 0, 0, .1)' }} />
        <View style={{ height: heightPercentageToDP('100%'), width: widthPercentageToDP(4), backgroundColor: 'rgba(112, 196, 196, .25)' }} />

        <View style={{ height: heightPercentageToDP('100%'), width: widthPercentageToDP(20), backgroundColor: 'rgba(255, 0, 0, .1)' }} />
        <View style={{ height: heightPercentageToDP('100%'), width: widthPercentageToDP(4), backgroundColor: PRIMARY_COLOR }} />
    </View>
    :
    null
)

export default Grid;
