import { StyleSheet } from 'react-native';

import { PRIMARY_COLOR } from '../../../utils/Constants';

export default styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        height: 56,
        width: 56,
        borderRadius: 100,
        backgroundColor: PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6
    }
});