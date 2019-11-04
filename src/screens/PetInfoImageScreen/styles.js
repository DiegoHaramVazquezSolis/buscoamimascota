import { StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { DARK_COLOR } from '../../utils/Constants';

export default styles = StyleSheet.create({
    separator: {
        marginTop: heightPercentageToDP(8)
    },
    imagePickerContainer: {
        borderRadius: 4,
        backgroundColor: DARK_COLOR,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        height: heightPercentageToDP(30.7),
        width: widthPercentageToDP(64)
    },
    imagePicker: {
        borderRadius: 4,
        resizeMode: 'cover',
        height: heightPercentageToDP(30.7),
        width: widthPercentageToDP(64)
    },
    imagePickerText: {
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: .2,
        textAlign: 'center',
        color: '#FFF',
        maxWidth: '90%'
    }
});