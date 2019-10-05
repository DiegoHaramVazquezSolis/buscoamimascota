import { StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

import { PRIMARY_TEXT_COLOR, SECONDARY_TEXT_COLOR, PRIMARY_COLOR, DISABLED_COLOR } from '../../utils/Constants';

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
        justifyContent: 'center'
    },
    signInButtonContainer: {
        alignSelf: 'center',
        marginBottom: heightPercentageToDP(4)
    },
    advertismentContainer: {
        width: widthPercentageToDP(90),
        marginTop: heightPercentageToDP(.82)
    },
    advertismentText: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
        lineHeight: 19,
        color: SECONDARY_TEXT_COLOR
    },
    link: {
        color: PRIMARY_COLOR
    },
    dividier: {
        borderWidth: 1,
        borderColor: DISABLED_COLOR,
        borderRadius: 100,
        marginTop: heightPercentageToDP(3.28)
    },
    haveAccount: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
        color: SECONDARY_TEXT_COLOR,
        marginTop: heightPercentageToDP(3.28)
    }
});