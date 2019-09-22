import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';

import GlobalStyles from './../../utils/GlobalStyles';
import CarouselOnBoardingIntroduction from './../../components/complex/CarouselOnBoardingIntroduction/CarouselOnBoardingIntroduction';
import StepsProgressIndicator from './../../components/complex/StepsProgressIndicator/StepsProgressIndicator';
import { storeAsyncStorageData } from './../../utils/LocalStorage';
import ContainedButton from './../../components/simple/ContainedButton/ContainedButton';
import styles from './styles';
import { ON_BOARDING_VIEWED_AS, MAIN_BOTTOM_NAVIGATOR } from '../../utils/Constants';

const OnBoardingIntroductionScreen = ({ navigation = {} }) => {  
    const [ currentIndex, setState ] = useState(0);

    /**
     * Set the current index based on scroll position of the carrousel to show on the progress icons
     * 
     * @param {object} scrollEvent Event returned from onScroll method of ScrollView
     */
    determineIndexWithScrollPosition = (scrollEvent) => {
        const scrollPosition = scrollEvent.nativeEvent.contentOffset.x;
        setState(Math.round(scrollPosition / widthPercentageToDP(100)));
    }

    /**
     * Set the onboarding as seen an navigate to the principal screen
     */
    getStarted = () => {
        storeAsyncStorageData(ON_BOARDING_VIEWED_AS, 'true');
        navigation.navigate(MAIN_BOTTOM_NAVIGATOR);
    }


    return (
        <SafeAreaView style={[ GlobalStyles.flex1, GlobalStyles.alignItemsCenter ]}>
            <CarouselOnBoardingIntroduction determineIndexWithScrollPosition={determineIndexWithScrollPosition} />
            <View style={styles.marginButton}>
                <ContainedButton size='md' onPress={getStarted}>
                    Comenzar ahora
                </ContainedButton>
            </View>
            <View style={[ GlobalStyles.row, styles.marginProgress] }>
                <StepsProgressIndicator steps={3} currentIndex={currentIndex} />
            </View>
        </SafeAreaView>
    );
}

export default OnBoardingIntroductionScreen;
