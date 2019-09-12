import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';

import GlobalStyles from './../../utils/GlobalStyles';
import CarouselOnBoardingIntroduction from './../../components/complex/CarouselOnBoardingIntroduction/CarouselOnBoardingIntroduction';
import StepsProgressIndicator from './../../components/complex/StepsProgressIndicator/StepsProgressIndicator';
import { storeData } from './../../utils/LocalStorage';
import ContainedButton from './../../components/simple/ContainedButton/ContainedButton';
import styles from './styles';

const OnBoardingIntroductionScreen = ({ navigation = {} }) => {  
    const [ currentIndex, setState ] = useState(0);

    /**
     * @description Set the current index based on scroll position of the carrousel to show on the progress icons
     * @param {object} scrollEvent Event returned from onScroll method of ScrollView
     */
    determineIndexWithScrollPosition = (scrollEvent) => {
        const scrollPosition = scrollEvent.nativeEvent.contentOffset.x;
        setState(Math.round(scrollPosition / widthPercentageToDP(100)));
    }

    /**
     * @description Set the onboarding as seen an navigate to the principal screen
     */
    getStarted = () => {
        storeData('on_boarding_viewed', 'true');
        navigation.navigate('MainBottomNavigator');
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
