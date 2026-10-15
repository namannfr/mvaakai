/**
 * Egocentric Data Collection page content.
 *
 * Source of capability statements: the "Mvaak AI Data Services" brochure. Anything
 * not described there is marked `confirm` ("Confirm during project scoping") — the site
 * never states unverified camera models, frame rates, durations, coverage or capacity.
 * All sample records are illustrative and labelled as such on the page.
 */

export const SCOPING_NOTE = "Confirm during project scoping.";

export type CaptureCategory = {
  id: string;
  title: string;
  summary: string;
  icon: "eye" | "camera" | "list" | "map" | "clock" | "users";
  details: string[];
  /** Detail lines described in Mvaak's materials vs. items always agreed per project. */
  fromMaterials?: string[];
};

export const captureCategories: CaptureCategory[] = [
  {
    id: "perspectives",
    title: "Camera Perspectives",
    summary: "First-person viewpoint and where the camera sits.",
    icon: "eye",
    details: ["Head- or chest-level first-person viewpoint", "Camera placement relative to the task and the hands", "Optional fixed third-person (exocentric) views alongside"],
    fromMaterials: ["Paired ego + fixed exocentric capture is described in Mvaak’s rig tiers."],
  },
  {
    id: "devices",
    title: "Recording Devices",
    summary: "Rig class, resolution, frame rate and audio.",
    icon: "camera",
    details: ["Rig class chosen per task: action camera / smart glasses, consumer XR headset, research glasses, or paired views", "Resolution, frame rate and audio requirements", "Mvaak’s rigs or yours"],
    fromMaterials: ["The four rig classes are described in Mvaak’s materials. Exact devices and specifications are agreed per project."],
  },
  {
    id: "tasks",
    title: "Task Types",
    summary: "Single actions, multi-step activities and sequences.",
    icon: "list",
    details: ["Individual actions (e.g. reach, grasp, place)", "Multi-step activities with a defined start and end", "Deliberate failure and recovery behaviour, where required"],
  },
  {
    id: "environments",
    title: "Environments",
    summary: "Where the task is performed.",
    icon: "map",
    details: ["Household, commercial and agricultural settings", "Warehouse and light-manufacturing work within commercial settings", "Other settings, including industrial sites, subject to agreement"],
    fromMaterials: ["Household, commercial and agricultural domains are described in Mvaak’s materials."],
  },
  {
    id: "duration",
    title: "Recording Duration",
    summary: "Clip length, sessions and frequency.",
    icon: "clock",
    details: ["Clip or episode length", "Session duration and number of sessions", "Recording frequency and overall volume"],
  },
  {
    id: "participants",
    title: "Participant and Site Requirements",
    summary: "People, permissions, access and safety.",
    icon: "users",
    details: ["Participant profile and availability", "Site access and permissions", "Consent from participants and bystanders", "Safety considerations for the task and site"],
  },
];

export type EnvironmentOption = {
  id: "household" | "commercial" | "industrial" | "warehouse" | "agricultural";
  title: string;
  summary: string;
  tasks: string[];
  /** true = domain described in Mvaak's materials; false = availability confirmed in scoping. */
  inMaterials: boolean;
  scene?: "household" | "commercial" | "agricultural" | "cup";
};

export const environmentOptions: EnvironmentOption[] = [
  {
    id: "household",
    title: "Household",
    summary: "Everyday manipulation in real homes.",
    tasks: ["Picking up an object", "Opening a drawer", "Organising items", "Cooking and prep", "Folding laundry"],
    inMaterials: true,
    scene: "cup",
  },
  {
    id: "commercial",
    title: "Commercial",
    summary: "Shared workspaces such as shops and food-service lines.",
    tasks: ["Handling products", "Sorting items", "Preparing a workspace", "Restocking shelves"],
    inMaterials: true,
    scene: "commercial",
  },
  {
    id: "industrial",
    title: "Industrial",
    summary: "Operational settings with equipment and multi-step procedures.",
    tasks: ["Equipment interaction", "Multi-step operational tasks", "Tool handling"],
    inMaterials: false,
  },
  {
    id: "warehouse",
    title: "Warehouse",
    summary: "Picking, packing and moving items at volume.",
    tasks: ["Picking", "Sorting", "Packing", "Item handling"],
    inMaterials: true,
    scene: "commercial",
  },
  {
    id: "agricultural",
    title: "Agricultural",
    summary: "Manual field and post-harvest work.",
    tasks: ["Handling tools", "Inspecting produce", "Transplanting", "Sorting and grading"],
    inMaterials: true,
    scene: "agricultural",
  },
];

/** Standard per-episode deliverables as listed in Mvaak's service materials ("What arrives with every episode"). */
export const standardDeliverables = [
  "Calibrated RGB or stereo video at the agreed resolution and frame rate",
  "IMU clock-aligned to video frames",
  "Per-rig calibration and synchronisation check results",
  "Temporal segmentation to sub-action, with outcome markers",
  "Task, environment, object and operator metadata",
  "Consent record identifier, licence flags and provenance manifest",
  "Diversity report for each batch",
];

export const optionalExtras = [
  "Depth, gaze or 3D hand pose (depends on the rig used)",
  "Hand keypoints, object tracks and contact events",
  "Full extraction: 3D scene, trajectory and camera pose",
  "Paired third-person views",
  "Multilingual audio or narration tracks",
  "A bespoke schema or additional metadata fields",
  "Expanded quality reporting",
];

export const deliveryFormats = ["LeRobot", "RLDS", "MCAP", "Raw + manifest", "Bespoke schema"];

export type WorkflowStep = { title: string; what: string; needs: string; output: string };

export const workflowSteps: WorkflowStep[] = [
  {
    title: "Define the task",
    what: "We work out the skill your model needs to learn and what a useful example looks like.",
    needs: "The task or skill, the intended AI application and what the model currently gets wrong.",
    output: "A shared description of the task family to capture.",
  },
  {
    title: "Agree collection requirements",
    what: "The task becomes a written capture brief with environments, objects, devices and acceptance criteria.",
    needs: "Environments, volume, devices, annotation needs and delivery format — or a best estimate.",
    output: "A capture brief and acceptance rubric you sign off before recording starts.",
  },
  {
    title: "Capture the demonstration",
    what: "Consented participants perform the task on calibrated rigs, supervised in the field.",
    needs: "Approved brief, site access and participant arrangements.",
    output: "Raw, synchronised recordings with calibration and consent records.",
  },
  {
    title: "Organise and annotate",
    what: "Episodes are segmented and labelled to the written guideline, where annotation is included.",
    needs: "The agreed annotation layers and guideline.",
    output: "Structured episodes with the agreed labels and metadata.",
  },
  {
    title: "Run agreed quality checks",
    what: "Automated integrity checks and human review against the acceptance rubric.",
    needs: "The acceptance criteria agreed at scoping.",
    output: "Accepted episodes plus documented review outcomes; rejects are re-collected or excluded.",
  },
  {
    title: "Prepare the deliverables",
    what: "Data is packaged in the agreed format, structure and transfer arrangement.",
    needs: "Format, directory structure and transfer details.",
    output: "The delivery, with its manifest and quality documentation.",
  },
];

export type QualityCheck = { title: string; reviewed: string; issue: string; handling: string };

export const qualityChecks: QualityCheck[] = [
  {
    title: "File integrity",
    reviewed: "Files open, are complete, and contain no dropped or corrupted frames.",
    issue: "A recording cuts out halfway through a task.",
    handling: "The episode is excluded and re-captured where the agreed process allows.",
  },
  {
    title: "Timestamp consistency",
    reviewed: "Video and sensor streams share one clock, with drift checked per session.",
    issue: "Motion data drifts out of step with the video.",
    handling: "The session is flagged and corrected or excluded before delivery.",
  },
  {
    title: "Metadata completeness",
    reviewed: "Every episode carries the agreed IDs, task, environment and review fields.",
    issue: "An episode is missing its environment field.",
    handling: "The record is completed from capture logs, or the episode is held back.",
  },
  {
    title: "Annotation completeness",
    reviewed: "All required labels in the guideline are present, where annotation is included.",
    issue: "A segment is missing its outcome marker.",
    handling: "Returned to the annotator with the guideline reference, then re-reviewed.",
  },
  {
    title: "Task consistency",
    reviewed: "The recording matches its brief — the right task, objects and setting.",
    issue: "A participant performs a different task than the brief describes.",
    handling: "The episode is rejected; rejected hours are not invoiced.",
  },
  {
    title: "Agreed acceptance criteria",
    reviewed: "A sample of each delivery is re-graded against the criteria agreed at scoping.",
    issue: "A batch falls below the agreed threshold.",
    handling: "The batch is re-collected under the agreed terms.",
  },
];

export const governanceItems = [
  { title: "Consent", body: "Participants consent before capture; bystander and household consent is handled separately." },
  { title: "Permissions", body: "Site access and recording permissions are confirmed before collection starts." },
  { title: "Secure handling", body: "Access-controlled storage, with face and identifier redaction available on request." },
  { title: "Retention & transfer", body: "Retention, transfer and deletion arrangements are agreed for each project." },
];

export const egocentricFaqs = [
  {
    q: "What is egocentric data?",
    a: "Video recorded from a first-person perspective — typically a head- or chest-mounted camera — showing a task from the viewpoint of the person performing it.",
  },
  {
    q: "Which environments can be supported?",
    a: "Mvaak’s materials describe household, commercial and agricultural settings, including warehouse and light-manufacturing work. Other environments, such as industrial sites, are confirmed during project scoping.",
  },
  {
    q: "Can collection requirements be customised?",
    a: "Yes. Tasks, environments, devices, annotation and delivery are defined in a written capture brief agreed with you before recording begins.",
  },
  {
    q: "What deliverables can be provided?",
    a: "Typically synchronised video and sensor data, metadata, the agreed annotation layers, quality documentation and a provenance and consent manifest. The exact list is agreed during scoping.",
  },
  {
    q: "Are annotation layers included by default?",
    a: "Not all of them. Annotation depth is chosen per task — for example temporal segmentation across a corpus, with hand pose or object tracks only where needed — and agreed in scoping.",
  },
  {
    q: "How is data quality reviewed?",
    a: "Through automated integrity checks and human review against an acceptance rubric agreed with you, with a sample of each delivery re-graded before it is accepted.",
  },
  {
    q: "Can I request a sample?",
    a: "You can ask for one. Whether a sample is available, and what it contains, depends on the data and your requirements — we confirm this when you get in touch.",
  },
  {
    q: "How do I begin a collection project?",
    a: "Describe the task you want your model to learn. We help turn it into a capture brief and an initial scope — often a small pilot — before any recording starts.",
  },
];
