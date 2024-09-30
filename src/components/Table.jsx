import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {MRT_Localization_ES} from 'material-react-table/locales/es'
import { Box, Button, IconButton, Tooltip } from '@mui/material';

import {
  // QueryClient,
  // QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { datosFalsos } from './Datas';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

 export default function Table({createFunction, editFunction, getFunction, deleteFunction}){
  const [validationErrors, setValidationErrors] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
        size: 80,
        muiFilterTextFieldProps: { placeholder: 'Filtrar por ID' },
      },
      {
        accessorKey: 'firstName',
        header: 'Nombre',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.firstName,
          helperText: validationErrors?.firstName,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              firstName: undefined,
            }),
        },
        muiFilterTextFieldProps: { placeholder: 'Filtrar por nombre' },
      },
      {
        accessorKey: 'lastName',
        header: 'Apellido',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.lastName,
          helperText: validationErrors?.lastName,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              lastName: undefined,
            }),
        },
        muiFilterTextFieldProps: { placeholder: 'Filtrar por apellido' },
      },
      {
        accessorKey: 'email',
        header: 'Email',
        muiEditTextFieldProps: {
          type: 'email',
          required: true,
          error: !!validationErrors?.email,
          helperText: validationErrors?.email,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              email: undefined,
            }),
        },
        // muiFilterTextFieldProps: { placeholder: 'Filtrar por Email' },
      },
    ],
    [validationErrors]
  );

  const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateUser();

  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();

  const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdateUser();

  const { mutateAsync: deleteUser, isPending: isDeletingUser } = useDeleteUser();

  const handleCreateUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null);
  };

  const handleSaveUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null);
  };

  const openDeleteConfirmModal = (row) => {
    if (window.confirm('¿estas seguro de eliminar este usuario?')) {
      deleteUser(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    createDisplayMode: 'row',
    editDisplayMode: 'row',
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
      muiTableContainerProps: {
        sx: {
          minHeight: '500px',
        },
      },
      localization: {
        ...MRT_Localization_ES, // Aplica la localización española
        pagination: {
          ...MRT_Localization_ES.pagination, // Mantén las traducciones de paginación en español
          // labelRowsPerPage: 'Columnas por página', // Personaliza este texto
        },
      },
    muiSearchTextFieldProps : {placeholder: 'Buscar', },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem',  }}>
        <Tooltip title="Editar">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Crear Nuevo Usuario
      </Button>
    ),
  });

  const validateRequired = (value) => !!value.length;
const validateEmail = (email) => true;

function validateUser(user) {
  return {
    firstName: !validateRequired(user.firstName)
      ? 'El nombre es obligatorio'
      : '',
    lastName: !validateRequired(user.lastName) ? 'El apellido es obligatorio' : '',
    email: !validateEmail(user.email) ? 'El formato Email es incorrecto' : '',
  };
}

function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      createFunction()
      return Promise.resolve();
    },
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(['users'], (prevUsers) => [
        ...prevUsers,
        {
          ...newUserInfo,
          id: (Math.random() + 1).toString(36).substring(7),
        },
      ]);
    },
  });
}

function useGetUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      getFunction();
      return Promise.resolve(datosFalsos);
    },
    refetchOnWindowFocus: false,
  });
}

function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      editFunction();
      return Promise.resolve();
    },
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(['users'], (prevUsers) =>
        prevUsers?.map((prevUser) =>
          prevUser.id === newUserInfo.id ? newUserInfo : prevUser
        )
      );
    },
  });
}

function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      deleteFunction();
      return Promise.resolve();
    },
    onMutate: (userId) => {
      queryClient.setQueryData(['users'], (prevUsers) =>
        prevUsers?.filter((user) => user.id !== userId)
      );
    },
  });
}

  return <MaterialReactTable table={table} />;

};
