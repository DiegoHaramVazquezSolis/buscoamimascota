import React, { useReducer } from 'react';
import { SafeAreaView, View, Picker, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';
import GlobalStyles from '../../utils/GlobalStyles';
import { PET_INFO_LOCATION_SCREEN } from '../../utils/Constants';

import ScreenSubtitle from '../../components/simple/ScreenSubtitle/ScreenSubtitle';
import CustomTextInput from '../../components/simple/CustomTextInput/CustomTextInput';
import RadioGroup from '../../components/complex/RadioGroup/RadioGroup';
import CheckBox from '../../components/simple/CheckBox/CheckBox';
import ContainedButton from '../../components/simple/ContainedButton/ContainedButton';
import CloseRightButton from '../../components/simple/CloseRightButton/CloseRightButton';

const PetInfoFormScreen = ({ navigation }) => {
    const initialState = {
        name: '',
        sex: 'Hembra',
        specie: '',
        description: '',
        haveId: false,
        showError: false
    };

    reducer = (prevState, state) => {
        return {...prevState, ...state};
    }

    const [ state, setState ] = useReducer(reducer, initialState);

    saveAndContinue = () => {
        setState({ showError: false });
        const { name, specie, description } = state;
        if (name !== '' && specie !== '' && description !== '') {
            return navigation.navigate(PET_INFO_LOCATION_SCREEN);
        }
        setState({ showError: true });
    }

    return (
        <SafeAreaView style={[GlobalStyles.flex1, GlobalStyles.alignItemsCenter]}>
            <KeyboardAwareScrollView>
                <View style={styles.separator} />
                <ScreenSubtitle>
                    Completa la siguiente información
                </ScreenSubtitle>
                <View style={[styles.formContainer, GlobalStyles.alignItemsCenter, GlobalStyles.justifyContentCenter, GlobalStyles.flex1]}>
                    <CustomTextInput
                        placeholder='Nombre'
                        onChangeText={(name) => setState({ name })}
                        style={styles.textInput} />
                    <View style={styles.standardMargin}>
                        <RadioGroup
                            selected={state.sex}
                            options={[
                                'Hembra',
                                'Macho'
                            ]}
                            onChangeSelection={(sex) => setState({ sex })} />
                    </View>
                    <Picker
                        style={[styles.picker, styles.standardMargin]}
                        selectedValue={state.specie}
                        onValueChange={(specie) => setState({ specie })}>
                        <Picker.Item label='Especie' value='' />
                        <Picker.Item label='Perro' value='Perro' />
                        <Picker.Item label='Gato' value='Gato' />
                    </Picker>
                    <View style={styles.standardMargin}>
                        <CustomTextInput
                            placeholder='Descripción'
                            onChangeText={(description) => setState({ description })}
                            style={styles.textInput}
                            multiline
                            numberOfLines={5} />
                    </View>
                    {navigation.state.params.losted &&
                        <CheckBox
                            label='Tiene placa de identificación'
                            value={state.haveId}
                            onChange={() => setState({ haveId: !state.haveId })} />
                    }
                    <View style={[GlobalStyles.rowReverse, GlobalStyles.alignSelfEnd, styles.standardMargin]}>
                        <ContainedButton
                            size='sm'
                            onPress={saveAndContinue}>
                            Continuar
                        </ContainedButton>
                    </View>
                    {state.showError &&
                        <Text style={styles.smallText}>
                            Asegurate de haber llenado todos los campos antes de continuar.
                        </Text>
                    }
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

PetInfoFormScreen.navigationOptions = ({ navigation }) => ({
    title: '',
    headerStyle: GlobalStyles.customStackNavigatorHeaderStyle,
    headerTintColor: '#fff',
    headerRight: () => <CloseRightButton onPress={() => navigation.dismiss()} />,
    headerBackTitle: null
});

export default PetInfoFormScreen;
