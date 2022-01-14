import { ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import CharacterFile from '../CharacterFile';
import CharacterFolder from '../CharacterFolder';

const Item = ({id, handleSelectElement}: { id: number, handleSelectElement: any }): ReactElement | null => {

    const foldersInfo = useSelector((state: RootState) => state.data)
    const itemData = useMemo(() => {
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