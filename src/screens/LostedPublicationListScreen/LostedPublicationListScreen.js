import React from 'react';
import { SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import GlobalStyles from '../../utils/GlobalStyles';
import PublicationList from '../../components/complex/PublicationsList/PublicationList';

const LostedPublicationListScreen = ({ lostedPublications, fetched }) => (
    <SafeAreaView style={[GlobalStyles.flex1, GlobalStyles.alignItemsCenter]}>
        {fetched &&
            <PublicationList publications={lostedPublications} />
        }
    </SafeAreaView>
);

mapStateToProps = (state) => ({
    lostedPublications: state.LostedPublications,
    fetched: Object.keys(state.LostedPublications).length > 0
});

export default connect(mapStateToProps)(LostedPublicationListScreen);
