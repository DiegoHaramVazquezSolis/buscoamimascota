import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import { SECONDARY_COLOR, DISABLED_COLOR, PRIMARY_COLOR, LOSTED_PUBLICATIONS_LIST_SCREEN, ADOPTION_PUBLICATIONS_LIST_SCREEN } from '../../../utils/Constants';

// Screens
import LostedPublicationListScreen from '../../../screens/LostedPublicationListScreen/LostedPublicationListScreen';
import AdoptionPublicationListScreen from '../../../screens/AdoptionPublicationListScreen/AdoptionPublicationListScreen';

const routesConfig = {
    [LOSTED_PUBLICATIONS_LIST_SCREEN]: {
        screen: LostedPublicationListScreen,
        navigationOptions: {
            tabBarLabel:'Perdidas',
        }
    },
    [ADOPTION_PUBLICATIONS_LIST_SCREEN]: {
        screen: AdoptionPublicationListScreen,
        navigationOptions:{
            tabBarLabel:'En Adopción',
        }
    }
};

const navigatorConfig = {
    initialRouteName: LOSTED_PUBLICATIONS_LIST_SCREEN,
    lazy: true,
    tabBarOptions: {
        activeTintColor: '#FFF',
        inactiveTintColor: DISABLED_COLOR,
        backBehavior: 'order',
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
