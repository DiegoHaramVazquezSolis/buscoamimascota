import { StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

import { SECONDARY_TEXT_COLOR } from '../../utils/Constants';

export default styles = StyleSheet.create({
    imageStyle: {
        marginTop: heightPercentageToDP(10),
        resizeMode: 'cover',
        borderRadius: 4,
        height: heightPercentageToDP(30.7),
        width: widthPercentageToDP(64)
    },
    buttoToolbar: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: heightPercentageToDP(1.65)
    },
    buttonSeparator: {
        width: widthPercentageToDP(3.3)
    },
    chipsContainer: {
        maxHeight: 32,
        marginTop: heightPercentageToDP(3.3),
        justifyContent: 'center'
    },
    descriptionContainer: {
        marginTop: heightPercentageToDP(1.65),
        width: widthPercentageToDP(92)
    },
    description: {
        fontSize: 14,
        fontWeight: '700',
        color: SECONDARY_TEXT_COLOR
    },
    checkBoxContainer: {
        flexDirection: 'row',
        marginTop: heightPercentageToDP(3.3),
        width: widthPercentageToDP(92)
    },
    checkBoxLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: SECONDARY_TEXT_COLOR,
        textAlignVertical: 'center',
        marginLeft: 8
    }
});