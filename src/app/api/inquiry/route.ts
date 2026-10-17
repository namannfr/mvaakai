import {
  annotationLayerOptions,
  engagementOptions,
  environments,
  inquirySchema,
  labelFor,
  modalities,
  requestTypes,
  timelines,
} from "@/lib/forms/inquiry-schema";
import { projectTypes } from "@/content/services";
import { handleSubmission } from "@/lib/server/submission";

export async function POST(request: Request) {
  return handleSubmission(request, {
    kind: "inquiry",
    prefix: "MVQ",
    schema: inquirySchema,
    toLead: (d, reference) => {
      const projectRows: [string, string][] = [
        ["Request", labelFor(requestTypes, d.requestType)],
        ["Project type", labelFor(projectTypes, d.projectType)],
        ["Engagement model", labelFor(engagementOptions, d.engagementModel)],
        ["Modalities", d.modalities.map((m) => labelFor(modalities, m)).join(", ")],
        ["Environments", d.environments.map((e) => labelFor(environments, e)).join(", ")],
        ["Task families", d.taskFamilies ?? ""],
        ["Intended AI application", d.aiApplication ?? ""],
        ["Annotation layers", d.annotationLayers.map((a) => labelFor(annotationLayerOptions, a)).join(", ")],
        ["Delivery format", d.deliveryFormat ?? ""],
        ["Existing data", d.existingData ?? ""],
        ["Description", d.description],
        ["Expected scale", d.scale ?? ""],
        ["Timeline", labelFor(timelines, d.timeline || undefined)],
        ["Additional requirements", d.requirements ?? ""],
        ["Specification link", d.specUrl ?? ""],
      ];
      const inSheetHeader = new Set(["Request", "Project type", "Description"]);
      return {
        kind: "inquiry",
        id: reference,
        replyTo: d.email,
        subject: `${d.requestType === "sample" ? "Sample request" : "Project inquiry"} — ${d.company} · ${labelFor(projectTypes, d.projectType)}`,
        sections: [
          {
            heading: "Contact",
            rows: [
              ["Name", d.name],
              ["Work email", d.email],
              ["Company", d.company],
              ["Job title", d.jobTitle ?? ""],
            ],
          },
          { heading: "Project", rows: projectRows },
          { heading: "Meta", rows: [["Submitted from", d.source ?? ""]] },
        ],
        data: { ...d, website: undefined },
        // Contact Leads spreadsheet (Apps Script payload). The form has no single "inquiry type" or
        // "project details" field, so: inquiryType = request + project type; projectDetails = the
        // description followed by every other answered detail, so nothing submitted is dropped.
        sheet: {
          name: d.name,
          email: d.email,
          company: d.company,
          jobTitle: d.jobTitle ?? "",
          inquiryType: `${labelFor(requestTypes, d.requestType)} — ${labelFor(projectTypes, d.projectType)}`,
          projectDetails: [
            d.description,
            "",
            ...projectRows.filter(([k, v]) => v && !inSheetHeader.has(k)).map(([k, v]) => `${k}: ${v}`),
            `Reference: ${reference}`,
            `Submitted from: ${d.source ?? ""}`,
          ].join("\n"),
        },
      };
    },
  });
}
