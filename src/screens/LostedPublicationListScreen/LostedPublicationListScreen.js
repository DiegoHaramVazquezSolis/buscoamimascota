import React from 'react';
import { SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import GlobalStyles from '../../utils/GlobalStyles';
import { AUTHENTICATION_STACK_NAVIGATOR, CREATE_PUBLICATION_STACK_NAVIGATOR } from '../../utils/Constants';
import Assets from '../../../assets/Assets';

import PublicationList from '../../components/complex/PublicationsList/PublicationList';
import UserLocationDialog from '../../components/complex/UserLocationDialog/UserLocationDialog';
import FloatingActionButton from '../../components/simple/FloatingActionButton/FloatingActionButton';

const LostedPublicationListScreen = ({ isLoggedUser, navigation, lostedPublications = {}, fetched = false }) => {

    return (
        <SafeAreaView style={[GlobalStyles.flex1, GlobalStyles.alignItemsCenter]}>
            {fetched &&
                <PublicationList
                    losted
                    publications={lostedPublications} />
            }
            {/* Look for user permision to use their location
            <UserLocationDialog
                visible={openLocationDialog}
                onClose={() => setOpenLocationDialog(false)} /> */}
            <FloatingActionButton
                Icon={Assets.svg.AddIcon}
                onPress={() => navigation.navigate(isLoggedUser ? CREATE_PUBLICATION_STACK_NAVIGATOR : AUTHENTICATION_STACK_NAVIGATOR, { losted: true })} />
        </SafeAreaView>
    );
}

mapStateToProps = (state) => ({
    lostedPublications: state.LostedPublications,
    fetched: Object.keys(state.LostedPublications).length > 0,
    isLoggedUser: state.User.isLogged
});

export default connect(mapStateToProps)(LostedPublicationListScreen);
