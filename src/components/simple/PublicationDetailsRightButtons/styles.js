import { StyleSheet } from 'react-native';

import { heightPercentageToDP } from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    iconContainer: {
        borderRadius: 100,
        height: heightPercentageToDP(6),
        width: heightPercentageToDP(6),
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 20,
        height: 20
    },
    iconSeparator: {
        marginRight: 4
    }
});