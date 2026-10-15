import {
  arrangements,
  capabilities,
  dedicatedMembers,
  durations,
  equipmentInterest,
  feeWillingness,
  partnershipSchema,
  stages,
  teamSizes,
  weeklyHours,
  yesNoDiscuss,
} from "@/lib/forms/partnership-schema";
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
      subject: `Partnership application — ${d.companyName} (${labelFor(teamSizes, d.teamSize)}, ${d.city})`,
      sections: [
        {
          heading: "Applicant",
          rows: [
            ["Full name", d.fullName],
            ["Email", d.email],
            ["Phone", d.phone],
            ["Location", `${d.city}, ${d.country}`],
            ["LinkedIn", d.linkedin ?? ""],
          ],
        },
        {
          heading: "Team",
          rows: [
            ["Company / team", d.companyName],
            ["Website", d.companyWebsite ?? ""],
            ["Team size", labelFor(teamSizes, d.teamSize)],
            ["Stage", labelFor(stages, d.stage)],
            ["Primary expertise", d.expertise],
            ["Description", d.teamDescription],
          ],
        },
        {
          heading: "Capabilities",
          rows: [
            ["Capabilities", d.capabilities.map((c) => labelFor(capabilities, c)).join(", ")],
            ["Other", d.capabilitiesOther ?? ""],
            ["Relevant experience", d.experience],
            ["Equipment available", d.equipment],
            ["Accessible environments", d.accessibleEnvironments],
            ["Portfolio", d.portfolioUrl ?? ""],
          ],
        },
        {
          heading: "Commitment",
          rows: [
            ["Dedicated members", labelFor(dedicatedMembers, d.dedicatedMembers)],
            ["Hours per week (team)", labelFor(weeklyHours, d.weeklyHours)],
            ["Preferred duration", labelFor(durations, d.duration)],
            ["Earliest start", d.startDate],
            ["Can follow structured protocols", labelFor(yesNoDiscuss, d.followProtocols)],
            ["Willing to train", labelFor(yesNoDiscuss, d.trainingWillingness)],
            ["Equipment-supported projects", labelFor(equipmentInterest, d.equipmentInterest)],
            ["Constraints", d.constraints ?? ""],
          ],
        },
        {
          heading: "Commercial readiness",
          rows: [
            ["Initial project fee, if applicable", labelFor(feeWillingness, d.feeWillingness)],
            ["Preferred arrangement", labelFor(arrangements, d.arrangement)],
            ["Questions or concerns", d.commercialQuestions ?? ""],
          ],
        },
        {
          heading: "Acknowledgements",
          rows: [["All four acknowledgements", "Confirmed by applicant"]],
        },
      ],
      data: { ...d, website: undefined },
    }),
  });
}
