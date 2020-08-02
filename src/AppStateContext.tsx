import React, {createContext, useReducer, useContext} from 'react';
import {AppState} from './App'
import {v4 as uuid} from 'uuid';
import { findItemIndexById } from './findItemByIndex';

type Action = 
| {
  type: "ADD_LIST"
  payload: string
}
| {
  type: "ADD_TASK"
  payload: {text: string, taskId: string}
}


interface AppStateContextProps {
  state: AppState
  dispatch: React.Dispatch<any>
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)




const appStateReducer = (state: AppState, action: Action): AppState => {
  switch(action.type) {
    case "ADD_LIST" : {
      return {
        ...state,
        lists: [
          ...state.lists,
          {id: uuid(), text: action.payload, tasks:[]}
        ]
      }
    }
    case 'ADD_TASK': {
      const targetLaneIndex = findItemIndexById(
        state.lists,
        action.payload.taskId
        )
        state.lists[targetLaneIndex].tasks.push({
          id: uuid(),
          text: action.payload.text
        })
        return {...state}
      }
      default: {
        return state
      }
    }
  }
  
  
  const appData: AppState = {
    lists: [
      {
        id:"0",
        text: "To Do",
        tasks: [{id: "c0", text: "Generate app scaffold"}]
      },
      {
        id: "1",
        text: 'Is Progress',
        tasks: [{id: 'c2', text: "Learn TypeScript"}]
      },
      {
        id: "2",
        text: "Done",
        tasks: [{id: "c3", text: "Begin to use static typing"}]
      }
    ]
  }


export const AppStateProvider = ({children}: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(appStateReducer, appData)

  return (
    <AppStateContext.Provider value={{state, dispatch}}>
    {children}
  </AppStateContext.Provider>
  )
}


export const useAppState = () => {
  return useContext(AppStateContext)
}