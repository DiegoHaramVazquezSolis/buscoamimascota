import { StyleSheet } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
    containerSm: {
        borderRadius: 100,
        height: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4
    },
    containerMd: {
        borderRadius: 100,
        height: 48,
        width: widthPercentageToDP(46),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4
    },
    contentSm: {
        flex: 1,
        fontSize: 14,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '700',
        textAlignVertical: 'center',
        marginLeft: 16,
        marginRight: 16
    },
    contentMd: {
        flex: 1,
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '700',
        textAlignVertical: 'center'
    }
})