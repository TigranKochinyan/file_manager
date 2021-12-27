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

const GridItem = (props: GridItemProps): JSX.Element => {
    return <div className={styles.gridItem}>
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            <Grid item xs={4}>
            { props.type === 'folder' ? 
                (props.folders.length || props.files.length) ?
                    <FolderOpenIcon fontSize='large' />
                    : <FolderIcon fontSize='large' />
                : <ArticleIcon fontSize='large'/>
            }
            <Typography>{props.name}</Typography>
        </Grid>
    </div>
}

export default GridItem;