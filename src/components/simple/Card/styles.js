import { StyleSheet } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        alignSelf: 'center',
        width: widthPercentageToDP(92),
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: .18,
        shadowRadius: 1,
        elevation: 1,
        flexDirection: 'row'
    },
});