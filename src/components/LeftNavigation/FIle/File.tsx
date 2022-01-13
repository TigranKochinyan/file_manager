import { FC } from 'react'; 
import { history } from '../../../redux/reducers';

import { pathCreator } from '../../../utils/utils';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';

import ArticleIcon from '@mui/icons-material/Article';

import styles from './index.module.scss';

interface FileProps {
    name: string;
    id: number;
    parents: number[];
    activeItemId: number;
}

const File: FC<FileProps> = ({name, id, parents, activeItemId}) => {
    const handleClickList = (): void => {
        history.push(`/${pathCreator(id, parents)}`);
    }
    return (
        <List 
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            classes={{ root: styles.navigation }}
        >
            <ListItemButton className={activeItemId === id ? styles.list_active : ''} onClick={handleClickList} sx={{ pl: parents.length + 2 }}>
                <ListItemIcon classes={{ root: styles.listIcon }}>
                <ArticleIcon />
                    </ListItemIcon>
                <ListItemText classes={{primary: styles.listText}} primary={name} />
            </ListItemButton>
        </List>
    )
}

export default File;