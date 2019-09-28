import { useEffect } from 'react';
import Orientation from 'react-native-orientation-locker';

import { getAsyncStorageData } from './../../utils/LocalStorage';
import { ON_BOARDING_SCREEN, MAIN_BOTTOM_NAVIGATOR, ON_BOARDING_VIEWED_AS } from '../../utils/Constants';
import { firebaseLinks } from '../../services/firebase';

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
            if(await getAsyncStorageData(ON_BOARDING_VIEWED_AS) === 'true'){
                Orientation.lockToPortrait();

                const initialLink = await firebaseLinks.getInitialLink();
                if (initialLink) {
                    console.log('Initial link:', initialLink);
                }
                navigation.navigate(MAIN_BOTTOM_NAVIGATOR);
            } else {
                navigation.navigate(ON_BOARDING_SCREEN);
            }
        }
        checkOnBoarding();
    }, []);

    return (
        null
    );
}

export default LoadingDataScreen;
