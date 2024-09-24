import { useState } from 'react';
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

//nested data is ok, see accessorKeys in ColumnDef below
const data = [
  {
    name: {
      id: 'J0n?i',
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
    email: 'correo@correo.com'
  },
  {
    name: {
      id: 'J0n?i',
      firstName: 'Jane',
      lastName: 'Doe',
    },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
    email: 'correo@correo.com'
  },
  {
    name: {
      id: 'J0n?i',
      firstName: 'Joe',
      lastName: 'Doe',
    },
      address: '566 Brakus Inlet',
      city: 'South Linda',
      state: 'West Virginia',
      email: 'correo@correo.com'
  },
  {
    name: {
      id: 'J0n?i',
      firstName: 'Kevin',
      lastName: 'Vandy',
    },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
    email: 'correo@correo.com'
  },
  {
    name: {
      id: 'J0n?i',
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    },
    address: '32188 Larkin Turnpike',
    city: 'Omaha',
    state: 'Nebraska',
    email: 'correo@correo.com'
  },
];

const BasicExample = () => {

  const [validationErrors, setValidationErrors] = useState({});
  
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name.id',
        header: 'Id',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'name.firstName', //access nested data with dot notation
        header: 'First Name',
        size: 150,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.firstName,
          helperText: validationErrors?.firstName,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              firstName: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
        size: 150,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.lastName,
          helperText: validationErrors?.lastName,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              lastName: undefined,
            }),
        },
      },
      {
        accessorKey: 'email', //normal accessorKey
        header: 'Email',
        size: 200,
        muiEditTextFieldProps: {
          type: 'email',
          required: true,
          error: !!validationErrors?.email,
          helperText: validationErrors?.email,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              email: undefined,
            }),
        },

      },
      {
        accessorKey: 'state',
        header: 'State',
        size: 150,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
        },
      },
    ],
    [validationErrors],
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <MaterialReactTable table={table} />;
};

export default BasicExample;
