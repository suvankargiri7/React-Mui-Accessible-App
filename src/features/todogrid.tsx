import React, { useState } from 'react';
import { Box, Container, Stack } from '@mui/material';
import TodoItem, { TodoItemProps } from '../components/todoitem';
import WithCard from '../hocs/withCard';

// Sample data
const initialTodos: TodoItemProps[] = [
  {
    title: 'Complete Project',
    description: 'Finish the React Material UI project implementation',
    dueDate: '2024-03-20',
    completed: false,
  },
  {
    title: 'Review Code',
    description: 'Review pull requests and provide feedback',
    dueDate: '2024-03-15',
    completed: true,
  },
];

const TodoCard = WithCard(TodoItem, { title: 'Task' });

const TodoGrid: React.FC = () => {
  const [todos, setTodos] = useState<TodoItemProps[]>(initialTodos);
  const [editTodo, setEditTodo] = useState<TodoItemProps | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEdit = (data: any) => {
    console.log('Edit clicked', data);
  };

  const handleDelete = (data: any) => {
    console.log('Delete clicked', data);
  };

  const handleComplete = (data: any) => {
    console.log('Complete clicked', data);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ width: '100%' }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={3}
          useFlexGap
          flexWrap="wrap"
          sx={{
            '& > *': {
              minWidth: {
                xs: '100%',
                sm: 'calc(50% - 12px)',
                md: 'calc(33.333% - 16px)',
              },
            },
          }}
        >
          {todos.map((todo) => (
            <TodoCard
              key={todo.title}
              data={todo}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onComplete={handleComplete}
            />
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default TodoGrid;
