import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';

import Folder from './Folder';
import File from './FIle';


import LeftNavigationItem from './LeftNavigationItem';
import Item from '../Item';

import styles from './index.module.scss';

const LeftNavigation = () => {
    const foldersInfo = useSelector((state: RootState) => {
        return state.app.data;
    })

    const currentFolder = useSelector((state: RootState) => {
        return state.app.currentItem;
    })
    
    return <div className={styles.leftNavigation}>
        {/* {
            foldersInfo && foldersInfo.map(item => {
                return (
                    <Item 
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        folders={item.children || []}
                        files={item.children || []}
                        depth={item.depth}
                        activeId={currentFolder?.id}
                        type={item.type}
                />
                )
            })
        }
        ______________________________ */}

        {
            foldersInfo.filter(item => item.parents.length === 0).map(item => {
                if (item.type === 'file') {
                    return <File name={item.name} key={item.id} id={item.id} depth={item.parents.length} />   
                }
                return <Folder
                        key={item.id}
                        name={item.name}
                        id={item.id}
                        childs={item.children}
                    />
            }) 
        }
    </div>
}

export default LeftNavigation;