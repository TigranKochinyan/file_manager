import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';

import ArticleIcon from '@mui/icons-material/Article';

import styles from './index.module.scss';

const File = ({name, id, depth}) => {
    return (
        <List 
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            classes={{ root: styles.navigation }}
        >
            <ListItemButton sx={{ pl: depth + 2 }}>
                <ListItemIcon classes={{ root: styles.listIcon }}>
                <ArticleIcon />
                    </ListItemIcon>
                <ListItemText primary={name} />
            </ListItemButton>
        </List>
    )
}

export default File;