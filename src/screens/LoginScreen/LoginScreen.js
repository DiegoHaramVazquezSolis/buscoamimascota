import React, { useEffect, useRef, useReducer } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import GlobalStyles from '../../utils/GlobalStyles';
import styles from './styles';

import { loginWithFacebook, loginWithGoogle, logInWithEmail, setupGoogleSignin } from '../../services/auth';
import { translate } from '../../services/i18n';

import CustomTextInput from '../../components/simple/CustomTextInput/CustomTextInput';
import ContainedButton from '../../components/simple/ContainedButton/ContainedButton';
import SocialMediaButton from '../../components/simple/SocialMediaButton/SocialMediaButton';
import ScreenTitle from '../../components/simple/ScreenTitle/ScreenTitle';

const LoginScreen = ({ navigation }) => {
    useEffect(() => {
        setupGoogleSignin();
    }, []);

    let passwordRef = useRef();

    const initialState = {
        email: '',
        password: ''
    };

    const reducer = (prevState, nextState) => {
        return { ...prevState, ...nextState };
    }

    const [ state, setState ] = useReducer(reducer, initialState);

    const LogInWithGoogle = async () => {
        await loginWithGoogle();
        navigation.dismiss();
    }

    const LogInWithFacebook = async () => {
        await loginWithFacebook();
        navigation.dismiss();
    }

    const LogInWithEmail = async () => {
        await logInWithEmail(state.email, state.password);
        navigation.dismiss();
    }

    return (
        <SafeAreaView style={[GlobalStyles.flex1, GlobalStyles.alignItemsCenter]}>
            <ScreenTitle>
                {translate('LoginScreen.title')}
            </ScreenTitle>
            <KeyboardAwareScrollView>
                <View style={styles.contentContainer}>
                    <View style={styles.fieldContainer}>
                        <CustomTextInput
                            keyboardType='email-address'
                            onSubmitEditing={() => passwordRef.current.focus()}
                            placeholder={translate('LoginScreen.emailPlaceholder')}
                            onChangeText={(email) => setState({ email })} />
                    </View>
                    <View style={styles.fieldContainer}>
                        <CustomTextInput
                            reference={passwordRef}
                            secureTextEntry
                            placeholder={translate('LoginScreen.passwordPlaceholder')}
                            onChangeText={(password) => setState({ password })} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <ContainedButton onPress={LogInWithEmail}>
                            {translate('LoginScreen.continueButton')}
                        </ContainedButton>
                    </View>

                    <View style={styles.dividier} />

                    <Text style={styles.alternative}>
                        {translate('LoginScreen.alternative')}
                    </Text>
                    <View style={styles.socialMediaLoginOptions}>
                        <View style={styles.signInButtonContainer}>
                            <SocialMediaButton
                                backgroundColor='#FFF'
                                color='rgba(0, 0, 0, .54)'
                                onPress={LogInWithGoogle}
                                Icon={Assets.svg.GoogleIcon}>
                                {translate('LoginScreen.continueWithGoogleButton')}
                            </SocialMediaButton>
                        </View>
                        <View style={styles.signInButtonContainer}>
                            <SocialMediaButton
                                backgroundColor='#3B5998'
                                color='#FFF'
                                onPress={LogInWithFacebook}
                                Icon={Assets.svg.FIconFacebookIcon}>
                                {translate('LoginScreen.continueWithFacebookButton')}
                            </SocialMediaButton>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

export default LoginScreen;
