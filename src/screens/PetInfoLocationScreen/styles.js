import { StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
    separator: {
        marginTop: heightPercentageToDP(8)
    },
    map: {
        height: heightPercentageToDP(56),
        width: widthPercentageToDP(100)
    }
});