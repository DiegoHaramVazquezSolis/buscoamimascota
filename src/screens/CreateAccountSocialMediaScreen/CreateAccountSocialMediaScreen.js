import React, { useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import GlobalStyles from '../../utils/GlobalStyles';
import styles from './styles';

import { PRIMARY_COLOR, CREATE_ACCOUNT_EMAIL_SCREEN, LOGIN_SCREEN } from '../../utils/Constants';
import Assets from '../../../assets/Assets';

import { loginWithFacebook, setupGoogleSignin, loginWithGoogle } from '../../services/auth';

import SocialMediaButton from '../../components/simple/SocialMediaButton/SocialMediaButton';
import ScreenTitle from '../../components/simple/ScreenTitle/ScreenTitle';

const CreateAccountSocialMediaScreen = ({ navigation }) => {
    useEffect(() => {
        setupGoogleSignin();
    }, []);

    signInWithGoogle = async () => {
        await loginWithGoogle();
        navigation.navigate(navigation.state.params.returnTo);
    }

    signInWithFacebook = async () => {
        await loginWithFacebook();
        navigation.navigate(navigation.state.params.returnTo);
    }

    return (
        <SafeAreaView style={[GlobalStyles.flex1, GlobalStyles.alignItemsCenter]}>
            <ScreenTitle>
                Registrate o inicia sesión para continuar
            </ScreenTitle>
            <View style={styles.contentContainer}>
                <View style={styles.signInButtonContainer}>
                    <SocialMediaButton
                        backgroundColor='#FFF'
                        color='rgba(0, 0, 0, .54)'
                        onPress={signInWithGoogle}
                        Icon={Assets.svg.GoogleIcon}>
                        Continuar con google
                    </SocialMediaButton>
                </View>
                <View style={styles.signInButtonContainer}>
                    <SocialMediaButton
                        backgroundColor='#3B5998'
                        color='#FFF'
                        onPress={signInWithFacebook}
                        Icon={Assets.svg.FIconFacebookIcon}>
                        Continuar con facebook
                    </SocialMediaButton>
                </View>
                <View style={styles.signInButtonContainer}>
                    <SocialMediaButton
                        backgroundColor={PRIMARY_COLOR}
                        color='#FFF'
                        onPress={() => navigation.navigate(CREATE_ACCOUNT_EMAIL_SCREEN, { returnTo: navigation.state.params.returnTo })}>
                        Registrarte con tu correo
                    </SocialMediaButton>
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

                <View style={styles.dividier} />

                <Text style={styles.haveAccount}>
                    ¿Ya tienes una cuenta?
                    <Text style={styles.link} onPress={() => navigation.navigate(LOGIN_SCREEN, { returnTo: navigation.state.params.returnTo })}>
                        {' '}Inicia sesión
                    </Text>
                </Text>

            </View>
        </SafeAreaView>
    );
}

export default CreateAccountSocialMediaScreen;
