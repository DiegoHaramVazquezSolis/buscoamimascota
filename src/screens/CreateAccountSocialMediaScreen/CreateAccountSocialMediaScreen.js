import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import GlobalStyles from '../../utils/GlobalStyles';
import styles from './styles';
import SocialMediaButton from '../../components/simple/SocialMediaButton/SocialMediaButton';
import { PRIMARY_COLOR } from '../../utils/Constants';
import Assets from '../../../assets/Assets';

const CreateAccountSocialMediaScreen = () => {
    return (
        <SafeAreaView style={[GlobalStyles.flex1, GlobalStyles.alignItemsCenter]}>
            <Text style={styles.title}>
                Registrate o inicia sesión para continuar
            </Text>
            <View style={styles.contentContainer}>
                <View style={styles.signInButtonContainer}>
                    <SocialMediaButton
                        backgroundColor='#FFF'
                        color='rgba(0, 0, 0, .54)'
                        onPress={() => console.log('google')}
                        Icon={Assets.svg.GoogleIcon}>
                        Continuar con google
                    </SocialMediaButton>
                </View>
                <View style={styles.signInButtonContainer}>
                    <SocialMediaButton
                        backgroundColor='#3B5998'
                        color='#FFF'
                        onPress={() => console.log('google')}
                        Icon={Assets.svg.FIconFacebookIcon}>
                        Continuar con facebook
                    </SocialMediaButton>
                </View>
                <View style={styles.signInButtonContainer}>
                    <SocialMediaButton
                        backgroundColor={PRIMARY_COLOR}
                        color='#FFF'
                        onPress={() => console.log('google')}>
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
                    <Text style={styles.link}>
                        {' '}Inicia sesión
                    </Text>
                </Text>

            </View>
        </SafeAreaView>
    );
}

export default CreateAccountSocialMediaScreen;
