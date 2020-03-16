import { StyleSheet } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
    carouselHeight: {
        height: heightPercentageToDP(80)
    },
    flexGrow1: {
        flexGrow: 1
    },
    iconStyle: {
        marginBottom: 8,
    },
    screenContainer: {
        marginTop: heightPercentageToDP(100) * .05,
        width: widthPercentageToDP(100)
    },
    marginDescription: {
        marginTop: '.82%'
    },
    description: {
        maxWidth: widthPercentageToDP(92)
    }
});