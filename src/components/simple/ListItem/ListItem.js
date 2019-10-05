import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';

import styles from './styles';

const ListItem = ({ onPress = () => {}, Icon = null, children = null }) => (
    <TouchableHighlight underlayColor='rgba(0, 0, 0, .1)' onPress={onPress}>
        <View style={styles.listItem}>
            {Icon &&
                <View style={styles.iconContainer}>
                    <Icon height={32} width={32} />
                </View>
            }
            <View style={styles.contentContainer}>
                <Text style={styles.contentText}>{children}</Text>
            </View>
        </View>
    </TouchableHighlight>
);

export default ListItem;
