import React, { useReducer } from 'react'
import axios from 'axios'
import { API } from '../helpers/constants'

export const commentContext = React.createContext()

const INIT_STATE = {
  comments: []
}


const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_COMMENTS":
      return {
        ...state,
        comments: action.payload
      }
    default: return state
  }
}

const CommentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE)

  const getComments = async (idVilla) => {
    const { data } = await axios(`${API}/comments?villaID=${idVilla}`)
    dispatch({
      type: "GET_COMMENTS",
      payload: data

    })
  }

  const addComment = async (newComment) => {
    await axios.post(`${API}/comments`, newComment)
    getComments(newComment.villaID)
 
  }



  return (
    <commentContext.Provider value={{
      comments: state.comments,
      addComment,
      getComments,

    }}>
      {children}
    </commentContext.Provider>
  )
}

export default CommentContextProvider