import { Cpu, FileText, Glasses, GraduationCap, Handshake, Rocket, Users, Video } from "lucide-react";

/** Partnership programme content shared by /partnerships and the homepage preview. */
export const profiles = [
  { letter: "A", icon: Rocket, title: "Early-stage startups", body: "Small companies ready to run structured data operations." },
  { letter: "B", icon: Cpu, title: "Technical teams", body: "Hardware, software, AI, robotics or data-workflow skills." },
  { letter: "C", icon: Video, title: "Data collection operators", body: "Able to organise real-world capture where you have access." },
  { letter: "D", icon: Users, title: "Founding teams", body: "Able to commit time and follow a written specification." },
];

export const steps = [
  { title: "Apply", body: "Tell us about your team, skills, location and experience." },
  { title: "Evaluation", body: "We review capacity and fit against project requirements." },
  { title: "Discuss the terms", body: "Scope, hours, equipment, training, any costs and compensation — agreed in writing." },
  { title: "Training & setup", body: "Onboarding and protocols. Equipment only where agreed and available." },
  { title: "Execute", body: "Deliver to Mvaak’s specifications and quality requirements." },
  { title: "Review & grow", body: "Work is assessed against agreed criteria. Further work may follow." },
];

export const gains = [
  { icon: Glasses, title: "Equipment access", body: "Capture devices may be provided where agreed and available." },
  { icon: GraduationCap, title: "Practical training", body: "Learn the agreed workflow before work begins." },
  { icon: FileText, title: "Clear specifications", body: "Documented tasks, deliverables and quality criteria." },
  { icon: Handshake, title: "Future opportunities", body: "Partners who deliver well may be considered for more work." },
];
