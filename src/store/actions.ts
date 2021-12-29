import { createAction } from '@reduxjs/toolkit'

import { FoldersInfo, CurrentFolder, FolderId } from './types'

export const getFoldersInfo = createAction<FoldersInfo>('getFoldersInfo')
export const getCurrentFolder = createAction<FolderId>('getCurrentFolder')
export const setCurrentFolder = createAction<FolderId>('setCurrentFolder')

export const clearStore = createAction('clearStore')
