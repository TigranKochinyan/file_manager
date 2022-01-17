import { FolderTypes, FileTypes } from '../../types';

import useTypedSelector from '../../hooks/useTypedSelector';

import Item from './Item';
import { Box } from '@mui/material';
import styles from './index.module.scss';

const LeftNavigation = () => {
    const foldersInfo: (FileTypes | FolderTypes)[] = useTypedSelector((state) => state.data);
    const currentFolder = useTypedSelector((state) => state.currentItem);
      
    return <Box className={styles.leftNavigation}>
        {foldersInfo.filter((item: FolderTypes | FileTypes) => item.parents.length === 0).map(item => (
            <Item
                key={item.id}
                id={item.id}
                activeItemId={currentFolder.id}
            />))
        }
    </Box>
}

export default LeftNavigation;