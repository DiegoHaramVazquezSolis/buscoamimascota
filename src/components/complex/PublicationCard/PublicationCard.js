import React, { useState, useRef } from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';

import styles from './styles';
import GlobalStyles from '../../../utils/GlobalStyles';

import { PRIMARY_COLOR } from '../../../utils/Constants';
import Assets from '../../../../assets/Assets';

import { returnTextBasedOnMaxLengthWithLimit } from '../../../utils/Utils';

import TextButton from '../../simple/TextButton/TextButton';
import Menu from '../../simple/Menu/Menu';
import ListItem from '../../simple/ListItem/ListItem';


const PublicationCard = ({ onPublicationPress = () => {}, id = '', image = '', name = '', description = '', onSharePress = (id) => {}, onContactPress = (id) => {}, lastChild = false }) => {
    const [ open, setOpen ] = useState(false);
    const [ state, setState ] = useState({ x: 0, y: 0 });
    const menuPositionRef = useRef();

    getMenuPosition = () => {
        menuPositionRef.current.measure((x, y, width, height, pageX, pageY) => {
            setState({ x: pageX, y: pageY });
        });
    }

    return (
        <TouchableWithoutFeedback onPress={() => onPublicationPress(id)}>
            <View style={[GlobalStyles.alignItemsCenter, styles.card, { marginBottom: lastChild ? 12 : 0}]}>
                <View>
                    <Image
                        style={styles.image}
                        source={{ uri: image }} />
                </View>
                <View style={styles.interactionContainer}>
                    <View>
                        <Text style={styles.name}>
                            {returnTextBasedOnMaxLengthWithLimit(name, 18, 15)}
                        </Text>
                        <Text style={styles.description}>
                            {returnTextBasedOnMaxLengthWithLimit(description, 60, 56)}
                        </Text>
                    </View>
                    <View style={styles.actionsContainer}>
                        <TextButton onPress={() => onContactPress(id)}>Contactar</TextButton>
                        <View style={styles.iconsContainer}>
                            <TouchableWithoutFeedback onPress={() => onSharePress(id)}>
                                <Assets.svg.ShareIcon
                                    style={styles.shareIcon}
                                    fill={PRIMARY_COLOR} />
                            </TouchableWithoutFeedback>
                            <View ref={menuPositionRef} onLayout={getMenuPosition}>
                                <TouchableWithoutFeedback onPress={() => setOpen(!open)}>
                                    <Assets.svg.MoreOptionsIcon
                                        style={styles.optionIcon}
                                        fill={PRIMARY_COLOR} />
                                </TouchableWithoutFeedback>
                                <Menu coords={state} onClose={() => setOpen(false)} open={open}>
                                    <ListItem textStyle={styles.menuOptionsStyle}>Recibir notificaciones</ListItem>
                                    <ListItem textStyle={styles.menuOptionsStyle}>Descargar</ListItem>
                                    <ListItem textStyle={[styles.reportStyle, styles.menuOptionsStyle]}>Reportar</ListItem>
                                </Menu>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default PublicationCard;
