import { createSwitchNavigator } from 'react-navigation';

import OnBoardingIntroductionScreen from './../../screens/OnBoardingScreens/OnBoardingIntroductionScreen'
import LoadingDataScreen from './../../screens/LoadingDataScreen/LoadingDataScreen';
import MainBottomNavigator from './../MainBottomNavigator/MainBottomNavigator';

const routesConfig = {
    LoadingDataScreen,
    OnBoardingIntroductionScreen,
    MainBottomNavigator
};

const navigatorConfig = {
    initialRouteName: 'LoadingDataScreen'
};

export default OpenAppSwitchNavigator = createSwitchNavigator(routesConfig, navigatorConfig);