import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { View } from 'react-native';

import { PUBLICATIONS_STACK_NAVIGATOR, SECONDARY_COLOR, DISABLED_COLOR, DARK_COLOR } from './../../utils/Constants';

// Navigators
import PublicationsStackNavigator from '../PublicationsStackNavigator/PublicationsStackNavigator';

// Screens
import Mock1 from './../../screens/Mock1';

const routesConfig = {
    [PUBLICATIONS_STACK_NAVIGATOR]: {
        screen: PublicationsStackNavigator,
        navigationOptions:{
            tabBarLabel:'Mascotas',
            tabBarIcon:({tintColor}) => <View style={{ marginTop: 8, height: 24, width: 24, backgroundColor: tintColor, borderRadius: 100 }} />
        }
    },
    Mock2: {
        screen: Mock1,
        navigationOptions:{
            tabBarLabel:'Home 2',
            tabBarIcon:({tintColor}) => <View style={{ marginTop: 8, height: 24, width: 24, backgroundColor: tintColor, borderRadius: 100 }} />
        }
    }
};

const navigatorConfig = {
    initialRouteName: PUBLICATIONS_STACK_NAVIGATOR,
    tabBarOptions: {
        activeTintColor: SECONDARY_COLOR,
        inactiveTintColor: DISABLED_COLOR,
        keyboardHidesTabBar: false,
        style: {
            backgroundColor: DARK_COLOR,
            height: 56
        },
        labelStyle: {
            fontSize: 14,
            fontWeight: '200',
            letterSpacing: 1
        }
    }
};

export default MainBottomNavigator = createBottomTabNavigator(routesConfig, navigatorConfig);