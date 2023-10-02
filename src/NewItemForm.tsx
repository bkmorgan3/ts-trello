import React, {useState} from 'react';
import { useFocus } from './utils/useFocus';
import { NewItemFormContainer, NewItemButton, NewItemInput } from './styles';

interface NewItemsFormProps {
  onAdd(text: string) :void
}

export const NewItemForm = ({onAdd}: NewItemsFormProps) => {
  const [text, setText] = useState("")
  const inputRef = useFocus()
  

  return (
    <NewItemFormContainer>
      <NewItemInput 
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)} 
      />
      <NewItemButton onClick={() => onAdd(text)}>
        Create
      </NewItemButton>
    </NewItemFormContainer>
  )
} 