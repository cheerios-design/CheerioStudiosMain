import CaseStudy from '@/components/CaseStudy';
import { caseStudyMetadata } from '@/lib/metadata';

export const metadata = caseStudyMetadata('elite-exteriors');

export default function Page() {
  return <CaseStudy slug="elite-exteriors" />;
}
