import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  debounce,
} from '@mui/material';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Loader } from 'app/components/Theme/components/Loader';
import { MainLayout } from 'app/components/MainLayout';

import { useCarsList } from '../hooks/api';
import { PER_PAGE } from '../constants';

export const CarsTable = () => {
  const { t } = useTranslation();

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>();

  const {
    data: { findAllCars: { items = [], meta = {} } = {} } = {},
    loading,
    refetch,
  } = useCarsList();

  const fetch = useCallback(
    async (newPage: number, perPage: number = rowsPerPage) => {
      setIsLoading(true);
      await refetch({
        input: {
          page: newPage + 1,
          limit: perPage,
          ...(search && { text: search }),
        },
      });
      setIsLoading(false);
    },
    [refetch, search],
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

  const columns = useMemo(
    () => [
      {
        id: 'make',
        label: t('cars.columns.make'),
        minWidth: 170,
      },
      {
        id: 'model',
        label: t('cars.columns.model'),
        minWidth: 170,
      },
      { id: 'price', label: t('cars.columns.price'), minWidth: 100 },
    ],
    [],
  );

  const handleSearch = useCallback(
    async (event: any) => {
      const { value } = event.target;
      setSearch(value);
      await refetch({
        input: {
          page: page + 1,
          limit: rowsPerPage,
          ...(value && { text: value }),
        },
      });
    },
    [refetch, rowsPerPage, page],
  );

  return (
    <MainLayout>
      <Loader isLoading={loading || isLoading} />
      <Paper sx={{ margin: '20px 0', width: '100%' }}>
        <TextField
          type="email"
          name="email"
          label={t('cars.search')}
          onChange={debounce(handleSearch, 600)}
          fullWidth
        />
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
