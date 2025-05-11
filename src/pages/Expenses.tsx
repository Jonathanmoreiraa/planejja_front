//import React, { useEffect, useState } from 'react';
import { Box, useMediaQuery, IconButton, Stack, Snackbar, Alert, Typography } from '@mui/material';
import GenericCardList, { GenericCardListHeader } from '../components/DataTable/GenericCardList';
import DataTable, { DataTableHeader } from '../components/DataTable/DataTable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ActionButton from '../components/ActionButton';
import { useEffect, useState } from 'react';
import theme from '../theme';
import api from '../services/api';
import { StatusTypography } from '../components/DataTable/Data.styles';
import { Expense } from '../types';
import ExpenseCreateModal from '../components/Modal/ExpenseCreateModal';

const headers: GenericCardListHeader<Expense>[] = [
  { label: 'Situação', key: 'situation' },
  { label: 'Descrição', key: 'description' },
  { label: 'Categoria', key: 'category' },
  { label: 'Data de vencimento', key: 'due_date' },
  { label: 'Valor', key: 'value' }, 
];

const tableHeaders: DataTableHeader<Expense>[] = [
  { label: 'Situação', key: 'situation' },
  { label: 'Descrição', key: 'description' },
  { label: 'Categoria', key: 'category' },
  { label: 'Data de vencimento', key: 'due_date' },
  { label: 'Valor', key: 'value', align: 'right' },
];

const Expenses = () => {
    const ITEMS_PER_PAGE = 10;
    const isMobile = useMediaQuery('(max-width:900px)');
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [openError, setOpenError] = useState(false);
    const [page, setPage] = useState(1);
    //const [filterOpen, setFilterOpen] = useState(false);
    const [modalAddOpen, setModalAddOpen] = useState(false);  
    const totalPages = Math.max(1, Math.ceil(expenses.length / ITEMS_PER_PAGE));
    const paginated = expenses.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

//   const handleEdit = (item: Expense) => {
//     // Implement the edit logic here
//   };

//   const handleDelete = (id: number) => {
//     // Implement the delete logic here
//   };

    const handleGetExpenses = async () => {
        try {
            const res = await api.get('/api/expenses')
            setExpenses(formatExpenses(res.data));
        } catch (err) {
            const errorMessage = err && typeof err === 'object' ? (err as { response: { data: { message: string } } }).response.data.message : 'Erro ao criar receita. Tente novamente.';
            setError(errorMessage);
            setOpenError(true);
        }
        
        setLoading(false);
    }

    const formatExpenses = (data: Expense[]) => {
        const today = new Date();
        return data.map((item) => {
          const dueDate = new Date(item.due_date);
          let situation = 'Pendente';
      
          if (item.paid === 1) {
            situation = 'Paga';
          } else if (dueDate < today) {
            situation = 'Em atraso';
          } else if (item.paid === 0 && (dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24) <= 2 && (dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24) > 0) {
            situation = 'Próxima do vencimento';
          }
      
          return {
            ...item,
            situation,
          };
        });
      };

    useEffect(() => {
        setLoading(true);
        handleGetExpenses();
    }, []);

    const handleOpenAddModal = () => setModalAddOpen(true);
    //const handleCloseAddModal = () => setModalAddOpen(false);
    const handleCloseError = () => setOpenError(false);

    const handleCreateExpense = async (data: object) => {
        try {
            await api.post('/api/expense/add', data);
            setModalAddOpen(false);
            handleGetExpenses(); // Refresh the list of expenses
        } catch (err) {
          const errorMessage = err && typeof err === 'object' ? (err as { response: { data: { message: string } } }).response.data.message : 'Erro ao criar receita. Tente novamente.';
          setError(errorMessage);
          setOpenError(true);
        }
    };

    return (
        <Box sx={{ p: 3, width: '100%', minHeight: '100%', background: '#fff' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Stack direction="row" spacing={2}>
{/*                 <ActionButton variant='outlined' color="success" endIcon={<FilterListIcon />} onClick={() => setFilterOpen(true)}>Filtrar</ActionButton>
 */}            </Stack>
            <Stack direction="row" spacing={2}>
                 <ActionButton onClick={handleOpenAddModal} variant='outlined' color="success">Cadastrar</ActionButton>
            </Stack>
        </Stack>
        <ExpenseCreateModal
            open={modalAddOpen}
            onClose={() => setModalAddOpen(false)}
            onSubmit={handleCreateExpense}
        />
        {isMobile ? (
            <GenericCardList 
                //TODO: Verificar se o paginated está funcionando
                items={paginated} 
                headers={headers} 
                renderItem={(item, key) => {
                    if (key === 'situation') {
                      return (
                        <StatusTypography status={item.situation}>
                          {item.situation === 'Pendente' && 'Pendente'}
                          {item.situation === 'Próxima do vencimento' && 'Próxima do vencimento'}
                          {item.situation === 'Em atraso' && 'Em atraso'}
                          {item.situation === 'Paga' && 'Paga'}
                        </StatusTypography>
                      );
                    }
                    if (key === 'value') {
                        return `R$ ${Number(item.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                    }
                    if (key === 'due_date') {
                        return new Date(item.due_date).toLocaleDateString('pt-BR');
                    }
                    return item[key];
                }}
                actions={() => (
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <IconButton size="small" color="primary" /* onClick={() => handleOpenEditModal(item)} */>
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" /* onClick={() => handleDelete(item.id)} */>
                        <DeleteIcon fontSize="small" sx={{ color: theme.palette.error.main }} />
                    </IconButton>
                    </Stack>
                )}
                emptyMessage="Nenhum resultado encontrado."
            />
        ) : (
            <DataTable 
                items={expenses} 
                headers={tableHeaders} 
                renderCell={(item, key) => {
                    if (key === 'situation') {
                        return (
                          <StatusTypography status={item.situation}>
                            {item.situation === 'Pendente' && 'Pendente'}
                            {item.situation === 'Próxima do vencimento' && 'Próxima do vencimento'}
                            {item.situation === 'Em atraso' && 'Em atraso'}
                            {item.situation === 'Paga' && 'Paga'}
                          </StatusTypography>
                        );
                    }
                    if (key === 'value') {
                    return `R$ ${Number(item.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                    }
                    if (key === 'due_date') {
                    return new Date(item.due_date).toLocaleDateString('pt-BR');
                    }
                    return item[key];
                }}
                actions={() => (
                    <>
                    <IconButton /* onClick={() => handleEdit(item)} */><EditIcon /></IconButton>
                    <IconButton /* onClick={() => handleDelete(item.id)} */><DeleteIcon sx={{ color: theme.palette.error.main }} /></IconButton>
                    </>
                )}
                loading={loading}
                />
            )}
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" mt={4} mb={4}>
                <ActionButton
                variant="outlined"
                color={page > 1 ? "success" : "inherit"}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                >
                Anterior
                </ActionButton>
                <Typography fontWeight={700}>{page}</Typography>
                <ActionButton
                variant="outlined"
                color={page < totalPages ? "success" : "inherit"}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                >
                Próxima
                </ActionButton>
            </Stack>
        {/* TODO: adicionar snackbar de sucesso */}
            <Snackbar open={openError} autoHideDuration={4000} onClose={handleCloseError} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                {error}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Expenses; 