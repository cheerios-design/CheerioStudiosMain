import CaseStudy from '@/components/CaseStudy';
import { caseStudyMetadata } from '@/lib/metadata';

export const metadata = caseStudyMetadata('key-leaves');

export default function Page() {
  return <CaseStudy slug="key-leaves" />;
}
