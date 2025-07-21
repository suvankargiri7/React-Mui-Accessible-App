import React, { useState } from 'react';

interface WithFormControlOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
  validate: (values: T) => Partial<Record<keyof T, string>>;
}

export const withFormControl = <T extends Record<string, any>>(
  WrappedComponent: React.ComponentType<{
    values: T;
    errors: Partial<Record<keyof T, string>>;
    handleChange: (field: keyof T, value: string) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  }>,
  options: WithFormControlOptions<T>,
) => {
  const FormWithControl: React.FC = () => {
    const [values, setValues] = useState<T>(options.initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

    const handleChange = (field: keyof T, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const validationErrors = options.validate(values);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) return;
      options.onSubmit(values);
    };

    return (
      <form onSubmit={handleSubmit}>
        <WrappedComponent
          values={values}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </form>
    );
  };

  return FormWithControl;
};
