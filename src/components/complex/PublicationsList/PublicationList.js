import React from 'react';
import { View, FlatList } from 'react-native';

import styles from './styles';
import PublicationCard from '../PublicationCard/PublicationCard';

const PublicationList = () => {
    return (
        <View style={styles.listStyle}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={[
                    {id: 'dsa', name: 'Misifus', city: 'Puebla de Zaragozaddddddd',
                        description: 'ES UN PERRO BEAGLE DE 4 AÑOS DE EDAD TRI COLOR BASTANTE TIMIDO, LADRA CUANDO ESTA ASUSTADO PERO NO MUERDE, POR FAVOR AYUDENME A ENCONTRARLO, SE OFRECE RECOMPENSA $$$'},
                    {id: 'dsad',name: 'Kenji', city: 'Guadalajara', description: 'Es un perro beagle de 4 años de edad tri color bastante timido, ladra cuando esta asustado pero no muerde, por favor ayudenme a encontrarlo, se ofrece recompensa $$$'},
                    {id: 'dsadf',name: 'Brunonuvinsdknvds', city: 'Guadalajara'},
                    {id: 'dsavdsv',name: 'Goofy', city: 'Guadalajara'},
                    {id: 'dsavsdv',name: 'Garfield', city: 'Guadalajara'},
                    {id: 'dsaxfdf',name: 'Pacheco', city: 'Guadalajara'}
                ]}
                keyExtractor={(item) => (`Publication-${item.id}`)}
                renderItem={({ item, index }) => (
                    <PublicationCard {...item} lastChild={index === 5} />
                )} />
        </View>
    );
}

export default PublicationList;
