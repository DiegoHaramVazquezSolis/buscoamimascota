import React, { useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';

import { reportPublication } from '../../../services/database';
import { translate } from '../../../services/i18n';

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
            title={translate('CreateReportDialog.title')}
            description={translate('CreateReportDialog.description')}>
            <View>
                <CustomTextInput
                    onChangeText={(report) => setReport(report)}
                    placeholder={translate('CreateReportDialog.reportTextFieldPlaceholder')}
                    style={styles.textInput} />
                <View style={styles.buttonContainer}>
                    <ContainedButton
                        size='sm'
                        onPress={makeReport}>
                            {translate('CreateReportDialog.sendReportButton')}
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
