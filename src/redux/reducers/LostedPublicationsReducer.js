import { GET_LOSTED_PUBLICATION } from '../../utils/Constants';

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
            let lostedPublications = state;
            lostedPublications[action.payload.id] = action.payload;

            return { ...state, ...lostedPublications };
        default:
            
            return state;
      }
};

export default LostedPublications;