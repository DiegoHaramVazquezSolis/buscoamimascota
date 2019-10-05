import createNativeStackNavigator from 'react-native-screens/createNativeStackNavigator';

import { CREATE_ACCOUNT_SOCIAL_MEDIA_SCREEN } from '../../utils/Constants';
import CreateAccountSocialMediaScreen from '../../screens/CreateAccountSocialMediaScreen/CreateAccountSocialMediaScreen';

const routesConfig = {
    [CREATE_ACCOUNT_SOCIAL_MEDIA_SCREEN]: {
        screen: CreateAccountSocialMediaScreen,
        navigationOptions: {
            header: null
        }
    }
};

const navigatorConfig = {
    initialRouteName: CREATE_ACCOUNT_SOCIAL_MEDIA_SCREEN,
    navigationOptions: {
        header: null
    }
};

export default AuthenticationStackNavigator = createNativeStackNavigator(routesConfig, navigatorConfig);