import React from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';

import styles from './styles';
import GlobalStyles from '../../../utils/GlobalStyles';
import TextButton from '../../simple/TextButton/TextButton';
import Assets from '../../../../assets/Assets';
import { returnTextBasedOnMaxLengthWithLimit } from '../../../utils/Utils';
import { PRIMARY_COLOR } from '../../../utils/Constants';

const PublicationCard = ({ onPublicationPress = () => {}, id = '', image = '', name = '', description = '', onSharePress = (id) => {}, onContactPress = (id) => {}, lastChild = false }) => {
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
                            <Assets.svg.MoreOptionsIcon
                                style={styles.optionIcon}
                                fill={PRIMARY_COLOR} />
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default PublicationCard;
