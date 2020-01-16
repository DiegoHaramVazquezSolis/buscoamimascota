import React, { useReducer } from 'react';
import { Alert, SafeAreaView, View, Picker } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';
import GlobalStyles from '../../utils/GlobalStyles';
import { PET_INFO_LOCATION_SCREEN } from '../../utils/Constants';

import { translate } from '../../services/i18n';

import ScreenSubtitle from '../../components/simple/ScreenSubtitle/ScreenSubtitle';
import CustomTextInput from '../../components/simple/CustomTextInput/CustomTextInput';
import RadioGroup from '../../components/complex/RadioGroup/RadioGroup';
import CheckBox from '../../components/simple/CheckBox/CheckBox';
import ContainedButton from '../../components/simple/ContainedButton/ContainedButton';
import CloseRightButton from '../../components/simple/CloseRightButton/CloseRightButton';

const PetInfoFormScreen = ({ navigation }) => {
    const initialState = {
        name: '',
        sex: translate('PetInfoFormScreen.female'),
        specie: '',
        description: '',
        haveId: false
    };

    reducer = (prevState, state) => {
        return {...prevState, ...state};
    }

    const [ state, setState ] = useReducer(reducer, initialState);

    const losted = navigation.state.params.losted;

    const saveAndContinue = () => {
        setState({ showError: false });
        const { name, specie, description } = state;
        if (name !== '' && specie !== '' && description !== '') {
            return navigation.navigate(PET_INFO_LOCATION_SCREEN, { formData: state, losted });
        } else {
            Alert.alert(
                translate('PetInfoFormScreen.errorMessage.title'),
                translate('PetInfoFormScreen.errorMessage.description'),
                [
                    { text: translate('PetInfoFormScreen.errorMessage.acceptButton') },
                ]
            );
        }
    }

    return (
        <SafeAreaView style={[GlobalStyles.flex1, GlobalStyles.alignItemsCenter]}>
            <KeyboardAwareScrollView>
                <View style={styles.separator} />
                <ScreenSubtitle>
                    {translate('PetInfoFormScreen.subtitle')}
                </ScreenSubtitle>
                <View style={[styles.formContainer, GlobalStyles.alignItemsCenter, GlobalStyles.justifyContentCenter, GlobalStyles.flex1]}>
                    <CustomTextInput
                        placeholder={translate('PetInfoFormScreen.namePlaceholder')}
                        onChangeText={(name) => setState({ name })}
                        style={styles.textInput} />
                    <View style={styles.standardMargin}>
                        <RadioGroup
                            selected={state.sex}
                            options={[
                                translate('PetInfoFormScreen.female'),
                                translate('PetInfoFormScreen.male')
                            ]}
                            onChangeSelection={(sex) => setState({ sex })} />
                    </View>
                    <Picker
                        style={[styles.picker, styles.standardMargin]}
                        selectedValue={state.specie}
                        onValueChange={(specie) => setState({ specie })}>
                        <Picker.Item label={translate('PetInfoFormScreen.pickerOptions.species')} value='' />
                        <Picker.Item label={translate('PetInfoFormScreen.pickerOptions.dog')} value='dog' />
                        <Picker.Item label={translate('PetInfoFormScreen.pickerOptions.cat')} value='cat' />
                    </Picker>
                    <View style={styles.standardMargin}>
                        <CustomTextInput
                            placeholder={translate('PetInfoFormScreen.descriptionPlaceholder')}
                            onChangeText={(description) => setState({ description })}
                            style={styles.textInput}
                            multiline
                            numberOfLines={5} />
                    </View>
                    {losted &&
                        <CheckBox
                            label={translate('PetInfoFormScreen.haveIdLabel')}
                            value={state.haveId}
                            onChange={() => setState({ haveId: !state.haveId })} />
                    }
                    <View style={[GlobalStyles.rowReverse, GlobalStyles.alignSelfEnd, styles.standardMargin]}>
                        <ContainedButton
                            size='sm'
                            onPress={saveAndContinue}>
                            {translate('PetInfoFormScreen.continueButton')}
                        </ContainedButton>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

PetInfoFormScreen.navigationOptions = ({ navigation }) => ({
    title: '',
    headerStyle: GlobalStyles.customStackNavigatorHeaderStyle,
    headerTintColor: '#fff',
    headerRight: () => <CloseRightButton onPress={navigation.dismiss} />,
    headerBackTitle: null
});

export default PetInfoFormScreen;
