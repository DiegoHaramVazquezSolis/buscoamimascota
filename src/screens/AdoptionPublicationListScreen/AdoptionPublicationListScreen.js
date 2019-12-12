import React from 'react';
import { SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import GlobalStyles from '../../utils/GlobalStyles';
import { AUTHENTICATION_STACK_NAVIGATOR, CREATE_PUBLICATION_STACK_NAVIGATOR } from '../../utils/Constants';
import Assets from '../../../assets/Assets';

import PublicationList from '../../components/complex/PublicationsList/PublicationList';
import FloatingActionButton from '../../components/simple/FloatingActionButton/FloatingActionButton';

const AdoptionPublicationListScreen = ({ isLoggedUser, navigation, adoptionPublications = {}, fetched = false }) => {
    return (
        <SafeAreaView style={[GlobalStyles.flex1, GlobalStyles.alignItemsCenter]}>
            {fetched &&
                <PublicationList
                    losted={false}
                    publications={adoptionPublications} />
            }
            <FloatingActionButton
                Icon={Assets.svg.AddIcon}
                onPress={() => navigation.navigate(isLoggedUser ? CREATE_PUBLICATION_STACK_NAVIGATOR : AUTHENTICATION_STACK_NAVIGATOR, { losted: false })} />
        </SafeAreaView>
    );
}

mapStateToProps = (state) => ({
    adoptionPublications: state.AdoptionPublications,
    fetched: Object.keys(state.AdoptionPublications).length > 0,
    isLoggedUser: state.User.isLogged
});

export default connect(mapStateToProps)(AdoptionPublicationListScreen);