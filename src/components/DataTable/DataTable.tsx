import React from 'react';
import { Table, TableBody, TableCell, TableRow, CircularProgress, Box } from '@mui/material';
import { StyledTableContainer, StyledTableHead, StyledTableRow } from './Data.styles';

export interface DataTableHeader<T> {
  label: string;
  key: keyof T;
  align?: 'left' | 'center' | 'right';
}

interface DataTableProps<T> {
  headers: DataTableHeader<T>[];
  rows: T[];
  renderCell?: (row: T, key: keyof T) => React.ReactNode;
  actions?: (row: T) => React.ReactNode;
  emptyMessage?: string;
  loading?: boolean;
}

function DataTable<T extends { id?: number | string }>({
  headers,
  rows,
  renderCell,
  actions,
  emptyMessage = 'Nenhum resultado encontrado.',
  loading = false,
}: DataTableProps<T>) {
  const colSpan = headers.length + (actions ? 1 : 0);
  return (
    <StyledTableContainer>
      <Table>
        <StyledTableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={String(header.key)} align={header.align || 'left'}>
                {header.label}
              </TableCell>
            ))}
            {actions && <TableCell align="center">Ações</TableCell>}
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={colSpan} align="center">
                <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                  <CircularProgress />
                </Box>
              </TableCell>
            </TableRow>
          ) : rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={colSpan} align="center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <StyledTableRow key={row.id ?? Math.random()}>
                {headers.map((header) => (
                  <TableCell key={String(header.key)} align={header.align || 'left'}>
                    {renderCell ? renderCell(row, header.key) : (row[header.key] as React.ReactNode)}
                  </TableCell>
                ))}
                {actions && <TableCell align="center">{actions(row)}</TableCell>}
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}

export default DataTable; 