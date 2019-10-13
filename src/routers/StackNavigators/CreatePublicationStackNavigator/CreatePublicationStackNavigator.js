import createNativeStackNavigator from 'react-native-screens/createNativeStackNavigator';

import { CHOOSE_PUBLICATION_TYPE_SCREEN } from '../../../utils/Constants';

import ChoosePublicationTypeScreen from '../../../screens/ChoosePublicationTypeScreen/ChoosePublicationTypeScreen';

const routesConfig = {
    [CHOOSE_PUBLICATION_TYPE_SCREEN]: {
        screen: ChoosePublicationTypeScreen
    }
};

export default CreatePublicationStackNavigator = createNativeStackNavigator(routesConfig);
