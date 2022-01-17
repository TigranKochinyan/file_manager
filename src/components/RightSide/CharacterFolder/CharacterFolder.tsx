import { ReactElement, FC, useState, SyntheticEvent } from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

import { Box, Typography } from '@mui/material';
import styles from './index.module.scss';

interface CharacterFolderProps {
    id: number;
    name: string;
    isEmpty: boolean;
    handleClick: ( event: SyntheticEvent, id: number ) => void;
}

const CharacterFolder: FC<CharacterFolderProps> = ({ name, isEmpty, id, handleClick }): ReactElement => {

    const [isSelected, setIsSelected] = useState<boolean>(false); //TODO add selecting functionality (maybe)

    const handleSelect = (event, id) => {
        if (event.ctrlKey) {
            setIsSelected(!isSelected)
            handleClick(event, id)
        }
    }

    return (
        <Box
        onClick={(event) => handleSelect(event, id)}
        // onBlur={(e) => handleClick(e, id, true)}
        className={styles.character}
        data-selected={isSelected}
        tabIndex={0}
        >
            {isEmpty 
                ? <FolderIcon fontSize='large' classes={{ root: styles.character_icon }} />
                : <FolderOpenIcon fontSize='large' classes={{ root: styles.character_icon }} />
            }
            <Typography className={styles.folderNameText}>{name}</Typography>
        </Box>
    )
}

export default CharacterFolder;