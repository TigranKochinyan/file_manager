import { ReactElement, useMemo, FC, SyntheticEvent } from 'react';
import useTypedSelector from '../../../hooks/useTypedSelector';
import { RootState } from '../../../redux/reducers';
import { FileTypes, FolderTypes } from '../../../types';
import CharacterFile from '../CharacterFile';
import CharacterFolder from '../CharacterFolder';

interface ItemProps {
    id: number;
    handleSelectElement: ( event: SyntheticEvent, id: number ) => void;
}

const Item: FC<ItemProps> = ({ id, handleSelectElement }): ReactElement | null => {

    const foldersInfo = useTypedSelector((state: RootState) => state.data)
    const itemData: FolderTypes | FileTypes = useMemo(() => {
        const item = foldersInfo.find(item => item.id === id);
        return item;
    }, [foldersInfo, id]);
    
    if (!itemData) { return null };

    return (
        itemData.type === 'folder'
        ? 
        <CharacterFolder
            name={itemData.name}
            id={itemData.id}
            isEmpty={!!itemData.children.length}
            handleClick={handleSelectElement}
        />
        : <CharacterFile
            name={itemData.name}
            id={itemData.id}
            selected={false}
            handleClick={handleSelectElement}
        />
    )
}

export default Item;