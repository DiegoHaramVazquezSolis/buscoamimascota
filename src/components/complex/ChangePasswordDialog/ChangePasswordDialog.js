import React, { useRef, useReducer } from 'react';
import { Alert, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { WEAK_PASSWORD, REQUIRES_RECENT_LOGIN } from '../../../utils/Constants';

import GlobalStyles from '../../../utils/GlobalStyles';

import { updateUserPassword } from '../../../services/auth';
import { translate } from '../../../services/i18n';

import Dialog from '../../simple/Dialog/Dialog';
import CustomTextInput from '../../simple/CustomTextInput/CustomTextInput';
import ContainedButton from '../../simple/ContainedButton/ContainedButton';

const ChangePasswordDialog = ({ email = '', visible = false, onClose = () => {} }) => {
    let oldPasswordRef = useRef();

    const initialState = {
        currentPassword: '',
        newPassword: ''
    };

    reducer = (prevState, state) => {
        return {...prevState, ...state};
    }

    const [ state, setState ] = useReducer(reducer, initialState);

    const setNewPassword = async () => {
        if (state.currentPassword !== '' && state.newPassword !== '') {
            if (state.currentPassword !== state.newPassword) {
                await updateUserPassword(email, state.currentPassword, state.newPassword);
                onClose();
            } else {
                Alert.alert(
                    'Error',
                    'La nueva contraseña es igual a la anterior.',
                    [
                        { text: 'Entendido' }
                    ]
                );
            }
        } else {
            Alert.alert(
                'Error',
                'Asegurate de llenar ambos campos antes de continuar',
                [
                    { text: 'Entendido' }
                ]
            );
        }
    }

    return (
        <Dialog
            visible={visible}
            onClose={onClose}
            title='Cambiar contraseña'
            description='Actualiza tu información de inicio de sesión'>
            <CustomTextInput
                secureTextEntry
                placeholder='Nueva contraseña'
                returnKeyType='next'
                onChangeText={(newPassword) => setState({ newPassword })}
                onSubmitEditing={() => oldPasswordRef.current.focus()} />
            <CustomTextInput
                reference={oldPasswordRef}
                secureTextEntry
                style={GlobalStyles.mt8}
                placeholder='Contraseña actual'
                onChangeText={(currentPassword) => setState({ currentPassword })}
                onSubmitEditing={setNewPassword} />
            <Text style={[GlobalStyles.link, { marginTop: 4 }, GlobalStyles.alignSelfEnd]} onPress={() => console.log('Do it')}>
                Olvide mi contraseña
            </Text>
            <View style={[GlobalStyles.mt12, GlobalStyles.alignSelfEnd]}>
                <ContainedButton onPress={setNewPassword} size='sm'>
                    Guardar cambios
                </ContainedButton>
            </View>
        </Dialog>
    );
}

mapStateToProps = ({ User }) => ({
    email: User.email
});

export default connect(mapStateToProps)(ChangePasswordDialog);
