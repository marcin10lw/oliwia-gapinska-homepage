import { ReactNode } from 'react';

import { handleNoSessionRedirect } from '@/lib/handleProtectedRoutes';
import { DashboardNavigation } from './_components';
import { PaddingWrapper } from '@/components/PaddingWrapper';
import { Container } from '@/components/Container';

const Layout = async ({ children }: { children: ReactNode }) => {
  await handleNoSessionRedirect();

  return (
    <main>
      <DashboardNavigation />
      <PaddingWrapper>
        <Container>{children}</Container>
      </PaddingWrapper>
    </main>
  );
};

export default Layout;
