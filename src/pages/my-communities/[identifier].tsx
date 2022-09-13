import { FormGroup } from '@/components/FormGroup';
import { useRouter } from 'next/router';

export default function MyCommunitiesUpdate() {
  const router = useRouter();
  const { identifier } = router.query;
  return <FormGroup identifier={identifier + ''} />;
}
