import { StyleSheet } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

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
    justifyContentSpaceBetween: {
        justifyContent: 'space-between'
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
        fontWeight: '700'
    },
    mt8: {
        marginTop: 8
    },
    mr8: {
        marginRight: 8
    },
    ml8: {
        marginLeft: 8
    },
    mt12: {
        marginTop: 12
    },
    mr12: {
        marginRight: 12
    },
    ml12: {
        marginLeft: 12
    },
    mt16: {
        marginTop: 16
    },
    mr16: {
        marginRight: 16
    },
    ml16: {
        marginLeft: 16
    },
    mt24: {
        marginTop: 24
    },
    mr24: {
        marginRight: 24
    },
    ml24: {
        marginLeft: 24
    },
    customStackNavigatorHeaderStyle: {
        backgroundColor: PRIMARY_COLOR
    },
    link: {
        color: PRIMARY_COLOR,
        fontWeight: '700'
    }
});