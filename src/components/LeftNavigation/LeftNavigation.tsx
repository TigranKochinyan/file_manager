import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { FoldersInfo } from '../../store/types';
import useActions from '../../hooks/useActions';

import Item from '../Item';

import styles from './index.module.scss';

const LeftNavigation = () => {
    const actions = useActions()
    const foldersInfo = useSelector((state: FoldersInfo) => {
        return state.foldersInfo
    })

    const currentFolder = useSelector((state: FoldersInfo) => {
        return state.curentFolder;
    })

    useEffect(() => {
        actions.getFoldersInfo({ l: 4 })
    }, []) 

    return <div className={styles.leftNavigation}>
        LeftNavigation
        {
            (foldersInfo.example_0 && foldersInfo.example_0.folders) && 
            foldersInfo.example_0.folders.map(item => {
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
    </div>
}

export default LeftNavigation;