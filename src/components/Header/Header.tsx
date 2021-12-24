import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import styles from './index.module.scss';

interface RoadTypes {
    name: string,
    url: string,
}

const Header = () => {
    const [roads, setRoads] = useState([{name: 'a', url: 'w'}])
    const location = useLocation();

    useEffect((): void => {
        const ids: string[] = location.pathname.split('/').slice(1)
        const roads = ids.map((name, idIndex): RoadTypes => {
            const url = location.pathname.split('/').slice(0, idIndex + 2).join('/')
            return {name, url}
        })
        setRoads(roads)
    }, [location])

    const params = useParams();
    console.log(location);
    
    return <div role="presentation" className={styles.header} onClick={():null => null}>
      <Breadcrumbs classes={{ root: styles.bread, li: styles.li }} aria-label="breadcrumb">
        {
            roads.map((id, index) => {
                return <Link
                    key={`${id.name}-${index}`}
                    underline="hover"
                    color="inherit"
                    href={id.url}
                >
                    {id.name}
              </Link>
            })
        }
      </Breadcrumbs>
    </div>
}

export default Header;