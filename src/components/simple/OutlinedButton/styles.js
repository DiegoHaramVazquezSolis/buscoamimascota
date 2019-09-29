import { StyleSheet } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';

import { PRIMARY_COLOR, PRIMARY_TEXT_COLOR } from '../../../utils/Constants';

export default styles = StyleSheet.create({
    bordersStyles: {
        borderColor: PRIMARY_COLOR,
        borderWidth: 2,
        borderRadius: 100
    },
    containerSm: {
        height: 36
    },
    containerMd: {
        height: 48,
        width: widthPercentageToDP(40)
    },
    contentSm: {
        flex: 1,
        fontSize: 14,
        color: PRIMARY_TEXT_COLOR,
        textAlign: 'center',
        fontWeight: '700',
        textAlignVertical: 'center',
        marginLeft: 16,
        marginRight: 16
    },
    contentMd: {
        flex: 1,
        fontSize: 16,
        color: PRIMARY_TEXT_COLOR,
        textAlign: 'center',
        fontWeight: '700',
        textAlignVertical: 'center'
    }
});