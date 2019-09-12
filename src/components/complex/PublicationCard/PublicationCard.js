import React from 'react';
import { View, Image, Text } from 'react-native';

import styles from './styles';
import GlobalStyles from '../../../utils/GlobalStyles';
import TextButton from '../../simple/TextButton/TextButton';
import Assets from '../../../../assets/Assets';
import { returnTextBasedOnMaxLengthWithLimit } from '../../../utils/Utils';

const PublicationCard = ({ image = '', name = '', description = '', onContactPress = () => {}, onShowDetailsPress = () => {}, lastChild = false }) => {
    return (
        <View style={[GlobalStyles.alignItemsCenter ,styles.card, { marginBottom: lastChild ? 12 : 0}]}>
            <View>
                <Image
                    style={styles.image}
                    source={{ uri: 'https://images.unsplash.com/photo-1534985111090-85c477f9d813?ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80' }} />
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
                        <Assets.svg.ShareIcon style={styles.shareIcon} />
                        <Assets.svg.MoreOptionsIcon style={styles.optionIcon} />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default PublicationCard;
