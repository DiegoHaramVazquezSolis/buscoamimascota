import { createStackNavigator } from 'react-navigation-stack';

import { MAIN_BOTTOM_NAVIGATOR, AUTHENTICATION_STACK_NAVIGATOR } from '../../utils/Constants';
import MainBottomNavigator from '../MainBottomNavigator/MainBottomNavigator';
import AuthenticationStackNavigator from '../AuthenticationStackNavigator/AuthenticationStackNavigator';

const routesConfig = {
    [MAIN_BOTTOM_NAVIGATOR]: {
        screen: MainBottomNavigator,
        navigationOptions: {
            header: null
        }
    },
    [AUTHENTICATION_STACK_NAVIGATOR]: {
        screen: AuthenticationStackNavigator,
        navigationOptions: {
            header: null
        }
    }
};

const navigatorConfig = {
    initialRouteName: MAIN_BOTTOM_NAVIGATOR,
    navigationOptions: {
        header: null
    }
};

export default AppStackNavigator = createStackNavigator(routesConfig, navigatorConfig);
