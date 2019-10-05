import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import styles from './styles';

const SocialMediaButton = ({ backgroundColor = '#FFF', color = '#000', onPress = () => {}, Icon = null, children = '' }) => (
    <TouchableOpacity
        style={[styles.socialButton, { backgroundColor }]}
        activeOpacity={.6}
        onPress={onPress}>
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            {Icon &&
                <Icon style={{ alignSelf: 'center', marginRight: 8 }} height={24} width={24} />
            }
            <Text style={[styles.socialButtonText, { color }]}>{children}</Text>
        </View>
    </TouchableOpacity>
);

export default SocialMediaButton;
