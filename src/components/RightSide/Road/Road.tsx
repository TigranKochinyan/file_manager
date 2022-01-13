import { ReactElement, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { getBreadCrumbs } from '../../../utils/utils';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import styles from './index.module.scss';

const Road = (): ReactElement => {
    const [roads, setRoads] = useState([{name: '', url: ''}]);
    const location = useLocation();

    useEffect((): void => {
        const roads: {name: string, url: string}[] = getBreadCrumbs(location.pathname);
        setRoads(roads);
    }, [location])

    return <div>
        <Breadcrumbs classes={{ root: styles.bread, li: styles.li }} aria-label="breadcrumb">
            <Link to='/'><HomeIcon/></Link>
            {roads.map((road : {name: string, url: string}, index: number) => {
                if (index === roads.length - 1){
                    return <span key={road.url}>{road.name}</span>
                }
                return <Link
                    key={road.url}
                    color="inherit"
                    to={road.url}
                >
                    {road.name}
              </Link>
            })}
        </Breadcrumbs>
    </div>
}

export default Road;