import { createAction } from '@reduxjs/toolkit'

import { GetPostsApiPayload, FoldersInfo, CurrentFolder, FolderId } from './types'


export const getFoldersInfo = createAction<FoldersInfo>('getFoldersInfo')
export const getPostsApi = createAction<GetPostsApiPayload>('getPostsApi')
export const getCurrentFolder = createAction<FolderId>('getCurrentFolder')

export const clearStore = createAction('clearStore')
