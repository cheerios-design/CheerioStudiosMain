import CaseStudy from '@/components/CaseStudy';
import { caseStudyMetadata } from '@/lib/metadata';

export const metadata = caseStudyMetadata('baibu-cinema');

export default function Page() {
  return <CaseStudy slug="baibu-cinema" />;
}
