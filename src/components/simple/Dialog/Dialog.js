import React, { useState, useEffect } from 'react';
import { Keyboard, Modal, View, Text } from 'react-native';

import styles from './styles';

const Dialog = ({ visible = false, onClose = () => {}, title = '', description = '', children, closeIcon = true }) => {
    const [keyboardSize, setKeyboardSize] = useState(0);

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', ({ endCoordinates }) => avoidKeyboardOnDialog(endCoordinates));
        Keyboard.addListener('keyboardDidHide', ({ endCoordinates }) => avoidKeyboardOnDialog(endCoordinates));

        return () => {
            Keyboard.removeListener('keyboardDidShow', avoidKeyboardOnDialog);
            Keyboard.removeListener('keyboardDidHide', avoidKeyboardOnDialog);
        };
    }, []);

    const avoidKeyboardOnDialog = ({ height = 0 }) => {
        setKeyboardSize(height);
    }

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <View style={styles.dialogContainer}>
                <View style={[styles.dialog, { marginBottom: keyboardSize }]}>
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
};

export default Dialog;
