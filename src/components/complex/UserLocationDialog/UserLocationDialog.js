import React, { useReducer, useEffect } from 'react';
import { Picker, View, Text } from 'react-native';
import { connect } from 'react-redux';

import Dialog from '../../simple/Dialog/Dialog';
import ContainedButton from '../../simple/ContainedButton/ContainedButton';
import styles from './styles';
import { storeAsyncStorageData } from '../../../utils/LocalStorage';
import { USER_COUNTRY_AS, USER_CITY_AS, USER_REGION_AS, BATTUTA_API_KEY } from '../../../utils/Constants';
import { removeAllPublicationsSuccess, getLostedPublications } from '../../../redux/actions/LostedPublicationsActions';

const UserLocationDialog = ({ visible = '', onClose = () => {}, removeAllPublications = () => {}, loadPublicationsWithCityAndCountry = () => {} }) => {
    const initialState = {
        countries: {},
        selectedCountry: '',
        regions: [],
        selectedRegion: '',
        cities: [],
        selectedCity: ''
    };

    /**
     * Update the state
     * 
     * @param {object} prevState Previous value of the state
     * @param {object} state New values to update on state
     */
    reducer = (prevState, state) => {
        return {...prevState, ...state};
    }

    const [ state, setState ] = useReducer(reducer, initialState);

    useEffect(() => {

        /**
         * Load the countries names and codes from country.io API and sort it to show it to the user
         */
        async function loadCountrysData() {
            try {
                const unorderedCountrys = await (await fetch('http://country.io/names.json')).json();
                let countries = {};
                Object.keys(unorderedCountrys).sort((a, b) => unorderedCountrys[b] < unorderedCountrys[a]).forEach(function(countryKey) {
                    countries[countryKey] = unorderedCountrys[countryKey];
                });

                return setState({ countries });
            } catch (error) {
                console.error(error);
            }
        }
        loadCountrysData();
    }, []);

    async function selectACountry(selectedCountry) {
        try {
            const regions = await (await fetch(`http://battuta.medunes.net/api/region/${selectedCountry}/all/?key=${BATTUTA_API_KEY}`)).json();
            setState({ selectedCountry, regions });
        } catch (error) {
            console.error(error);
        }
    }

    async function selectARegion(selectedRegion) {
        try {
            const cities = await (await fetch(`http://battuta.medunes.net/api/city/mx/search/?region=${selectedRegion}&key=${BATTUTA_API_KEY}`)).json();
            setState({ selectedRegion, cities: cities || [] });
        } catch (error) {
            console.error(error);
        }
    }

    async function saveUserLocation() {
        try {
            await storeAsyncStorageData(USER_COUNTRY_AS, state.selectedCountry);
            await storeAsyncStorageData(USER_REGION_AS, state.selectedRegion);
            if (state.cities.length > 0 && state.cities !== '') {
                await storeAsyncStorageData(USER_CITY_AS, state.selectedCity);
            }
            removeAllPublications();
            loadPublicationsWithCityAndCountry();
            onClose();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Dialog
            visible={visible}
            title='Bienvenido'
            description='Selecciona tu pais, estado y cuidad para continuar'>
            <Picker
                selectedValue={state.selectedCountry}
                onValueChange={selectACountry}
                style={styles.pickerStyle}>
                <Picker.Item label='Selecciona tu pais' value='' />
                {Object.keys(state.countries).map((countryKey) => (
                    <Picker.Item
                        key={countryKey}
                        label={state.countries[countryKey]}
                        value={countryKey} />
                ))}
            </Picker>
            {state.selectedCountry !== '' &&
                <Picker
                    selectedValue={state.selectedRegion}
                    onValueChange={selectARegion}
                    style={styles.pickerStyle}>
                    <Picker.Item label='Selecciona tu region (estado)' value='' />
                    {state.regions.map((region) => (
                        <Picker.Item
                            key={region.region}
                            label={region.region}
                            value={region.region} />
                    ))}
                </Picker>
            }
            {(state.selectedCountry !== '' && state.selectedRegion !== '' && state.cities.length > 0) &&
                <Picker
                    selectedValue={state.selectedCity}
                    onValueChange={(selectedCity) => setState({ selectedCity })}
                    style={styles.pickerStyle}>
                    <Picker.Item label='Selecciona tu ciudad o provincia' value='' />
                    {state.cities.map((city) => (
                        <Picker.Item
                            key={city.city}
                            label={city.city}
                            value={city.city} />
                    ))}
                </Picker>
            }
            <Text style={styles.footerInfo}>
                Esta información sera utilizada unicamente para mostrarte publicaciones y noticias relevante para ti.
            </Text>
            <View style={styles.buttonContainer}>
                {(state.selectedCountry !== '' && state.selectedRegion !== '' && (state.cities.length <= 0 || state.selectedCity !== '')) &&
                    <ContainedButton onPress={saveUserLocation}>
                        Listo, continuar
                    </ContainedButton>
                }
            </View>
        </Dialog>
    );
}

mapDispatchToProps = (dispatch) => ({
    removeAllPublications: () => dispatch(removeAllPublicationsSuccess()),
    loadPublicationsWithCityAndCountry: () => dispatch(getLostedPublications())
});

export default connect(null, mapDispatchToProps)(UserLocationDialog);
