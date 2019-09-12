import React from 'react';
import { SafeAreaView } from 'react-native';

import GlobalStyles from '../../utils/GlobalStyles';
import PublicationList from '../../components/complex/PublicationsList/PublicationList';

const LostedPublicationListScreen = () => (
    <SafeAreaView style={[GlobalStyles.flex1, GlobalStyles.alignItemsCenter]}>
        <PublicationList />
    </SafeAreaView>
);

export default LostedPublicationListScreen;
