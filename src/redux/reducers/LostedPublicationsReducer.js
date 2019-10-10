import { GET_LOSTED_PUBLICATION, REMOVE_LOSTED_PUBLICATION, REMOVE_ALL_LOSTED_PUBLICATIONS } from '../../utils/Constants';

const initialState = {};

function LostedPublications(state = initialState, action) {
    switch (action.type) {
        case GET_LOSTED_PUBLICATION:
            let newPublications = state;
            newPublications[action.payload.id] = action.payload;

            return { ...state, ...newPublications };
        case REMOVE_LOSTED_PUBLICATION:
            let currentPublications = state;
            delete currentPublications[action.payload];

            return { ...state, ...currentPublications };
        case REMOVE_ALL_LOSTED_PUBLICATIONS:
            let publicationsToRemove = state;
            Object.keys(publicationsToRemove).forEach((key) => {
                delete publicationsToRemove[key];
            });

            return { ...state, ...publicationsToRemove };
        default:
            return state;
    }
};

export default LostedPublications;