import React, { useReducer, useEffect, useRef } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_DEFAULT, Marker } from 'react-native-maps';

import GlobalStyles from '../../utils/GlobalStyles';
import styles from './styles';
import { PET_INFO_CONTACT_SCREEN } from '../../utils/Constants';

import { translate } from '../../services/i18n';

import CloseRightButton from '../../components/simple/CloseRightButton/CloseRightButton';
import ScreenSubtitle from '../../components/simple/ScreenSubtitle/ScreenSubtitle';
import ContainedButton from '../../components/simple/ContainedButton/ContainedButton';

const PetInfoLocationScreen = ({ navigation }) => {
    const map = useRef();

    const initialState = {
        location: {},
        initialRegion: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }
    };

    const reducer = (prevState, state) => {
        return {...prevState, ...state};
    }

    const [state, setState] = useReducer(reducer, initialState);

    useEffect(() => {
        Geolocation.getCurrentPosition((info) => {
            const { latitude, longitude } = info.coords;
            const region = {
                latitude,
                longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            };
            setTimeout(() => map.current.animateToRegion(region), 100);
        }, (error) => {
            console.log(error);
        });
    }, []);

    const setLastKnownLocation = ({ latitude, longitude }) => {
        setState({ location: { latitude, longitude } });
    }

    const saveAndContinue = () => {
        const { formData, losted } = navigation.state.params;
        return navigation.navigate(PET_INFO_CONTACT_SCREEN, { location: state.location, formData, losted });
    }

    return (
        <SafeAreaView style={[GlobalStyles.flex1, GlobalStyles.alignItemsCenter]}>
            <ScrollView>
                <View style={styles.separator} />
                <ScreenSubtitle>
                    {translate('PetInfoLocationScreen.subtitle')}
                </ScreenSubtitle>
                <View style={[GlobalStyles.mt12, styles.map]}>
                    <MapView
                        ref={map}
                        showsUserLocation={true}
                        provider={PROVIDER_DEFAULT}
                        style={styles.map}
                        onPress={(event) => setLastKnownLocation(event.nativeEvent.coordinate)}
                        initialRegion={state.initialRegion}>
                        {state.location.hasOwnProperty('latitude') && state.location.hasOwnProperty('longitude') &&
                            <Marker
                                coordinate={state.location}
                                title={translate('PetInfoLocationScreen.lastKnownLocation')} />
                        }
                    </MapView>
                </View>
                {state.location.hasOwnProperty('latitude') && state.location.hasOwnProperty('longitude') &&
                    <View style={[GlobalStyles.alignSelfEnd, GlobalStyles.mt24, GlobalStyles.mr16]}>
                        <ContainedButton
                            size='sm'
                            onPress={saveAndContinue}>
                            {translate('PetInfoLocationScreen.continueButton')}
                        </ContainedButton>
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
}

PetInfoLocationScreen.navigationOptions = ({ navigation }) => ({
    title: '',
    headerStyle: GlobalStyles.customStackNavigatorHeaderStyle,
    headerTintColor: '#fff',
    headerRight: () => <CloseRightButton onPress={navigation.dismiss} />,
    headerBackTitle: null
});

export default PetInfoLocationScreen;
