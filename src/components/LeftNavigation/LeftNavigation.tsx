import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';

import { FileTypes } from '../../types/file';
import { FolderTypes } from '../../types/folder';

import Folder from './Folder';
import File from './File';

import styles from './index.module.scss';

const LeftNavigation = () => {
    const foldersInfo: any[] = useSelector((state: RootState) => state.app.data)
    const currentFolder = useSelector((state: RootState) => state.app.currentItem)
      
    return <div className={styles.leftNavigation}>
        {foldersInfo.filter((item: FolderTypes | FileTypes) => item.parents.length === 0).map(item => (
            (item.type === 'file')
                ? <File
                    name={item.name}
                    key={item.id}
                    id={item.id}
                    parents={item.parents}
                    activeItemId={currentFolder.id}
                />  
                : <Folder
                    key={item.id}
                    name={item.name}
                    id={item.id}
                    childs={item.children}
                    activeItemId={currentFolder.id}
                />
            ))
        }
    </div>
}

export default LeftNavigation;