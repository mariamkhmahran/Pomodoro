import React from "react";
import { QueueCard } from "src/components/atoms/Card";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ContextTasks } from "src/logic/TasksContext";

const QueueContainer = () => (
  <div className="right_col">
    <h1 className="subtitle">CURRENT QUEUE</h1>
    <ContextTasks.Consumer>
      {({ queue, reOrder, markAsDone }) => (
        <DragDropContext
          onDragEnd={res =>
            res.destination
              ? reOrder(queue, res.source.index, res.destination.index)
              : ""
          }>
          <Droppable droppableId="droppable">
            {provided => (
              <div ref={provided.innerRef} className="qList">
                {queue.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {provided => (
                      <div
                        className="cardContainer"
                        ref={provided.innerRef}
                        {...provided.draggableProps}>
                        <QueueCard
                          task={task}
                          dragHandle={provided.dragHandleProps}
                          markAsDone={markAsDone}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </ContextTasks.Consumer>
  </div>
);
export default QueueContainer;
