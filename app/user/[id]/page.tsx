import { Profile } from '@/components/Profile/Profile';
import { checkIfAuthenticated } from '@/lib/auth';

export default async function UserPage(props: PageProps<'/user/[id]'>) {
  const { id } = await props.params;
  await checkIfAuthenticated();

  return <Profile userId={Number(id)} />;
}
