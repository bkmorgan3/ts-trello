import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { DragItem } from './DragItem';
import { useItemDrag } from './useItemDrag'
import { CardContainer } from './styles';
import { useAppState } from './AppStateContext'
import { isHidden } from './utils/isHidden'


interface CardProps {
  text: string
  index: number
  isPreview?: boolean
  id: string
  columnId: string
}

export const Card = ({
  text,
  index,
  isPreview,
  columnId,
  id
}: CardProps) => {
  const { state, dispatch } = useAppState()
  const ref = useRef<HTMLDivElement>(null)
  const {drag} = useItemDrag({type:"CARD", id, index,text,columnId})
  const [,drop] = useDrop({
    accept: "CARD",
    hover(item: DragItem) {
      if(item.type === "CARD") {
      if (item.id === id) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = index 
      const sourceColumn = item.columnId
      const targetColumn = columnId

      dispatch({
        type: "MOVE_TASK",
        payload: {dragIndex, hoverIndex, sourceColumn, targetColumn}
      })
      item.index = hoverIndex
      item.columnId = targetColumn
    }
  }
  })

  drag(drop(ref))

  return (
  <CardContainer
  isHidden={isHidden(isPreview, state.draggedItem, "CARD", id)}
  isPreview={isPreview}
  ref={ref}
  >
    {text}
    </CardContainer>
    )
}