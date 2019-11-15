import React, { useState } from 'react';
import { Share, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import Assets from '../../../../assets/Assets';

import { AUTHENTICATION_STACK_NAVIGATOR } from '../../../utils/Constants';

import { createDynamicLink } from '../../../services/dynamicLinks';

import Menu from '../Menu/Menu';
import ListItem from '../ListItem/ListItem';

const PublicationDetailsRightButtons = ({ navigation, id = '', contact = {}, uid = '', isLogged = false }) => {
    const [ open, setOpen ] = useState(false);

    subscribeToPublication = () => {
        if (isLogged) {
            subscribeUserToPublication(uid, id);
        } else {
            navigation.navigate(AUTHENTICATION_STACK_NAVIGATOR);
        }
        setOpen(false);
    }

    reportPublication = () => {
        if (isLogged) {
            onReportPress(id)
        } else {
            navigation.navigate(AUTHENTICATION_STACK_NAVIGATOR);
        }
        setOpen(false);
    }

    /**
     * Set the selected pet and open the share publication dialog
     */
    onSharePress = async () => {
        Share.share({
            message: await createDynamicLink({ type: 'losted', id }),
            title: 'Compartir publicación'
        });
    }

    onReportPress = (id) => {
        setState({ openReportDialog: true, selectedPet: publications[id] });
    }

    return (
        <View style={styles.container}>
            <TouchableHighlight
                onPress={onSharePress}
                underlayColor='rgba(0, 0, 0, .1)'
                style={styles.iconContainer}>
                <Assets.svg.ShareIcon
                    fill='#FFF'
                    style={styles.icon} />
            </TouchableHighlight>
            <View style={styles.iconSeparator} />
            <TouchableHighlight
                onPress={() => setOpen(true)}
                underlayColor='rgba(0, 0, 0, .1)'
                style={styles.iconContainer}>
                <Assets.svg.MoreOptionsIcon
                    fill='#FFF'
                    style={styles.icon} />
            </TouchableHighlight>
            <Menu onClose={() => setOpen(false)} open={open}>
                <ListItem
                    onPress={subscribeToPublication}
                    textStyle={styles.menuOptionsStyle}>
                    Recibir notificaciones
                </ListItem>
                <ListItem
                    onPress={reportPublication}
                    textStyle={[styles.reportStyle, styles.menuOptionsStyle]}>
                    Reportar
                </ListItem>
            </Menu>
            <View style={styles.iconSeparator} />
        </View>
    )
};

mapStateToProps = (state) => ({
    uid: state.User.uid,
    isLogged: state.User.isLogged
});

export default connect(mapStateToProps)(PublicationDetailsRightButtons);
