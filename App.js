import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { useScreens } from 'react-native-screens';

import Grid from './src/components/simple/Grid/Grid';
import Router from './src/routers/Router';
import GlobalStyles from './src/utils/GlobalStyles';
import { configureStore } from './src/redux/configureStore';

console.disableYellowBox = true;

useScreens();

const App = () => (
    <Provider store={configureStore()}>
        <View style={[GlobalStyles.flex1, { backgroundColor: '#EDF0F2' }]}>
            <Grid show={false} />
            <Router />
        </View>
    </Provider>
);

export default App;
