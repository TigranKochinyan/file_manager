import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

import styles from './index.module.scss';

const CharacterFolder  = ({ name, isEmpty, id }) => {
    return (
        <div
        // onClick={(e) => handleClick(e, id)}
        // onBlur={(e) => handleClick(e, id, true)}
        className={styles.character}
        // data-selected={selected}
        tabIndex={0}
        >
            <div className=''>
                {
                    isEmpty 
                    ? <FolderIcon fontSize='large' classes={{ root: styles.character_icon }} />
                    : <FolderOpenIcon fontSize='large' classes={{ root: styles.character_icon }} />
                }
            </div>
            <p className={styles.folderNameText}>{name}</p>
        </div>
    )
}

export default CharacterFolder;