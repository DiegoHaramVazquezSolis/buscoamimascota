import { StyleSheet } from 'react-native';
import { PRIMARY_TEXT_COLOR } from '../../../utils/Constants';

export default styles = StyleSheet.create({
    container: {
        borderRadius: 100,
        maxHeight: 32,
        marginLeft: 8
    },
    chipText: {
        fontSize: 12,
        fontWeight: '700',
        color: PRIMARY_TEXT_COLOR,
        textAlignVertical: 'center',
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 16,
        marginRight: 16
    }
});