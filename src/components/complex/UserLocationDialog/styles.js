import { StyleSheet } from 'react-native';

import { PRIMARY_COLOR, SECONDARY_TEXT_COLOR } from '../../../utils/Constants';

export default styles = StyleSheet.create({
    pickerStyle: {
        borderBottomWidth: 2,
        borderBottomColor: PRIMARY_COLOR
    },
    footerInfo: {
        marginTop: 24,
        fontSize: 14,
        color: SECONDARY_TEXT_COLOR,
        fontWeight: '700',
        letterSpacing: .2
    },
    buttonContainer: {
        marginTop: 12,
        alignSelf: 'flex-end'
    }
});