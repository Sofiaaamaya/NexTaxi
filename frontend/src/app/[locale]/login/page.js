import { getTranslations } from 'next-intl/server';
import LoginPage from '../../../components/views/auth/LoginPage';

export default async function Login() {
  const t = await getTranslations('auth.login');

  return (
    <>
      <LoginPage />
    </>
  );
}
