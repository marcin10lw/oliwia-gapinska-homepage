'use client';

import { useTranslations } from 'next-intl';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

import { Button, ButtonProps } from './ui/button';
import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { cn } from '@/lib/utils';

export const SignOutButton = (props: ButtonProps) => {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const onSignOutClick = async () => {
    setIsSigningOut(true);
    await signOut({ redirect: true, callbackUrl: FRONTEND_ROUTES.signIn });
    setIsSigningOut(false);
  };

  return (
    <Button
      onClick={onSignOutClick}
      disabled={isSigningOut}
      className={cn({ 'animate-pulse': isSigningOut }, props.className)}
      {...props}
    >
      Wyloguj się
    </Button>
  );
};
