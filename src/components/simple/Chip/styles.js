import { StyleSheet } from 'react-native';
import { PRIMARY_TEXT_COLOR } from '../../../utils/Constants';

export default styles = StyleSheet.create({
    container: {
        borderColor: '#C4C4C4',
        borderWidth: 2,
        borderRadius: 100,
        maxHeight: 32
    },
    chipText: {
        fontSize: 12,
        fontWeight: '700',
        color: PRIMARY_TEXT_COLOR,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 8,
        marginRight: 8
    }
});