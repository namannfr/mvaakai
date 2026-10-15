/**
 * Content for the existing annotated-data service pages. Copy is preserved from
 * the live mvaak.com pages at the same URLs (/services/<slug>).
 */
import type { ProjectTypeId } from "./services";

export type DataTypePage = {
  slug: string;
  number: string;
  projectType: ProjectTypeId;
  title: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  what: { heading: string; paragraphs: string[] };
  why: { title: string; body: string }[];
  applications: string[];
  sources: { title: string; body: string }[];
  operations: string[];
  arrives: string[];
  faqs: { q: string; a: string }[];
};

export const dataTypePages: DataTypePage[] = [
  {
    slug: "audio-annotated-data",
    number: "02",
    projectType: "audio-annotation",
    title: "Audio Annotated Data",
    summary: "Structured audio datasets for speech, voice and audio intelligence.",
    seoTitle: "Audio Annotation & Speech Data Services",
    seoDescription:
      "Audio annotation for speech and voice AI: transcription, timestamped segmentation, speaker diarisation, audio event classification and multilingual handling, to a written guideline.",
    what: {
      heading: "A recording is not yet a dataset.",
      paragraphs: [
        "Audio becomes training data when it carries structure: what was said, when it was said, and who said it.",
        "That structure is the difference between a recording and a dataset. Transcription alone is rarely enough — segmentation boundaries, speaker attribution and consistent handling of overlapping speech, disfluency and background events all shape what a model can learn.",
        "Mvaak works to a written annotation guideline so those decisions are made once and applied consistently across a corpus.",
      ],
    },
    why: [
      {
        title: "Conventions decide the ceiling",
        body: "How you write numbers, hesitation, overlap and false starts is not a detail. It is a decision the whole corpus inherits, and changing it later means re-transcribing.",
      },
      {
        title: "Timing carries as much as text",
        body: "Word and segment boundaries are what let a model align sound to meaning. Loose timestamps are the most common reason a technically accurate transcript trains poorly.",
      },
      {
        title: "Real audio is not clean audio",
        body: "Background noise, crosstalk and accented speech are the conditions the model will actually meet. Excluding them produces a dataset that flatters the model in testing and fails in use.",
      },
    ],
    applications: [
      "Speech Recognition",
      "Voice AI",
      "Conversational AI",
      "Speaker Recognition",
      "Audio Classification",
      "Multilingual Speech AI",
      "Audio Intelligence",
    ],
    sources: [
      {
        title: "Working from your recordings",
        body: "Most audio projects start from material you already hold — support calls, meetings, field recordings — which we transcribe, segment and label to specification.",
      },
      {
        title: "Prompted collection",
        body: "Where coverage is missing, audio can be collected against a script or prompt set that targets the accents, phrasings or acoustic conditions the model is weak on.",
      },
      {
        title: "Language coverage",
        body: "Language and dialect coverage is confirmed against your requirement at the start rather than assumed, so scope is agreed before recording or transcription begins.",
      },
    ],
    operations: [
      "Transcription",
      "Timestamped segmentation",
      "Speaker labelling and diarisation",
      "Audio event classification",
      "Multilingual handling",
      "Quality and clarity review",
    ],
    arrives: [
      "Transcripts with timestamps at the granularity your model consumes — segment, utterance or word",
      "Speaker labels applied consistently across a session, not reset per file",
      "Audio events and non-speech markers where the task requires them",
      "The transcription guideline delivered with the data, including how edge cases were resolved",
    ],
    faqs: [
      {
        q: "What types of audio annotation are available?",
        a: "Transcription, timestamped segmentation, speaker labelling, and classification of audio events or categories, depending on what the model requires.",
      },
      {
        q: "Can multilingual audio be supported?",
        a: "Yes. Language coverage is confirmed against your requirement at the start of a project rather than assumed.",
      },
      {
        q: "How is transcription accuracy handled?",
        a: "Through a written guideline covering conventions and edge cases, followed by human review of completed work against that same guideline.",
      },
      {
        q: "How is annotated audio delivered?",
        a: "In a structured format agreed with your team, with the annotation guideline supplied alongside the data.",
      },
      {
        q: "Can you work with noisy or low-quality recordings?",
        a: "Yes, and often that is the point — models deployed into real conditions need training data that reflects them. What matters is agreeing upfront how unintelligible passages are marked rather than silently dropped.",
      },
    ],
  },
  {
    slug: "video-annotated-data",
    number: "03",
    projectType: "video-annotation",
    title: "Video Annotated Data",
    summary: "Structured visual datasets for computer vision and video intelligence.",
    seoTitle: "Video Annotation Services for Computer Vision",
    seoDescription:
      "Video annotation for computer vision: bounding boxes, object tracking, frame and clip classification, activity labelling and temporal segmentation, with consistency review across sequences.",
    what: {
      heading: "The hard part is not the drawing.",
      paragraphs: [
        "Video annotation is where most datasets quietly fail. A box drawn correctly on one frame and inconsistently on the next teaches a tracker the wrong thing.",
        "The work is less about drawing and more about holding a definition steady — what counts as the object, where its boundary sits when it is partly hidden, and when a track should end rather than drift.",
        "Those decisions are written down before annotation begins and checked across sequences, not just within single frames.",
      ],
    },
    why: [
      {
        title: "Consistency beats precision",
        body: "A slightly loose box applied the same way every time is more useful than a tight box whose definition drifts. Models learn the rule you actually followed, not the one you intended.",
      },
      {
        title: "Occlusion is the hard case",
        body: "Most disagreement in video annotation happens when an object is partly hidden. Deciding that once, in writing, is what keeps a track coherent across a sequence.",
      },
      {
        title: "Identity has to survive the gap",
        body: "When an object leaves frame and returns, whether it keeps its identity is a modelling decision. Made implicitly, it produces tracks that fragment for no reason the model can learn.",
      },
    ],
    applications: [
      "Computer Vision",
      "Object Detection",
      "Object Tracking",
      "Activity Recognition",
      "Human-Object Interaction",
      "Video Intelligence",
      "Autonomous Systems",
    ],
    sources: [
      {
        title: "Annotating footage you hold",
        body: "The common case: existing video, annotated to a specification written with your team, with edge cases escalated rather than resolved silently by whoever is on the task.",
      },
      {
        title: "Collection where coverage is thin",
        body: "Where a class or condition is under-represented, footage can be captured specifically to fill that gap rather than waiting for it to appear in production data.",
      },
      {
        title: "Label schema definition",
        body: "If the schema does not exist yet, defining it is part of the work — a label set that cannot be applied consistently by two people is not finished.",
      },
    ],
    operations: [
      "Bounding boxes",
      "Object tracking across frames",
      "Frame and clip classification",
      "Activity and event labelling",
      "Temporal segmentation",
      "Consistency review across sequences",
    ],
    arrives: [
      "Annotations in the format your training pipeline reads, agreed before work starts",
      "Track identity maintained across frames and across occlusion, per the agreed rule",
      "Frame and sequence indices preserved so annotations align to the source video",
      "The annotation guideline delivered with the data, including the occlusion and identity rules",
    ],
    faqs: [
      {
        q: "What video annotation methods can be supported?",
        a: "Bounding boxes, object tracking across frames, classification, activity labelling and temporal segmentation, scoped to the project requirement.",
      },
      {
        q: "How is consistency maintained across frames?",
        a: "Annotation follows a written guideline that defines object boundaries and occlusion handling, and review looks across sequences rather than at individual frames in isolation.",
      },
      {
        q: "Can existing footage be annotated?",
        a: "Yes. Annotation can be applied to footage you already hold, as well as to data collected for the project.",
      },
      {
        q: "What formats can annotations be delivered in?",
        a: "The output schema is agreed with your team at the start so the delivered data loads directly into your pipeline.",
      },
      {
        q: "Can you help define the label schema?",
        a: "Yes. Where a schema does not exist, defining one that two annotators can apply the same way is part of the engagement rather than a prerequisite for it.",
      },
    ],
  },
  {
    slug: "text-annotated-data",
    number: "04",
    projectType: "text-annotation",
    title: "Text Annotated Data",
    summary: "Structured language datasets for NLP, LLM and conversational AI.",
    seoTitle: "Text Annotation Services for NLP & LLM Data",
    seoDescription:
      "Text annotation for NLP and LLM training: classification, named entities, intent, sentiment and span relations, with agreement checks and human validation of edge cases.",
    what: {
      heading: "It looks simple until two people disagree.",
      paragraphs: [
        "Text annotation looks simple until two annotators disagree about the same sentence — and then it becomes a question of definitions.",
        "Most of the value in a language dataset comes from resolving those definitions up front: what an entity boundary includes, how ambiguity is handled, and what to do with examples that genuinely sit between two labels.",
        "Mvaak treats the guideline as the deliverable's foundation, and measures agreement against it rather than assuming it.",
      ],
    },
    why: [
      {
        title: "Disagreement is information",
        body: "When two annotators split on the same example, the label set is usually underspecified. Treating that as a signal rather than an error is what stops the ambiguity reaching the model.",
      },
      {
        title: "Boundaries are a decision, not a fact",
        body: "Whether a title, a qualifier or a trailing clause belongs inside an entity span changes what the model learns. Left to individual judgement, it changes per annotator.",
      },
      {
        title: "The awkward middle carries the weight",
        body: "Clear examples teach a model little it could not infer. The examples that sit between two labels are where a dataset earns its cost — and where a guideline has to be explicit.",
      },
    ],
    applications: [
      "NLP",
      "LLM Training",
      "Text Classification",
      "Entity Recognition",
      "Intent Classification",
      "Sentiment Analysis",
      "Conversational AI",
      "Language Intelligence",
    ],
    sources: [
      {
        title: "Annotating your corpus",
        body: "Most text work starts from documents, transcripts, tickets or conversations you already hold, labelled against a schema defined with your team.",
      },
      {
        title: "Targeted collection",
        body: "Where a class is rare, examples can be sourced or written specifically to cover it, so the label is not learned from a handful of instances.",
      },
      {
        title: "Guideline development",
        body: "Where the definitions are not settled, the first pass is a small annotated sample used to expose disagreement and tighten the schema before volume begins.",
      },
    ],
    operations: [
      "Classification and tagging",
      "Named entity annotation",
      "Intent labelling",
      "Sentiment annotation",
      "Span and relation marking",
      "Human validation of edge cases",
    ],
    arrives: [
      "Labels in the schema your pipeline expects, with span offsets aligned to the source text",
      "Ambiguous cases marked rather than silently resolved, so your team can see where the schema strained",
      "Agreement checks across annotators reported with the delivery",
      "The annotation guideline supplied with the data, including how each edge case was decided",
    ],
    faqs: [
      {
        q: "What text annotation services are available?",
        a: "Classification, named entity annotation, intent labelling, sentiment annotation and span-level marking, scoped to the project.",
      },
      {
        q: "How is annotator disagreement handled?",
        a: "Ambiguous cases are escalated rather than guessed at, and the guideline is updated so the same decision is applied consistently from that point onward.",
      },
      {
        q: "Can custom label schemas be used?",
        a: "Yes. The label set is defined with your team before annotation begins.",
      },
      {
        q: "Is human validation included?",
        a: "Human review against the annotation guideline is part of the standard workflow for every text project.",
      },
      {
        q: "Do you work on data for LLM training and evaluation?",
        a: "Yes — classification, span marking and structured judgement tasks of the kind used for instruction data and evaluation sets, scoped to what the model is being trained or measured on.",
      },
    ],
  },
];

export const dataTypeBySlug = (slug: string) => dataTypePages.find((p) => p.slug === slug);

/** Shared six-gate quality workflow (live site wording). */
export const qualityGates = [
  { title: "Collection", body: "Capture or sourcing against a defined specification, so the input is already in scope." },
  { title: "Guidelines", body: "A written definition of correct, with worked examples and explicit edge-case handling." },
  { title: "Annotation", body: "Trained annotators working to that guideline, escalating ambiguity rather than guessing." },
  { title: "QA", body: "Structural and consistency checks across the batch, not just within single items." },
  { title: "Human Validation", body: "Review by a second person against the acceptance definition." },
  { title: "Final Dataset", body: "Structured delivery with the guideline and review notes attached." },
];
