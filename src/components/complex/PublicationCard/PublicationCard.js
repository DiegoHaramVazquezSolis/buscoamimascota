import React from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';

import styles from './styles';
import GlobalStyles from '../../../utils/GlobalStyles';
import TextButton from '../../simple/TextButton/TextButton';
import Assets from '../../../../assets/Assets';
import { returnTextBasedOnMaxLengthWithLimit } from '../../../utils/Utils';

const PublicationCard = ({ id = '', image = '', name = '', description = '', onSharePress = () => {}, lastChild = false }) => {
    return (
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
                    <TextButton>Contactar</TextButton>
                    <View style={styles.iconsContainer}>
                        <TouchableWithoutFeedback onPress={() => onSharePress(id)}>
                            <Assets.svg.ShareIcon style={styles.shareIcon} />
                        </TouchableWithoutFeedback>
                        <Assets.svg.MoreOptionsIcon style={styles.optionIcon} />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default PublicationCard;
