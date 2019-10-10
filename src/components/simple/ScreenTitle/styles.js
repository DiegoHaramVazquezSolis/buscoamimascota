import { StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

import { PRIMARY_TEXT_COLOR } from '../../../utils/Constants';

export default styles = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: '700',
        textAlign: 'center',
        color: PRIMARY_TEXT_COLOR,
        marginTop: heightPercentageToDP(5),
        marginLeft: widthPercentageToDP(6),
        marginRight: widthPercentageToDP(6)
    }
});