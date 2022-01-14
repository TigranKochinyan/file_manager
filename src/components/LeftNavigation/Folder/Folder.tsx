import { useState, useMemo, FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import { history } from '../../../redux/reducers';

import { pathCreator, filterByIds } from '../../../utils';
import { FolderTypes } from '../../../types/folder';
import { FileTypes } from '../../../types/file';

import Item from '../Item';

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
    childrenIds: number[];
    activeItemId: number;
    parents: number[];
}

const Folder: FC<FolderProps> = ({name, id, childrenIds, activeItemId, parents}) => {
    const [open, setOpen] = useState(false);
    const handleClickList = (): void => {
        history.push(`/${pathCreator(id, parents)}`);
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
                sx={{ pl: parents.length + 2 }}
                className={activeItemId === id ? styles.list_active : ''}
            >
                <ListItemIcon classes={{ root: styles.listIcon }}>
                    {childrenIds && childrenIds.length
                        ? <FolderIcon />
                        : <FolderOpenIcon />
                    }
                </ListItemIcon>
                <ListItemText classes={{primary: styles.listText}} primary={name} />
                {childrenIds && childrenIds.length > 0 ?
                    open 
                    ? <ExpandLess />
                    : <ExpandMore />
                    : null
                }
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {childrenIds.map(childId => {
                    return <Item key={childId} id={childId} activeItemId={activeItemId}/>
                })}
            </Collapse>
        </List>
    )
}

export default Folder;