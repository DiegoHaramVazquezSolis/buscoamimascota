import React, { useReducer } from 'react';
import { Share, View, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';

import styles from './styles';
import PublicationCard from '../PublicationCard/PublicationCard';
import { createDynamicLink } from '../../../services/dynamicLinks';
import { PUBLICATION_DETAILS_SCREEN } from '../../../utils/Constants';
import PublicationContactDialog from '../PublicationContactDialog/PublicationContactDialog';
import CreateReportDialog from '../CreateReportDialog/CreateReportDialog';

const PublicationList = ({ navigation = {}, publications = {}, losted = true }) => {
    const initialState = {
        openContactDialog: false,
        openReportDialog: false,
        selectedPet: {}
    };

    reducer = (prevState, nextState) => {
        return { ...prevState, ...nextState };
    }

    const [ state, setState ] = useReducer(reducer, initialState);

    /**
     * Send the user to publication details screen and send the related
     * params of the selected pet
      @param {string} id Identifier of the publication on the database
     */
    onPublicationPress = (id) => {
        navigation.navigate(PUBLICATION_DETAILS_SCREEN, { ...publications[id], losted });
    }

    /**
     * Set the selected pet and open the share publication dialog
     * @param {string} id Identifier of the publication on the database
     */
    onSharePress = async (id) => {
        Share.share({
            message: await createDynamicLink({ type: losted ? 'losted' : 'adoption', id }),
            title: 'Compartir publicación'
        });
    }

    /**
     * Open the contact dialog and set the selected pet (to show the right info)
     * @param {string} id Identifier of the publication on the database
     */
    onContactPress = async (id) => {
        setState({ openContactDialog: true, selectedPet: publications[id] });
    }

    onReportPress = (id) => {
        setState({ openReportDialog: true, selectedPet: publications[id] });
    }

    return (
        <View style={styles.listStyle}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={Object.keys(publications).sort((a, b) => publications[a].timeStamp < publications[b].timeStamp).map((key) => (publications[key]))}
                initialNumToRender={5}
                keyExtractor={(item) => (`Publication-${item.id}`)}
                renderItem={({ item, index }) => (
                    <PublicationCard
                        key={item.id}
                        {...item}
                        onSharePress={onSharePress}
                        onContactPress={onContactPress}
                        onPublicationPress={onPublicationPress}
                        onReportPress={onReportPress}
                        lastChild={index + 1 === Object.keys(publications).length} />
                )} />
            <PublicationContactDialog
                visible={state.openContactDialog}
                contactInfo={state.selectedPet.contact}
                onClose={() => setState({ openContactDialog: false })} />
            <CreateReportDialog
                visible={state.openReportDialog}
                publicationId={state.selectedPet.id}
                onClose={() => setState({ openReportDialog: false })} />
        </View>
    );
};

export default withNavigation(PublicationList);
