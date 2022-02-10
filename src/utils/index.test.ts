import { 
    fileCretor,
    idGenerator,
    getIdFromPath,
    isEmptyObject,
    pathCreator,
    getBreadCrumbs,
    folderCretor,
    filterByIds,
    getAllChildrenIds
} from './index';

import { FolderTypes, FileTypes } from '../types';
const mockData: (FolderTypes | FileTypes)[] = [
    {
        name: 'file',
        content: 'testContent',
        id: 1,
        parentId: 0,
        parents: [],
        type: 'file'
    },
    {
        name: 'folder',
        id: 2,
        parentId: 0,
        parents: [],
        children: [4],
        type: 'folder'
    }
]

const mockData2: (FolderTypes | FileTypes)[] = [
    ...mockData,
    {
        name: 'folder',
        id: 26,
        parentId: 0,
        parents: [],
        children: [],
        type: 'folder'
    },
    {
        name: 'folder',
        id: 3,
        parentId: 0,
        parents: [],
        children: [],
        type: 'folder'
    },
]

describe('test idGenerator function', ()  => {
    it('first test', () => {
        const testId = idGenerator(mockData);
        expect(testId).toBe(3)
    })
    it('when data is empty', () => {
        const testId = idGenerator([]);
        expect(testId).toBe(1)
    })
    it('when generated id is exist', () => {
        const testId = idGenerator(mockData2)
        expect(testId).toBe(4)
    })

})


describe('test getIdFromPath function', () => {
    it('first test', () => {
        const testPath = getIdFromPath('2/23/321/31/54/5/677777777777');
        expect(testPath).toBe(677777777777)
    })
    it('test getIdFromPath function', () => {
        const testPath = getIdFromPath('2/23/321/31/54/5/6');
        expect(testPath).toBe(6)
    })
    it('shulde return NAN when path is not valid', () => {
        const testPath = getIdFromPath('2/23/77wwwwa');
        expect(testPath).toBeNaN()
    })
})

describe('test fileCreator function', () => {
    it('cerate a example file', () => {
        const blankFile = {
            id: 1,
            content: 'test content',
            name: 'test file',
            parentId: 0,
            parents: [1,4],
            type: 'file'
        }
        const testFile = fileCretor({
            id: 1,
            content: 'test content',
            name: 'test file',
            parentId: 0,
            parents: [1,4],
            type: 'file'
        })
        expect(testFile).toEqual(blankFile)
    })
})

describe('test isEmptyObject function', () => {
    it('test empty object', () => {
        const testObjIsEmpty = isEmptyObject({})
        expect(testObjIsEmpty).toBeTruthy()
    })
    it('test not empty object', () => {
        const testObjIsEmpty = isEmptyObject({ y: 45 })
        expect(testObjIsEmpty).toBeFalsy()
    })
})

describe('test pathCreator function', () => {
    it('first test path', () => {
        const testPath = pathCreator(45, [12, 13, 40])
        expect(testPath).toBe('12/13/40/45');

    })
})

describe('test getBreadCrumbs function', () => {
    it('should return valid bradCrumbs', () => {
        const testBreadCrumbs = getBreadCrumbs('1/4/7/8/9/4')
        expect(testBreadCrumbs).toEqual([
            {name: '4', url: '1/4'},
            {name: '7', url: '1/4/7'},
            {name: '8', url: '1/4/7/8'},
            {name: '9', url: '1/4/7/8/9'},
            {name: '4', url: '1/4/7/8/9/4'},
        ])
    })
})

describe('test folderCreator function', () => {
    it('should return test folder', () => {
        const blankFolder = {
            id: 1,
            name: 'test file',
            parentId: 0,
            parents: [1,4],
            type: 'folder',
            children: [45, 78]
        }
        const testFolder = folderCretor({
            id: 1,
            name: 'test file',
            parentId: 0,
            parents: [1,4],
            type: 'folder',
            children: [45, 78]
        })
        expect(testFolder).toEqual(blankFolder)
    })
})

describe('test filterByIds function', () => {
    it('should filtred normally', () => {
        const filtredDataTest = filterByIds(mockData2, [3,1])
        expect(filtredDataTest).toEqual([
            {
                name: 'file',
                content: 'testContent',
                id: 1,
                parentId: 0,
                parents: [],
                type: 'file'
            },
            {
                name: 'folder',
                id: 3,
                parentId: 0,
                parents: [],
                children: [],
                type: 'folder'
            }
        ])
    })
})

describe('test getAllChildrenIds function', () => {
    it('getting id: 1 children', () => {
        const testChildren = getAllChildrenIds(mockData2, 2);
        expect(testChildren).toEqual([2, 4])

    })
})