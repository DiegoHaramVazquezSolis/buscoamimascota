import { useEffect } from 'react';
import Orientation from 'react-native-orientation-locker';

import { getAsyncStorageData } from './../../utils/LocalStorage';
import { ON_BOARDING_SCREEN, ON_BOARDING_VIEWED_AS, APP_STACK_NAVIGATOR } from '../../utils/Constants';
import { firebaseDynamicLinksGenerator } from '../../services/firebase';

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

                const initialLink = await firebaseDynamicLinksGenerator.getInitialLink();
                if (initialLink) {
                    console.log('Initial link:', initialLink);
                }
                navigation.navigate(APP_STACK_NAVIGATOR);
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
