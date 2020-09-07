import React, {createContext, useReducer, useContext} from 'react';
import {AppState} from './App'
import {v4 as uuid} from 'uuid';
import { findItemIndexById } from './findItemByIndex';
import { DragItem } from './DragItem';
import {moveItem} from './moveItem';

type Action = 
| {
  type: "ADD_LIST"
  payload: string
}
| {
  type: "ADD_TASK"
  payload: {text: string, taskId: string}
}
| {
  type: "MOVE_TASK"
  payload: {
    dragIndex: number
    hoverIndex: number
    sourceColumn: string
    targetColumn: string
  }
}
| {
  type: "MOVE_LIST"
  payload: {
    dragIndex: number
    hoverIndex: number
  }
}
| {
  type: "SET_DRAGGED_ITEM"
  payload: DragItem | undefined
}


interface AppStateContextProps {
  state: AppState
  dispatch: React.Dispatch<any>
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)




const appStateReducer = (state: AppState, action: Action): AppState => {
  switch(action.type) {
    case "ADD_LIST": {
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
      case "MOVE_LIST": {
        const {dragIndex, hoverIndex} = action.payload
        state.lists = moveItem(state.lists, dragIndex, hoverIndex)
        return {...state}
      }
      case "SET_DRAGGED_ITEM": {
        return {...state, draggedItem: action.payload}
      }
      case "MOVE_TASK": {
        const {
          dragIndex,
          hoverIndex,
          sourceColumn,
          targetColumn
        } = action.payload 
        const sourceLaneIndex = findItemIndexById(state.lists, sourceColumn)
        const targetLaneIndex = findItemIndexById(state.lists, targetColumn)
        const item = state.lists[sourceLaneIndex].tasks.splice(dragIndex, 1)[0]
        state.lists[targetLaneIndex].tasks.splice(hoverIndex, 0, item)
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
    ],
    draggedItem: undefined,
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