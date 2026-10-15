import type { LucideIcon } from "lucide-react";
import {
  AudioLines,
  Clapperboard,
  FileText,
  Glasses,
  LifeBuoy,
  MapPinned,
  ShieldCheck,
} from "lucide-react";

/** Project types offered in the inquiry form. Ids are used in `/contact?type=`. */
export const projectTypes = [
  { id: "egocentric-video", label: "Egocentric video & human-demonstration data" },
  { id: "data-collection", label: "Custom data collection programme" },
  { id: "audio-annotation", label: "Audio data & annotation" },
  { id: "video-annotation", label: "Video annotation" },
  { id: "text-annotation", label: "Text annotation" },
  { id: "quality-assurance", label: "Dataset quality assurance & validation" },
  { id: "annotation-rescue", label: "Annotation & dataset rescue" },
  { id: "other", label: "Not sure yet / something else" },
] as const;

export type ProjectTypeId = (typeof projectTypes)[number]["id"];

export type Service = {
  id: ProjectTypeId;
  title: string;
  short: string;
  icon: LucideIcon;
  /** Detail page if one exists, otherwise the pre-filled inquiry flow. */
  href: string;
  hasDetailPage: boolean;
  problem: string;
  whatWeDo: string;
  deliverables: string[];
  provide: string[];
};

const contact = (type: ProjectTypeId) => `/contact?type=${type}`;

export const services: Service[] = [
  {
    id: "egocentric-video",
    title: "Egocentric Data Collection",
    short:
      "First-person human demonstrations for Physical AI — specified, captured on calibrated rigs, labelled to the sub-action and delivered with provenance.",
    icon: Glasses,
    href: "/services/egocentric-video-data",
    hasDetailPage: true,
    problem:
      "VLA and world-model teams are limited less by architecture than by diverse, well-specified human demonstration. Commodity footage arrives unsynchronised, repetitive and without consent records, and much of it never reaches a training run.",
    whatWeDo:
      "We translate your skill catalogue into capture briefs, plan environments, objects, grips and failure modes for spread, and collect on calibrated rigs with worker-level consent — then run multi-stage QA and annotation before delivery.",
    deliverables: [
      "Calibrated RGB or stereo video, with IMU clock-aligned to frames",
      "Depth, gaze and 3D hand pose where the rig tier provides them",
      "Temporal segmentation to sub-action, with outcome markers",
      "Provenance and consent manifest per episode",
      "LeRobot, RLDS, MCAP or raw + manifest",
    ],
    provide: [
      "The task families or skills your policy needs to learn",
      "Target environments and any object or grip constraints",
      "Preferred modalities and delivery format",
      "Your acceptance criteria, if already defined",
    ],
  },
  {
    id: "data-collection",
    title: "Data Collection",
    short:
      "Custom collection programmes run by trained, supervised field teams — planned against a written specification rather than assembled from whatever exists.",
    icon: MapPinned,
    href: contact("data-collection"),
    hasDetailPage: false,
    problem:
      "Where coverage is thin, waiting for the right examples to appear in production data is slow and unreliable. Unplanned collection produces volume without the spread a model needs.",
    whatWeDo:
      "We plan collection against the cases your model needs — environments, participants, conditions and edge cases — and run it with trained collectors, field supervision and consent captured at source.",
    deliverables: [
      "Collection brief and coverage matrix agreed before capture",
      "Raw data with task, environment and operator metadata",
      "Consent and provenance records",
      "Coverage report against the agreed specification",
    ],
    provide: [
      "What the model needs to learn and where it currently fails",
      "Required data types, environments and conditions",
      "Approximate volume and timeline, if known",
    ],
  },
  {
    id: "audio-annotation",
    title: "Audio Data",
    short:
      "Transcription, segmentation, speaker labelling and audio event classification — to conventions that are decided once and applied consistently.",
    icon: AudioLines,
    href: "/services/audio-annotated-data",
    hasDetailPage: true,
    problem:
      "A recording is not yet a dataset. Inconsistent transcription conventions and loose timestamps are among the most common reasons accurate transcripts still train poorly.",
    whatWeDo:
      "We transcribe, segment and label audio you already hold, and collect prompted audio where accents, phrasings or acoustic conditions are under-represented.",
    deliverables: [
      "Transcripts to a written convention",
      "Timestamped segmentation and speaker diarisation",
      "Audio event labels",
      "Guideline and review notes attached",
    ],
    provide: [
      "Sample recordings and their source",
      "Languages and dialects required",
      "Existing transcription conventions, if any",
    ],
  },
  {
    id: "video-annotation",
    title: "Video Annotation",
    short:
      "Bounding boxes, tracking, classification and temporal segmentation — with occlusion and identity decisions written down before work starts.",
    icon: Clapperboard,
    href: "/services/video-annotated-data",
    hasDetailPage: true,
    problem:
      "A box drawn correctly on one frame and inconsistently on the next teaches a tracker the wrong thing. Most disagreement happens at occlusion and when objects leave and re-enter frame.",
    whatWeDo:
      "We annotate footage you hold against a specification written with your team, define the label schema where one does not yet exist, and check consistency across sequences rather than frame by frame.",
    deliverables: [
      "Boxes, tracks, frame and clip labels",
      "Activity, event and temporal segmentation labels",
      "Consistency review across sequences",
      "Schema and guideline delivered with the data",
    ],
    provide: [
      "Representative footage samples",
      "Your label set or the behaviours you need detected",
      "Target output schema",
    ],
  },
  {
    id: "text-annotation",
    title: "Text Annotation",
    short:
      "Classification, entities, intent, sentiment and span relations — with disagreement treated as a signal that the schema needs tightening.",
    icon: FileText,
    href: "/services/text-annotated-data",
    hasDetailPage: true,
    problem:
      "Text annotation looks simple until two annotators disagree about the same sentence. Unresolved definitions reach the model as noise.",
    whatWeDo:
      "We label documents, transcripts, tickets and conversations against a schema defined with your team, using a small first pass to expose disagreement before volume begins.",
    deliverables: [
      "Labelled corpus in your schema",
      "Agreement analysis on the pilot sample",
      "Human validation of edge cases",
      "Guideline with worked examples",
    ],
    provide: ["Sample texts", "Your label set or task definition", "Volume and language requirements"],
  },
  {
    id: "quality-assurance",
    title: "Data Quality & Validation",
    short:
      "Field checks, automated integrity scoring, human review against a rubric, diversity scoring and blind acceptance sampling.",
    icon: ShieldCheck,
    href: contact("quality-assurance"),
    hasDetailPage: false,
    problem:
      "Quality problems found after delivery cost the most to fix. Without a written acceptance rubric, nobody can say whether a batch passed.",
    whatWeDo:
      "We run data through defined quality gates — integrity checks, rubric-based human review, diversity scoring and blind re-grading — and report what passed, what failed and why.",
    deliverables: [
      "Written acceptance rubric",
      "Per-batch QA results and rejection reasons",
      "Diversity report against your catalogue or class list",
      "Recommendations for re-collection or re-annotation",
    ],
    provide: [
      "The dataset or a representative sample",
      "How the data will be used in training",
      "Any existing guidelines or acceptance criteria",
    ],
  },
  {
    id: "annotation-rescue",
    title: "Annotation & Dataset Rescue",
    short:
      "Already have footage? We run unqualified archives through the same QA gates, salvage what is trainable and label it.",
    icon: LifeBuoy,
    href: contact("annotation-rescue"),
    hasDetailPage: false,
    problem:
      "Many teams hold archives they cannot use — unqualified footage, inconsistent labels, or data delivered in the wrong format by another vendor.",
    whatWeDo:
      "We triage what you hold, salvage the trainable portion, add label depth, migrate formats and can run an independent quality audit — so you know what you actually own before you buy more.",
    deliverables: [
      "QA triage report on the archive",
      "Labelled, salvaged subset",
      "Format migration to LeRobot, RLDS or MCAP",
      "Independent quality audit, where requested",
    ],
    provide: [
      "Description and size of the existing data",
      "Current format and label schema",
      "What the data is intended to train",
    ],
  },
];

export const serviceById = (id: string) => services.find((s) => s.id === id);

/** Engagement models from the brochure ("Four ways to start"). Ids used in `/contact?model=`. */
export const engagementModels = [
  {
    id: "pilot-sprint",
    name: "Pilot Sprint",
    cadence: "30 days · Fixed scope",
    summary: "A small, fast first engagement designed to show whether the approach works on your task.",
    points: [
      "One task family, one domain",
      "Skill specification written with your team",
      "100–250 accepted hours delivered",
      "Diversity and governance pack included",
    ],
  },
  {
    id: "managed-corpus",
    name: "Managed Corpus Programme",
    cadence: "Quarterly · Committed volume",
    summary: "Rolling capture against your skill catalogue, with a predictable delivery rhythm.",
    points: [
      "Rolling capture against your skill catalogue",
      "Monthly delivery cadence and gap reporting",
      "Volume-committed pricing with quality SLAs",
      "Named programme lead and weekly review",
    ],
  },
  {
    id: "capture-cell",
    name: "Dedicated Capture Cell",
    cadence: "Ongoing · Exclusive",
    summary: "A team trained only on your specification, using your rigs and your capture protocol.",
    points: [
      "Collectors trained only on your specification",
      "Your rigs and your capture protocol",
      "Embedded QA lead reporting to your team",
      "Exclusivity on skills and environments",
    ],
  },
  {
    id: "annotation-rescue",
    name: "Annotation & Rescue",
    cadence: "Project-based",
    summary: "Label depth, QA triage and format migration for data you already hold.",
    points: [
      "Label depth on data you already hold",
      "QA triage of unqualified archives",
      "Format migration to LeRobot / RLDS / MCAP",
      "Independent quality audit of another vendor",
    ],
  },
] as const;

export type EngagementModelId = (typeof engagementModels)[number]["id"] | "undecided";
