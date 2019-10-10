import { createSwitchNavigator } from 'react-navigation';

import OnBoardingIntroductionScreen from './../../screens/OnBoardingScreens/OnBoardingIntroductionScreen'
import LoadingDataScreen from './../../screens/LoadingDataScreen/LoadingDataScreen';
import { LOADING_DATA_SCREEN, ON_BOARDING_SCREEN, APP_STACK_NAVIGATOR } from '../../utils/Constants';
import AppStackNavigator from '../AppStackNavigator/AppStackNavigator';

const routesConfig = {
    [LOADING_DATA_SCREEN]: LoadingDataScreen,
    [ON_BOARDING_SCREEN]: OnBoardingIntroductionScreen,
    [APP_STACK_NAVIGATOR]: AppStackNavigator,
};

const navigatorConfig = {
    initialRouteName: LOADING_DATA_SCREEN
};

export default OpenAppSwitchNavigator = createSwitchNavigator(routesConfig, navigatorConfig);
