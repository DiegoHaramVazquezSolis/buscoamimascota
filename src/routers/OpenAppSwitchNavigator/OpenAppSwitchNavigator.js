import { createSwitchNavigator } from 'react-navigation';

import OnBoardingIntroductionScreen from './../../screens/OnBoardingScreens/OnBoardingIntroductionScreen'
import LoadingDataScreen from './../../screens/LoadingDataScreen/LoadingDataScreen';
import MainBottomNavigator from './../MainBottomNavigator/MainBottomNavigator';
import { LOADING_DATA_SCREEN, ON_BOARDING_SCREEN, MAIN_BOTTOM_NAVIGATOR } from '../../utils/Constants';

const routesConfig = {
    [LOADING_DATA_SCREEN]: LoadingDataScreen,
    [ON_BOARDING_SCREEN]: OnBoardingIntroductionScreen,
    [MAIN_BOTTOM_NAVIGATOR]: MainBottomNavigator
};

const navigatorConfig = {
    initialRouteName: LOADING_DATA_SCREEN
};

export default OpenAppSwitchNavigator = createSwitchNavigator(routesConfig, navigatorConfig);