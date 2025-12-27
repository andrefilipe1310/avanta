export interface CompetencyLevel {
  competencia: string;
  nivel: number; // 0..4
}

export interface ProfileDNA {
  firstName: string;
  lastName: string;
  email: string;
  password?: string; // plain here, backend must store hashed
  socialProviderId?: string | null;
  consentTimestamp?: string | null;

  interestsMacro?: string[];
  interestsSub?: string[];
  competenciesSelf?: CompetencyLevel[];
  otherCompetencies?: string[];
  targetRole?: string | null;
  companyPreferences?: string[];
  academicBackground?: any[]; // array of academic entries (kept generic for now)
  courses?: any[];
}
