import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardClient from '@/components/DashboardClient';
import {
  DATA_AUDIT_LOG,
  INITIAL_BIOMARKERS,
  INITIAL_DATES,
} from '@/data/blood-tests';
import { SESSION_COOKIE_NAME, verifySessionToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const isAuthenticated = await verifySessionToken(sessionToken);

  if (!isAuthenticated) {
    redirect('/login');
  }

  return (
    <DashboardClient
      initialBiomarkers={INITIAL_BIOMARKERS}
      initialDates={INITIAL_DATES}
      dataAuditLog={DATA_AUDIT_LOG}
    />
  );
}
