import { ReactElement, useState } from 'react'; 
import { useSelector } from 'react-redux';
import { FoldersInfo } from '../../store/types';
import { history } from '../../redux/reducers';

import Item from './Item';
import ActionBttons from './ActionsButtons';
import Road from './Road';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import styles from './index.module.scss';

const RightSide = (): ReactElement => {
    const [selectedItems, setSelectedItems]: any = useState([]);
    const currentFolder = useSelector((state: FoldersInfo) => state.currentItem);

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
                {currentFolder.children.map((childId: number) => (
                    <Grid key={childId} item xs={3} onDoubleClick={() => handleDoubleClick(childId)}>
                        <Item id={childId} handleSelectElement={handleSelectElement} />
                    </Grid>
                ))}
            </Grid>
        }
    </div>
}

export default RightSide;