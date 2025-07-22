import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  CardProps,
  Stack,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface WithCardOptions {
  title?: string;
  cardProps?: CardProps;
}

interface ActionHandlers<T> {
  onEdit?: (data: T) => void;
  onDelete?: (data: T) => void;
  onComplete?: (data: T) => void;
}

const WithCard = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options?: WithCardOptions,
) => {
  return ({
    data,
    onEdit,
    onDelete,
    onComplete,
  }: ActionHandlers<P> & { data: P }) => {
    const { completed } = data as { completed: boolean };
    return (
      <Card
        {...options?.cardProps}
        sx={{ maxWidth: 400, mx: 'auto', my: 2, ...options?.cardProps?.sx }}
      >
        <CardHeader
          title={options?.title}
          action={
            <Stack direction="row" spacing={1}>
              {onEdit && (
                <Tooltip title="Edit">
                  <IconButton
                    onClick={() => onEdit(data)}
                    disabled={completed}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              )}
              {onComplete && (
                <Tooltip title="Complete">
                  <IconButton
                    onClick={() => onComplete(data)}
                    disabled={completed}
                  >
                    <CheckCircleIcon />
                  </IconButton>
                </Tooltip>
              )}
              {onDelete && (
                <Tooltip title="Delete">
                  <IconButton onClick={() => onDelete(data)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          }
        />
        <CardContent>
          <WrappedComponent {...(data as P)} />
        </CardContent>
      </Card>
    );
  };
};

export default WithCard;
