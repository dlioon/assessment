import {
  AppBar,
  Badge,
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AccountCircle, ShoppingCart } from '@mui/icons-material';
import { useSelector } from 'react-redux';

import { useAuth } from 'app/components/auth/hooks/useAuth';
import { PaymentAction } from 'app/components/auth/constants';
import { useModal } from 'app/components/Theme/components/Modal';
import { CartModal } from 'app/components/cart/components/CartModal';
import { cartSelector } from '../cart/selectors';

export interface Props {
  children: ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  const { pathname } = useLocation();
  const { isAuthorized, signOut } = useAuth();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogout = useCallback(async (): Promise<void> => {
    await signOut();
  }, []);

  const handleUserMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>): void => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleUserClose = useCallback((): void => {
    setAnchorEl(null);
  }, []);

  const cart = useSelector(cartSelector);

  const [showCartModal] = useModal({
    //@ts-ignore
    Modal: CartModal,
    props: {
      cart,
    },
  });

  const menu = useMemo(() => {
    return [
      {
        name: t('menu.home'),
        to: PaymentAction.MAIN,
        active: matchPath(PaymentAction.MAIN, pathname),
      },
      {
        name: t('menu.phoneNumbers'),
        to: PaymentAction.NUMBERS,
        active: matchPath(PaymentAction.NUMBERS, pathname),
      },
      {
        name: t('menu.cars'),
        to: PaymentAction.CARS,
        active: matchPath(PaymentAction.CARS, pathname),
      },
    ];
  }, [pathname, isAuthorized]);

  return (
    <>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid
            container
            alignItems="baseline"
            justifyContent="space-between"
            spacing={2}
          >
            <Grid item>
              <Typography variant="h6" color="inherit">
                {t('common.title')}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <nav>
                    <Grid container spacing={2}>
                      {menu.map(item => (
                        <Grid item key={item.name}>
                          <Link
                            variant="button"
                            href={item.to}
                            color={
                              item.active ? 'text.secondary' : 'text.primary'
                            }
                          >
                            {item.name}
                          </Link>
                        </Grid>
                      ))}
                    </Grid>
                  </nav>
                </Grid>
                <Grid item>
                  {isAuthorized ? (
                    <>
                      <IconButton
                        size="large"
                        onClick={handleUserMenu}
                        color="inherit"
                      >
                        <AccountCircle />
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={!!anchorEl}
                        onClose={handleUserClose}
                      >
                        <MenuItem onClick={handleLogout}>
                          {t('login.buttons.logout')}
                        </MenuItem>
                      </Menu>
                      <IconButton
                        size="large"
                        onClick={showCartModal}
                        color="inherit"
                      >
                        <Badge badgeContent={cart?.length} color="primary">
                          <ShoppingCart />
                        </Badge>
                      </IconButton>
                    </>
                  ) : (
                    <Button href={PaymentAction.LOGIN} variant="outlined">
                      {t('login.buttons.signIn')}
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" component="main">
        {children}
      </Container>
    </>
  );
};
