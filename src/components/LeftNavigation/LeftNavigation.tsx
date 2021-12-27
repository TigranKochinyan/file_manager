import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import { FoldersInfo } from '../../store/types';
import useActions from '../../hooks/useActions';

import Item from '../Item';

import styles from './index.module.scss';

const LeftNavigation = () => {
    const actions = useActions()
    const foldersInfo = useSelector((state: FoldersInfo) => {
        return state.foldersInfo
    })
    
    const location = useLocation();

    useEffect((): void => {
        const ids: string[] = location.pathname.split('/').slice(1)
        const roads = ids.map((name, idIndex) => {
            const url = location.pathname.split('/').slice(0, idIndex + 2).join('/')
            return {name, url}
        })
    }, [location])


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
                        name={item.name}
                        folders={item.folders}
                        files={item.files}
                        depth={item.depth}
                    />
                )
            })
        }
    </div>
}

export default LeftNavigation;