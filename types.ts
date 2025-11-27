export enum Category {
  TEST_JEZELF = 'Test Jezelf',
  HERKNEED = 'Herkneed de Leerstof',
  OEFEN_SLIM = 'Oefen Slim',
  PLANNING = 'Studeer Gespreid'
}

export interface Strategy {
  id: string;
  title: string;
  category: Category;
  shortDescription: string;
  howTo: string[];
  iconName: string;
  attention?: string;
}

export interface SubjectTip {
  subject: string;
  strategyId: string;
  tip: string;
}

export const SUBJECTS = [
  "Algemeen",
  "Aardrijkskunde",
  "Kunst Algemeen",
  "Biologie",
  "Engels",
  "Geschiedenis",
  "MVT (Moderne Vreemde Talen)",
  "Muziek",
  "Natuurkunde",
  "Nederlands",
  "Scheikunde",
  "Wiskunde"
] as const;

export type SubjectType = typeof SUBJECTS[number];