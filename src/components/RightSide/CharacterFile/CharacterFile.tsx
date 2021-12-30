import { useState } from 'react';
import ArticleIcon from '@mui/icons-material/Article';

import styles from './index.module.scss';

const CharacterFile = ({ name, id, selected, handleClick }) => {

    const [isSelected, setIsSelected] = useState(false);

    // const handleClick = (event, id, select = !isSelected) => {
    //     // add id to parent component state or add it to store/ selectedItems

    //     console.log(event);
        
    //     if (event.ctrlKey) {
    //         console.log('With ctrl, do something...');
    //         return;
    //     }
    //     setIsSelected(select)
    // }

    return (
        <div
            onClick={(e) => handleClick(e, id)}
            onBlur={(e) => handleClick(e, id, true)}
            className={styles.character} 
            data-selected={selected}
            tabIndex={0}
        >
            <div className=''>
                <ArticleIcon fontSize='large' classes={{ root: styles.character_icon }} />
            </div>
            <p>{name}</p>
        </div>
    )
}

export default CharacterFile;