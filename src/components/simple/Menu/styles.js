import { StyleSheet } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
    menuOverlay: {
        flex: 1,
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(100),
        backgroundColor: 'rgba(0, 0, 0, .4)',
        justifyContent: 'center'
    },
    container: {
        alignSelf: 'center',
        borderRadius: 4,
        width: widthPercentageToDP(80),
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8
    }
});