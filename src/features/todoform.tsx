import React from 'react';
import { Box } from '@mui/material';
import InputFieldComponent from '../components/inputfield';
import ButtonComponent from '../components/button';

interface TodoFormProps {
  values: {
    title: string;
    description: string;
    duedate: string;
  };
  errors: {
    title?: string;
    description?: string;
    duedate?: string;
  };
  handleChange: (
    field: 'title' | 'description' | 'duedate',
    value: string,
  ) => void;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({
  values,
  errors,
  handleChange,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      maxWidth={400}
      margin="0 auto"
    >
      <InputFieldComponent
        label="Todo Title"
        placeholder='Enter your todo title'
        value={values.title}
        onChange={(value) => handleChange('title', value)}
        error={Boolean(errors.title)}
        helperText={errors.title}
      />
      <InputFieldComponent
        multiline
        maxRows={5}
        label="Todo Description"
        placeholder='Enter your todo description'
        value={values.description}
        onChange={(value) => handleChange('description', value)}
        error={Boolean(errors.description)}
        helperText={errors.description}
      />
      <InputFieldComponent
        label="Due Date"
        placeholder='Enter todo due date'
        value={values.duedate}
        onChange={(value) => handleChange('duedate', value)}
        error={Boolean(errors.duedate)}
        helperText={errors.duedate}
      />
      <ButtonComponent label="Submit" type="submit" />
    </Box>
  );
};

export default TodoForm
