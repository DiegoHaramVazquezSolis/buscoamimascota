import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { PUBLICATIONS_STACK_NAVIGATOR, SECONDARY_COLOR, DISABLED_COLOR, DARK_COLOR, USER_SETTINGS_SCREEN } from './../../../utils/Constants';
import Assets from '../../../../assets/Assets';

import { translate } from '../../../services/i18n';

// Navigators
import PublicationsStackNavigator from '../../StackNavigators/PublicationsStackNavigator/PublicationsStackNavigator';

// Screens
import UserSettingsScreen from '../../../screens/UserSettingsScreen/UserSettingsScreen';

const routesConfig = {
    [PUBLICATIONS_STACK_NAVIGATOR]: {
        screen: PublicationsStackNavigator,
        navigationOptions:{
            tabBarLabel: translate('Navigators.MainBottomNavigator.PublicationsStackNavigator'),
            tabBarIcon: ({tintColor}) => <Assets.svg.PawIcon fill={tintColor} />
        }
    },
    [USER_SETTINGS_SCREEN]: {
        screen: UserSettingsScreen,
        navigationOptions:{
            tabBarLabel: translate('Navigators.MainBottomNavigator.UserSettingsScreen'),
            tabBarIcon: ({tintColor}) => <Assets.svg.SettingsIcon fill={tintColor} />
        }
    }
};

const navigatorConfig = {
    initialRouteName: PUBLICATIONS_STACK_NAVIGATOR,
    tabBarOptions: {
        activeTintColor: SECONDARY_COLOR,
        inactiveTintColor: DISABLED_COLOR,
        keyboardHidesTabBar: true,
        style: {
            backgroundColor: DARK_COLOR,
            height: 56,
            borderTopColor: DARK_COLOR
        },
        tabStyle: {
            marginTop: 8
        },
        labelStyle: {
            fontSize: 14,
            fontWeight: '200',
            letterSpacing: 1
        }
    }
};

export default MainBottomNavigator = createBottomTabNavigator(routesConfig, navigatorConfig);