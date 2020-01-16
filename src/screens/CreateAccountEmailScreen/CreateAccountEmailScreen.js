import React, { useReducer, useRef } from 'react';
import { Alert, SafeAreaView, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import GlobalStyles from '../../utils/GlobalStyles';
import styles from './styles';

import { signInWithEmail } from '../../services/auth';
import { translate } from './../../services/i18n';

import CustomTextInput from '../../components/simple/CustomTextInput/CustomTextInput';
import ContainedButton from '../../components/simple/ContainedButton/ContainedButton';
import ScreenTitle from '../../components/simple/ScreenTitle/ScreenTitle';

const CreateAccountEmailScreen = ({ navigation }) => {
    let passwordRef = useRef();
    let confirmPasswordRef = useRef();

    const initialState = {
        email: '',
        password: '',
        confirmPassword: ''
    };

    const reducer = (prevState, nextState) => {
        return { ...prevState, ...nextState };
    }

    const [ state, setState ] = useReducer(reducer, initialState);

    const createAccountWithEmail = async () => {
        const { email, password, confirmPassword } = state;
        if (email !== '' && password !== '' && confirmPassword !== '') {
            if (password === confirmPassword) {
                try {
                    await signInWithEmail(email, password);
                    navigation.dismiss();
                } catch (error) {
                    console.log(error);
                }
            } else {
                Alert.alert(
                    translate('CreateAccountEmailScreen.errorMessage.passwordError.title'),
                    translate('CreateAccountEmailScreen.errorMessage.passwordError.description'),
                    [
                        { text: translate('CreateAccountEmailScreen.errorMessage.passwordError.acceptButton') }
                    ]
                );
            }
        } else {
            Alert.alert(
                translate('CreateAccountEmailScreen.errorMessage.emptyFieldsError.title'),
                translate('CreateAccountEmailScreen.errorMessage.emptyFieldsError.description'),
                [
                    { text: translate('CreateAccountEmailScreen.errorMessage.emptyFieldsError.acceptButton') }
                ]
            );
        }
    }

    return (
        <SafeAreaView style={[GlobalStyles.flex1, GlobalStyles.alignItemsCenter]}>
            <ScreenTitle>
                {translate('CreateAccountEmailScreen.title')}
            </ScreenTitle>
            <KeyboardAwareScrollView>
                <View style={styles.contentContainer}>
                    <View style={styles.fieldContainer}>
                        <CustomTextInput
                            keyboardType='email-address'
                            onSubmitEditing={() => passwordRef.current.focus()}
                            placeholder={translate('CreateAccountEmailScreen.emailPlaceholder')}
                            onChangeText={(email) => setState({ email })}
                            returnKeyType='next' />
                    </View>
                    <View style={styles.fieldContainer}>
                        <CustomTextInput
                            reference={passwordRef}
                            onSubmitEditing={() => confirmPasswordRef.current.focus()}
                            secureTextEntry
                            placeholder={translate('CreateAccountEmailScreen.passwordPlaceholder')}
                            onChangeText={(password) => setState({ password })}
                            returnKeyType='next' />
                    </View>
                    <View style={styles.fieldContainer}>
                        <CustomTextInput
                            reference={confirmPasswordRef}
                            secureTextEntry
                            placeholder={translate('CreateAccountEmailScreen.confirmPasswordPlaceholder')}
                            onChangeText={(confirmPassword) => setState({ confirmPassword })}
                            onSubmitEditing={createAccountWithEmail} />
                    </View>

                    <View style={styles.advertismentContainer}>
                        <Text style={styles.advertismentText}>
                            {translate('CreateAccountEmailScreen.advertisment.firstPart')}
                            <Text style={styles.link}>
                                {` ${translate('CreateAccountEmailScreen.advertisment.firstLink')}`}
                            </Text>
                            {` ${translate('CreateAccountEmailScreen.advertisment.secondPart')}`}
                            <Text style={styles.link}>
                                {` ${translate('CreateAccountEmailScreen.advertisment.secondLink')}`}
                            </Text>
                            {` ${translate('CreateAccountEmailScreen.advertisment.thirdPart')}`}
                        </Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <ContainedButton onPress={createAccountWithEmail}>
                            {translate('CreateAccountEmailScreen.continueButton')}
                        </ContainedButton>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

export default CreateAccountEmailScreen;
