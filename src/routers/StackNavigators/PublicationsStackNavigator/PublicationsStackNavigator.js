import createNativeStackNavigator from 'react-native-screens/createNativeStackNavigator';

import { PETS_TOP_TAB_NAVIGATOR, PUBLICATION_DETAILS_SCREEN } from '../../../utils/Constants';

import PetsTopTabNavigator from '../../TopTabNavigators/PetsTopTabNavigator/PetsTopTabNavigator';

import PublicationDetailsScreen from '../../../screens/PublicationDetailsScreen/PublicationDetailsScreen';

const routesConfig = {
    [PETS_TOP_TAB_NAVIGATOR]: {
        screen: PetsTopTabNavigator,
        navigationOptions: {
            header: null
        }
    },
    [PUBLICATION_DETAILS_SCREEN]: {
        screen: PublicationDetailsScreen
    }
};

const navigatorConfig = {
    headerMode: 'screen'
};

export default PublicationsStackNavigator = createNativeStackNavigator(routesConfig, navigatorConfig);
