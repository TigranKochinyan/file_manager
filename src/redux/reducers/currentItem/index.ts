import { FileTypes, FolderTypes } from "../../../types";
import { fileCretor } from "../../../utils";

const initialCurrentItem = fileCretor({
    id: 0,
    parentId: 0,
    name: '',
    type: 'file',
    content: '',
    parents: [],
})

export function curentItemReducer(state: FileTypes | FolderTypes = initialCurrentItem, action) {
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