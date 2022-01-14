import { ReactElement, useMemo, FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import { FileTypes } from '../../../types/file';
import { FolderTypes } from '../../../types/folder';
import CharacterFile from '../CharacterFile';
import CharacterFolder from '../CharacterFolder';

interface ItemProps {
    id: number;
    handleSelectElement: any;
}

const Item: FC<ItemProps> = ({ id, handleSelectElement }): ReactElement | null => {

    const foldersInfo = useSelector((state: RootState) => state.data)
    const itemData: FolderTypes | FileTypes = useMemo(() => {
        const item = foldersInfo.find(item => item.id === id);
        return item;
    }, [foldersInfo]);
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