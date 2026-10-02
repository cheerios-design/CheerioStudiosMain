import CaseStudy from '@/components/CaseStudy';
import { caseStudyMetadata } from '@/lib/metadata';

export const metadata = caseStudyMetadata('rising-generation');

export default function Page() {
  return <CaseStudy slug="rising-generation" />;
}
