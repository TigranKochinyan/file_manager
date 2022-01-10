import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

import { filterByIds } from '../../../utils/utils';

import styles from './index.module.scss';


const LeftNavigationItem = ({name, id, children}) => {
    const [open, setOpen] = useState(false);

    const foldersInfo = useSelector((state: RootState) => {
        return state.app.data;
    })

    const itemData = foldersInfo.find(item => item.id === id)

    if (children.length) {
        itemData.children = filterByIds(foldersInfo, children)
    }

    const handleClickList = (id) => {
        setOpen(!open);
    };
    

    console.log('name, id, children');
    console.log(name, id, children);
    console.log(foldersInfo);
    console.log(itemData);
    
    
    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            classes={{ root: styles.navigation }}
        >
            <ListItemButton
                // className={props.activeId === props.id ? styles.list_active : ''}
                // sx={{ pl: props.depth + 2 }}
                onClick={() => handleClickList(id)}
            >
                <ListItemIcon classes={{ root: styles.listIcon }}>
                    {
                        itemData.type === 'file' ? <ArticleIcon /> :
                            itemData.children.length ? <FolderOpenIcon /> : <FolderIcon />
                    }
                </ListItemIcon>
                <ListItemText primary={name} />
                {/* <Link to={`/${props.id}`}>
                    <ListItemText primary={props.name} />
                </Link> */}
                {itemData.type === 'file' ? null : open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            
            <Collapse in={open} timeout="auto" unmountOnExit>
                {
                    itemData.children.map(_ => {
                        return (
                            <LeftNavigationItem name={_.name} id={_.id} children={_.children || []} />
                        )
                    })
                }
                sssssssssssss
            </Collapse>
        </List>
    )
}

export default LeftNavigationItem;