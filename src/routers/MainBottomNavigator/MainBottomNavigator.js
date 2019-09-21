import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { View } from 'react-native';

import { SECONDARY_COLOR, DISABLED_COLOR, DARK_COLOR, PETS_TOP_TAB_NAVIGATOR } from './../../utils/Constants';

// Navigators
import PetsTopTabNavigator from '../PetsTopTabNavigator/PetsTopTabNavigator';

// Screens
import Mock1 from './../../screens/Mock1';

const routesConfig = {
    [PETS_TOP_TAB_NAVIGATOR]: {
        screen: PetsTopTabNavigator,
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
    initialRouteName: PETS_TOP_TAB_NAVIGATOR,
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