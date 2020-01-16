import React from 'react';
import { View, Linking, Alert } from 'react-native';

import Assets from '../../../../assets/Assets';

import { translate } from '../../../services/i18n';

import Dialog from '../../simple/Dialog/Dialog';
import ListItem from '../../simple/ListItem/ListItem';

const PublicationContactDialog = ({ visible = false, onClose = () => {}, contactInfo = {} }) => {

    /**
     * Notify the user when the information is not founded
     */
    notifyInformationError = () => {
        Alert.alert(
            translate('PublicationContactDialog.errorMessage.title'),
            translate('PublicationContactDialog.errorMessage.description'),
            [
                { text: translate('PublicationContactDialog.errorMessage.acceptButton') },
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
            title={translate('PublicationContactDialog.title')}
            description={translate('PublicationContactDialog.description')}>
            <View>
                <ListItem onPress={onWhatsappPress} Icon={Assets.svg.WhatsappIcon}>
                    {translate('PublicationContactDialog.whatsapp')}
                </ListItem>
                <ListItem onPress={onCellPhonePress} Icon={Assets.svg.MobileIcon}>
                    {translate('PublicationContactDialog.cellphone')}
                </ListItem>
                <ListItem onPress={onHomePhonePress} Icon={Assets.svg.PhoneIcon}>
                    {translate('PublicationContactDialog.phone')}
                </ListItem>
            </View>
        </Dialog>
    );
};

export default PublicationContactDialog;
