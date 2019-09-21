import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import { SECONDARY_COLOR, DISABLED_COLOR, PRIMARY_COLOR, LOSTED_PUBLICATIONS_LIST_SCREEN } from '../../utils/Constants';

// Screens
import Mock1 from '../../screens/Mock1';
import LostedPublicationListScreen from '../../screens/LostedPublicationListScreen/LostedPublicationListScreen';

const routesConfig = {
    [LOSTED_PUBLICATIONS_LIST_SCREEN]: {
        screen: LostedPublicationListScreen,
        navigationOptions: {
            tabBarLabel:'Perdidas',
        }
    },
    Mock2: {
        screen: Mock1,
        navigationOptions:{
            tabBarLabel:'En Adopción',
        }
    }
};

const navigatorConfig = {
    initialRouteName: LOSTED_PUBLICATIONS_LIST_SCREEN,
    tabBarOptions: {
        activeTintColor: '#FFF',
        inactiveTintColor: DISABLED_COLOR,
        style: {
            backgroundColor: PRIMARY_COLOR
        },
        labelStyle: {
            marginTop: 24,
            textAlignVertical: 'bottom',
            fontSize: 18
        },
        indicatorStyle: {
            backgroundColor: SECONDARY_COLOR
        }
    }
};

export default PetsTopTabNavigator = createMaterialTopTabNavigator(routesConfig, navigatorConfig);
