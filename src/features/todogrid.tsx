import React, { useState, Dispatch, SetStateAction } from 'react';
import { Box, Container, Stack } from '@mui/material';
import TodoItem, { TodoItemProps } from '../components/todoitem';
import WithCard from '../hocs/withCard';
import { withModal } from '../hocs/withModal';
import { withFormControl } from '../hocs/withformcontrol';
import TodoForm from './todoform';
interface TodoGridProps {
  todos: TodoItemProps[];
  setTodos: Dispatch<SetStateAction<TodoItemProps[]>>;
}

const TodoCard = WithCard(TodoItem, { title: 'Task' });

const style: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  padding: '16px',
  borderRadius: '8px',
  maxWidth: '90%',
  width: '400px',
};

const TodoGrid: React.FC<TodoGridProps> = ({ todos, setTodos }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<TodoItemProps | null>(null);

  const updateTodo = (updatedTodo: TodoItemProps) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleEdit = (todo: TodoItemProps) => {
    setEditingTodo(todo);
    setEditOpen(true);
  };

  const handleDelete = (todo: TodoItemProps) => {
    deleteTodo(todo.id);
  };

  const handleComplete = (todo: TodoItemProps) => {
    updateTodo({ ...todo, completed: true });
  };

  const editFormOptions = editingTodo
    ? {
        initialValues: {
          title: editingTodo.title,
          description: editingTodo.description,
          duedate: editingTodo.dueDate,
        },
        onSubmit: (values: {
          title: string;
          description: string;
          duedate: string;
        }) => {
          if (editingTodo) {
            updateTodo({
              ...editingTodo,
              title: values.title,
              description: values.description,
              dueDate: values.duedate,
            });
            setEditOpen(false);
            setEditingTodo(null);
          }
        },
        validate: (values: {
          title: string;
          description: string;
          duedate: string;
        }) => {
          const errors: {
            title?: string;
            description?: string;
            duedate?: string;
          } = {};
          if (!values.title) errors.title = 'Title is required';
          if (!values.description)
            errors.description = 'Description is required';
          if (!values.duedate) errors.duedate = 'Due date is required';
          return errors;
        },
      }
    : null;

  const EditTodoFormWithControl = editFormOptions
    ? withFormControl(TodoForm, editFormOptions)
    : null;
  const EditTodoFormModal = EditTodoFormWithControl
    ? withModal(EditTodoFormWithControl, { containerProps: style })
    : null;

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
              key={todo.id}
              data={todo}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onComplete={handleComplete}
            />
          ))}
        </Stack>
      </Box>
      {EditTodoFormModal && (
        <EditTodoFormModal
          open={editOpen}
          onClose={() => {
            setEditOpen(false);
            setEditingTodo(null);
          }}
          title="Edit todo"
          description="Edit todo form with title, description and due date"
        />
      )}
    </Container>
  );
};

export default TodoGrid;
