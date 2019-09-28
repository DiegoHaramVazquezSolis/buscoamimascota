import React from 'react';
import { View } from 'react-native';

import Dialog from '../../simple/Dialog/Dialog';
import Assets from '../../../../assets/Assets';
import ListItem from '../../simple/ListItem/ListItem';
/**
 * Unused by the moment, when we replace the share API we are going to use this Dialog
 */
const PublicationShareDialog = ({ visible = '', onClose = () => {} }) => (
    <Dialog
        visible={visible}
        onClose={onClose}
        title='Compartir'
        description='Selecciona por donde deseas compartir'>
        <View>
            <ListItem Icon={Assets.svg.FacebookIcon}>Facebook</ListItem>
            <ListItem Icon={Assets.svg.WhatsappIcon}>Whatsapp</ListItem>
            <ListItem Icon={Assets.svg.MessengerIcon}>Messenger</ListItem>
        </View>
    </Dialog>
);

export default PublicationShareDialog;
