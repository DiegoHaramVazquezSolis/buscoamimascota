import { StyleSheet } from 'react-native';

import { PRIMARY_COLOR, SECONDARY_TEXT_COLOR } from '../../../utils/Constants';
import { heightPercentageToDP } from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
    radioButton: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: PRIMARY_COLOR,
        height: heightPercentageToDP(5),
        width: heightPercentageToDP(5),
        marginRight: 8
    },
    label: {
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: .2,
        color: SECONDARY_TEXT_COLOR,
        textAlignVertical: 'center'
    }
});