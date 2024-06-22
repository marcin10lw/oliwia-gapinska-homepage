import { getTranslations } from 'next-intl/server';
import { SignInForm } from './_components';
import { handleWithSessionRedirect } from '@/lib/handleProtectedRoutes';

const Page = async () => {
  const t = await getTranslations('auth.signIn');
  await handleWithSessionRedirect();

  return (
    <main className="grid min-h-[calc(100vh-4.5rem)] place-items-center lg:min-h-[calc(100vh-6.25rem)]">
      <section className="w-full max-w-96 border border-border px-5 pb-10 pt-7 shadow-lg">
        <h1 className="mb-5 text-center text-3xl">{t('heading')}</h1>
        <SignInForm />
      </section>
    </main>
  );
};

export default Page;
