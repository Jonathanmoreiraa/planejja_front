import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack, useMediaQuery, IconButton, Snackbar, Alert } from '@mui/material';
import WalletIcon from '@mui/icons-material/Wallet';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ActionButton from '../components/ActionButton';
import DataTable, { DataTableHeader } from '../components/DataTable/DataTable';
import { Saving } from '../types';
//import { GenericCardListHeader } from '../components/DataTable/GenericCardList';
import theme from '../theme';
import api from '../services/api';

const headers: DataTableHeader<Saving>[] = [
  { label: 'Prioridade', key: 'priority' },
  { label: 'Descrição', key: 'description' },
  { label: 'Valor Acumulado', key: 'value' },
  { label: 'Meta', key: 'goal', align: 'inherit'},
];

// const cardHeaders: GenericCardListHeader<Saving>[] = [
//   { label: 'Prioridade', key: 'priority' },
//   { label: 'Descrição', key: 'description' },
//   { label: 'Valor acumulado', key: 'value' },
//   { label: 'Meta', key: 'goal' },
// ];

const Savings: React.FC = () => {
  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(1);  
  const [savings, setSavings] = useState<Saving[]>([]);
  const [, setSavingData] = useState<Saving | null>(null);
  const [, setEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');
  const [error, setError] = useState('');
  const [openError, setOpenError] = useState(false);
  const handleCloseError = () => setOpenError(false);
  const paginated = savings.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleOpenEditModal = (data: Saving) => {
    setSavingData(data);
    setEditModalOpen(true);
  };

  const handleGetSavings = async () => {
    try {
      //const res = await api.get('/api/savings')
      setSavings([]);
    } catch (err) {
      handleError(err);
    }
    
    setLoading(false);
  }

  const handleError = (error: unknown) => {
    const errorMessage = error && typeof error === 'object' ? (error as { response: { data: { message: string } } }).response.data.message : 'Erro ao efetuar a ação, tente novamente.';
    setError(errorMessage);
    setOpenError(true);
  }

   const handleDelete = async (id: number) => {
    try {
      if (!window.confirm('Tem certeza que deseja deletar esta caixinha?')) return;
      await api.delete(`/api/revenue/${id}`);
      handleGetSavings();
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    handleGetSavings();
  }, []);

  return (
    <Box sx={{ 
      p: 3, 
      width: '100%', 
      minHeight: '100%', 
      background: '#fff',
      overflow: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: '#358156 #e6f2ec',
      '@media (max-width: 900px)': {
        p: 2,
        pb: 4
      }
    }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Stack direction="row" spacing={2}>
          <ActionButton variant='outlined' color="success" endIcon={<WalletIcon />}>Simulação</ActionButton>
        </Stack>
        <Stack direction="row" spacing={2}>
          <ActionButton variant='outlined' color="success">Cadastrar</ActionButton>
        </Stack>
      </Stack>
      {isMobile ? (
        <div></div>
      ) : (
        <DataTable
          items={paginated}
          headers={headers}
          renderCell={(item, key) => {
            if (key === 'value' || key === "goal") {
              return `R$ ${item.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
            }
            return item[key];
          }}
          actions={(item) => (
            <>
              <IconButton onClick={() => handleOpenEditModal(item)}><EditIcon /></IconButton>
              <IconButton onClick={() => handleDelete(item.id)}><DeleteIcon sx={{ color: theme.palette.error.main }} /></IconButton>
            </>
          )}
          emptyMessage="Nenhum resultado encontrado."
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
          color={page < 1000 ? "success" : "inherit"}
          onClick={() => setPage(p => Math.min(1000, p + 1))}
          disabled={page === 1000}
        >
          Próxima
        </ActionButton>
      </Stack>
      {/* TODO: adicionar snackbars de sucesso e erro */}
       <Snackbar open={openError} autoHideDuration={4000} onClose={handleCloseError} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
    </Box>
  );
};

export default Savings; 