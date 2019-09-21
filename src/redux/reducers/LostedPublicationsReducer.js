import { GET_LOSTED_PUBLICATION, REMOVE_LOSTED_PUBLICATION } from '../../utils/Constants';

const initialState = {};

/**
 * Reducer for losted pets publications
 * 
 * @param {object} state Global state of the app
 * @param {object} action Called action (object with type and payload)
 */
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
        default:

            return state;
    }
};

export default LostedPublications;