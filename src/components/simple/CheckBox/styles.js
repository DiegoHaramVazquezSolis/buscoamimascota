import { StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

import { SECONDARY_TEXT_COLOR } from '../../../utils/Constants';

export default styles = StyleSheet.create({
    checkBoxContainer: {
        flexDirection: 'row',
        marginTop: heightPercentageToDP(3.3),
        width: widthPercentageToDP(92)
    },
    checkBoxLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: SECONDARY_TEXT_COLOR,
        textAlignVertical: 'center',
        marginLeft: 8
    }
});