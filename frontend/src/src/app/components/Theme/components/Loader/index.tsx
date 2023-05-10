import { Backdrop, CircularProgress } from '@mui/material';

import { styles } from './styles';

export interface Props {
  isLoading: boolean;
}

export const Loader = ({ isLoading = false }: Props) => {
  return (
    <>
      {isLoading && (
        <Backdrop sx={styles.container} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
};
