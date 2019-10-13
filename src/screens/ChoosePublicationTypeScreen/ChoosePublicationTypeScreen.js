import React from 'react';
import { SafeAreaView, View } from 'react-native';

import GlobalStyles from '../../utils/GlobalStyles';
import styles from './styles';

import { PRIMARY_COLOR } from '../../utils/Constants';

import { heightPercentageToDP } from 'react-native-responsive-screen';

import ScreenTitle from '../../components/simple/ScreenTitle/ScreenTitle';
import CloseRightButton from '../../components/simple/CloseRightButton/CloseRightButton';

const ChoosePublicationTypeScreen = () => (
    <SafeAreaView style={GlobalStyles.flex1, GlobalStyles.alignItemsCenter}>
        <View style={styles.separator} />
        <ScreenTitle>
            Publicar
        </ScreenTitle>
    </SafeAreaView>
);

ChoosePublicationTypeScreen.navigationOptions = ({ navigation }) => ({
    title: '',
    headerStyle: {
        backgroundColor: PRIMARY_COLOR,
        height: heightPercentageToDP(10)
    },
    headerTintColor: '#fff',
    headerRight: () => <CloseRightButton onPress={() => navigation.pop()} />,
    headerBackTitle: null
});

export default ChoosePublicationTypeScreen;
