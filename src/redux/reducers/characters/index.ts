import { FileTypes, FolderTypes } from "../../../types";

export function appReducer(state: (FileTypes | FolderTypes)[] = [], action) {
    switch (action.type) {
        case 'SET_DATA': {
            return [...action.payload]
        }
        default:
            return state;
    }
}