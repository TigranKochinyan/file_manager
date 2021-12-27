import { useState } from 'react';
import useActions from '../../hooks/useActions';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

import { Typography } from '@mui/material';

import styles from './index.module.scss';

interface ChildrenArrProps {
    id?: string;
    name?: string;
    type?: string;
    component?: JSX.Element | any;
    folders?: any;
    files?: any;
    depth: number;
};

const Item = (props: ChildrenArrProps) => {
    const actions = useActions()
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
        console.log('clicked');
        actions.getCurrentFolder({id: '3'})
        
    };
    return <>
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <ListItemButton sx={{ pl: props.depth + 2 }} onClick={handleClick}>
                <ListItemIcon>
                    {!props.folders.length && !props.files.length ? <FolderOpenIcon/> : <FolderIcon />}
                    <Typography className={styles.text_test}>{props.name}</Typography>
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {
                    props.folders.map(item => {
                        return (
                            <Item 
                                key={item.id} 
                                name={item.name}
                                folders={item.folders}
                                files={item.files}
                                depth={item.depth}
                            />
                        )
                    })
                }
                {
                    props.files.map(item => {
                        return (
                            <List key={item.id} component="div" disablePadding>
                                <ListItemButton sx={{ pl: item.depth + 2 }}>
                                    <ListItemIcon>
                                        <ArticleIcon />
                                        {item.name}
                                    </ListItemIcon>
                                    <ListItemText primary="Starred" />
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