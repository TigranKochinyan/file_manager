import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/reducers';

import { getObject, getPathFromId } from '../../utils/utils';

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
    folders?: any;
    files?: any;
    depth: number;
    activeId?: string;
};

const Item = (props: ChildrenArrProps) => {
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch()

    const data = useSelector((state: RootState) => {
        return state.app.data;
    })    

    const handleClickList = (id) => {
        setOpen(!open);
    };

    const handleClick = (id) => {
        const newCurrentItem = getObject(data, id);
        const roads = getPathFromId(data, id);
        console.log('____________roadsss +++', roads);
        dispatch({ type: 'SET_CURRENT_ITEM', payload: newCurrentItem })
    };

    return <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        classes={{ root: styles.navigation }}
    >
        <ListItemButton
            className={props.activeId === props.id ? styles.list_active : ''}
            // sx={{ pl: props.depth + 2 }}
            onClick={() => handleClickList(props.id)}
        >
            <ListItemIcon classes={{ root: styles.listIcon }}>
                {
                    props.type === 'file' ? <ArticleIcon /> :
                        !props.folders.length && !props.files.length
                            ? <FolderOpenIcon /> : <FolderIcon />
                }
            </ListItemIcon>
            <Link to={`/${props.id}`}>
                <ListItemText primary={props.name} />
            </Link>
            {props.type === 'file' ? null : open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
        </Collapse>
    </List>
}

export default Item;