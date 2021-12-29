import { useSelector } from 'react-redux';
import { FoldersInfo } from '../../store/types';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import useActions from '../../hooks/useActions';
import { getBreadCrumbs } from '../../utils/utils';

import GridItem from '../GridItem';
import ActionBttons from './ActionsButtons';
import Road from './Road';
import ArticleIcon from '@mui/icons-material/Article';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import styles from './index.module.scss';

const RightSide = () => {
    const location = useLocation();
    const actions = useActions();
    const currentFolder = useSelector((state: FoldersInfo) => {
        return state.curentFolder;
    });
    const navigate = useNavigate();

    const handleDoubleClick = (id) => {
        const roads = getBreadCrumbs(location.pathname)
        console.log('sssssadsasad', roads);
        
        navigate(`${roads[roads.length - 1].url}/${id}`);
    };

    return <div className={styles.rightSide}>
        RightSide
        <Road />
        <ActionBttons
            backToFolder={currentFolder.id !== 1 ? () => { navigate(`/folders/`) } : () => null}
            parentId={currentFolder.parentId}
        />
        {
            currentFolder?.type === 'file' ? 
            <Typography variant='subtitle1'>{currentFolder.content}</Typography>
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
                        return <div onDoubleClick={() => handleDoubleClick(file.id)}> 
                            <Grid key={file.id} item xs={4}>
                                <ArticleIcon fontSize='large' />
                                <Typography>{file.name}</Typography>
                            </Grid>
                        </div>
                    })
                }
            </Grid>
        }
    </div>
}

export default RightSide;