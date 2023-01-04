import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from '@mui/material';
import { ChangeEvent, useCallback, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Loader } from 'app/components/Theme/components/Loader';
import { MainLayout } from 'app/components/MainLayout';
import { CartContext } from 'app/components/cart/context';

import { useChangeStatus, useNumbersList } from '../hooks/api';
import { PER_PAGE } from '../constants';
import { success } from '../../utils/snackbar';

export const PhoneNumbersTable = () => {
  const { t } = useTranslation();

  const { addToCart } = useContext(CartContext);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    data: { findAll: { items = [], meta = {} } = {} } = {},
    loading,
    refetch,
  } = useNumbersList();

  const [changeStatus] = useChangeStatus();

  const fetch = useCallback(
    async (newPage: number, perPage: number = rowsPerPage) => {
      setIsLoading(true);
      await refetch({
        page: newPage + 1,
        limit: perPage,
      });
      setIsLoading(false);
    },
    [refetch],
  );

  const handleChangePage = useCallback(
    async (event: unknown, newPage: number) => {
      setPage(newPage);
      await fetch(newPage);
    },
    [fetch],
  );

  const handleChangeRowsPerPage = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const perPage = +event.target.value;
      const newPage = 0;
      setRowsPerPage(perPage);
      setPage(newPage);

      await fetch(newPage, perPage);
    },
    [fetch],
  );

  const handleBuy = useCallback(
    (row: any) => async () => {
      addToCart({
        type: 'phoneNumber',
        price: row.price,
        id: row.id,
        name: row.number,
      });
      await changeStatus({
        variables: {
          id: row.id,
          status: 'reserved',
        },
      });
      success(t('cart.added'));
      await refetch({
        page: page + 1,
        limit: rowsPerPage,
      });
    },
    [addToCart],
  );

  const columns = useMemo(
    () => [
      {
        id: 'number',
        label: t('phoneNumbers.columns.phoneNumber'),
        minWidth: 170,
      },
      { id: 'price', label: t('phoneNumbers.columns.price'), minWidth: 100 },
      {
        id: 'buy',
        label: '\u00a0',
      },
    ],
    [],
  );

  return (
    <MainLayout>
      <Loader isLoading={loading || isLoading} />
      <Paper sx={{ margin: '20px 0', width: '100%' }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.id}>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map(column => {
                      // @ts-ignore
                      const value = row[column.id];
                      return <TableCell key={column.id}>{value}</TableCell>;
                    })}
                    <TableCell>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={handleBuy(row)}
                        fullWidth
                      >
                        {t('phoneNumbers.buttons.buy')}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={PER_PAGE}
          component="div"
          count={meta.totalItems ?? 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </MainLayout>
  );
};
