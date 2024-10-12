import { handleWithSessionRedirect } from '@/lib/handleProtectedRoutes';
import { SignInForm } from './_components';

const Page = async () => {
  await handleWithSessionRedirect();

  return (
    <main className="grid min-h-[calc(100vh-4.5rem)] place-items-center lg:min-h-[calc(100vh-6.25rem)]">
      <section className="w-[calc(100%-2.5rem)] max-w-96 border border-border px-5 pb-10 pt-7 shadow-lg lg:-mt-28 lg:w-full">
        <h1 className="mb-5 text-center text-3xl">Zaloguj się</h1>
        <SignInForm />
      </section>
    </main>
  );
};

export default Page;
