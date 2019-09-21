import { useEffect } from 'react';
import Orientation from 'react-native-orientation-locker';

import { getData } from './../../utils/LocalStorage';
import { ON_BOARDING, MAIN_BOTTOM_NAVIGATOR, ON_BOARDING_VIEWED_AS } from '../../utils/Constants';

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
            if(await getData(ON_BOARDING_VIEWED_AS) === 'true'){
                Orientation.lockToPortrait();
                navigation.navigate(MAIN_BOTTOM_NAVIGATOR);
            } else {
                navigation.navigate(ON_BOARDING);
            }
        }
        checkOnBoarding();
    }, []);

    return (
        null
    );
}

export default LoadingDataScreen;
