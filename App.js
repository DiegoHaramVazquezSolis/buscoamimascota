import React from 'react';
import { View } from 'react-native';

import Grid from './src/components/simple/Grid/Grid';
import Router from './src/routers/Router';
import GlobalStyles from './src/utils/GlobalStyles';

console.disableYellowBox = true;

const App = () => (
    <View style={[GlobalStyles.flex1, { backgroundColor: '#EDF0F2' }]}>
        <Grid show={false} />
        <Router />
    </View>
);

export default App;
