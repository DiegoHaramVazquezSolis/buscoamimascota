import React from 'react';
import { TouchableOpacity } from 'react-native';

import styles from './styles';

const PublicationTypeCard = ({ children, onPress = () => {}, style = {} }) => (
    <TouchableOpacity
        style={[styles.publicationTypeCard, style]}
        activeOpacity={.6}
        onPress={onPress}>
        {children}
    </TouchableOpacity>
);

export default PublicationTypeCard;
