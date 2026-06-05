import { AdminDashboard } from '@/components/Admin/Dashboard';
import { checkIfAuthenticated } from '@/lib/auth';

export default async function HomePage() {
  await checkIfAuthenticated();
  return <AdminDashboard />;
}
