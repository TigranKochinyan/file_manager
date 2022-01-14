import { ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import Folder from '../Folder';
import File from '../File';

const Item = ({id, activeItemId}: { id: number, activeItemId: number }): ReactElement | null => {
    const foldersInfo = useSelector((state: RootState) => state.data)
    const itemData = useMemo(() => {
        const item = foldersInfo.find(item => item.id === id);
        return item;
    }, [foldersInfo]);

    if (!itemData) { return null };

    return (
        itemData.type === 'folder' 
        ? <Folder
            name={itemData.name}
            id={itemData.id}
            childrenIds={itemData.children}
            activeItemId={activeItemId}
            parents={itemData.parents}
        />
        : <File
            name={itemData.name}
            parents={itemData.parents}
            id={itemData.id}
            activeItemId={activeItemId}
        />
    )
}

export default Item;