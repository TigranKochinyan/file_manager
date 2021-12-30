import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { getBreadCrumbs } from '../../../utils/utils';

import useActions from '../../../hooks/useActions';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import styles from './index.module.scss';

interface RoadTypes {
    name: string,
    url: string,
}

const Road = () => {
    const [roads, setRoads] = useState([{name: '', url: ''}])
    const location = useLocation();

    const actions = useActions()

    useEffect((): void => {
        const roads = getBreadCrumbs(location.pathname)
        setRoads(roads)
    }, [location])

    return <div>
        <h3>roadddddds</h3>
        <Breadcrumbs classes={{ root: styles.bread, li: styles.li }} aria-label="breadcrumb">
            {roads.map((id, index) => {
                return <Link
                    key={`${id.name}-${index}`}
                    underline="hover"
                    color="inherit"
                    href={id.url}
                >
                    {id.name}
              </Link>
            })}
        </Breadcrumbs>

    </div>
}

export default Road;