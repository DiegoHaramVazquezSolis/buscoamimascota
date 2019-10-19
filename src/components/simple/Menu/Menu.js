import React from 'react';
import { Modal, View, TouchableWithoutFeedback } from 'react-native';

import styles from './styles';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const Menu = ({ open, onClose, coords, children }) => {
    return (
        <>
            <View>
                <Modal visible={open} onRequestClose={onClose} transparent>
                    <TouchableWithoutFeedback onPress={onClose}>
                        <View style={styles.menuOverlay}>
                            <View style={[styles.container, { left: coords.x - widthPercentageToDP(56), top: coords.y }]}>
                                {children}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        </>
    );
}

export default Menu;
