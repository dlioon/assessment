import { Theme } from '@mui/material';

export const styles = {
  container: {
    color: '#fff',
    zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
  },
};
