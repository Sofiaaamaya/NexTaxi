import { getTranslations } from 'next-intl/server';
import RegisterPage from '../../../components/views/auth/RegisterPage';

export default async function Register() {
  const t = await getTranslations('auth.register');

  return (
    <>
      <RegisterPage />
    </>
  );
}
