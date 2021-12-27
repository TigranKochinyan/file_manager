import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import { clearStore, getPostsApi, getFoldersInfo, getCurrentFolder } from '../store/actions'
import { removePost } from '../store/slices'

const useActions = () => {
  const dispatch = useDispatch()

  return bindActionCreators({ getPostsApi, getFoldersInfo, removePost, clearStore, getCurrentFolder }, dispatch)
}

export default useActions