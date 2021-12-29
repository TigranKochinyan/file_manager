import useActions from '../../hooks/useActions';

import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import styles from './index.module.scss';

interface GridItemProps {
    id: string;
    type: string;
    name: string;
    folders: any[];// TODO
    files: any[];// TODO
}

const GridItem = ({id, type, name, folders, files}: GridItemProps): JSX.Element => {
    const actions = useActions();

    const handleClick = (id) => {
        console.log('click Grid Item');
    }
    const handleDoubleClick = (id) => {
        console.log('doubleClick folder', id);
        
        actions.getCurrentFolder({id})
        console.log('handleDoubleClick Grid Item');
    }
    return <div onDoubleClick={() => handleDoubleClick(id)} onClick={handleClick} className={styles.gridItem}>
            <Grid item xs={4}>
            { type === 'folder' ? 
                (folders.length || files.length) ?
                    <FolderIcon fontSize='large' />
                    : <FolderOpenIcon fontSize='large' />
                : <ArticleIcon fontSize='large'/>
            }
            <Typography>{name}</Typography>
        </Grid>
    </div>
}

export default GridItem;