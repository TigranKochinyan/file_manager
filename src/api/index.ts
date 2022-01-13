import { collection, getDocs, updateDoc, setDoc, doc, deleteDoc } from 'firebase/firestore/lite';
import { db } from './firebase';

export const getDataFromFirebase = async () => {
    const dataCol = collection(db, 'characters');
    const dataSnapshot = await getDocs(dataCol);
    const dataList = dataSnapshot.docs.map(doc => doc.data());
    return dataList;
}

export const postItemToFirbase = async (item) => {
    await setDoc(doc(db, "characters", `${item.id}` ), {...item})
}

export const deleteItemFromFirebase = async (id: string) => {
    await deleteDoc(doc(db, "characters", id));
}

export const updateItemChildren = async (id, children) => {
    await updateDoc(doc(db, "characters", `${id}`), {
        children: children
    })
}