import { getTranslations } from 'next-intl/server';
import WorkerLoginPage from '../../../components/views/auth/WorkerLoginPage';

export default async function WorkerPage() {
  const t = await getTranslations('auth.workerLogin');

  return (
    <>
      <WorkerLoginPage />
    </>
  );
}
