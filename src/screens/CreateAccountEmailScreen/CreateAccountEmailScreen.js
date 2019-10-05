import React, { useReducer, useRef } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import GlobalStyles from '../../utils/GlobalStyles';
import styles from './styles';
import CustomTextInput from '../../components/simple/CustomTextInput/CustomTextInput';
import ContainedButton from '../../components/simple/ContainedButton/ContainedButton';

const CreateAccountEmailScreen = () => {
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

    return (
        <SafeAreaView style={[GlobalStyles.flex1, GlobalStyles.alignItemsCenter]}>
            <Text style={styles.title}>
                Registrate para continuar
            </Text>
            <View style={styles.contentContainer}>
                <View style={styles.fieldContainer}>
                    <CustomTextInput
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
                    <ContainedButton>
                        Crear cuenta
                    </ContainedButton>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default CreateAccountEmailScreen;
