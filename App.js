import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { useScreens } from 'react-native-screens';

import GlobalStyles from './src/utils/GlobalStyles';

import { PRIMARY_COLOR } from './src/utils/Constants';

import store, { configureStore } from './src/redux/configureStore';

import Grid from './src/components/simple/Grid/Grid';
import Router from './src/routers/Router';

console.disableYellowBox = true;

useScreens();
configureStore();

const App = () => (
    <Provider store={store}>
        <View style={[GlobalStyles.flex1, { backgroundColor: '#EDF0F2' }]}>
            <Grid show={false} />
            <StatusBar backgroundColor={PRIMARY_COLOR} />
            <Router />
        </View>
    </Provider>
);

export default App;