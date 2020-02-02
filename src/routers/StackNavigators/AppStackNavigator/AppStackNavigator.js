import { createStackNavigator } from 'react-navigation-stack';

import { MAIN_BOTTOM_NAVIGATOR, AUTHENTICATION_STACK_NAVIGATOR, CREATE_PUBLICATION_STACK_NAVIGATOR, PUBLICATION_DETAILS_STACK_NAVIGATOR } from '../../../utils/Constants';

import MainBottomNavigator from '../../BottomTabNavigators/MainBottomNavigator/MainBottomNavigator';

import AuthenticationStackNavigator from '../AuthenticationStackNavigator/AuthenticationStackNavigator';
import CreatePublicationStackNavigator from '../CreatePublicationStackNavigator/CreatePublicationStackNavigator';
import PublicationDetailsStackNavigator from '../PublicationDetailsStackNavigator/PublicationDetailsStackNavigator';

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
    },
    [CREATE_PUBLICATION_STACK_NAVIGATOR]: {
        screen: CreatePublicationStackNavigator,
        navigationOptions: {
            header: null
        }
    },
    [PUBLICATION_DETAILS_STACK_NAVIGATOR]: {
        screen: PublicationDetailsStackNavigator,
        navigationOptions: {
            header: null
        }
    }
};

const navigatorConfig = {
    initialRouteName: MAIN_BOTTOM_NAVIGATOR
};

export default AppStackNavigator = createStackNavigator(routesConfig, navigatorConfig);
