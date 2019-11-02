import { StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

import { SECONDARY_TEXT_COLOR } from '../../utils/Constants';

export default styles = StyleSheet.create({
    separator: {
        marginTop: heightPercentageToDP(8)
    },
    formContainer: {
        marginTop: heightPercentageToDP(3.5),
        marginBottom: 20
    },
    textInput: {
        width: widthPercentageToDP(65)
    },
    smallText: {
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: .2,
        color: SECONDARY_TEXT_COLOR,
        maxWidth: widthPercentageToDP(92)
    }
});