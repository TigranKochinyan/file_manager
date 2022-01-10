import { useSelector } from 'react-redux';
import { FoldersInfo } from '../../store/types';
import { history } from '../../redux/reducers';

// import GridItem from '../GridItem';
import ActionBttons from './ActionsButtons';
import Road from './Road';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import styles from './index.module.scss';
import CharacterFile from './CharacterFile';
import CharacterFolder from './CharacterFolder';
import { useState } from 'react';

const RightSide = () => {
    const currentFolder = useSelector((state: FoldersInfo) => {
        return state.app.currentItem;
    });

    const [selectedItems, setSelectedItems]: any = useState([]);

    const handleDoubleClick = (id) => {
        if(history.location.pathname === '/') {
            history.push(`/${id}`)
            return
        }
        history.push(`${history.location.pathname}/${id}`)
    };

    const handleClick = (event, id: number, blured: boolean = false ) => {
        if(blured) {
            setSelectedItems([])
            return;
        }
        
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
        <Road />
        <ActionBttons parentId={currentFolder?.parentId}/>
        {
            currentFolder?.type === 'file' ? 
            <Typography variant='subtitle1'>{currentFolder?.content}</Typography>
            :
            currentFolder &&
                <Grid container>
                    dwwwwwwwwwww
                    
                {/* {currentFolder?.folders.map(folder => {
                        return <Grid key={folder.id} item xs={3} onDoubleClick={() => handleDoubleClick(folder.id)}>
                            <CharacterFolder  name={folder.name} />
                        </Grid>
                    })
                }
                {currentFolder?.files.map(file => {
                        return <Grid key={file.id} item xs={3} onDoubleClick={() => handleDoubleClick(file.id)}>
                                <CharacterFile
                                    handleClick={handleClick}
                                    id={file.id}
                                    name={file.name}
                                    selected={selectedItems.includes(file.id)}
                                />
                            </Grid>
                    })
                } */}
            </Grid>
        }
        {/* <div className={styles.df}>
            {
                testFiles.map(file => {
                    return <div key={file.id} onDoubleClick={() => handleDoubleClick(file.id)}> 
                        <CharacterFile handleClick={handleClick} id={file.id} name={file.name} selected={selectedItems.includes(file.id)} />
                    </div>
                })
            }
        </div>
        <div className={styles.df}>
            {
                testFiles.map(file => {
                    return <div key={file.id} onDoubleClick={() => handleDoubleClick(file.id)}> 
                        <CharacterFolder name={'s'} />
                    </div>
                })
            }
        </div> */}
    </div>
}

export default RightSide;