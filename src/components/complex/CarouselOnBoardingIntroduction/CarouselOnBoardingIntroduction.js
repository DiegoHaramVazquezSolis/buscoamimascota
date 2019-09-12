import React from 'react';
import { View, ScrollView } from 'react-native';

import Assets from '../../../../assets/Assets';
import OnBoardingScreenTemplate from './OnBoardingScreenTemplate';
import styles from './styles';

const CarouselOnBoardingIntroduction = ({ determineIndexWithScrollPosition }) => (
    <View style={styles.carouselHeight}>
        <ScrollView
            horizontal
            pagingEnabled 
            onScroll={determineIndexWithScrollPosition}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flexGrow1}>
                <OnBoardingScreenTemplate
                    Icon={Assets.svg.HomeIcon}
                    title='Busca'
                    description='Publica a tu mascota para que otras personas te ayuden a buscarla.' />
                <OnBoardingScreenTemplate
                    Icon={Assets.svg.FootPrintIcon}
                    title='Encuentra'
                    description='Ayuda a buscar mascotas perdidas en tu colonia o ciudad.' />
                <OnBoardingScreenTemplate
                    Icon={Assets.svg.DonateIcon}
                    title='Dona'
                    description='Las donaciones nos ayudan a seguir operando, ademas se usan para apoyar a las mascotas adoptadas a traves de la app.' />
        </ScrollView>
    </View>
)

export default CarouselOnBoardingIntroduction;
