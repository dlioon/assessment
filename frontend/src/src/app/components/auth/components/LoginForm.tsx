import { Formik, FormikValues } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Loader } from '../../Theme/components/Loader';
import { error, success } from '../../utils/snackbar';

import { useAuth } from '../hooks/useAuth';
import { PaymentAction } from '../constants';
import { styles } from '../styles';

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async ({ email, password }: FormikValues): Promise<void> => {
      setIsLoading(true);
      try {
        const { error: errorMsg } = await signIn(email, password);

        if (errorMsg) {
          error(errorMsg);
        } else {
          success(t('common.messages.success'));
          navigate(PaymentAction.MAIN);
        }
      } catch (e: any) {
        error(e.message);
        console.error(e);
      }
      setIsLoading(false);
    },
    [],
  );

  const handleSignUp = useCallback(
    ({ email, password }: FormikValues) =>
      async (): Promise<void> => {
        setIsLoading(true);
        try {
          await signUp(email, password);
        } catch (e: any) {
          error(e.message);
          console.error(e);
        }
        setIsLoading(false);
      },
    [signUp],
  );

  const initialValues = useMemo(
    () => ({
      email: '',
      password: '',
    }),
    [],
  );

  return (
    <>
      <Loader isLoading={isLoading} />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={styles.fullHeight}
      >
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ errors, handleSubmit, handleChange, values }) => (
            <form onSubmit={handleSubmit}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={12} md={6}>
                  <TextField
                    type="email"
                    name="email"
                    label={t('login.labels.email')}
                    onChange={handleChange}
                    error={!!errors.email}
                    value={values.email}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    type="password"
                    name="password"
                    label={t('login.labels.password')}
                    onChange={handleChange}
                    error={!!errors.password}
                    value={values.password}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    fullWidth
                  >
                    {t('login.buttons.signIn')}
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleSignUp(values)}
                    fullWidth
                  >
                    {t('login.buttons.signUp')}
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Grid>
    </>
  );
};
