import ResetPasswordPage from "@/components/views/auth/ResetPasswordPage";
import { Suspense } from 'react';

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordPage />
        </Suspense>
    );
}
