import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';

import Folder from './Folder';
import File from './FIle';

import styles from './index.module.scss';

const LeftNavigation = () => {
    //TODO maybe using current folder 
    const foldersInfo = useSelector((state: RootState) => {
        return state.app.data;
    })

    const currentFolder = useSelector((state: RootState) => {
        return state.app.currentItem;
    })
    
    return <div className={styles.leftNavigation}>
        {foldersInfo.filter(item => item.parents.length === 0).map(item => (
            (item.type === 'file') 
                ? <File name={item.name} key={item.id} id={item.id} parents={item.parents} />  
                : <Folder
                    key={item.id}
                    name={item.name}
                    id={item.id}
                    childs={item.children}
                />
            ))
        }
    </div>
}

export default LeftNavigation;