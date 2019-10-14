import { StyleSheet } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
    publicationTypeCard: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 4,
        height: heightPercentageToDP(28),
        width: widthPercentageToDP(92),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        marginTop: heightPercentageToDP(2.74),
        paddingRight: 16,
        paddingLeft: 16
    }
});