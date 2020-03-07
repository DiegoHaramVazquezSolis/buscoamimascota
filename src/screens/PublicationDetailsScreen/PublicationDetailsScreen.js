import React, { useEffect, useState } from 'react';
import { BackHandler, SafeAreaView, Image, View, ScrollView, TextInput } from 'react-native';

import styles from './styles';
import GlobalStyles from '../../utils/GlobalStyles';

import { PRIMARY_COLOR, PUBLICATION_DETAILS_LOCATION_SCREEN, LOSTED_PUBLICATIONS_LIST_SCREEN, ADOPTION_PUBLICATIONS_LIST_SCREEN } from '../../utils/Constants';

import { translate } from '../../services/i18n';

import ContainedButton from '../../components/simple/ContainedButton/ContainedButton';
import OutlinedButton from '../../components/simple/OutlinedButton/OutlinedButton';
import Chip from '../../components/simple/Chip/Chip';
import PublicationDetailsRightButtons from '../../components/simple/PublicationDetailsRightButtons/PublicationDetailsRightButtons';
import CheckBox from '../../components/simple/CheckBox/CheckBox';
import PublicationContactDialog from '../../components/complex/PublicationContactDialog/PublicationContactDialog';

const PublicationDetailsScreen = ({ navigation }) => {
    const [openContactDialog, setOpenContactDialog] = useState(false);

    const { image, location, name, specie, sex, description, losted, haveId, contact } = navigation.state.params;

    useEffect(() => {
        const backButonHandler = BackHandler.addEventListener('hardwareBackPress', androidBackButonHandler);

        return () => {
            backButonHandler.remove();
        };
    }, []);

    const androidBackButonHandler = () => {
        navigation.navigate(losted ? LOSTED_PUBLICATIONS_LIST_SCREEN : ADOPTION_PUBLICATIONS_LIST_SCREEN);

        return true;
    }

    return (
        <SafeAreaView style={[GlobalStyles.flex1, GlobalStyles.alignItemsCenter]}>
            <Image
                style={styles.imageStyle}
                source={{ uri: image }} />
            <View style={styles.buttoToolbar}>
                <OutlinedButton
                    size='sm'
                    onPress={() => navigation.navigate(PUBLICATION_DETAILS_LOCATION_SCREEN, { location, name, losted })}>
                    {losted ?
                        translate('PublicationDetailsScreen.lostedLocationButton')
                        :
                        translate('PublicationDetailsScreen.adoptionLocationButton')
                    }
                </OutlinedButton>
                <View style={styles.buttonSeparator} />
                <ContainedButton
                    size='sm'
                    onPress={() => setOpenContactDialog(true)}>
                    {translate('PublicationDetailsScreen.contactButton')}
                </ContainedButton>
            </View>
            <View style={styles.chipsContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}>
                    <Chip tag>{specie === 'dog' ? translate('PublicationDetailsScreen.dog') : translate('PublicationDetailsScreen.cat')}</Chip>
                    <Chip tag>{sex}</Chip>
                    <Chip tag>{losted ? translate('PublicationDetailsScreen.losted') : translate('PublicationDetailsScreen.adoption')}</Chip>
                </ScrollView>
            </View>
            <View style={styles.descriptionContainer}>
                <ScrollView>
                    <TextInput
                        style={styles.description}
                        editable={false}
                        multiline
                        value={description} />
                </ScrollView>
            </View>
            <CheckBox
                disabled
                label={translate('PublicationDetailsScreen.haveIdLabel')}
                value={haveId} />
            <PublicationContactDialog
                visible={openContactDialog}
                onClose={() => setOpenContactDialog(false)}
                contactInfo={contact} />
        </SafeAreaView>
    );
}

PublicationDetailsScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
    headerStyle: {
        backgroundColor: PRIMARY_COLOR
    },
    headerRight: () => <PublicationDetailsRightButtons navigation={navigation} {...navigation.state.params} />,
    headerTintColor: '#fff',
    headerBackTitle: null,
    headerTitleStyle: {
        fontWeight: '700',
        letterSpacing: .2
    }
});

export default PublicationDetailsScreen;
