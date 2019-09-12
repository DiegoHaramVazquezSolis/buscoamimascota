import { StyleSheet } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';

import { SECONDARY_TEXT_COLOR, DARK_COLOR } from '../../utils/Constants';

export default styles = StyleSheet.create({
    filterField: {
        width: widthPercentageToDP(92),
        fontSize: 15,
        fontWeight: '700',
        color: SECONDARY_TEXT_COLOR,
        borderBottomColor: DARK_COLOR,
        borderBottomWidth: 1
    }
});