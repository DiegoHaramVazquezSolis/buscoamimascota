import { StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

import { SECONDARY_TEXT_COLOR } from '../../../utils/Constants';

export default styles = StyleSheet.create({
    subtitle: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        color: SECONDARY_TEXT_COLOR,
        marginTop: heightPercentageToDP(2.5),
        maxWidth: widthPercentageToDP(92)
    }
});