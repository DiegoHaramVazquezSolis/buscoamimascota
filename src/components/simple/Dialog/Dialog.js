import React from 'react';
import { Modal, View, Text } from 'react-native';

import styles from './styles';

const Dialog = ({ visible = false, onClose = () => {}, title = '', description = '', children, closeIcon = true }) => (
    <Modal
        animationType='fade'
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
        <View style={styles.dialogContainer}>
            <View style={styles.dialog}>
                <View style={[styles.contentContainer, { marginTop: closeIcon ? 10 : 20}]}>
                    {closeIcon &&
                        <View style={styles.closeIconContainer}>
                            <Text style={styles.close} onPress={onClose}>x</Text>
                        </View>
                    }
                    <View style={styles.headerContainer}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <Text style={styles.description}>{description}</Text>
                    {children}
                </View>
            </View>
        </View>
    </Modal>
);

export default Dialog;
