import createNativeStackNavigator from 'react-native-screens/createNativeStackNavigator';

import { CREATE_ACCOUNT_SOCIAL_MEDIA_SCREEN, CREATE_ACCOUNT_EMAIL_SCREEN, LOGIN_SCREEN } from '../../utils/Constants';
import CreateAccountSocialMediaScreen from '../../screens/CreateAccountSocialMediaScreen/CreateAccountSocialMediaScreen';
import CreateAccountEmailScreen from '../../screens/CreateAccountEmailScreen/CreateAccountEmailScreen';
import LoginScreen from '../../screens/LoginScreen/LoginScreen';

const routesConfig = {
    [CREATE_ACCOUNT_SOCIAL_MEDIA_SCREEN]: {
        screen: CreateAccountSocialMediaScreen,
        navigationOptions: {
            header: null
        }
    },
    [CREATE_ACCOUNT_EMAIL_SCREEN]: {
        screen: CreateAccountEmailScreen,
        navigationOptions: {
            header: null
        }
    },
    [LOGIN_SCREEN]: {
        screen: LoginScreen,
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
