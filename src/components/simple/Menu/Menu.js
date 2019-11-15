import React from 'react';
import { Modal, View, TouchableWithoutFeedback } from 'react-native';

import styles from './styles';

const Menu = ({ open, onClose, coords, children }) => {
    return (
        <Modal visible={open} onRequestClose={onClose} transparent animationType='fade'>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.menuOverlay}>
                    <View style={[styles.container]}>
                        {children}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

export default Menu;
