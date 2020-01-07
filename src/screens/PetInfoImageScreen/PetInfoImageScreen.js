import React, { useState } from 'react';
import { Alert, SafeAreaView, View, TouchableWithoutFeedback, Image, Text } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';

import GlobalStyles from '../../utils/GlobalStyles';
import styles from './styles';
import Assets from '../../../assets/Assets';
import { PUBLICATION_DETAILS_SCREEN } from '../../utils/Constants';

import { createPetPublication } from '../../services/database';
import { createFirestoreGeoPoint, encodeLocation } from '../../utils/Utils';

import ScreenSubtitle from '../../components/simple/ScreenSubtitle/ScreenSubtitle';
import CloseRightButton from '../../components/simple/CloseRightButton/CloseRightButton';
import FloatingActionButton from '../../components/simple/FloatingActionButton/FloatingActionButton';
import ContainedButton from '../../components/simple/ContainedButton/ContainedButton';


const imagePickerOptions = {
    title: 'Selecciona una imagen de tu mascota',
    takePhotoButtonTitle: 'Tomar foto',
    chooseFromLibraryButtonTitle: 'Escoger una foto de galeria',
    chooseWhichLibraryTitle: 'Escoger galeria',
    cancelButtonTitle: 'cancelar',
    storageOptions: {
      skipBackup: true
    },
    permissionDenied: {
        title: 'Permiso denegado',
        text: 'Para poder subir una foto de tu mascota requerimos de permiso para acceder a tu camara y/o galeria de imagenes.',
        reTryTitle: 'Conceder permisos',
        okTitle: ''
    }
};

const PetInfoImageScreen = ({ navigation, uid = '' }) => {
    const [image, setImage] = useState({ uri: '', data: '' });

    getImage = () => {
        if (navigation.state.params.losted) {
            ImagePicker.launchImageLibrary(imagePickerOptions, checkAndSaveImage);
        } else {
            ImagePicker.showImagePicker(imagePickerOptions, checkAndSaveImage);
        }
    }

    checkAndSaveImage = (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else {
            setImage({ uri: response.uri, data: response.data });
        }
    }

    publishAndContinue = async () => {
        if (image.data !== '') {
            const { location, contact, formData, losted } = navigation.state.params;
            const GeoPointLocation = createFirestoreGeoPoint(location);
            const petData = {
                location: GeoPointLocation,
                contact,
                geohash: encodeLocation(location),
                ...formData
            };

            const publicationData = await createPetPublication(losted, uid, petData, image.data);

            navigation.navigate(PUBLICATION_DETAILS_SCREEN, { ...publicationData });
        } else {
            Alert.alert(
                'Error',
                'Para continuar debes seleccionar una imagen.',
                [
                    { text: 'Entendido' },
                ]
            );
        }
    }

    return (
        <SafeAreaView style={[GlobalStyles.flex1, GlobalStyles.alignItemsCenter]}>
            <View style={styles.separator} />
            <ScreenSubtitle>
                Para terminar selecciona una imagen de tu mascota
            </ScreenSubtitle>
            <View style={styles.separator} />
            <View style={[GlobalStyles.flex1, GlobalStyles.alignItemsCenter]}>
                <TouchableWithoutFeedback onPress={getImage}>
                    <View style={[GlobalStyles.alignItemsCenter, styles.imagePickerContainer]}>
                        {image.uri === '' ?
                            <Text style={[GlobalStyles.mt24, styles.imagePickerText]}>
                                Presiona para seleccionar la imagen
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
                        onPress={publishAndContinue}>
                        Terminar y ver publicación
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
    headerRight: () => <CloseRightButton onPress={() => navigation.dismiss()} />,
    headerBackTitle: null
});

mapStateToProps = (state) => ({
    uid: state.User.uid
});

export default connect(mapStateToProps)(PetInfoImageScreen);
