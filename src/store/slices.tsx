import { PayloadAction, combineReducers, createSlice } from '@reduxjs/toolkit'

import { clearStore } from './actions'
import { PostType, FoldersInfo, CurrentFolder } from './types'

const posts = createSlice({
  name: 'posts',
  initialState: [] as Array<PostType>,
  reducers: {
    setPosts: (state, { payload }: PayloadAction<Array<PostType>>) => payload,
    removePost: (state, { payload }: PayloadAction<number>) =>
      state.filter(item => item.id !== payload),
  },
  extraReducers: {
    [clearStore.type]: () => [],
  },
})

const isLoading = createSlice({
  name: 'isLoading',
  initialState: false,
  reducers: {
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => payload,
  },
  extraReducers: {
    [clearStore.type]: () => false,
  },
})

const foldersInfo = createSlice({
    name: 'foldersInfo',
    initialState: {} as Array<FoldersInfo>,
    reducers: {
        setFoldersInfo: (state, { payload }) => payload, //TODO dzel : PayloadAction<FoldersInfo>
    }
})

const currentFolder = createSlice({
    name: 'curentFolder',
    initialState: {} as CurrentFolder,
    reducers: {
        setCurrentFolder: (state, { payload }) => payload, //TODO dzel : PayloadAction<FoldersInfo>
    }
})

export const { setPosts, removePost } = posts.actions
export const { setIsLoading } = isLoading.actions
export const { setFoldersInfo } = foldersInfo.actions
export const { setCurrentFolder } = currentFolder.actions

export default combineReducers({
  posts: posts.reducer,
  isLoading: isLoading.reducer,
  foldersInfo: foldersInfo.reducer,
  curentFolder: currentFolder.reducer,
})
