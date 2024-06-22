import { handleNoSessionRedirect } from '@/lib/handleProtectedRoutes';

const Page = async () => {
  const session = await handleNoSessionRedirect();

  return <div>Page</div>;
};

export default Page;
