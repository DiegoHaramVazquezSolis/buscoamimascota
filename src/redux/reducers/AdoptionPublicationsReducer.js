import { GET_ADOPTION_PUBLICATION, REMOVE_ADOPTION_PUBLICATION, REMOVE_ALL_ADOPTION_PUBLICATIONS } from '../../utils/Constants';

const initialState = {};

function AdoptionPublications(state = initialState, action) {
    switch (action.type) {
        case GET_ADOPTION_PUBLICATION:
            let newPublications = state;
            newPublications[action.payload.id] = action.payload;

            return { ...state, ...newPublications };
        case REMOVE_ADOPTION_PUBLICATION:
            let currentPublications = state;
            delete currentPublications[action.payload];

            return { ...state, ...currentPublications };
        case REMOVE_ALL_ADOPTION_PUBLICATIONS:
            let publicationsToRemove = state;
            Object.keys(publicationsToRemove).forEach((key) => {
                delete publicationsToRemove[key];
            });

            return { ...state, ...publicationsToRemove };
        default:
            return state;
    }
};

export default AdoptionPublications;