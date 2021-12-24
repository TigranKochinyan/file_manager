import { useState } from 'react';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import styles from './index.module.scss';

interface ChildrenArrProps {
    name?: string;
    type?: string;
    component?: JSX.Element | any;
    folders?: FolderProps[];
    files?: FileProp[];
};

interface FileProp {
    name?: string;
    type?: string;
    content?: string;
};

interface FolderProps {
    name: string;
    childrens?: ChildrenArrProps[] | any;
    folders?: ChildrenArrProps[] | any;
}

const Folder = ({name, childrens=[]}: FolderProps) => {
    const [childrensIsOpen, setChildrensIsOpen] = useState(false)
    const handleClick = (e): void => {
        // console.log(e);
        // console.log(e.ctrlKey);// when true add to selected items in store
        setChildrensIsOpen(!childrensIsOpen)
        
    }
    return <>
        <div onClick={handleClick} className={styles.folder}>
            <ArrowRightIcon className={`${childrensIsOpen ? styles.arrowIcon_active : styles.arrowIcon}`} />
            <p className={styles.p}>{name}</p>
        </div>
        {
            childrensIsOpen && childrens.map((child: ChildrenArrProps) => {
                return <div key={child.name} className={styles.folder_childrens}>
                    {
                        child.folders && child.folders.map(folder => {
                            console.log(folder.name, '----',folder);
                            
                            return <Folder name={folder.name} folders={folder.folders} childrens={folder.folders}/>
                        })
                    }
                </div>
            })
        }
    </>
}

export default Folder;