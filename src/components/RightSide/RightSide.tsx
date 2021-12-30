import { useSelector } from 'react-redux';
import { FoldersInfo } from '../../store/types';
// import { useNavigate } from 'react-router-dom';
import { history } from '../../redux/reducers';

import GridItem from '../GridItem';
import ActionBttons from './ActionsButtons';
import Road from './Road';
import ArticleIcon from '@mui/icons-material/Article';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import styles from './index.module.scss';
import CharacterFile from './CharacterFile';
import { useState } from 'react';

let testFiles = [
    {
        id: 41,
        name: '12121',
    },
    {
        id: 2,
        name: '121 48 sss ',
    },
    {
        id: 321,
        name: '11    21',
    },
    {
        id: 3111,
        name: '121    21',
    },
    {
        id: 2142,
        name: '121 48 sss ',
    },
    {
        id: 3465,
        name: '11    21',
    },
    {
        id: 7652,
        name: '121 48 sss ',
    },
    {
        id: 8678673,
        name: '11    21',
    },
]

const RightSide = () => {
    const currentFolder = useSelector((state: FoldersInfo) => {
        return state.app.currentItem;
    });

    const [selectedItems, setSelectedItems]: any = useState([]);


    const handleDoubleClick = (id) => {
        history.push(`/${id}`)
    };

    const handleClick = (event, id: number, blured: boolean = false ) => {
        if(blured) {
            setSelectedItems([])
            return;
        }
        console.log('sssssssssssssssssss', blured);
        
        const newSelctedItems: number[] = [...selectedItems];
        console.log(newSelctedItems, id);
        
        if(newSelctedItems.includes(id)) {
            setSelectedItems(state => state.filter(item => item !== id));
            // newSelctedItems.filter(item => item !== id)
        } else {
            // newSelctedItems.push(id)
            setSelectedItems(state => [...state, id]);

        }
        // setSelectedItems(newSelctedItems);
        
    }

    return <div className={styles.rightSide}>
        RightSide
        <Road />
        <ActionBttons parentId={currentFolder?.parentId}/>
        {
            currentFolder?.type === 'file' ? 
            <Typography variant='subtitle1'>{currentFolder?.content}</Typography>
            :
            (currentFolder && currentFolder.name) &&
                <Grid container>
                {currentFolder?.folders.map(folder => {
                        return <Grid key={folder.id} item xs={4}>
                            <GridItem
                                id={folder.id}
                                name={folder.name}
                                type={folder.type}
                                folders={folder.folders}
                                files={folder.files}
                            />
                        </Grid>
                    })
                }
                {currentFolder?.files.map(file => {
                        return <div key={file.id} onDoubleClick={() => handleDoubleClick(file.id)}> 
                            <Grid item xs={4}>
                                <ArticleIcon fontSize='large' />
                                <Typography>{file.name}</Typography>
                            </Grid>
                        </div>
                    })
                }
            </Grid>
        }
        <div className={styles.df}>
            {
                testFiles.map(file => {
                    return <div key={file.id} onDoubleClick={() => handleDoubleClick(file.id)}> 
                        <CharacterFile handleClick={handleClick} id={file.id} name={file.name} selected={selectedItems.includes(file.id)} />
                    </div>
                })
            }
        </div>
    </div>
}

export default RightSide;