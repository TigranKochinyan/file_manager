import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';

import { FileTypes } from '../../types/file';
import { FolderTypes } from '../../types/folder';

import Item from './Item';

import { Box } from '@mui/material';
import styles from './index.module.scss';

const LeftNavigation = () => {
    const foldersInfo: any[] = useSelector((state: RootState) => state.data);
    const currentFolder = useSelector((state: RootState) => state.currentItem);
      
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