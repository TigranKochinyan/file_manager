import styles from './index.module.scss';

const Container = (props: any) => {
    console.log('props', props);
    
    return <div className={styles.container}>
        {props.children}
    </div>
}

export default Container;