import { ReactElement, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { getBreadCrumbs } from '../../../utils';

import { Breadcrumbs, Typography } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import styles from './index.module.scss';

const Road = (): ReactElement => {
    const [roads, setRoads] = useState([{name: '', url: ''}]);
    const location = useLocation();

    useEffect((): void => {
        const roads: {name: string, url: string}[] = getBreadCrumbs(location.pathname);
        setRoads(roads);
    }, [location])

    return <Breadcrumbs classes={{ root: styles.bread, li: styles.li }} aria-label="breadcrumb">
        <Link to='/'><HomeIcon/></Link>
        {roads.map((road : {name: string, url: string}, index: number) => {
            if (index === roads.length - 1){
                return <Typography key={road.url}>{road.name}</Typography>
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
}

export default Road;