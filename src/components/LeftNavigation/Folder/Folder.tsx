import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import { history } from '../../../redux/reducers';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import File from '../FIle';

import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

import { filterByIds } from '../../../utils/utils';

import styles from './index.module.scss';


const pathCreator = (item) => {//TODO add to utils // folder or file data 
    let path: number[] = [];
    if (item.parents.length) {
        path = [...item.parents]
    }
    path.push(item.id)
    return path.join('/')
}

const Folder = ({name, id, childs}) => {
    const [open, setOpen] = useState(false);
    const foldersInfo = useSelector((state: RootState) => state.app.data)
    
    const itemData = useMemo(() => {
        const foundedItem = foldersInfo.find(item => item.id === id)
        if (childs.length) {
            foundedItem.childs = filterByIds(foldersInfo, childs)
        }
        return foundedItem
    }, [foldersInfo])

    const handleClickList = (id) => {
        history.push(`/${pathCreator(itemData)}`);
        setOpen(!open);
    };
    
    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            classes={{ root: styles.navigation }}
        >
            <ListItemButton
                onClick={handleClickList}
                sx={{ pl: itemData.parents.length + 2 }}
                // className={props.activeId === props.id ? styles.list_active : ''}
            >
                <ListItemIcon classes={{ root: styles.listIcon }}>
                    {(itemData && itemData.childs) && itemData.childs.length 
                        ? <FolderIcon /> 
                        : <FolderOpenIcon />
                    }
                </ListItemIcon>
                <ListItemText classes={{primary: styles.listText}} primary={name} />
                {itemData.childs && itemData.childs.length > 0 ?
                    open 
                    ? <ExpandLess />
                    : <ExpandMore />
                    : null
                }
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {(itemData.childs) && itemData.childs.map(child => { // TODO dzel
                    return (child.type === 'file') 
                        ? <File key={child.id} name={child.name} id={child.id} parents={child.parents}/>
                        : <Folder name={child.name} key={child.id} id={child.id} childs={child.children} />
                })}
            </Collapse>
        </List>
    )
}

export default Folder;