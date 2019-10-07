import { StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

import { PRIMARY_TEXT_COLOR, DISABLED_COLOR, SECONDARY_TEXT_COLOR } from '../../utils/Constants';

export default styles = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: '700',
        textAlign: 'center',
        color: PRIMARY_TEXT_COLOR,
        marginTop: heightPercentageToDP(5),
        marginLeft: widthPercentageToDP(6),
        marginRight: widthPercentageToDP(6)
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        width: widthPercentageToDP(92)
    },
    fieldContainer: {
        marginTop: heightPercentageToDP(3.28)
    },
    buttonContainer: {
        flexDirection: 'row-reverse',
        marginTop: heightPercentageToDP(4.82),
        marginRight: 16
    },
    dividier: {
        borderWidth: 1,
        borderColor: DISABLED_COLOR,
        borderRadius: 100,
        marginTop: heightPercentageToDP(3.28)
    },
    alternative: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
        color: SECONDARY_TEXT_COLOR,
        marginTop: heightPercentageToDP(3.28)
    },
    signInButtonContainer: {
        alignSelf: 'center',
        marginBottom: heightPercentageToDP(4)
    },
    socialMediaLoginOptions: {
        marginTop: heightPercentageToDP(4.82)
    }
});