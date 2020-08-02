import React from 'react';
import {Column} from './Column';
import {AppContainer} from './styles';
import {useAppState} from './AppStateContext';
import {AddNewItem} from './AddNewItem';
import {DragItem} from  "./DragItem";

interface Task {
  id:string 
  text: string
}

interface List {
  id: string 
  text: string
  tasks: Task[]
}

export interface AppState {
  lists: List[],
  draggedItem: DragItem | undefined
}


const App = () => {
  const {state, dispatch} = useAppState()

  return (
    <AppContainer>
      {state.lists.map ((list, i) => (
        <Column text={list.text} key={list.id} index={i} id={list.id} />
      ))}
  
      <AddNewItem toggleButtonText="+Add another list" onAdd={text => dispatch({type: 'ADD_LIST', payload: text})} />
    </AppContainer>
  );
}

export default App;
