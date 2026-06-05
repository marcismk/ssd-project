import { AdminDashboard } from '@/components/Admin/Dashboard';
import { checkIfAuthenticated } from '@/lib/auth';

export default async function ProfilePage() {
  await checkIfAuthenticated();

  return <AdminDashboard />;
}
