import { StyleSheet } from 'react-native';
import { PRIMARY_TEXT_COLOR } from '../../../utils/Constants';

export default styles = StyleSheet.create({
    container: {
        borderRadius: 100,
        marginLeft: 8,
        justifyContent: 'center'
    },
    chipText: {
        fontSize: 12,
        fontWeight: '700',
        color: PRIMARY_TEXT_COLOR,
        textAlignVertical: 'center',
        marginLeft: 16,
        marginRight: 16
    }
});