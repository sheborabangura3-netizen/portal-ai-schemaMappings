import { notFound } from "next/navigation";
import { getInstitutionMappingRecord } from "@/lib/actions/mapping";
import { getCanonicalVocabulary } from "@/lib/actions/vocabulary";
import ReviewScreen from "@/components/review/reviewScreen";

export default async function InstitutionReviewPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const [record, canonicalVocabulary] = await Promise.all([
    getInstitutionMappingRecord(userId),
    getCanonicalVocabulary(),
  ]);

  if (!record) {
    notFound();
  }

  return (
    <ReviewScreen
      userId={record.userId}
      institutionName={record.institutionName}
      discoveredFields={record.discoveredFields}
      initialMappings={record.existingMappings}
      initialStatus={record.status}
      canonicalVocabulary={canonicalVocabulary}
    />
  );
}
