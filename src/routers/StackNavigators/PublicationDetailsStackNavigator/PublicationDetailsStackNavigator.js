import createNativeStackNavigator from 'react-native-screens/createNativeStackNavigator';

import { PUBLICATION_DETAILS_SCREEN, PUBLICATION_DETAILS_LOCATION_SCREEN } from '../../../utils/Constants';

import PublicationDetailsScreen from '../../../screens/PublicationDetailsScreen/PublicationDetailsScreen';
import PublicationDetailsLocationScreen from '../../../screens/PublicationDetailsLocationScreen/PublicationDetailsLocationScreen';

const routesConfig = {
    [PUBLICATION_DETAILS_SCREEN]: {
        screen: PublicationDetailsScreen
    },
    [PUBLICATION_DETAILS_LOCATION_SCREEN]: {
        screen: PublicationDetailsLocationScreen
    }
};

const navigatorConfig = {
    initialRouteName: PUBLICATION_DETAILS_SCREEN
};

export default PublicationDetailsStackNavigator = createNativeStackNavigator(routesConfig, navigatorConfig);
