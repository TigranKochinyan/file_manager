// import { FileTypes } from "../../../types/file";
// import { FolderTypes } from "../../../types/folder";

export function curentItemReducer(state = {}, action) {
    switch (action.type) {
        case 'SET_CURRENT_ITEM': {
            return {
                ...action.payload
            }
        }
        default:
            return state;
    }
}