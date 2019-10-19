import { StyleSheet } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
    menuOverlay: {
        flex: 1,
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(100)
    },
    container: {
        position: 'absolute',
        borderRadius: 4,
        width: widthPercentageToDP(60),
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