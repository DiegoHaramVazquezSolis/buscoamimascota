import createNativeStackNavigator from 'react-native-screens/createNativeStackNavigator';

import { PUBLICATION_DETAILS_SCREEN } from '../../utils/Constants';
import PublicationDetailsScreen from '../../screens/PublicationDetailsScreen/PublicationDetailsScreen';

const routesConfig = {
    [PUBLICATION_DETAILS_SCREEN]: {
        screen: PublicationDetailsScreen
    }
};

export default PublicationDetailsStackNavigator = createNativeStackNavigator(routesConfig);
