import { StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

import { SECONDARY_TEXT_COLOR, PRIMARY_TEXT_COLOR } from '../../../utils/Constants';

export default styles = StyleSheet.create({
    dialogContainer: {
        height: heightPercentageToDP(100),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, .7)'
    },
    dialog: {
        width: widthPercentageToDP(88),
        backgroundColor: '#FFF',
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24
    },
    contentContainer: {
        alignSelf: 'center',
        marginBottom: 32,
        marginLeft: widthPercentageToDP(5.7),
        marginRight: widthPercentageToDP(5.7)
    },
    closeIconContainer: {
        flexDirection: 'row-reverse',
        marginRight: widthPercentageToDP(3.9)
    },
    close: {
        fontSize: 22,
        letterSpacing: .2,
        fontWeight: '700',
        color: '#000'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: widthPercentageToDP(3.9)
    },
    title: {
        fontSize: 24,
        letterSpacing: .2,
        fontWeight: '700',
        color: PRIMARY_TEXT_COLOR
    },
    description: {
        fontSize: 18,
        letterSpacing: .2,
        color: SECONDARY_TEXT_COLOR,
        marginTop: 15,
        marginBottom: 18
    }
});