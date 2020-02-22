import React, { useEffect, useState } from 'react';
import { BackHandler, SafeAreaView, Text, View } from 'react-native';
import { connect } from 'react-redux';

import GlobalStyles from '../../utils/GlobalStyles';
import styles from './styles';

import {
    PRIMARY_COLOR,
    CREATE_ACCOUNT_EMAIL_SCREEN,
    LOGIN_SCREEN,
    USER_SETTINGS_SCREEN,
    LOSTED_PUBLICATIONS_LIST_SCREEN,
    CREATE_ACCOUNT_SOCIAL_MEDIA_SCREEN
} from '../../utils/Constants';
import Assets from '../../../assets/Assets';

import { loginWithFacebook, setupGoogleSignin, loginWithGoogle } from '../../services/auth';
import { translate } from '../../services/i18n';

import SocialMediaButton from '../../components/simple/SocialMediaButton/SocialMediaButton';
import ScreenTitle from '../../components/simple/ScreenTitle/ScreenTitle';

const CreateAccountSocialMediaScreen = ({ navigation, screens }) => {
    const [previousScreen, setPreviousScreen] = useState('');

    useEffect(() => {
        setupGoogleSignin();

        let backHandler;
        if (screens.previous === USER_SETTINGS_SCREEN || screens.current === USER_SETTINGS_SCREEN) {
            setPreviousScreen(USER_SETTINGS_SCREEN);
        }

        if (previousScreen === USER_SETTINGS_SCREEN) {
            backHandler = BackHandler.addEventListener('hardwareBackPress', androidBackButton);
        }

        if (backHandler && screens.current === LOGIN_SCREEN || screens.current === CREATE_ACCOUNT_EMAIL_SCREEN) {
            try {
                backHandler.remove();
            } catch (error) {
                console.log(error);
            }
        }

        return function clean() {
            if (backHandler) {
                try {
                    backHandler.remove();
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }, [previousScreen, screens]);

    const androidBackButton = () => {
        if (screens.current === CREATE_ACCOUNT_SOCIAL_MEDIA_SCREEN) {
            navigation.navigate(LOSTED_PUBLICATIONS_LIST_SCREEN);

            return true;
        }
    }

    const signInWithGoogle = async () => {
        handleSignIn(await loginWithGoogle());
    }

    const signInWithFacebook = async () => {
        handleSignIn(await loginWithFacebook());
    }

    const handleSignIn = (user) => {
        if (user && user.user) {
            navigation.dismiss();
        }
    }

    return (
        <SafeAreaView style={[GlobalStyles.flex1, GlobalStyles.alignItemsCenter]}>
            <ScreenTitle>
                {translate('CreateAccountSocialMediaScreen.title')}
            </ScreenTitle>
            <View style={styles.contentContainer}>
                <View style={styles.signInButtonContainer}>
                    <SocialMediaButton
                        backgroundColor='#FFF'
                        color='rgba(0, 0, 0, .54)'
                        onPress={signInWithGoogle}
                        Icon={Assets.svg.GoogleIcon}>
                        {translate('CreateAccountSocialMediaScreen.continueWithGoogleButton')}
                    </SocialMediaButton>
                </View>
                <View style={styles.signInButtonContainer}>
                    <SocialMediaButton
                        backgroundColor='#3B5998'
                        color='#FFF'
                        onPress={signInWithFacebook}
                        Icon={Assets.svg.FIconFacebookIcon}>
                        {translate('CreateAccountSocialMediaScreen.continueWithFacebookButton')}
                    </SocialMediaButton>
                </View>
                <View style={styles.signInButtonContainer}>
                    <SocialMediaButton
                        backgroundColor={PRIMARY_COLOR}
                        color='#FFF'
                        onPress={() => navigation.navigate(CREATE_ACCOUNT_EMAIL_SCREEN)}>
                        {translate('CreateAccountSocialMediaScreen.continueWithEmailButton')}
                    </SocialMediaButton>
                </View>

                <View style={styles.advertismentContainer}>
                    <Text style={styles.advertismentText}>
                        {translate('CreateAccountSocialMediaScreen.advertisment.firstPart')}
                        <Text style={styles.link}>
                            {` ${translate('CreateAccountSocialMediaScreen.advertisment.firstLink')}`}
                        </Text>
                        {` ${translate('CreateAccountSocialMediaScreen.advertisment.secondPart')}`}
                        <Text style={styles.link}>
                            {` ${translate('CreateAccountSocialMediaScreen.advertisment.secondLink')}`}
                        </Text>
                        {` ${translate('CreateAccountSocialMediaScreen.advertisment.thirdPart')}`}
                    </Text>
                </View>

                <View style={styles.dividier} />

                <Text style={styles.haveAccount}>
                    {translate('CreateAccountSocialMediaScreen.alreadyHaveAccount.text')}
                    <Text style={styles.link} onPress={() => navigation.navigate(LOGIN_SCREEN)}>
                        {` ${translate('CreateAccountSocialMediaScreen.alreadyHaveAccount.link')}`}
                    </Text>
                </Text>

            </View>
        </SafeAreaView>
    );
}

const mapStateToProps = (state) => ({
    screens: state.Screens
});

export default connect(mapStateToProps)(CreateAccountSocialMediaScreen);
