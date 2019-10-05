import { StyleSheet } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
    socialButton: {
        borderRadius: 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        width: widthPercentageToDP(75)
    },
    socialButtonText: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 16
    }
});