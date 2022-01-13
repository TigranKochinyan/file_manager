import { useState, useMemo, FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import { history } from '../../../redux/reducers';

import { pathCreator, filterByIds } from '../../../utils/utils';
import { FolderTypes } from '../../../types/folder';
import { FileTypes } from '../../../types/file';

import File from '../File';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemIcon from '@mui/material/ListItemIcon';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

import styles from './index.module.scss';

interface FolderProps {
    name: string;
    id: number;
    childs: number[];
    activeItemId: number;
}

interface ItemDataTypes {
    children: number[];
    childs: (FolderTypes | FileTypes)[];
    id: number;
    name: string;
    parentId: number;
    parents: number[];
    type: "folder";
}

const Folder: FC<FolderProps> = ({name, id, childs, activeItemId}) => {
    const [open, setOpen] = useState(false);
    const foldersInfo = useSelector((state: RootState) => state.app.data)
    
    const itemData: ItemDataTypes = useMemo(() => {
        const foundedItem = foldersInfo.find(item => item.id === id)
        if (childs.length) {
            foundedItem.childs = filterByIds(foldersInfo, childs)
        }
        return foundedItem
    }, [foldersInfo])

    const handleClickList = (id): void => {
        history.push(`/${pathCreator(itemData.id, itemData.parents)}`);
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
                className={activeItemId === id ? styles.list_active : ''}
            >
                <ListItemIcon classes={{ root: styles.listIcon }}>
                    {itemData.childs && itemData.childs.length
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
                {(itemData.childs) && itemData.childs.map((child: FolderTypes | FileTypes) => { // TODO dzel
                    return (child.type === 'file') 
                        ? <File key={child.id} name={child.name} id={child.id} parents={child.parents} activeItemId={activeItemId}/>
                        : <Folder name={child.name} key={child.id} id={child.id} childs={child.children} activeItemId={activeItemId} />
                })}
            </Collapse>
        </List>
    )
}

export default Folder;