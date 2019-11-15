import React, { useReducer } from 'react';
import { Share, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import Assets from '../../../../assets/Assets';

import { AUTHENTICATION_STACK_NAVIGATOR } from '../../../utils/Constants';

import { createDynamicLink } from '../../../services/dynamicLinks';
import { subscribeUserToPublication } from '../../../services/database';

import Menu from '../Menu/Menu';
import ListItem from '../ListItem/ListItem';
import CreateReportDialog from '../../complex/CreateReportDialog/CreateReportDialog';

const PublicationDetailsRightButtons = ({ navigation, id = '', uid = '', isLogged = false }) => {
    const initialState = {
        openOptionsMenu: false,
        openReportDialog: false
    };

    reducer = (prevState, state) => {
        return {...prevState, ...state};
    }

    const [ state, setState ] = useReducer(reducer, initialState);

    subscribeToPublication = () => {
        if (isLogged) {
            subscribeUserToPublication(uid, id);
        } else {
            navigation.navigate(AUTHENTICATION_STACK_NAVIGATOR);
        }
        setState({ openOptionsMenu: false });
    }

    reportPublication = () => {
        if (isLogged) {
            setState({ openReportDialog: true });
        } else {
            navigation.navigate(AUTHENTICATION_STACK_NAVIGATOR);
        }
        setState({ openOptionsMenu: false });
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
                onPress={() => setState({ openOptionsMenu: true })}
                underlayColor='rgba(0, 0, 0, .1)'
                style={styles.iconContainer}>
                <Assets.svg.MoreOptionsIcon
                    fill='#FFF'
                    style={styles.icon} />
            </TouchableHighlight>
            <Menu onClose={() => setState({ openOptionsMenu: false })} open={state.openOptionsMenu}>
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
            <CreateReportDialog
                visible={state.openReportDialog}
                onClose={() => setState({ openReportDialog: false })}
                uid={uid}
                publicationId={id} />
            <View style={styles.iconSeparator} />
        </View>
    )
};

mapStateToProps = (state) => ({
    uid: state.User.uid,
    isLogged: state.User.isLogged
});

export default connect(mapStateToProps)(PublicationDetailsRightButtons);
