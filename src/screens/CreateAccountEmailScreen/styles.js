import { StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

import { PRIMARY_TEXT_COLOR, SECONDARY_TEXT_COLOR, PRIMARY_COLOR } from '../../utils/Constants';

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
    fieldContainer: {
        marginTop: heightPercentageToDP(3.28)
    },
    advertismentContainer: {
        width: widthPercentageToDP(90),
        marginTop: heightPercentageToDP(4.82),
        marginBottom: heightPercentageToDP(3.28)
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
    buttonContainer: {
        flexDirection: 'row-reverse',
        marginRight: 16
    }
});