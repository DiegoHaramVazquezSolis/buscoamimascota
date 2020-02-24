import React, { useState } from 'react';
import { Alert, SafeAreaView, View, TouchableWithoutFeedback, Image, Text } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';

import GlobalStyles from '../../utils/GlobalStyles';
import styles from './styles';
import Assets from '../../../assets/Assets';
import { PUBLICATION_DETAILS_STACK_NAVIGATOR } from '../../utils/Constants';

import { createPetPublication } from '../../services/database';
import { createFirestoreGeoPoint, encodeLocation } from '../../utils/Utils';
import { translate } from '../../services/i18n';

import ScreenSubtitle from '../../components/simple/ScreenSubtitle/ScreenSubtitle';
import CloseRightButton from '../../components/simple/CloseRightButton/CloseRightButton';
import FloatingActionButton from '../../components/simple/FloatingActionButton/FloatingActionButton';
import ContainedButton from '../../components/simple/ContainedButton/ContainedButton';

const imagePickerOptions = {
    title: translate('PetInfoImageScreen.imagePickerOptions.title'),
    takePhotoButtonTitle: translate('PetInfoImageScreen.imagePickerOptions.takePhotoButtonTitle'),
    chooseFromLibraryButtonTitle: translate('PetInfoImageScreen.imagePickerOptions.chooseFromLibraryButtonTitle'),
    chooseWhichLibraryTitle: translate('PetInfoImageScreen.imagePickerOptions.chooseWhichLibraryTitle'),
    cancelButtonTitle: translate('PetInfoImageScreen.imagePickerOptions.cancelButtonTitle'),
    storageOptions: {
      skipBackup: true
    },
    permissionDenied: {
        title: translate('PetInfoImageScreen.imagePickerOptions.permissionDenied.title'),
        text: translate('PetInfoImageScreen.imagePickerOptions.permissionDenied.text'),
        reTryTitle: translate('PetInfoImageScreen.imagePickerOptions.permissionDenied.reTryTitle'),
        okTitle: translate('PetInfoImageScreen.imagePickerOptions.permissionDenied.okTitle')
    }
};

const PetInfoImageScreen = ({ navigation, uid = '' }) => {
    const [image, setImage] = useState({ uri: '', data: '' });
    const [publishing, setPublishing] = useState(false);

    const getImage = () => {
        if (navigation.state.params.losted) {
            ImagePicker.launchImageLibrary(imagePickerOptions, checkAndSaveImage);
        } else {
            ImagePicker.showImagePicker(imagePickerOptions, checkAndSaveImage);
        }
    }

    const checkAndSaveImage = (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else {
            setImage({ uri: response.uri, data: response.data });
        }
    }

    const publishAndContinue = async () => {
        if (image.data !== '' && !publishing) {
            setPublishing(true);
            const { location, contact, formData, losted } = navigation.state.params;
            const GeoPointLocation = createFirestoreGeoPoint(location);
            const petData = {
                location: GeoPointLocation,
                contact,
                geohash: encodeLocation(location),
                ...formData
            };

            const publicationData = await createPetPublication(losted, uid, petData, image.data);

            navigation.navigate(PUBLICATION_DETAILS_STACK_NAVIGATOR, { ...publicationData, losted });
        } else {
            Alert.alert(
                translate('PetInfoImageScreen.errorMessage.title'),
                translate('PetInfoImageScreen.errorMessage.description'),
                [
                    { text: translate('PetInfoImageScreen.errorMessage.acceptButton') },
                ]
            );
            setPublishing(false);
        }
    }

    return (
        <SafeAreaView style={[GlobalStyles.flex1, GlobalStyles.alignItemsCenter]}>
            <View style={styles.separator} />
            <ScreenSubtitle>
                {translate('PetInfoImageScreen.subtitle')}
            </ScreenSubtitle>
            <View style={styles.separator} />
            <View style={[GlobalStyles.flex1, GlobalStyles.alignItemsCenter]}>
                <TouchableWithoutFeedback onPress={getImage}>
                    <View style={[GlobalStyles.alignItemsCenter, styles.imagePickerContainer]}>
                        {image.uri === '' ?
                            <Text style={[GlobalStyles.mt24, styles.imagePickerText]}>
                                {translate('PetInfoImageScreen.description')}
                            </Text>
                            :
                            <Image source={{ uri: image.uri }} style={styles.imagePicker} />
                        }
                        <FloatingActionButton
                            mini
                            Icon={image === '' ? Assets.svg.AddIcon : Assets.svg.EditIcon}
                            onPress={getImage} />
                    </View>
                </TouchableWithoutFeedback>
                <View style={GlobalStyles.mt24}>
                    <ContainedButton
                        size='md'
                        onPress={publishAndContinue}
                        disabled={publishing}>
                        {translate('PetInfoImageScreen.continueButton')}
                    </ContainedButton>
                </View>
            </View>
        </SafeAreaView>
    );
}

PetInfoImageScreen.navigationOptions = ({ navigation }) => ({
    title: '',
    headerStyle: GlobalStyles.customStackNavigatorHeaderStyle,
    headerTintColor: '#fff',
    headerRight: () => <CloseRightButton onPress={navigation.dismiss} />,
    headerBackTitle: null
});

mapStateToProps = (state) => ({
    uid: state.User.uid
});

export default connect(mapStateToProps)(PetInfoImageScreen);
