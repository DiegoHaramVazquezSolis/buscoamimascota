import React from 'react';
import { createAppContainer } from 'react-navigation';
import { connect } from 'react-redux';

import { setCurrentScreen, setPreviousScreen } from '../redux/actions/ScreensActions';

import OpenAppSwitchNavigator from './SwitchNavigators/OpenAppSwitchNavigator/OpenAppSwitchNavigator';

const AppContainer = createAppContainer(OpenAppSwitchNavigator);

/**
 * @description Returns the current screen from navigation state
 *
 * @param {Object} navigationState Navigation state object
 */
function getCurrentRouteName(navigationState) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];

    if (route.routes) {
        return getCurrentRouteName(route);
    }

    return route.routeName;
}

const Router = ({ setCurrentScreenOnRedux, setPreviousScreenOnRedux }) =>
    <AppContainer onNavigationStateChange={(prevState, currentState) => {
        const currentScreen = getCurrentRouteName(currentState);
        const previousScreen = getCurrentRouteName(prevState);

        if (currentScreen !== previousScreen) {
            setCurrentScreenOnRedux(currentScreen);
            setPreviousScreenOnRedux(previousScreen);
        }
    }} />

const mapDispatchToProps = (dispatch) => ({
    setCurrentScreenOnRedux: (screen) => dispatch(setCurrentScreen(screen)),
    setPreviousScreenOnRedux: (screen) => dispatch(setPreviousScreen(screen))
});

export default connect(null, mapDispatchToProps)(Router);