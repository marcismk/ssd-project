import { checkIfAuthenticated } from '@/lib/auth';

export default async function HomePage() {
  await checkIfAuthenticated();

  return (
    <iframe
      title="Course Marks"
      src={process.env.COURSE_MARKS_PAGE}
      style={{ width: '100%', height: '100vh', border: 'none' }}
    />
  );
}
