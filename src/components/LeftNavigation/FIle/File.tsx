import { history } from '../../../redux/reducers';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';

import ArticleIcon from '@mui/icons-material/Article';

import styles from './index.module.scss';

const pathCreator = (item) => {// folder or file data 
    let path: number[] = [];
    if (item.parents.length) {
        path = [...item.parents]
    }
    path.push(item.id)
    return path.join('/')
}

const File = ({name, id, parents}) => {
    
    const handleClickList = () => {
        history.push(`/${pathCreator({id, parents})}`);
    }
    return (
        <List 
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            classes={{ root: styles.navigation }}
        >
            <ListItemButton onClick={handleClickList} sx={{ pl: parents.length + 2 }}>
                <ListItemIcon classes={{ root: styles.listIcon }}>
                <ArticleIcon />
                    </ListItemIcon>
                <ListItemText classes={{primary: styles.listText}} primary={name} />
            </ListItemButton>
        </List>
    )
}

export default File;