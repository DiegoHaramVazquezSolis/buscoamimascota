import { StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

import { DARK_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, PRIMARY_TEXT_COLOR, SECONDARY_TEXT_COLOR, ERROR_COLOR, DISABLED_COLOR } from './Constants';

export default GlobalStyles = StyleSheet.create({
    flex1: {
        flex: 1
    },
    row: {
        flexDirection: 'row'
    },
    rowReverse: {
        flexDirection: 'row-reverse'
    },
    alignSelfEnd: {
        alignSelf: 'flex-end'
    },
    col: {
        flexDirection: 'column'
    },
    justifyContentCenter: {
        justifyContent: 'center'
    },
    justifyContentSpaceAround: {
        justifyContent: 'space-around'
    },
    alignItemsCenter: {
        alignItems: 'center'
    },
    textAlignCenter: {
        textAlign: 'center'
    },
    backgroundColorDark: {
        backgroundColor: DARK_COLOR
    },
    backgroundColorPrimary: {
        backgroundColor: PRIMARY_COLOR
    },
    backgroundColorSecondary: {
        backgroundColor: SECONDARY_COLOR
    },
    colorPrimary: {
        color: PRIMARY_COLOR
    },
    colorSecondary: {
        color: SECONDARY_COLOR
    },
    colorTitleText: {
        color: PRIMARY_TEXT_COLOR
    },
    colorParagraphText: {
        color: SECONDARY_TEXT_COLOR
    },
    colorError: {
        color: ERROR_COLOR
    },
    colorDisabled: {
        color: DISABLED_COLOR
    },
    title: {
        color: PRIMARY_TEXT_COLOR,
        fontSize: 36,
        fontWeight: '500',
        textAlign: 'center'
    },
    paragraph: {
        color: SECONDARY_TEXT_COLOR,
        // Check visibility, may can change to 14
        fontSize: 16,
        fontWeight: '500'
    },
    mt12: {
        marginTop: heightPercentageToDP(1.65)
    },
    mt24: {
        marginTop: heightPercentageToDP(3.3)
    },
    mr8: {
        marginRight: widthPercentageToDP(1.09)
    },
    mr16: {
        marginRight: widthPercentageToDP(3.89)
    },
    customStackNavigatorHeaderStyle: {
        backgroundColor: PRIMARY_COLOR,
        height: heightPercentageToDP(10)
    }
});