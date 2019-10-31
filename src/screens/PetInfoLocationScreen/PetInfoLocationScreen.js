import React, { useReducer, useEffect, useRef } from 'react';
import { SafeAreaView, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_DEFAULT, Marker } from 'react-native-maps';

import styles from './styles';

import CloseRightButton from '../../components/simple/CloseRightButton/CloseRightButton';
import GlobalStyles from '../../utils/GlobalStyles';
import ScreenSubtitle from '../../components/simple/ScreenSubtitle/ScreenSubtitle';
import ContainedButton from '../../components/simple/ContainedButton/ContainedButton';

const PetInfoLocationScreen = () => {
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

    reducer = (prevState, state) => {
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

    setLastKnownLocation = ({ latitude, longitude }) => {
        setState({ location: { latitude, longitude } });
    }

    return (
        <SafeAreaView style={[GlobalStyles.flex1, GlobalStyles.alignItemsCenter]}>
            <View style={styles.separator} />
            <ScreenSubtitle>
                Selecciona el lugar aproximado en donde viste a tu mascota por ultima vez
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
                            title='Ultima ubicación conocida' />
                    }
                </MapView>
            </View>
            {state.location.hasOwnProperty('latitude') && state.location.hasOwnProperty('longitude') &&
                <View style={[GlobalStyles.alignSelfEnd, GlobalStyles.mt24, GlobalStyles.mr16]}>
                    <ContainedButton
                        size='sm'>
                        Continuar
                    </ContainedButton>
                </View>
            }
        </SafeAreaView>
    );
}

PetInfoLocationScreen.navigationOptions = ({ navigation }) => ({
    title: '',
    headerStyle: GlobalStyles.customStackNavigatorHeaderStyle,
    headerTintColor: '#fff',
    headerRight: () => <CloseRightButton onPress={() => navigation.dismiss()} />,
    headerBackTitle: null
});

export default PetInfoLocationScreen;
