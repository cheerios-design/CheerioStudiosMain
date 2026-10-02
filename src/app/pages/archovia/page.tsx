import CaseStudy from '@/components/CaseStudy';
import { caseStudyMetadata } from '@/lib/metadata';

export const metadata = caseStudyMetadata('archovia');

export default function Page() {
  return <CaseStudy slug="archovia" />;
}
