import { ReactElement, useState } from 'react';
import { history } from '../../redux/reducers';

import useTypedSelector from '../../hooks/useTypedSelector';

import Item from './Item';
import ActionBttons from './ActionsButtons';
import Road from './Road';

import { Box, Typography, Grid } from '@mui/material';
import styles from './index.module.scss';

const RightSide = (): ReactElement => {
    const [selectedItems, setSelectedItems]: any = useState([]);
    const currentFolder = useTypedSelector((state) => state.currentItem);

    const handleDoubleClick = (id: number): void => {
        if(history.location.pathname === '/') {
            history.push(`/${id}`)
            return
        }
        history.push(`${history.location.pathname}/${id}`)
    };

    const handleSelectElement = (event, id): void => {
        if(selectedItems.includes(id)){
            setSelectedItems(state => state.filter(selectedId => selectedId !== id))
        } else {
            setSelectedItems(state => [...state, id])
        }
    }
    
    return <Box className={styles.rightSide}>
        <Road />
        <ActionBttons
            id={currentFolder.id}
            type={currentFolder.type}
            selectedIds={selectedItems}
        />
        {
            currentFolder.type === 'file' ? 
            <Typography variant='subtitle1'>{currentFolder.content}</Typography>
            :
            <Grid container>
                {currentFolder.children.map((childId: number) => (
                    <Grid key={childId} item xs={3} onDoubleClick={() => handleDoubleClick(childId)}>
                        <Item id={childId} handleSelectElement={handleSelectElement} />
                    </Grid>
                ))}
            </Grid>
        }
    </Box>
}

export default RightSide;