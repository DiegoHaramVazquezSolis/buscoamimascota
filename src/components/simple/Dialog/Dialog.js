import React from 'react';
import { Modal, View, Text } from 'react-native';
import styles from './styles';

const Dialog = ({ visible = false, onClose = () => {}, title = '', description = '', children }) => (
    <Modal
        animationType='fade'
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
        <View style={styles.dialogContainer}>
            <View style={styles.dialog}>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                    {children}
                </View>
            </View>
        </View>
    </Modal>
);

export default Dialog;
