import React, { useState } from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import styles from './styles';
import GlobalStyles from '../../../utils/GlobalStyles';

import { PRIMARY_COLOR, AUTHENTICATION_STACK_NAVIGATOR } from '../../../utils/Constants';
import Assets from '../../../../assets/Assets';

import { returnTextBasedOnMaxLengthWithLimit } from '../../../utils/Utils';
import { translate } from '../../../services/i18n';
import { subscribeUserToPublication } from '../../../services/database';

import TextButton from '../../simple/TextButton/TextButton';
import Menu from '../../simple/Menu/Menu';
import ListItem from '../../simple/ListItem/ListItem';
import Card from '../../simple/Card/Card';

const PublicationCard = ({ navigation, onPublicationPress = () => {}, id = '', image = '', name = '', description = '', onSharePress = (id) => {}, onContactPress = (id) => {}, lastChild = false, uid = '', isLogged = false, onReportPress = (id) => {} }) => {
    const [ open, setOpen ] = useState(false);

    const subscribeToPublication = () => {
        if (isLogged) {
            subscribeUserToPublication(uid, id);
        } else {
            navigation.navigate(AUTHENTICATION_STACK_NAVIGATOR);
        }
        setOpen(false);
    }

    const reportPublication = () => {
        if (isLogged) {
            onReportPress(id)
        } else {
            navigation.navigate(AUTHENTICATION_STACK_NAVIGATOR);
        }
        setOpen(false);
    }

    return (
        <TouchableWithoutFeedback onPress={() => onPublicationPress(id)}>
            <Card style={[GlobalStyles.alignItemsCenter, styles.card, { marginBottom: lastChild ? 12 : 0}]}>
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
                        <TextButton onPress={() => onContactPress(id)}>{translate('PublicationCard.contact')}</TextButton>
                        <View style={styles.iconsContainer}>
                            <TouchableWithoutFeedback onPress={() => onSharePress(id)}>
                                <Assets.svg.ShareIcon
                                    style={styles.shareIcon}
                                    fill={PRIMARY_COLOR} />
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => setOpen(!open)}>
                                <Assets.svg.MoreOptionsIcon
                                    style={styles.optionIcon}
                                    fill={PRIMARY_COLOR} />
                            </TouchableWithoutFeedback>
                            <Menu onClose={() => setOpen(false)} open={open}>
                                <ListItem
                                    onPress={subscribeToPublication}
                                    textStyle={styles.menuOptionsStyle}>
                                    {translate('PublicationCard.subscribe')}
                                </ListItem>
                                <ListItem
                                    onPress={reportPublication}
                                    textStyle={[styles.reportStyle, styles.menuOptionsStyle]}>
                                    {translate('PublicationCard.report')}
                                </ListItem>
                            </Menu>
                        </View>
                    </View>
                </View>
            </Card>
        </TouchableWithoutFeedback>
    );
};

mapStateToProps = (state) => ({
    uid: state.User.uid,
    isLogged: state.User.isLogged
});

export default connect(mapStateToProps)(withNavigation(PublicationCard));
