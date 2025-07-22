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
  completed,
}) => {
  return (
    <>
      <TitleComponent label={title} variant="h2" sx={completed? {textDecoration: 'line-through', fontSize:'24px'}: {fontSize:'24px'}}/>
      <TitleComponent label={description} variant="body2" sx={completed? {textDecoration: 'line-through'}:{}}/>
      <TitleComponent label={dueDate} variant="body2" sx={completed? {textDecoration: 'line-through'}:{}}/>
    </>
  );
};

export default TodoItem;
