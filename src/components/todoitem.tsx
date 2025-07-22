import React from 'react';
import TitleComponent from './title';

export interface TodoItemProps {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed?: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  description,
  dueDate,
}) => {
  return (
    <>
      <TitleComponent label={title} variant="h2" />
      <TitleComponent label={description} variant="body2" />
      <TitleComponent label={dueDate} variant="body2" />
    </>
  );
};

export default TodoItem;
