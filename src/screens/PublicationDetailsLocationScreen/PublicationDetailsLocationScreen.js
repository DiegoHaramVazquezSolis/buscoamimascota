import React, { useRef, useEffect } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import MapView, { PROVIDER_DEFAULT, Marker } from 'react-native-maps';

import GlobalStyles from '../../utils/GlobalStyles';
import styles from './styles';
import { PRIMARY_COLOR } from '../../utils/Constants';

import { heightPercentageToDP } from 'react-native-responsive-screen';
import { translate } from '../../services/i18n';

import ScreenSubtitle from '../../components/simple/ScreenSubtitle/ScreenSubtitle';
import PublicationDetailsRightButtons from '../../components/simple/PublicationDetailsRightButtons/PublicationDetailsRightButtons';

const PublicationDetailsLocationScreen = ({ navigation }) => {
    const map = useRef();
    const { losted, location, name } = navigation.state.params;

    useEffect(() => {
        const region = {
            latitude: location._latitude,
            longitude: location._longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
        };
        setTimeout(() => map.current.animateToRegion(region), 100);
    }, []);

    return (
        <SafeAreaView style={[GlobalStyles.flex1, GlobalStyles.alignItemsCenter]}>
            <View style={styles.separator} />
            <ScreenSubtitle>
                {losted ?
                    translate('PublicationDetailsLocationScreen.subtitleLosted', { name })
                    :
                    translate('PublicationDetailsLocationScreen.subtitleAdoption', { name })
                }
            </ScreenSubtitle>
            <View style={[GlobalStyles.mt12, styles.map]}>
                <MapView
                    ref={map}
                    showsUserLocation={true}
                    provider={PROVIDER_DEFAULT}
                    style={styles.map}
                    initialRegion={{ latitude: location._latitude, longitude: location._longitude, latitudeDelta: 0.005, longitudeDelta: 0.005 }}>
                    <Marker
                        coordinate={{ latitude: location._latitude, longitude: location._longitude, latitudeDelta: 0.005, longitudeDelta: 0.005 }}
                        title={translate('PublicationDetailsLocationScreen.lastKnownLocation', { name })} />
                </MapView>
            </View>
        </SafeAreaView>
    );
}

PublicationDetailsLocationScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
    headerStyle: {
        backgroundColor: PRIMARY_COLOR
    },
    headerRight: () => <PublicationDetailsRightButtons navigation={navigation} {...navigation.state.params} />,
    headerTintColor: '#fff',
    headerBackTitle: null,
    headerTitleStyle: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: .2
    }
});

export default PublicationDetailsLocationScreen;
