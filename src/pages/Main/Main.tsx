import { Container, Grid } from '@mui/material';
import LeftNavigation from '../../components/LeftNavigation';
import RightSide from '../../components/RightSide';
import styles from './index.module.scss';

const Main = () => {
    return <Container>
        <h1>Main page</h1>
        <Grid container>
            <Grid item xs={4}>
                <LeftNavigation />
            </Grid>
            <Grid item xs={8}>
                <RightSide/>
            </Grid>
        </Grid>
        
    </Container>
}

export default Main;