import { useState } from 'react';
import { useLocation } from 'react-router';
import useActions from '../../hooks/useActions';

import { getBreadCrumbs } from '../../utils/utils';

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

import styles from './index.module.scss';

interface ChildrenArrProps {
    id: string;
    name?: string;
    type?: string;
    component?: JSX.Element | any;
    folders?: any;
    files?: any;
    depth: number;
    activeId?: string;
};

const Item = (props: ChildrenArrProps) => {
    const actions = useActions()
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const handleClickList = (id) => {
        setOpen(!open);
        actions.getCurrentFolder({id})
    };

    const handleClick = (id) => {
        actions.getCurrentFolder({id})
    };

    return <>
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            classes={{ root: styles.navigation }}
        >
            <ListItemButton 
                className={props.activeId === props.id ? styles.list_active : ''} 
                sx={{ pl: props.depth + 2 }}
                onClick={() => handleClickList(props.id)}
            >
                <ListItemIcon classes={{root: styles.listIcon}}>
                    {!props.folders.length && !props.files.length ? <FolderOpenIcon/> : <FolderIcon />}
                </ListItemIcon>
                <ListItemText primary={props.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {
                    props.folders.map(item => {
                        return (
                            <Item
                                key={item.id} 
                                id={item.id}
                                name={item.name}
                                folders={item.folders}
                                files={item.files}
                                depth={item.depth}
                                activeId={props.activeId}
                            />
                        )
                    })
                }
                {
                    props.files.map(file => {
                        return (
                            <List className={props.activeId === file.id ? styles.list_active : ''} onClick={() => handleClick(file.id)} key={file.id} component="div" disablePadding>
                                <ListItemButton sx={{ pl: file.depth + 2 }}>
                                    <ListItemIcon classes={{root: styles.listIcon}}>
                                        <ArticleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={file.name} />
                                </ListItemButton>
                            </List>
                        )
                    })
                }
            </Collapse>
        </List>
    </>
}

export default Item;