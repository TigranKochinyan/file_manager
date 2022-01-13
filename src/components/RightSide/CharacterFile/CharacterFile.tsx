import { useState, FC, ReactElement, SyntheticEvent } from 'react';
import ArticleIcon from '@mui/icons-material/Article';

import styles from './index.module.scss';

interface CharacterFileProps {
    id: number;
    name: string;
    selected: boolean;
    handleClick: (e: SyntheticEvent, id: number, blured?: boolean) => void;
}

const CharacterFile: FC<CharacterFileProps> = ({ name, id, selected, handleClick }): ReactElement => {

    const [isSelected, setIsSelected] = useState(false); //TODO add selecting functionality (maybe)

    const handleSelect = (event, id) => {
        if (event.ctrlKey) {
            setIsSelected(!isSelected)
            handleClick(event, id)
        }
        
    }

    return (
        <div
            onClick={(e) => handleSelect(e, id)}
            // onBlur={(e) => handleSelect(e, id)}
            className={styles.character}
            data-selected={isSelected}
            tabIndex={0}
        >
            <div className=''>
                <ArticleIcon fontSize='large' classes={{ root: styles.character_icon }} />
            </div>
            <p className={styles.fileNameText}>{name}</p>
        </div>
    )
}

export default CharacterFile;