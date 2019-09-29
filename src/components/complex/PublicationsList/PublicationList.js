import React from 'react';
import { Share, View, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';

import styles from './styles';
import PublicationCard from '../PublicationCard/PublicationCard';
import { createDynamicLink } from '../../../services/dynamicLinks';
import { PUBLICATION_DETAILS_SCREEN } from '../../../utils/Constants';

const PublicationList = ({ navigation = {}, publications = {} }) => {

    /**
     * Send the user to publication details screen and send the related
     * params of the selected pet
      @param {string} id Identifier of the publication on the database
     */
    onPublicationPress = (id) => {
        navigation.navigate(PUBLICATION_DETAILS_SCREEN, { ...publications[id] });
    }

    /**
     * Set the selected pet and open the share publication dialog
     * @param {string} id Identifier of the publication on the database
     */
    onSharePress = async (id) => {
        Share.share({
            message: await createDynamicLink({ type: 'losted', id }),
            title: 'Compartir publicación'
        });
    }

    return (
        <View style={styles.listStyle}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={Object.keys(publications).map((key) => (publications[key]))}
                initialNumToRender={5}
                keyExtractor={(item) => (`Publication-${item.id}`)}
                renderItem={({ item, index }) => (
                    <PublicationCard
                        key={item.id}
                        {...item}
                        onSharePress={onSharePress}
                        onPublicationPress={onPublicationPress}
                        lastChild={index + 1 === Object.keys(publications).length} />
                )} />
        </View>
    );
}

export default withNavigation(PublicationList);
