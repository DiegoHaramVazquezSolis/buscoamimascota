import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { useScreens } from 'react-native-screens';

import GlobalStyles from './src/utils/GlobalStyles';

import { PRIMARY_COLOR } from './src/utils/Constants';

import store, { configureStore } from './src/redux/configureStore';
import { setCurrentScreen, setPreviousScreen } from './src/redux/actions/ScreensActions';

import Grid from './src/components/simple/Grid/Grid';
import Router from './src/routers/Router';

console.disableYellowBox = true;

useScreens();
configureStore();

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

const App = () => (
    <Provider store={store}>
        <View style={[GlobalStyles.flex1, { backgroundColor: '#EDF0F2' }]}>
            <Grid show={false} />
            <StatusBar backgroundColor={PRIMARY_COLOR} />
            <Router onNavigationStateChange={(prevState, currentState) => {
                const currentScreen = getCurrentRouteName(currentState);
                const previousScreen = getCurrentRouteName(prevState);

                if (currentScreen !== previousScreen) {
                    setCurrentScreen(currentScreen)(store.dispatch);
                    setPreviousScreen(previousScreen)(store.dispatch);
                }
            }} />
        </View>
    </Provider>
);

export default App;