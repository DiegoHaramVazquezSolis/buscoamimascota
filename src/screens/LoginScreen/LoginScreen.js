import React, { useEffect, useRef, useReducer } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import GlobalStyles from '../../utils/GlobalStyles';
import styles from './styles';

import { LOSTED_PUBLICATIONS_LIST_SCREEN } from '../../utils/Constants';

import { loginWithFacebook, loginWithGoogle, logInWithEmail, setupGoogleSignin } from '../../services/auth';

import CustomTextInput from '../../components/simple/CustomTextInput/CustomTextInput';
import ContainedButton from '../../components/simple/ContainedButton/ContainedButton';
import SocialMediaButton from '../../components/simple/SocialMediaButton/SocialMediaButton';

const LoginScreen = ({ navigation }) => {
    useEffect(() => {
        setupGoogleSignin();
    }, []);

    let passwordRef = useRef();

    const initialState = {
        email: '',
        password: ''
    };

    reducer = (prevState, nextState) => {
        return { ...prevState, ...nextState };
    }

    const [ state, setState ] = useReducer(reducer, initialState);

    LogInWithGoogle = async () => {
        await loginWithGoogle();
        navigation.navigate(LOSTED_PUBLICATIONS_LIST_SCREEN);
    }

    LogInWithFacebook = async () => {
        await loginWithFacebook();
        navigation.navigate(LOSTED_PUBLICATIONS_LIST_SCREEN);
    }

    LogInWithEmail = async () => {
        await logInWithEmail(state.email, state.password);
        navigation.navigate(LOSTED_PUBLICATIONS_LIST_SCREEN);
    }

    return (
        <SafeAreaView style={[GlobalStyles.flex1, GlobalStyles.alignItemsCenter]}>
            <Text style={styles.title}>
                Inicia sesión para continuar
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
                            secureTextEntry
                            placeholder='Contraseña'
                            onChangeText={(password) => setState({ password })} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <ContainedButton onPress={LogInWithEmail}>
                            Crear cuenta
                        </ContainedButton>
                    </View>

                    <View style={styles.dividier} />

                    <Text style={styles.alternative}>
                        O inicia sesió con redes sociales
                    </Text>
                    <View style={styles.socialMediaLoginOptions}>
                        <View style={styles.signInButtonContainer}>
                            <SocialMediaButton
                                backgroundColor='#FFF'
                                color='rgba(0, 0, 0, .54)'
                                onPress={LogInWithGoogle}
                                Icon={Assets.svg.GoogleIcon}>
                                Continuar con google
                            </SocialMediaButton>
                        </View>
                        <View style={styles.signInButtonContainer}>
                            <SocialMediaButton
                                backgroundColor='#3B5998'
                                color='#FFF'
                                onPress={LogInWithFacebook}
                                Icon={Assets.svg.FIconFacebookIcon}>
                                Continuar con facebook
                            </SocialMediaButton>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

export default LoginScreen;
