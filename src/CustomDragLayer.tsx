import React from 'react';
import { XYCoord, useDragLayer } from 'react-dnd';
import { Column } from './Column';
import { Card } from './Card';
import { CustomDragLayerContainer } from './styles';

 const CustomDragLayer: React.FC = () => {
  const { isDragging, item, currentOffset } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }))
  
  if (!isDragging) {
    return null
  }
  return   (
    <CustomDragLayerContainer>
      <div style={getItemStyles(currentOffset)} >
        {item.type === 'COLUMN' ? (
          <Column 
            id={item.id}
            text={item.text}
            index={item.index}
            isPreview={true}
          />
        ) : (
          <Card 
            columnId={item.columnId}
            isPreview={true}
            index={0}
            id={item.id}
            text={item.text}
            />
        )
      }
      </div>
    </CustomDragLayerContainer>
  ) 
}

function getItemStyles(currentOffset: XYCoord | null): React.CSSProperties {
  if (!currentOffset) {
    return {
      display: "none"
    }
  }

  const {x,y} = currentOffset

  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform
  }
}

export default  CustomDragLayer;