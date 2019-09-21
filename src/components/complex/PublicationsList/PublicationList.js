import React from 'react';
import { View, FlatList } from 'react-native';

import styles from './styles';
import PublicationCard from '../PublicationCard/PublicationCard';

const PublicationList = ({ publications }) => {
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
                        lastChild={index + 1 === Object.keys(publications).length} />
                )} />
        </View>
    );
}

export default PublicationList;
