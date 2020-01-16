import React, { useRef, useReducer } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import GlobalStyles from '../../utils/GlobalStyles';
import styles from './styles';
import Assets from '../../../assets/Assets';
import { PET_INFO_IMAGE_SCREEN } from '../../utils/Constants';

import { translate } from '../../services/i18n';

import ScreenSubtitle from '../../components/simple/ScreenSubtitle/ScreenSubtitle';
import CustomTextInput from '../../components/simple/CustomTextInput/CustomTextInput';
import CloseRightButton from '../../components/simple/CloseRightButton/CloseRightButton';
import ContainedButton from '../../components/simple/ContainedButton/ContainedButton';

const PetInfoContactScreen = ({ navigation }) => {
    const mobilePhoneRef = useRef();
    const homePhoneRef = useRef();

    const initialState = {
        whatsapp: '',
        cellphone: '',
        phone: ''
    };

    reducer = (prevState, state) => {
        return {...prevState, ...state};
    }

    const [ state, setState ] = useReducer(reducer, initialState);

    const saveAndContinue = () => {
        const { formData, location, losted } = navigation.state.params;
        return navigation.navigate(PET_INFO_IMAGE_SCREEN, { contact: state, formData, location, losted });
    }

    return (
        <SafeAreaView style={[GlobalStyles.flex1, GlobalStyles.alignItemsCenter]}>
            <KeyboardAwareScrollView>
                <View style={styles.separator} />
                <ScreenSubtitle>
                    {translate('PetInfoContactScreen.subtitle')}
                </ScreenSubtitle>
                <View style={[GlobalStyles.alignItemsCenter, GlobalStyles.justifyContentCenter, GlobalStyles.flex1, styles.formContainer]}>
                    <CustomTextInput
                        Icon={Assets.svg.WhatsappIcon}
                        placeholder={translate('PetInfoContactScreen.whatsappPlaceholder')}
                        style={[GlobalStyles.mt24, styles.textInput]}
                        keyboardType='phone-pad'
                        onSubmitEditing={() => mobilePhoneRef.current.focus()}
                        onChangeText={(whatsapp) => setState({ whatsapp })} />
                    <CustomTextInput
                        Icon={Assets.svg.MobileIcon}
                        placeholder={translate('PetInfoContactScreen.cellphonePlaceholder')}
                        style={[GlobalStyles.mt24, styles.textInput]}
                        keyboardType='phone-pad'
                        reference={mobilePhoneRef}
                        onSubmitEditing={() => homePhoneRef.current.focus()}
                        onChangeText={(cellphone) => setState({ cellphone })} />
                    <CustomTextInput
                        Icon={Assets.svg.PhoneIcon}
                        placeholder={translate('PetInfoContactScreen.phonePlaceholder')}
                        style={[GlobalStyles.mt24, styles.textInput]}
                        keyboardType='phone-pad'
                        reference={homePhoneRef}
                        onChangeText={(phone) => setState({ phone })} />
                    <Text style={[GlobalStyles.mt12, styles.smallText]}>
                        {translate('PetInfoContactScreen.smallText')}
                    </Text>
                    <View style={[GlobalStyles.rowReverse, GlobalStyles.alignSelfEnd]}>
                        <ContainedButton
                            size='sm'
                            onPress={saveAndContinue}>
                            {translate('PetInfoContactScreen.continueButton')}
                        </ContainedButton>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

PetInfoContactScreen.navigationOptions = ({ navigation }) => ({
    title: '',
    headerStyle: GlobalStyles.customStackNavigatorHeaderStyle,
    headerTintColor: '#fff',
    headerRight: () => <CloseRightButton onPress={navigation.dismiss} />,
    headerBackTitle: null
});

export default PetInfoContactScreen;
