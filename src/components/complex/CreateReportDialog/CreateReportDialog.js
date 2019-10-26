import React, { useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';

import { reportPublication } from '../../../services/database';

import Dialog from '../../simple/Dialog/Dialog';
import CustomTextInput from '../../simple/CustomTextInput/CustomTextInput';
import ContainedButton from '../../simple/ContainedButton/ContainedButton';


const CreateReportDialog = ({ uid = '', publicationId = '', visible = false, onClose = () => {} }) => {
    const [report, setReport] = useState('');

    makeReport = () => {
        reportPublication(uid, publicationId, report);
        onClose();
    }

    return (
        <Dialog
            visible={visible}
            onClose={onClose}
            title='Reportar'
            description='Escribe aqui el motivo del reporte'>
            <View>
                <CustomTextInput
                    onChangeText={(report) => setReport(report)}
                    placeholder='Motivo'
                    style={styles.textInput} />
                <View style={styles.buttonContainer}>
                    <ContainedButton
                        size='sm'
                        onPress={makeReport}>
                            Reportar!
                    </ContainedButton>
                </View>
            </View>
        </Dialog>
    );
}

mapStateToProps = (state) => ({
    uid: state.User.uid
});

export default connect(mapStateToProps)(CreateReportDialog);
