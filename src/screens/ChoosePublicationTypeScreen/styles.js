import { StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

import { PRIMARY_TEXT_COLOR, DARK_COLOR, SECONDARY_COLOR } from '../../utils/Constants';

export default styles = StyleSheet.create({
    separator: {
        marginTop: heightPercentageToDP(8)
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        maxWidth: '75%'
    },
    darkCard: {
        backgroundColor: DARK_COLOR,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    lightText: {
        color: '#FFF'
    },
    cardIconRight: {
        marginLeft: widthPercentageToDP(8),
        marginRight: widthPercentageToDP(4)
    },
    lightCard: {
        backgroundColor: SECONDARY_COLOR,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    darkText: {
        color: PRIMARY_TEXT_COLOR
    },
    cardIconLeft: {
        marginLeft: widthPercentageToDP(4),
        marginRight: widthPercentageToDP(8)
    }
});