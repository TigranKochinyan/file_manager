import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { getBreadCrumbs } from '../../../utils/utils';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import styles from './index.module.scss';

interface RoadTypes {
    name: string,
    url: string,
}

const Road = () => {
    const [roads, setRoads] = useState([{name: '', url: ''}])
    const location = useLocation();

    useEffect((): void => {
        const roads = getBreadCrumbs(location.pathname)
        setRoads(roads)
    }, [location])

    return <div>
        <Breadcrumbs classes={{ root: styles.bread, li: styles.li }} aria-label="breadcrumb">
            <Link to='/'><HomeIcon/></Link>
            {roads.map((id, index) => {
                if (index === roads.length - 1){
                    return <span>{id.name}</span>
                }
                return <Link
                    key={`${id.name}-${index}`}
                    color="inherit"
                    to={id.url}
                >
                    {id.name}
              </Link>
            })}
        </Breadcrumbs>
    </div>
}

export default Road;