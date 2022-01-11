import { useMemo } from 'react';
import { RootState } from '../../redux/reducers';
import { useSelector } from 'react-redux';
import { FoldersInfo } from '../../store/types';
import { history } from '../../redux/reducers';
import { filterByIds } from '../../utils/utils';

import ActionBttons from './ActionsButtons';
import Road from './Road';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import styles from './index.module.scss';
import CharacterFile from './CharacterFile';
import CharacterFolder from './CharacterFolder';
import { useState } from 'react';

const RightSide = () => {
    const foldersInfo = useSelector((state: RootState) => state.app.data);
    const currentFolder = useSelector((state: FoldersInfo) => state.app.currentItem);

    const itemData = useMemo(() => { // TODO maybe its not using
        const foundedItem = {...currentFolder};
        if (currentFolder.children?.length) {
            foundedItem.childs = filterByIds(foldersInfo, currentFolder.children)
        }
        return foundedItem
    }, [foldersInfo, currentFolder])

    const [selectedItems, setSelectedItems]: any = useState([]);

    const handleDoubleClick = (id) => {
        if(history.location.pathname === '/') {
            history.push(`/${id}`)
            return
        }
        history.push(`${history.location.pathname}/${id}`)
    };

    const handleClick = (event, id: number, blured: boolean = false ) => {
        if(blured) {
            setSelectedItems([])
            return;
        }
        
        const newSelctedItems: number[] = [...selectedItems];
        console.log(newSelctedItems, id);
        
        if(newSelctedItems.includes(id)) {
            setSelectedItems(state => state.filter(item => item !== id));
            // newSelctedItems.filter(item => item !== id)
        } else {
            // newSelctedItems.push(id)
            setSelectedItems(state => [...state, id]);

        }
        // setSelectedItems(newSelctedItems);
        
    }
  
    return <div className={styles.rightSide}>
        <Road />
        <ActionBttons
            id={currentFolder.id}
            disableActions={currentFolder.type === 'file'} 
            parentId={currentFolder?.parentId}
        />
        {
            currentFolder.type === 'file' ? 
            <Typography variant='subtitle1'>{currentFolder?.content}</Typography>
            :
            itemData.childs &&
                <Grid container>
                {
                    itemData.childs.map(item => (
                        <Grid key={item.id} item xs={3} onDoubleClick={() => handleDoubleClick(item.id)}>
                            {item.type === 'file'
                                ? <CharacterFile 
                                    name={item.name}
                                    id={item.id}
                                    selected={false}
                                    handleClick={handleClick}
                                />
                                : <CharacterFolder 
                                    name={item.name}
                                    id={item.id}
                                    isEmpty={!!item.children.length}
                                />
                            }
                        </Grid>
                    ))
                }    
            </Grid>
        }
    </div>
}

export default RightSide;