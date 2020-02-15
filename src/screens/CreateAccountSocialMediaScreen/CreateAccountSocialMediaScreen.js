import React, { useEffect } from 'react';
import { BackHandler, SafeAreaView, Text, View } from 'react-native';
import { connect } from 'react-redux';

import GlobalStyles from '../../utils/GlobalStyles';
import styles from './styles';

import { PRIMARY_COLOR, CREATE_ACCOUNT_EMAIL_SCREEN, LOGIN_SCREEN, USER_SETTINGS_SCREEN, LOSTED_PUBLICATIONS_LIST_SCREEN } from '../../utils/Constants';
import Assets from '../../../assets/Assets';

import { loginWithFacebook, setupGoogleSignin, loginWithGoogle } from '../../services/auth';
import { translate } from '../../services/i18n';

import SocialMediaButton from '../../components/simple/SocialMediaButton/SocialMediaButton';
import ScreenTitle from '../../components/simple/ScreenTitle/ScreenTitle';

const CreateAccountSocialMediaScreen = ({ navigation, screens }) => {
    useEffect(() => {
        setupGoogleSignin();

        const backHandler = BackHandler.addEventListener('hardwareBackPress', androidBackButton);

        return function clean(){
            backHandler.remove();
        }
    }, []);

    const androidBackButton = () => {
        /**
         * For some reason sometimes when you come from another screen to settings and then open
         * this screen (because you are not logged) the current screens is USER_SETTINGS_SCREEN, thats why
         * we use the second condition on the if
         */
        if (screens.previous === USER_SETTINGS_SCREEN || screens.current === USER_SETTINGS_SCREEN) {
            navigation.navigate(LOSTED_PUBLICATIONS_LIST_SCREEN);

            return true;
        }

        return false;
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

mapStateToProps = ({ Screens }) => ({
    screens: Screens
});

export default connect(mapStateToProps)(CreateAccountSocialMediaScreen);
