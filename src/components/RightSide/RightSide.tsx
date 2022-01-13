import { ReactElement, useState } from 'react'; 
import { useMemo } from 'react';
import { RootState } from '../../redux/reducers';
import { useSelector } from 'react-redux';
import { FoldersInfo } from '../../store/types';
import { history } from '../../redux/reducers';
import { filterByIds } from '../../utils/utils';

import { FolderTypes } from '../../types/folder';
import { FileTypes } from '../../types/file';

import ActionBttons from './ActionsButtons';
import Road from './Road';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CharacterFile from './CharacterFile';
import CharacterFolder from './CharacterFolder';
import styles from './index.module.scss';

interface ItemDataTypes {
    children: number[];
    childs: (FolderTypes | FileTypes)[];
    id: number;
    name: string;
    parentId: number;
    parents: number[]
    type: "folder"
}

const RightSide = (): ReactElement => {
    const foldersInfo: (FolderTypes | FileTypes)[] = useSelector((state: RootState) => state.app.data);
    const currentFolder = useSelector((state: FoldersInfo) => state.app.currentItem);

    const itemData: ItemDataTypes = useMemo(() => {
        const foundedItem = {...currentFolder};
        if (currentFolder.children) {
            foundedItem.childs = filterByIds(foldersInfo, currentFolder.children)
        }
        return foundedItem
    }, [foldersInfo, currentFolder]) 

    const [selectedItems, setSelectedItems]: any = useState([]);

    const handleDoubleClick = (id: number): void => {
        if(history.location.pathname === '/') {
            history.push(`/${id}`)
            return
        }
        history.push(`${history.location.pathname}/${id}`)
    };

    const handleSelectElement = (event, id) => {
        if(selectedItems.includes(id)){
            setSelectedItems(state => state.filter(selectedId => selectedId !== id))
        } else {
            setSelectedItems(state => [...state, id])
        }
    }
  
    return <div className={styles.rightSide}>
        <Road />
        <ActionBttons
            id={currentFolder.id}
            type={currentFolder.type}
        />
        {
            currentFolder.type === 'file' ? 
            <Typography variant='subtitle1'>{currentFolder.content}</Typography>
            :
            <Grid container>
                {itemData.childs.map((item: FolderTypes | FileTypes): JSX.Element => (
                    <Grid key={item.id} item xs={3} onDoubleClick={() => handleDoubleClick(item.id)}>
                        {item.type === 'file'
                            ? <CharacterFile
                                name={item.name}
                                id={item.id}
                                selected={false}
                                handleClick={handleSelectElement}
                            />
                            : <CharacterFolder
                                name={item.name}
                                id={item.id}
                                isEmpty={!!item.children.length}
                                handleClick={handleSelectElement}
                            />
                        }
                    </Grid>
                ))}
            </Grid>
        }
    </div>
}

export default RightSide;