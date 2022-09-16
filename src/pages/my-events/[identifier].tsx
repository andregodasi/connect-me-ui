import { FormGroup } from '@/components/FormGroup';
import { useRouter } from 'next/router';

export default function MyEventsUpdate() {
  const router = useRouter();
  const { identifier } = router.query;
  return <FormGroup identifier={identifier + ''} />;
}
