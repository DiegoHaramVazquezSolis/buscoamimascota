import { StyleSheet } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

import { PRIMARY_TEXT_COLOR, SECONDARY_TEXT_COLOR } from '../../../utils/Constants';

const CARD_HEIGHT = heightPercentageToDP(20);

export default styles = StyleSheet.create({
    card: {
        marginTop: 12,
        height: CARD_HEIGHT
    },
    image: {
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        height: CARD_HEIGHT,
        width: widthPercentageToDP(38),
        resizeMode: 'cover'
    },
    interactionContainer: {
        height: CARD_HEIGHT,
        justifyContent: 'space-between',
        marginLeft: widthPercentageToDP(2),
        marginRight: widthPercentageToDP(4)
    },
    name: {
        color: PRIMARY_TEXT_COLOR,
        fontSize: 18,
        fontWeight: '700',
        textAlignVertical: 'center',
        letterSpacing: .02,
        marginTop: heightPercentageToDP(1.5),
        marginLeft: widthPercentageToDP(2),
        width: widthPercentageToDP(45)
    },
    descriptionContainer: {
        height: heightPercentageToDP(8)
    },
    description: {
        color: SECONDARY_TEXT_COLOR,
        fontSize: 12,
        fontWeight: '700',
        marginTop: heightPercentageToDP(1),
        marginLeft: widthPercentageToDP(2),
        width: widthPercentageToDP(45)
    },
    actionsContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 4,
        justifyContent: 'space-between',
        width: widthPercentageToDP(54)
    },
    iconsContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginRight: widthPercentageToDP(4)
    },
    shareIcon: {
        height: 30,
        width: 24,
        alignSelf: 'center',
        marginRight: widthPercentageToDP(2)
    },
    optionIcon: {
        height: 36,
        width: 24
    },
    menuOptionsStyle: {
        fontSize: 16
    },
    reportStyle: {
        color: '#FF0000',
        fontWeight: '100'
    }
});