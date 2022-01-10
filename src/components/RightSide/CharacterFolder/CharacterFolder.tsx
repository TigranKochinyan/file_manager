import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

import styles from './index.module.scss';

const CharacterFolder  = ({ name }) => {
    return (
        <div
        // onClick={(e) => handleClick(e, id)}
        // onBlur={(e) => handleClick(e, id, true)}
        className={styles.character}
        // data-selected={selected}
        tabIndex={0}
        >
            <div className=''>
                <FolderOpenIcon fontSize='large' classes={{ root: styles.character_icon }} />
            </div>
            <p>{name}</p>
        </div>
    )
}

export default CharacterFolder;