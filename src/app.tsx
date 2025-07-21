import React, { useState } from 'react';
import withHeader from './hocs/withheader';
import { withModal } from './hocs/withModal';
import { withFormControl } from './hocs/withformcontrol';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TodoForm from './features/todoform';

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

const formOptions = {
  initialValues: { title: '', description: '', duedate: '' },
  onSubmit: (values: {
    title: string;
    description: string;
    duedate: string;
  }) => {
    console.log('Form Submitted:', values);
  },
  validate: (values: {
    title: string;
    description: string;
    duedate: string;
  }) => {
    const errors: { title?: string; description?: string; duedate?: string } =
      {};
    if (!values.title) errors.title = 'Title is required';
    if (!values.description) errors.description = 'Description is required';
    if (!values.duedate) errors.duedate = 'Duedate is required';
    return errors;
  },
};

const UserFormWithControl = withFormControl(TodoForm, formOptions);
const UserFormModal = withModal(UserFormWithControl, {
  containerProps: style,
});

const App: React.FC<{}> = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <> This is todo item cards </>

      <Fab
        color="primary"
        aria-label="click to add todo"
        onClick={() => setOpen(true)}
        data-testid="click-to-add-todo"
      >
        <AddIcon />
      </Fab>
      <UserFormModal
        open={open}
        onClose={() => setOpen(false)}
        title="Add todo form"
        description="todo form with title, description and due date"
      />
    </>
  );
};

export default withHeader(App);
