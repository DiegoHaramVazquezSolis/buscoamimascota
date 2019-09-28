import React, { useReducer } from 'react';
import { Share, View, FlatList } from 'react-native';

import styles from './styles';
import PublicationCard from '../PublicationCard/PublicationCard';
import { createDynamicLink } from '../../../services/dynamicLinks';

const PublicationList = ({ publications }) => {

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
                        lastChild={index + 1 === Object.keys(publications).length} />
                )} />
        </View>
    );
}

export default PublicationList;
