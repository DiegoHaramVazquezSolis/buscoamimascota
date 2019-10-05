import createNativeStackNavigator from 'react-native-screens/createNativeStackNavigator';

import { CREATE_ACCOUNT_SCREEN } from '../../utils/Constants';
import CreateAccountScreen from '../../screens/CreateAccountScreen/CreateAccountScreen';

const routesConfig = {
    [CREATE_ACCOUNT_SCREEN]: {
        screen: CreateAccountScreen,
        navigationOptions: {
            header: null
        }
    }
};

const navigatorConfig = {
    initialRouteName: CREATE_ACCOUNT_SCREEN,
    navigationOptions: {
        header: null
    }
};

export default AuthenticationStackNavigator = createNativeStackNavigator(routesConfig, navigatorConfig);