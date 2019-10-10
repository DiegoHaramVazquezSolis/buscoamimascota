import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import GlobalStyles from '../../utils/GlobalStyles';

import { USER_COUNTRY_AS, USER_REGION_AS } from '../../utils/Constants';

import { getAsyncStorageData } from '../../utils/LocalStorage';

import PublicationList from '../../components/complex/PublicationsList/PublicationList';
import UserLocationDialog from '../../components/complex/UserLocationDialog/UserLocationDialog';
import FloatingActionButton from '../../components/simple/FloatingActionButton/FloatingActionButton';
import Assets from '../../../assets/Assets';

const LostedPublicationListScreen = ({ navigation, lostedPublications = {}, fetched = false }) => {
    const [ openLocationDialog, setOpenLocationDialog ] = useState(false);

    useEffect(() => {

        /**
         * Check if the user has already defined their country and city
         */
        async function loadUserLocation() {
            try {
                const country = await getAsyncStorageData(USER_COUNTRY_AS);
                const region = await getAsyncStorageData(USER_REGION_AS);

                if (!country && !region) {
                    setOpenLocationDialog(true);
                }
            } catch (error) {
                console.error(error);
            }
        }
        loadUserLocation();
    }, []);

    return (
        <SafeAreaView style={[GlobalStyles.flex1, GlobalStyles.alignItemsCenter]}>
            {fetched &&
                <PublicationList
                    losted
                    publications={lostedPublications} />
            }
            <UserLocationDialog
                visible={openLocationDialog}
                onClose={() => setOpenLocationDialog(false)} />
            <FloatingActionButton
                Icon={Assets.svg.AddIcon}
                onPress={() => navigation.navigate('Nowhere')} />
        </SafeAreaView>
    );
}

mapStateToProps = (state) => ({
    lostedPublications: state.LostedPublications,
    fetched: Object.keys(state.LostedPublications).length > 0
});

export default connect(mapStateToProps)(LostedPublicationListScreen);
