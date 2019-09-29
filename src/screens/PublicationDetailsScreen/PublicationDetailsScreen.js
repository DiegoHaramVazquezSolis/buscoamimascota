import React from 'react';
import { SafeAreaView, Image, View, ScrollView, Text } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import CheckBox from '@react-native-community/checkbox';

import styles from './styles';
import GlobalStyles from '../../utils/GlobalStyles';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../utils/Constants';
import ContainedButton from '../../components/simple/ContainedButton/ContainedButton';
import OutlinedButton from '../../components/simple/OutlinedButton/OutlinedButton';
import Chip from '../../components/simple/Chip/Chip';
import PublicationDetailsRightButtons from '../../components/simple/PublicationDetailsRightButtons/PublicationDetailsRightButtons';

const PublicationDetailsScreen = ({ navigation, type = 'Perdido' }) => {
    const { image, lossPoint, contact, city, region, specie, sex, description, haveId } = navigation.state.params;

    return (
        <SafeAreaView style={[GlobalStyles.flex1, GlobalStyles.alignItemsCenter]}>
            <Image
                style={styles.imageStyle}
                source={{ uri: image }} />
            <View style={styles.buttoToolbar}>
                <OutlinedButton size='sm'>Ultima Ubicación</OutlinedButton>
                <View style={styles.buttonSeparator} />
                <ContainedButton size='sm'>Contactar</ContainedButton>
            </View>
            <View style={styles.chipsContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}>
                    <Chip tag>{city ? city : region}</Chip>
                    <Chip tag>{specie}</Chip>
                    <Chip tag>{sex}</Chip>
                    <Chip tag>{type}</Chip>
                </ScrollView>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>{description.split('/n').map((paragraph) => `${paragraph.trim()}\n`)}</Text>
            </View>
            <View style={styles.checkBoxContainer}>
                <CheckBox value={haveId} disabled tintColors={{ true: SECONDARY_COLOR }} />
                <Text style={styles.checkBoxLabel}>Tiene placa de identificación</Text>
            </View>
        </SafeAreaView>
    );
}

PublicationDetailsScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
    headerStyle: {
        backgroundColor: PRIMARY_COLOR,
        height: heightPercentageToDP(10)
    },
    headerRight: () => <PublicationDetailsRightButtons />,
    headerTintColor: '#fff',
    headerBackTitle: null,
    headerTitleStyle: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: .2
    }
});

export default PublicationDetailsScreen;
