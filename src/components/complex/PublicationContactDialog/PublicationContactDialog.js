import React from 'react';
import { View, Linking, Alert } from 'react-native';

import Dialog from '../../simple/Dialog/Dialog';
import ListItem from '../../simple/ListItem/ListItem';
import Assets from '../../../../assets/Assets';

const PublicationContactDialog = ({ visible = false, onClose = () => {}, contactInfo = {} }) => {

    /**
     * Notify the user when the information is not founded
     */
    notifyInformationError = () => {
        Alert.alert(
            'Ocurrio un problema',
            'No se encontro la información necesaria, prueba con otra opción',
            [
                { text: 'Entendido' },
            ]
        );
    }

    /**
     * Send to whatsapp to contact with the author of the publiation
     */
    onWhatsappPress = () => {
        if (contactInfo.whatsapp) {
            Linking.openURL(`whatsapp://send?text=&phone=${contactInfo.whatsapp}`);
        } else {
            notifyInformationError();
        }
    }

    /**
     * Send to the phone to contact with the author of the publiation (with cell phone number)
     */
    onCellPhonePress = () => {
        if (contactInfo.cellphone) {
            Linking.openURL(`tel:${contactInfo.cellphone}`);
        } else {
            notifyInformationError();
        }
    }

    /**
     * Send to the phone to contact with the author of the publiation (with home phone number)
     */
    onHomePhonePress = () => {
        if (contactInfo.phone) {
            Linking.openURL(`tel:${contactInfo.phone}`);
        } else {
            notifyInformationError();
        }
    }

    return (
        <Dialog
            visible={visible}
            onClose={onClose}
            title='Contactar'
            description='Selecciona el medio de contacto'>
            <View>
                <ListItem onPress={onWhatsappPress} Icon={Assets.svg.WhatsappIcon}>Whatsapp</ListItem>
                <ListItem onPress={onCellPhonePress} Icon={Assets.svg.MobileIcon}>Telefono celular</ListItem>
                <ListItem onPress={onHomePhonePress} Icon={Assets.svg.PhoneIcon}>Telefono fijo</ListItem>
            </View>
        </Dialog>
    );
};

export default PublicationContactDialog;
