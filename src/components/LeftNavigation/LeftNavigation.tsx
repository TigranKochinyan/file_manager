import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';

import Item from '../Item';

import styles from './index.module.scss';

const LeftNavigation = () => {
    const foldersInfo = useSelector((state: RootState) => {
        return state.app.data
    })

    const currentFolder = useSelector((state: RootState) => {
        return state.app.currentItem;
    })
    
    return <div className={styles.leftNavigation}>
        LeftNavigation
        {
            (foldersInfo.id !== undefined) && foldersInfo.folders.map(item => {
                return (
                    <Item 
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        folders={item.folders}
                        files={item.files}
                        depth={item.depth}
                        activeId={currentFolder?.id}
                    />
                )
            })
        }
        {
            (foldersInfo.id !== undefined) && foldersInfo.files.map(item => {
                return (
                    <Item 
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        folders={item.folders || []}
                        files={item.files || []}
                        depth={item.depth}
                        activeId={currentFolder?.id}
                        type={item.type}
                    />
                )
            })
        }
    </div>
}

export default LeftNavigation;