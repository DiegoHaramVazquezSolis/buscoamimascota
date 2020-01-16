import React from 'react';
import { View, ScrollView } from 'react-native';

import Assets from '../../../../assets/Assets';
import styles from './styles';

import { translate } from '../../../services/i18n';

import OnBoardingScreenTemplate from './OnBoardingScreenTemplate';

const CarouselOnBoardingIntroduction = ({ determineIndexWithScrollPosition = () => {} }) => (
    <View style={styles.carouselHeight}>
        <ScrollView
            horizontal
            pagingEnabled
            onScroll={determineIndexWithScrollPosition}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flexGrow1}>
                <OnBoardingScreenTemplate
                    Icon={Assets.svg.HomeIcon}
                    title={translate('CarouselOnBoardingIntroduction.search.title')}
                    description={translate('CarouselOnBoardingIntroduction.search.description')} />
                <OnBoardingScreenTemplate
                    Icon={Assets.svg.FootPrintIcon}
                    title={translate('CarouselOnBoardingIntroduction.find.title')}
                    description={translate('CarouselOnBoardingIntroduction.find.description')} />
                <OnBoardingScreenTemplate
                    Icon={Assets.svg.DonateIcon}
                    title={translate('CarouselOnBoardingIntroduction.donate.title')}
                    description={translate('CarouselOnBoardingIntroduction..donate.description')} />
        </ScrollView>
    </View>
)

export default CarouselOnBoardingIntroduction;
