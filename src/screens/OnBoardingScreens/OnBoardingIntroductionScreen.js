import React, { useState, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';

import GlobalStyles from './../../utils/GlobalStyles';
import styles from './styles';

import { ON_BOARDING_VIEWED_AS, MAIN_BOTTOM_NAVIGATOR } from '../../utils/Constants';

import { storeAsyncStorageData } from './../../utils/LocalStorage';
import { translate } from '../../services/i18n';
import { loginAnonymously } from '../../services/auth';

import CarouselOnBoardingIntroduction from './../../components/complex/CarouselOnBoardingIntroduction/CarouselOnBoardingIntroduction';
import StepsProgressIndicator from './../../components/complex/StepsProgressIndicator/StepsProgressIndicator';
import ContainedButton from './../../components/simple/ContainedButton/ContainedButton';

const OnBoardingIntroductionScreen = ({ navigation = {} }) => {
    const [ currentIndex, setState ] = useState(0);
    const [ starting, setStarting ] = useState(false);

    useEffect(() => {
        /**
         * Set the onboarding as seen, log the user with an anonymous account
         * and navigate to the principal screen
         */
        async function setInitialConfiguration() {
            storeAsyncStorageData(ON_BOARDING_VIEWED_AS, 'true');
            await loginAnonymously();
            navigation.navigate(MAIN_BOTTOM_NAVIGATOR);
        }

        if (starting) {
            setInitialConfiguration();
        }
    }, [starting]);

    /**
     * Set the current index based on scroll position of the carrousel to show on the progress icons
     *
     * @param {object} scrollEvent Event returned from onScroll method of ScrollView
     */
    const determineIndexWithScrollPosition = (scrollEvent) => {
        const scrollPosition = scrollEvent.nativeEvent.contentOffset.x;
        setState(Math.round(scrollPosition / widthPercentageToDP(100)));
    }

    /**
     * Set the staring variable to true, this action triggers the setInitialConfiguration on
     * the useEffect hook
     */
    const getStarted = async () => {
        setStarting(true);
    }

    return (
        <SafeAreaView style={[ GlobalStyles.flex1, GlobalStyles.alignItemsCenter ]}>
            <CarouselOnBoardingIntroduction determineIndexWithScrollPosition={determineIndexWithScrollPosition} />
            <View style={styles.marginButton}>
                <ContainedButton
                    size='md'
                    onPress={getStarted}
                    disabled={starting}>
                    {translate('OnBoardingIntroductionScreen.continueButton')}
                </ContainedButton>
            </View>
            <View style={[ GlobalStyles.row, styles.marginProgress] }>
                <StepsProgressIndicator steps={3} currentIndex={currentIndex} />
            </View>
        </SafeAreaView>
    );
}

export default OnBoardingIntroductionScreen;
