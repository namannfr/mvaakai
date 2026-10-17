import { lookingForOptions, partnershipSchema } from "@/lib/forms/partnership-schema";
import { labelFor } from "@/lib/forms/inquiry-schema";
import { handleSubmission } from "@/lib/server/submission";

export async function POST(request: Request) {
  return handleSubmission(request, {
    kind: "partnership",
    prefix: "MVP",
    schema: partnershipSchema,
    toLead: (d, reference) => ({
      kind: "partnership",
      id: reference,
      replyTo: d.email,
      subject: `Partnership application — ${d.fullName} (${labelFor(lookingForOptions, d.lookingFor)}, ${d.city})`,
      sections: [
        {
          heading: "Applicant",
          rows: [
            ["Full name / business name", d.fullName],
            ["Email", d.email],
            ["Phone", d.phone],
            ["City", d.city],
            ["Country", d.country],
            ["LinkedIn", d.linkedin ?? ""],
            ["Looking for", labelFor(lookingForOptions, d.lookingFor)],
          ],
        },
      ],
      data: { ...d, website: undefined },
      // Partnership Leads spreadsheet (Apps Script payload), used once PARTNERSHIP_SHEETS_URL is set.
      sheet: {
        name: d.fullName,
        email: d.email,
        phone: d.phone,
        city: d.city,
        country: d.country,
        linkedin: d.linkedin ?? "",
        lookingFor: labelFor(lookingForOptions, d.lookingFor),
        reference,
      },
    }),
  });
}
