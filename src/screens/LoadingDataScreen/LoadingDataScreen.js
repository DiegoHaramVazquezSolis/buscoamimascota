import { useEffect } from 'react';
import Orientation from 'react-native-orientation';

import { getData } from './../../utils/LocalStorage';

const LoadingDataScreen = ({ navigation }) => {

    /**
     * Determine what screen show when the user open the app
     */
    useEffect(() => {
        async function checkOnBoarding() {
            /**
             * On the first time (after installation) the user must be
             * the onboarding, in any other initialization of the app
             * the user must be redirected to the MainBottomNavigator
             */
            if(await getData('on_boarding_viewed') === 'true'){
                Orientation.lockToPortrait();
                navigation.navigate('MainBottomNavigator');
            } else {
                navigation.navigate('OnBoardingIntroductionScreen');
            }
        }
        checkOnBoarding();
    }, []);

    return (
        null
    );
}

export default LoadingDataScreen;
