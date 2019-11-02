import createNativeStackNavigator from 'react-native-screens/createNativeStackNavigator';

import { CHOOSE_PUBLICATION_TYPE_SCREEN, PET_INFO_FORM_SCREEN, PET_INFO_LOCATION_SCREEN, PET_INFO_CONTACT_SCREEN } from '../../../utils/Constants';

import ChoosePublicationTypeScreen from '../../../screens/ChoosePublicationTypeScreen/ChoosePublicationTypeScreen';
import PetInfoFormScreen from '../../../screens/PetInfoFormScreen/PetInfoFormScreen';
import PetInfoLocationScreen from '../../../screens/PetInfoLocationScreen/PetInfoLocationScreen';
import PetInfoContactScreen from '../../../screens/PetInfoContactScreen/PetInfoContactScreen';

const routesConfig = {
    [CHOOSE_PUBLICATION_TYPE_SCREEN]: {
        screen: ChoosePublicationTypeScreen
    },
    [PET_INFO_FORM_SCREEN]: {
        screen: PetInfoFormScreen
    },
    [PET_INFO_LOCATION_SCREEN]: {
        screen: PetInfoLocationScreen
    },
    [PET_INFO_CONTACT_SCREEN]: {
        screen: PetInfoContactScreen
    }
};

export default CreatePublicationStackNavigator = createNativeStackNavigator(routesConfig);
