import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FoldersInfo } from '../../store/types';
import useActions from '../../hooks/useActions';

import GridItem from '../GridItem';
import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import styles from './index.module.scss';

const RightSide = () => {
    const actions = useActions()
    const currentFolder = useSelector((state: FoldersInfo) => {
        return state.curentFolder;
    })

    useEffect(() => {
        actions.getFoldersInfo({ l: 4 })
    }, [])

    return <div className={styles.rightSide}>
        RightSide
        {
            currentFolder.type === 'file' ? 
            <Typography variant='subtitle1'>{currentFolder.content}</Typography>
            :
            (currentFolder && currentFolder.name) &&
                <Grid container>
                {currentFolder?.folders.map(item => {
                        return <Grid key={item.id} item xs={4}>
                            {item.folders.length ? 
                                <FolderOpenIcon fontSize='large' />
                                : <FolderIcon fontSize='large' />
                            }
                            <Typography>{item.name}</Typography>
                        </Grid>
                    })
                }
                {currentFolder?.files.map(item => {
                        return <Grid key={item.id} item xs={4}>
                            <ArticleIcon fontSize='large' />
                            <Typography>{item.name}</Typography>
                        </Grid>
                        
                    })
                }
            </Grid>}
    </div>
}

export default RightSide;