import { StyleSheet } from 'react-native';

import { PRIMARY_TEXT_COLOR } from '../../../utils/Constants';

export default styes = StyleSheet.create({
    listItem: {
        width: '100%',
        flexDirection: 'row'
    },
    iconContainer: {
        marginLeft: 8,
        alignSelf: 'center'
    },
    contentContainer: {
        marginLeft: 12,
        marginTop: 16,
        marginBottom: 16
    },
    contentText: {
        textAlignVertical: 'center',
        color: PRIMARY_TEXT_COLOR,
        fontSize: 18,
        letterSpacing: .2
    }
});