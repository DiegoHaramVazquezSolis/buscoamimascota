import React, { useReducer, useRef } from 'react';
import { Alert, SafeAreaView, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import GlobalStyles from '../../utils/GlobalStyles';
import styles from './styles';
import CustomTextInput from '../../components/simple/CustomTextInput/CustomTextInput';
import ContainedButton from '../../components/simple/ContainedButton/ContainedButton';
import { signInWithEmail } from '../../services/auth';
import { LOSTED_PUBLICATIONS_LIST_SCREEN } from '../../utils/Constants';

const CreateAccountEmailScreen = ({ navigation }) => {
    let passwordRef = useRef();
    let confirmPasswordRef = useRef();

    const initialState = {
        email: '',
        password: '',
        confirmPassword: ''
    };

    reducer = (prevState, nextState) => {
        return { ...prevState, ...nextState };
    }

    const [ state, setState ] = useReducer(reducer, initialState);

    createAccountWithEmail = async () => {
        const { email, password, confirmPassword } = state;
        if (email !== '' && password !== '' && confirmPassword !== '') {
            if (password === confirmPassword) {
                try {
                    await signInWithEmail(email, password);
                    navigation.navigate(LOSTED_PUBLICATIONS_LIST_SCREEN);
                } catch (error) {
                    console.log(error);
                }
            } else {
                Alert.alert(
                    'Error',
                    'Las contraseñas no coinciden',
                    [
                        { text: 'Entendido' }
                    ]
                );
            }
        } else {
            Alert.alert(
                'Error',
                'Antes de continuar llena todos los campos',
                [
                    { text: 'Entendido' }
                ]
            );
        }
    }

    return (
        <SafeAreaView style={[GlobalStyles.flex1, GlobalStyles.alignItemsCenter]}>
            <Text style={styles.title}>
                Registrate para continuar
            </Text>
            <KeyboardAwareScrollView>
                <View style={styles.contentContainer}>
                    <View style={styles.fieldContainer}>
                        <CustomTextInput
                            keyboardType='email-address'
                            onSubmitEditing={() => passwordRef.current.focus()}
                            placeholder='Email'
                            onChangeText={(email) => setState({ email })} />
                    </View>
                    <View style={styles.fieldContainer}>
                        <CustomTextInput
                            reference={passwordRef}
                            onSubmitEditing={() => confirmPasswordRef.current.focus()}
                            secureTextEntry
                            placeholder='Contraseña'
                            onChangeText={(password) => setState({ password })} />
                    </View>
                    <View style={styles.fieldContainer}>
                        <CustomTextInput
                            reference={confirmPasswordRef}
                            secureTextEntry
                            placeholder='Repetir contraseña'
                            onChangeText={(confirmPassword) => setState({ confirmPassword })} />
                    </View>

                    <View style={styles.advertismentContainer}>
                        <Text style={styles.advertismentText}>
                            Al continuar aceptas las
                            <Text style={styles.link}>
                                {' '}Condiciones del servicio
                            </Text>
                            {' '}y la
                            <Text style={styles.link}>
                                {' '}Politica de privacidad
                            </Text>
                            {' '}de Busco a mi mascota
                        </Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <ContainedButton onPress={createAccountWithEmail}>
                            Crear cuenta
                        </ContainedButton>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

export default CreateAccountEmailScreen;
