import Folder from '../Folder';
import styles from './index.module.scss';

import db from '../../db/db.json';

const LeftNavigation = () => {
    console.log('db', db.example_0);
    return <div className={styles.leftNavigation}>
        LeftNavigation
        {/* <Folder name="new folder1" childrens={[{name: '0', component: <Folder name='sssss' childrens={[{name: '0'}]}/>}]} /> */}
        {/* <Folder 
            name="new folder1"
            childrens={[
                {
                    name: '0',
                    component: <Folder name='sssssawwwwwsss' childrens={[
                        {name: '0'},
                        {
                            name: '0',
                            component: <Folder name='third' childrens={[{name: '0'}]}/>
                        }
                    ]}/>
                },
                {
                    name: '0',
                    component: <Folder name='sssssawwwwwsss' childrens={[{name: '0'}]}/>
                }
            ]} /> */}
            <Folder 
                name={db.example_0.name}
                childrens={db.example_0.folders}
            />
    </div>
}

export default LeftNavigation;