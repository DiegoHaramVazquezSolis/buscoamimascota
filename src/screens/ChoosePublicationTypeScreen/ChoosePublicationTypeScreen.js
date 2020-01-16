import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';

import GlobalStyles from '../../utils/GlobalStyles';
import styles from './styles';
import { PRIMARY_COLOR, PET_INFO_FORM_SCREEN } from '../../utils/Constants';
import Assets from '../../../assets/Assets';

import { heightPercentageToDP } from 'react-native-responsive-screen';
import { translate } from '../../services/i18n';

import ScreenTitle from '../../components/simple/ScreenTitle/ScreenTitle';
import CloseRightButton from '../../components/simple/CloseRightButton/CloseRightButton';
import ScreenSubtitle from '../../components/simple/ScreenSubtitle/ScreenSubtitle';
import PublicationTypeCard from '../../components/simple/PublicationTypeCard/PublicationTypeCard';

const ChoosePublicationTypeScreen = ({ navigation }) => (
    <SafeAreaView style={GlobalStyles.flex1, GlobalStyles.alignItemsCenter}>
        <View style={styles.separator} />
        <ScreenTitle>
            {translate('ChoosePublicationTypeScreen.title')}
        </ScreenTitle>
        <ScreenSubtitle>
            {translate('ChoosePublicationTypeScreen.subtitle')}
        </ScreenSubtitle>
        <PublicationTypeCard style={styles.darkCard} onPress={() => navigation.navigate(PET_INFO_FORM_SCREEN, { losted: true })}>
            <Text style={[styles.cardTitle, styles.lightText]}>
                {translate('ChoosePublicationTypeScreen.lostedPetTitle')}
            </Text>
            <Assets.svg.CartelIcon style={styles.cardIconRight} />
        </PublicationTypeCard>
        <PublicationTypeCard style={styles.lightCard} onPress={() => navigation.navigate(PET_INFO_FORM_SCREEN, { losted: false })}>
            <Assets.svg.AdoptionIcon style={styles.cardIconLeft} />
            <Text style={[styles.cardTitle, styles.darkText]}>
                {translate('ChoosePublicationTypeScreen.adoptionPetTitle')}
            </Text>
        </PublicationTypeCard>
    </SafeAreaView>
);

ChoosePublicationTypeScreen.navigationOptions = ({ navigation }) => ({
    title: '',
    headerStyle: {
        backgroundColor: PRIMARY_COLOR,
        height: heightPercentageToDP(10)
    },
    headerTintColor: '#fff',
    headerRight: () => <CloseRightButton onPress={() => navigation.dismiss()} />,
    headerBackTitle: null
});

export default ChoosePublicationTypeScreen;
