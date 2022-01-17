import { useState, FC, ReactElement, SyntheticEvent } from 'react';
import ArticleIcon from '@mui/icons-material/Article';

import { Box, Typography } from '@mui/material';

import styles from './index.module.scss';

interface CharacterFileProps {
    id: number;
    name: string;
    selected?: boolean;
    handleClick: (e: SyntheticEvent, id: number, blured?: boolean) => void;
}

const CharacterFile: FC<CharacterFileProps> = ({ name, id, handleClick }): ReactElement => {

    const [isSelected, setIsSelected] = useState<boolean>(false);

    const handleSelect = (event, id) => {
        if (event.ctrlKey) {
            setIsSelected(!isSelected)
            handleClick(event, id)
        }
    }

    return (
        <Box
            onClick={(e) => handleSelect(e, id)}
            className={styles.character}
            data-selected={isSelected}
            tabIndex={0}
        >
            <ArticleIcon fontSize='large' classes={{ root: styles.character_icon }} />
            <Typography className={styles.fileNameText} id='erevi_senc'>{name}</Typography>
        </Box>
    )
}

export default CharacterFile;