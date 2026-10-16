export type CategoryId =
  | 'hematology'
  | 'biochemistry'
  | 'lipids'
  | 'hormones'
  | 'vitamins'
  | 'iron'
  | 'tumor';

export type ClinicalPolarity = 'lower-is-better' | 'higher-is-better' | 'in-range';

export interface Biomarker {
  name: string;
  category: CategoryId;
  values: (number | null)[];
  refLabel: string;
  min?: number;
  max?: number;
  polarity: ClinicalPolarity;
  unit: string;
  isDerived?: boolean;
  formulaDescription?: string;
  auditNotes?: Record<string, string>;
  workoutNotes?: Record<string, string>;
}

export interface CategoryMeta {
  id: CategoryId;
  label: string;
  shortLabel: string;
  description: string;
}

export const INITIAL_DATES: string[] = [
  'Dec 2021',
  'Feb 2023',
  'May 2024',
  'Nov 2024',
  'Oct 2025',
  'Oct 2026',
];

export interface WorkoutConfounderGroup {
  id: string;
  title: string;
  mechanism: string;
  clinicalTakeaway: string;
  affectedBiomarkers: {
    name: string;
    reading: string;
    status: 'high' | 'low' | 'normal';
  }[];
}

export interface PanelCollectionNote {
  panelDate: string;
  collectedAt: string;
  labProvider: string;
  protocolSummary: string;
  pdfUrl: string;
  headline: string;
  overview: string;
  confounderGroups: WorkoutConfounderGroup[];
}

export const OCT_2026_WORKOUT_NOTE: PanelCollectionNote = {
  panelDate: 'Oct 2026',
  collectedAt: '13 Oct 2026 · 09:10 AM',
  labProvider: 'Unilabs Middle East / Valeo Wellbeing (Dubai)',
  protocolSummary: 'Fasted + water only · Resistance gym workout 90 mins prior',
  pdfUrl: '/reports/2026-10-13-Comprehensive-Full-Body-Checkup.pdf',
  headline: 'Oct 2026 Pre-Draw Protocol Note: Fasted Gym Workout 90 Mins Prior',
  overview:
    'This panel was drawn fasted (water only, no food), but ~90 minutes after completing a resistance training session at the gym. Acute high-intensity muscular work, transient exercise hemolysis, catecholamine-driven lipolysis, and non-insulin GLUT4 glucose uptake predictably shifted several Oct 2026 markers below while baseline metabolic and inflammatory health remained optimal (HbA1c 5.4%, CRP 0.60 mg/L, hs-CRP 0.68 mg/L, Ferritin 84.5 ng/mL).',
  confounderGroups: [
    {
      id: 'renal-creatine',
      title: 'Renal & Phosphocreatine Turnover',
      mechanism:
        'Resistance training accelerates skeletal muscle phosphocreatine-to-creatinine conversion and transiently reduces renal plasma flow via sympathetic vasoconstriction for 12–24h post-workout.',
      clinicalTakeaway:
        'Elevates serum Creatinine (1.20 mg/dL) and Urea (46.27 mg/dL), which mechanically depresses the creatinine-based CKD-EPI eGFR calculation (80 mL/min) without true glomerular injury (resting Nov 2024 eGFR was 115 mL/min at Creatinine 0.90 mg/dL).',
      affectedBiomarkers: [
        { name: 'Creatinine (mg/dL)', reading: '1.20 mg/dL', status: 'high' },
        { name: 'eGFR (ml/min)', reading: '80 ml/min', status: 'low' },
        { name: 'Urea (mg/dL)', reading: '46.27 mg/dL', status: 'normal' },
        { name: 'BUN (mg/dL)', reading: '21.62 mg/dL', status: 'normal' },
      ],
    },
    {
      id: 'exercise-hemolysis',
      title: 'Exercise-Induced Intravascular Hemolysis',
      mechanism:
        'Mechanical capillary shear stress and muscular compression during heavy lifting lyse a small fraction of older erythrocytes, acutely releasing free hemoglobin, heme iron, and unconjugated/direct bilirubin into serum.',
      clinicalTakeaway:
        'Spikes acute Serum Iron (234 μg/dL) and Transferrin Saturation (83.57%) while depressing UIBC (46 μg/dL) and nudging Bilirubin (1.30 mg/dL). True tissue iron storage (Ferritin 84.5 ng/mL) and TIBC (280 μg/dL) are completely normal, ruling out hemochromatosis.',
      affectedBiomarkers: [
        { name: 'Iron (μg/dL)', reading: '234 μg/dL', status: 'high' },
        { name: 'Transferrin Sat (%)', reading: '83.57 %', status: 'high' },
        { name: 'UIBC (μg/dL)', reading: '46 μg/dL', status: 'low' },
        { name: 'Bilirubin Total (mg/dL)', reading: '1.30 mg/dL', status: 'high' },
        { name: 'Bilirubin Direct (mg/dL)', reading: '0.36 mg/dL', status: 'high' },
      ],
    },
    {
      id: 'substrate-mobilization',
      title: 'Fasted Post-Workout Substrate Mobilization',
      mechanism:
        'Contracting skeletal muscle translocates GLUT4 receptors independently of insulin, rapidly clearing blood glucose when training fasted; simultaneously, exercise catecholamines stimulate adipose lipolysis, hepatic VLDL secretion, and a ~3–5% plasma volume shift.',
      clinicalTakeaway:
        'Explains the mildly low Fasting Glucose (64 mg/dL) alongside optimal Fasting Insulin (8.15 uIU/mL) & HOMA-IR (1.29), plus transient post-exercise elevation in Triglycerides (86 mg/dL), VLDL (17.2 mg/dL), LDL (146.1 mg/dL), and Total Cholesterol (210 mg/dL).',
      affectedBiomarkers: [
        { name: 'Fasting Glucose (mg/dL)', reading: '64 mg/dL', status: 'low' },
        { name: 'Triglycerides (mg/dL)', reading: '86 mg/dL', status: 'normal' },
        { name: 'VLDL (mg/dL)', reading: '17.2 mg/dL', status: 'normal' },
        { name: 'LDL (mg/dL)', reading: '146.1 mg/dL', status: 'high' },
        { name: 'Total Cholesterol (mg/dL)', reading: '210 mg/dL', status: 'high' },
      ],
    },
    {
      id: 'leukocyte-demargination',
      title: 'Catecholamine Leukocyte Demargination',
      mechanism:
        'Acute exercise epinephrine and cortisol mobilize marginated neutrophils from the vascular endothelium into circulation for 1–3 hours post-training.',
      clinicalTakeaway:
        'Slightly elevates the Neutrophil-to-Lymphocyte Ratio (NLR 3.28) despite a calm total WBC count (5.70 × 10⁹/L) and ultra-low systemic inflammation (CRP 0.60 mg/L, hs-CRP 0.68 mg/L).',
      affectedBiomarkers: [
        { name: 'NLR (Neutrophil/Lymphocyte)', reading: '3.28 ratio', status: 'high' },
      ],
    },
  ],
};

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'hematology',
    label: 'Hematology & Glycemic',
    shortLabel: 'Hematology',
    description: 'Complete blood count indices, oxygen transport, platelets, HbA1c, and fasting glycemic sensitivity',
  },
  {
    id: 'biochemistry',
    label: 'Renal, Hepatic & Electrolytes',
    shortLabel: 'Biochemistry',
    description: 'Kidney filtration, liver enzymes, proteins, electrolytes, uric acid, and hs-CRP',
  },
  {
    id: 'lipids',
    label: 'Lipid & Atherogenic Profile',
    shortLabel: 'Lipid Profile',
    description: 'Cholesterol fractions, triglycerides, VLDL, Non-HDL, and atherogenic ratios',
  },
  {
    id: 'hormones',
    label: 'Endocrine & Androgens',
    shortLabel: 'Hormones',
    description: 'Thyroid axis (TSH, Free T3/T4), gonadotropins (LH/FSH), sex hormones, SHBG, and Free Androgen Index',
  },
  {
    id: 'vitamins',
    label: 'Micronutrients & Vitamins',
    shortLabel: 'Vitamins',
    description: 'Essential cellular cofactors including Vitamin B12 and 25-OH Vitamin D',
  },
  {
    id: 'iron',
    label: 'Iron Kinetics & Storage',
    shortLabel: 'Iron Studies',
    description: 'Serum iron, TIBC, UIBC, transferrin saturation, and ferritin stores',
  },
  {
    id: 'tumor',
    label: 'Prostate & Screening Markers',
    shortLabel: 'Tumor Markers',
    description: 'Total and Free Prostate-Specific Antigen (PSA) screening',
  },
];

export interface DataAuditEntry {
  biomarker: string;
  category: CategoryId;
  date: string;
  legacyValue: string;
  correctedValue: string;
  reason: string;
}

export const DATA_AUDIT_LOG: DataAuditEntry[] = [
  {
    biomarker: 'Calcium (mg/dL)',
    category: 'biochemistry',
    date: 'May 2024',
    legacyValue: '2.4',
    correctedValue: '9.62 mg/dL',
    reason: 'SI unit mismatch: 2.4 mmol/L converted to mg/dL (× 4.008) to match 8.3–10.6 mg/dL reference range.',
  },
  {
    biomarker: 'Magnesium (mg/dL)',
    category: 'biochemistry',
    date: 'May 2024',
    legacyValue: '0.94',
    correctedValue: '2.28 mg/dL',
    reason: 'SI unit mismatch: 0.94 mmol/L converted to mg/dL (× 2.4305) to match 1.6–2.6 mg/dL reference range.',
  },
  {
    biomarker: 'Free T3 (pg/mL)',
    category: 'hormones',
    date: 'Oct 2026',
    legacyValue: '0.34 ng/dL',
    correctedValue: '3.40 pg/mL',
    reason: 'Unilabs Oct 2026 reported Free T3 in ng/dL (0.34 ng/dL, ref 0.20–0.44); multiplied × 10 to pg/mL to match historical 2.0–4.2 pg/mL scale.',
  },
  {
    biomarker: 'Non-HDL (mg/dL)',
    category: 'lipids',
    date: 'Feb 2023',
    legacyValue: '149.23',
    correctedValue: '163.60 mg/dL',
    reason: 'Copy-paste error from May 2024 fixed: Total Cholesterol (223.84) − HDL (60.24) = 163.60 mg/dL.',
  },
  {
    biomarker: 'VLDL (mg/dL)',
    category: 'lipids',
    date: 'Feb 2023 & May 2024',
    legacyValue: '13.53 / 13.53',
    correctedValue: '15.40 / 13.81 mg/dL',
    reason: 'Friedewald formula (Triglycerides / 5) applied: 77 / 5 = 15.40 (Feb 2023) and 69.03 / 5 = 13.81 (May 2024).',
  },
  {
    biomarker: 'BUN (mg/dL)',
    category: 'biochemistry',
    date: 'Feb 2023 & May 2024',
    legacyValue: 'null / null',
    correctedValue: '23.04 / 17.40 mg/dL',
    reason: 'Backfilled from Urea (mg/dL) / 2.14: 49.31 / 2.14 = 23.04 (Feb 2023) and 37.24 / 2.14 = 17.40 (May 2024).',
  },
  {
    biomarker: 'Trig/HDL Ratio',
    category: 'lipids',
    date: 'Feb 2023 & May 2024',
    legacyValue: 'null / null',
    correctedValue: '1.28 / 1.12',
    reason: 'Backfilled from Triglycerides / HDL: 77 / 60.24 = 1.28 (Feb 2023) and 69.03 / 61.86 = 1.12 (May 2024).',
  },
  {
    biomarker: 'UIBC (μg/dL)',
    category: 'iron',
    date: 'Dec 2021–May 2024 & Oct 2026',
    legacyValue: 'null (4 panels)',
    correctedValue: '181.40 / 123.06 / 192.03 / 46 μg/dL',
    reason: 'Derived from TIBC − Serum Iron across Dec 2021, Feb 2023, May 2024, and Oct 2026 (280 − 234 = 46 μg/dL).',
  },
];

export const INITIAL_BIOMARKERS: Biomarker[] = [
  // 1. HEMATOLOGY & GLYCEMIC (15)
  {
    name: 'HbA1c (%)',
    category: 'hematology',
    values: [5.5, 5.29, 5.0, 5.2, 5.5, 5.4],
    refLabel: '< 5.7',
    max: 5.7,
    polarity: 'lower-is-better',
    unit: '%',
  },
  {
    name: 'Fasting Glucose (mg/dL)',
    category: 'hematology',
    values: [null, null, null, null, null, 64],
    refLabel: '70-100',
    min: 70,
    max: 100,
    polarity: 'in-range',
    unit: 'mg/dL',
    workoutNotes: {
      'Oct 2026':
        'Drawn fasted 90m after resistance training: contracting skeletal muscle translocates GLUT4 receptors independently of insulin, transiently pulling fasting glucose down to 64 mg/dL.',
    },
  },
  {
    name: 'Fasting Insulin (uIU/mL)',
    category: 'hematology',
    values: [null, null, null, null, null, 8.15],
    refLabel: '< 25.0',
    max: 25.0,
    polarity: 'lower-is-better',
    unit: 'uIU/mL',
  },
  {
    name: 'HOMA-IR Index',
    category: 'hematology',
    values: [null, null, null, null, null, 1.29],
    refLabel: '< 2.0',
    max: 2.0,
    polarity: 'lower-is-better',
    unit: 'index',
    isDerived: true,
    formulaDescription: '(Fasting Glucose × Fasting Insulin) ÷ 405',
  },
  {
    name: 'WBC (10⁹/L)',
    category: 'hematology',
    values: [5.93, 8.03, 7.58, 6.6, 5.8, 5.7],
    refLabel: '4.0-10.0',
    min: 4.0,
    max: 10.0,
    polarity: 'in-range',
    unit: '10⁹/L',
  },
  {
    name: 'NLR (Neutrophil/Lymphocyte)',
    category: 'hematology',
    values: [null, null, null, null, null, 3.28],
    refLabel: '1.0-3.0',
    min: 1.0,
    max: 3.0,
    polarity: 'lower-is-better',
    unit: 'ratio',
    isDerived: true,
    formulaDescription: 'Absolute Neutrophils (3.94) ÷ Absolute Lymphocytes (1.20)',
    workoutNotes: {
      'Oct 2026':
        'Drawn 90m post-workout: acute exercise cortisol and epinephrine demarginate neutrophils into peripheral blood (69.1% neutrophils vs 21.1% lymphocytes), transiently raising NLR to 3.28 while WBC (5.7) and CRP (0.60) remain calm.',
    },
  },
  {
    name: 'RBC (10¹²/L)',
    category: 'hematology',
    values: [4.87, 5.15, 4.57, 4.61, 4.68, 4.81],
    refLabel: '4.5-5.5',
    min: 4.5,
    max: 5.5,
    polarity: 'in-range',
    unit: '10¹²/L',
  },
  {
    name: 'Hemoglobin (g/dL)',
    category: 'hematology',
    values: [15.04, 15.91, 14.58, 14.6, 14.4, 14.5],
    refLabel: '13.0-17.0',
    min: 13.0,
    max: 17.0,
    polarity: 'in-range',
    unit: 'g/dL',
  },
  {
    name: 'Hematocrit (%)',
    category: 'hematology',
    values: [46.37, 45.6, 41.4, 42.0, 41.3, 42.6],
    refLabel: '40-50',
    min: 40,
    max: 50,
    polarity: 'in-range',
    unit: '%',
  },
  {
    name: 'MCV (fL)',
    category: 'hematology',
    values: [95.18, 88.5, 90.5, 91.1, 88.2, 88.5],
    refLabel: '80-96',
    min: 80,
    max: 96,
    polarity: 'in-range',
    unit: 'fL',
  },
  {
    name: 'MCH (pg)',
    category: 'hematology',
    values: [30.87, 30.9, 31.9, 31.6, 30.7, 30.2],
    refLabel: '27.0-33.0',
    min: 27.0,
    max: 33.0,
    polarity: 'in-range',
    unit: 'pg',
  },
  {
    name: 'MCHC (g/dL)',
    category: 'hematology',
    values: [32.43, 34.9, 35.2, 34.6, 34.8, 34.2],
    refLabel: '31.5-36.2',
    min: 31.5,
    max: 36.2,
    polarity: 'in-range',
    unit: 'g/dL',
  },
  {
    name: 'RDW (%)',
    category: 'hematology',
    values: [10.97, 13.1, 12.9, 12.6, 12.8, 12.7],
    refLabel: '11.6-14',
    min: 11.6,
    max: 14.0,
    polarity: 'in-range',
    unit: '%',
  },
  {
    name: 'Platelets (10³/uL)',
    category: 'hematology',
    values: [161.6, 171.7, 145.7, 159, 155, 158],
    refLabel: '150-410',
    min: 150,
    max: 410,
    polarity: 'in-range',
    unit: '10³/uL',
  },
  {
    name: 'MPV (fL)',
    category: 'hematology',
    values: [9.24, 10.35, 10.87, 10.7, 10.3, 10.8],
    refLabel: '7.4-11.4',
    min: 7.4,
    max: 11.4,
    polarity: 'in-range',
    unit: 'fL',
  },

  // 2. BIOCHEMISTRY (19)
  {
    name: 'Urea (mg/dL)',
    category: 'biochemistry',
    values: [48.8, 49.31, 37.24, 36.98, 36.42, 46.27],
    refLabel: '19.3-49.2',
    min: 19.3,
    max: 49.2,
    polarity: 'lower-is-better',
    unit: 'mg/dL',
    workoutNotes: {
      'Oct 2026':
        'Drawn 90m post-workout: acute exercise protein catabolism and mild post-training hemoconcentration transiently raised Urea from 36.42 to 46.27 mg/dL (still within normal range).',
    },
  },
  {
    name: 'Creatinine (mg/dL)',
    category: 'biochemistry',
    values: [1.15, 0.99, 0.95, 0.9, 1.17, 1.2],
    refLabel: '0.6-1.1',
    min: 0.6,
    max: 1.1,
    polarity: 'lower-is-better',
    unit: 'mg/dL',
    workoutNotes: {
      'Oct 2026':
        'Drawn 90m after resistance training: active muscular phosphocreatine breakdown and higher lean muscle mass elevate serum creatinine for 12–24h post-workout (resting Nov 2024 baseline was 0.90 mg/dL).',
    },
  },
  {
    name: 'BUN (mg/dL)',
    category: 'biochemistry',
    values: [22.8, 23.04, 17.4, 17.28, 17.02, 21.62],
    refLabel: '9-23',
    min: 9,
    max: 23,
    polarity: 'lower-is-better',
    unit: 'mg/dL',
    isDerived: true,
    formulaDescription: 'Urea (mg/dL) ÷ 2.14',
    auditNotes: {
      'Feb 2023': 'Derived from Urea (49.31 ÷ 2.14 = 23.04 mg/dL); was null in legacy tracker',
      'May 2024': 'Derived from Urea (37.24 ÷ 2.14 = 17.40 mg/dL); was null in legacy tracker',
    },
    workoutNotes: {
      'Oct 2026':
        'Drawn 90m post-workout: reflects acute post-exercise urea nitrogen turnover (21.62 mg/dL, within 9–23 ref range).',
    },
  },
  {
    name: 'eGFR (ml/min)',
    category: 'biochemistry',
    values: [84, 104, 107, 115, 83, 80],
    refLabel: '> 90',
    min: 90,
    polarity: 'higher-is-better',
    unit: 'ml/min',
    workoutNotes: {
      'Oct 2026':
        'Calculated directly from post-workout Creatinine (1.20 mg/dL) via CKD-EPI. Acute resistance training transiently lowers creatinine-based eGFR for 12–24h; resting eGFR in Nov 2024 was 115 mL/min.',
    },
  },
  {
    name: 'Uric Acid (mg/dL)',
    category: 'biochemistry',
    values: [null, null, null, null, null, 7.2],
    refLabel: '3.7-9.2',
    min: 3.7,
    max: 9.2,
    polarity: 'in-range',
    unit: 'mg/dL',
  },
  {
    name: 'Total Protein (g/L)',
    category: 'biochemistry',
    values: [71.5, 75.5, 70.74, 72, 71, 70],
    refLabel: '57-82',
    min: 57,
    max: 82,
    polarity: 'in-range',
    unit: 'g/L',
  },
  {
    name: 'Albumin (g/L)',
    category: 'biochemistry',
    values: [48.6, 50.4, 45.68, 47, 48, 44],
    refLabel: '37-55',
    min: 37,
    max: 55,
    polarity: 'in-range',
    unit: 'g/L',
  },
  {
    name: 'Globulin (g/L)',
    category: 'biochemistry',
    values: [22.9, 25.1, 25.06, 25, 23, 26],
    refLabel: '16-36',
    min: 16,
    max: 36,
    polarity: 'in-range',
    unit: 'g/L',
    isDerived: true,
    formulaDescription: 'Total Protein − Albumin',
  },
  {
    name: 'A/G Ratio',
    category: 'biochemistry',
    values: [2.12, 2.0, 1.82, 1.88, 2.09, 1.69],
    refLabel: '0.7-2.8',
    min: 0.7,
    max: 2.8,
    polarity: 'in-range',
    unit: 'ratio',
    isDerived: true,
    formulaDescription: 'Albumin ÷ Globulin',
  },
  {
    name: 'ALP (U/L)',
    category: 'biochemistry',
    values: [63.4, 68.93, 63, 78, 67, 67],
    refLabel: '46-116',
    min: 46,
    max: 116,
    polarity: 'in-range',
    unit: 'U/L',
  },
  {
    name: 'ALT (U/L)',
    category: 'biochemistry',
    values: [25.4, 32.6, 52.2, 23, 24, 29],
    refLabel: '< 49',
    max: 49,
    polarity: 'lower-is-better',
    unit: 'U/L',
  },
  {
    name: 'AST (U/L)',
    category: 'biochemistry',
    values: [17.6, 20.9, 26.3, 19, 24, 20],
    refLabel: '< 40',
    max: 40,
    polarity: 'lower-is-better',
    unit: 'U/L',
  },
  {
    name: 'GGT (U/L)',
    category: 'biochemistry',
    values: [11.9, 14.5, 12.86, 18, 10, 12],
    refLabel: '< 73',
    max: 73,
    polarity: 'lower-is-better',
    unit: 'U/L',
  },
  {
    name: 'Bilirubin Total (mg/dL)',
    category: 'biochemistry',
    values: [0.85, 1.72, 1.12, 1.7, 1.1, 1.3],
    refLabel: '0.3-1.2',
    min: 0.3,
    max: 1.2,
    polarity: 'lower-is-better',
    unit: 'mg/dL',
    workoutNotes: {
      'Oct 2026':
        'Drawn fasted 90m post-workout: mild exercise-induced intravascular hemolysis and fasting state transiently increase heme-derived bilirubin (1.30 mg/dL vs < 1.2 ref) while liver enzymes (ALT 29, AST 20, GGT 12, ALP 67) are optimal.',
    },
  },
  {
    name: 'Bilirubin Direct (mg/dL)',
    category: 'biochemistry',
    values: [0.39, 0.46, 0.37, 0.5, 0.3, 0.36],
    refLabel: '< 0.3',
    max: 0.3,
    polarity: 'lower-is-better',
    unit: 'mg/dL',
    workoutNotes: {
      'Oct 2026':
        'Drawn fasted 90m post-workout: tracks mildly elevated total bilirubin (1.30 mg/dL) from acute exercise heme turnover; hepatic cholestasis markers (GGT 12, ALP 67) are completely normal.',
    },
  },
  {
    name: 'Calcium (mg/dL)',
    category: 'biochemistry',
    values: [null, null, 9.62, 9.4, 9.7, 9.7],
    refLabel: '8.3-10.6',
    min: 8.3,
    max: 10.6,
    polarity: 'in-range',
    unit: 'mg/dL',
    auditNotes: {
      'May 2024': 'Converted from SI 2.4 mmol/L × 4.008 = 9.62 mg/dL (legacy value was un-converted 2.4)',
    },
  },
  {
    name: 'Magnesium (mg/dL)',
    category: 'biochemistry',
    values: [2.19, 2.4, 2.28, 2.25, 2.26, null],
    refLabel: '1.6-2.6',
    min: 1.6,
    max: 2.6,
    polarity: 'in-range',
    unit: 'mg/dL',
    auditNotes: {
      'May 2024': 'Converted from SI 0.94 mmol/L × 2.4305 = 2.28 mg/dL (legacy value was un-converted 0.94)',
    },
  },
  {
    name: 'CRP (mg/L)',
    category: 'biochemistry',
    values: [0.58, null, 0.518, null, 2.4, 0.6],
    refLabel: '< 8.0',
    max: 8.0,
    polarity: 'lower-is-better',
    unit: 'mg/L',
  },
  {
    name: 'hs-CRP (mg/L)',
    category: 'biochemistry',
    values: [null, null, null, null, null, 0.68],
    refLabel: '< 1.0',
    max: 1.0,
    polarity: 'lower-is-better',
    unit: 'mg/L',
  },

  // 3. LIPIDS (9)
  {
    name: 'Total Cholesterol (mg/dL)',
    category: 'lipids',
    values: [202, 223.84, 211.08, 191, 188, 210],
    refLabel: '< 200',
    max: 200,
    polarity: 'lower-is-better',
    unit: 'mg/dL',
    workoutNotes: {
      'Oct 2026':
        'Drawn 90m post-workout: acute exercise hemoconcentration (~3–5% plasma volume shift into active muscle) transiently concentrates circulating lipoproteins.',
    },
  },
  {
    name: 'HDL (mg/dL)',
    category: 'lipids',
    values: [49.7, 60.24, 61.86, 52.8, 51.9, 48.8],
    refLabel: '> 40',
    min: 40,
    polarity: 'higher-is-better',
    unit: 'mg/dL',
  },
  {
    name: 'LDL (mg/dL)',
    category: 'lipids',
    values: [136.5, 107.45, 137.63, 129.6, 126.5, 146.1],
    refLabel: '< 100',
    max: 100,
    polarity: 'lower-is-better',
    unit: 'mg/dL',
    workoutNotes: {
      'Oct 2026':
        'Drawn 90m post-workout: acute exercise plasma volume shift (~3–5%) modestly concentrates LDL particles above resting baseline.',
    },
  },
  {
    name: 'VLDL (mg/dL)',
    category: 'lipids',
    values: [15.8, 15.4, 13.81, 8.6, 9.6, 17.2],
    refLabel: '0-40',
    min: 0,
    max: 40,
    polarity: 'lower-is-better',
    unit: 'mg/dL',
    isDerived: true,
    formulaDescription: 'Triglycerides ÷ 5 (Friedewald)',
    auditNotes: {
      'Feb 2023': 'Recalculated via Friedewald (77 ÷ 5 = 15.40 mg/dL); legacy value was 13.53',
      'May 2024': 'Recalculated via Friedewald (69.03 ÷ 5 = 13.81 mg/dL); legacy value was 13.53',
    },
    workoutNotes: {
      'Oct 2026':
        'Drawn fasted 90m post-workout: catecholamine-stimulated adipose lipolysis increases hepatic VLDL export during recovery.',
    },
  },
  {
    name: 'Non-HDL (mg/dL)',
    category: 'lipids',
    values: [152.3, 163.6, 149.23, 138.2, 136.1, 161.2],
    refLabel: '< 130',
    max: 130,
    polarity: 'lower-is-better',
    unit: 'mg/dL',
    isDerived: true,
    formulaDescription: 'Total Cholesterol − HDL',
    auditNotes: {
      'Feb 2023': 'Corrected copy-paste error (223.84 − 60.24 = 163.60 mg/dL); legacy value was 149.23',
    },
  },
  {
    name: 'Triglycerides (mg/dL)',
    category: 'lipids',
    values: [79, 77, 69.03, 43, 48, 86],
    refLabel: '< 150',
    max: 150,
    polarity: 'lower-is-better',
    unit: 'mg/dL',
    workoutNotes: {
      'Oct 2026':
        'Drawn fasted 90m post-workout: exercise catecholamines mobilize free fatty acids and VLDL triglycerides to refuel muscle (86 mg/dL vs 48 mg/dL resting in Oct 2025; still well below <150 ref).',
    },
  },
  {
    name: 'Total/HDL Ratio',
    category: 'lipids',
    values: [4.06, 3.71, 3.41, 3.62, 3.62, 4.3],
    refLabel: '< 3.5',
    max: 3.5,
    polarity: 'lower-is-better',
    unit: 'ratio',
    isDerived: true,
    formulaDescription: 'Total Cholesterol ÷ HDL',
  },
  {
    name: 'LDL/HDL Ratio',
    category: 'lipids',
    values: [2.75, 1.78, 2.23, 2.45, 2.44, 2.99],
    refLabel: '< 3.0',
    max: 3.0,
    polarity: 'lower-is-better',
    unit: 'ratio',
    isDerived: true,
    formulaDescription: 'LDL ÷ HDL',
  },
  {
    name: 'Trig/HDL Ratio',
    category: 'lipids',
    values: [1.59, 1.28, 1.12, 0.81, 0.92, 1.76],
    refLabel: '< 2.0',
    max: 2.0,
    polarity: 'lower-is-better',
    unit: 'ratio',
    isDerived: true,
    formulaDescription: 'Triglycerides ÷ HDL',
    auditNotes: {
      'Feb 2023': 'Derived from Triglycerides ÷ HDL (77 ÷ 60.24 = 1.28); was null in legacy tracker',
      'May 2024': 'Derived from Triglycerides ÷ HDL (69.03 ÷ 61.86 = 1.12); was null in legacy tracker',
    },
  },

  // 4. HORMONES (10)
  {
    name: 'TSH (uIU/mL)',
    category: 'hormones',
    values: [2.33, 2.357, 1.93, 2.244, 1.773, 2.87],
    refLabel: '0.55-4.78',
    min: 0.55,
    max: 4.78,
    polarity: 'in-range',
    unit: 'uIU/mL',
  },
  {
    name: 'Free T3 (pg/mL)',
    category: 'hormones',
    values: [null, null, 2.93, null, null, 3.4],
    refLabel: '2.0-4.2',
    min: 2.0,
    max: 4.2,
    polarity: 'in-range',
    unit: 'pg/mL',
    auditNotes: {
      'Oct 2026': 'Converted from Unilabs 0.34 ng/dL × 10 = 3.40 pg/mL (lab ref 0.20–0.44 ng/dL = 2.0–4.4 pg/mL)',
    },
  },
  {
    name: 'Free T4 (ng/dL)',
    category: 'hormones',
    values: [1.37, 1.82, 1.29, 1.12, 1.21, 1.17],
    refLabel: '0.89-1.76',
    min: 0.89,
    max: 1.76,
    polarity: 'in-range',
    unit: 'ng/dL',
  },
  {
    name: 'LH (IU/L)',
    category: 'hormones',
    values: [null, null, null, null, null, 2.91],
    refLabel: '1.5-9.3',
    min: 1.5,
    max: 9.3,
    polarity: 'in-range',
    unit: 'IU/L',
  },
  {
    name: 'FSH (IU/L)',
    category: 'hormones',
    values: [null, null, null, null, null, 5.01],
    refLabel: '1.4-18.1',
    min: 1.4,
    max: 18.1,
    polarity: 'in-range',
    unit: 'IU/L',
  },
  {
    name: 'SHBG (nmol/L)',
    category: 'hormones',
    values: [35.5, 38.2, 38.1, 40.53, 38.43, null],
    refLabel: '11.54-54.49',
    min: 11.54,
    max: 54.49,
    polarity: 'in-range',
    unit: 'nmol/L',
  },
  {
    name: 'Total Testosterone (ng/mL)',
    category: 'hormones',
    values: [6.16, 4.82, 3.92, 3.55, 5.32, 5.31],
    refLabel: '2.64-9.16',
    min: 2.64,
    max: 9.16,
    polarity: 'higher-is-better',
    unit: 'ng/mL',
  },
  {
    name: 'Free Testosterone (nmol/L)',
    category: 'hormones',
    values: [null, 0.295, null, null, null, null],
    refLabel: '0.198-0.619',
    min: 0.198,
    max: 0.619,
    polarity: 'higher-is-better',
    unit: 'nmol/L',
  },
  {
    name: 'Free Androgen Index',
    category: 'hormones',
    values: [60.21, 43.87, 35.67, 30.39, 48.04, null],
    refLabel: '35.0-92.6',
    min: 35.0,
    max: 92.6,
    polarity: 'higher-is-better',
    unit: 'index',
    isDerived: true,
    formulaDescription: '(Total Testosterone [ng/mL] × 3.467 ÷ SHBG [nmol/L]) × 100',
  },
  {
    name: 'Estradiol (pg/mL)',
    category: 'hormones',
    values: [null, 15.8, null, null, null, 30.2],
    refLabel: '< 39.8',
    max: 39.8,
    polarity: 'in-range',
    unit: 'pg/mL',
    auditNotes: {
      'Feb 2023': 'Normalized ref string from "< 15.0-31.5" and aligned to Unilabs adult male reference (< 39.8 pg/mL)',
    },
  },

  // 5. VITAMINS (2)
  {
    name: 'Vitamin B12 (pg/mL)',
    category: 'vitamins',
    values: [338, 263, 208, 266, 282, 280],
    refLabel: '211-911',
    min: 211,
    max: 911,
    polarity: 'higher-is-better',
    unit: 'pg/mL',
  },
  {
    name: 'Vitamin D (ng/mL)',
    category: 'vitamins',
    values: [32.2, 35.13, 36.9, 36.82, 33.1, 36.01],
    refLabel: '> 30',
    min: 30,
    polarity: 'higher-is-better',
    unit: 'ng/mL',
  },

  // 6. IRON STUDIES (5)
  {
    name: 'Iron (μg/dL)',
    category: 'iron',
    values: [96.1, 169.94, 80.38, 128, 104, 234],
    refLabel: '65-175',
    min: 65,
    max: 175,
    polarity: 'in-range',
    unit: 'μg/dL',
    workoutNotes: {
      'Oct 2026':
        'Drawn 90m post-workout: acute exercise-induced intravascular micro-hemolysis transiently releases free iron into serum (234 μg/dL) while true iron storage (Ferritin 84.5 ng/mL) and TIBC (280 μg/dL) remain completely normal.',
    },
  },
  {
    name: 'TIBC (μg/dL)',
    category: 'iron',
    values: [277.5, 293, 272.41, 297, 296, 280],
    refLabel: '250-425',
    min: 250,
    max: 425,
    polarity: 'in-range',
    unit: 'μg/dL',
  },
  {
    name: 'UIBC (μg/dL)',
    category: 'iron',
    values: [181.4, 123.06, 192.03, 169, 192, 46],
    refLabel: '125-345',
    min: 125,
    max: 345,
    polarity: 'in-range',
    unit: 'μg/dL',
    isDerived: true,
    formulaDescription: 'TIBC − Iron',
    auditNotes: {
      'Dec 2021': 'Derived from TIBC − Iron (277.5 − 96.1 = 181.40 μg/dL); was null in legacy tracker',
      'Feb 2023': 'Derived from TIBC − Iron (293 − 169.94 = 123.06 μg/dL); was null in legacy tracker',
      'May 2024': 'Derived from TIBC − Iron (272.41 − 80.38 = 192.03 μg/dL); was null in legacy tracker',
      'Oct 2026': 'Derived from TIBC − Iron (280 − 234 = 46 μg/dL)',
    },
    workoutNotes: {
      'Oct 2026':
        'Drawn 90m post-workout: acute post-exercise serum iron release (234 μg/dL) transiently occupies transferrin binding sites, lowering calculated UIBC (280 − 234 = 46 μg/dL).',
    },
  },
  {
    name: 'Transferrin Sat (%)',
    category: 'iron',
    values: [34.63, 57.94, 29.48, 43.1, 35.14, 83.57],
    refLabel: '20-50',
    min: 20,
    max: 50,
    polarity: 'in-range',
    unit: '%',
    isDerived: true,
    formulaDescription: '(Iron ÷ TIBC) × 100',
    workoutNotes: {
      'Oct 2026':
        'Drawn 90m post-workout: calculated from acute post-exercise Serum Iron (234 ÷ 280 = 83.57%). Normal Ferritin (84.5 ng/mL) and TIBC (280 μg/dL) confirm transient exercise hemolysis rather than iron overload.',
    },
  },
  {
    name: 'Ferritin (ng/mL)',
    category: 'iron',
    values: [null, 130.6, 115, 113.1, 101.3, 84.5],
    refLabel: '22-322',
    min: 22,
    max: 322,
    polarity: 'in-range',
    unit: 'ng/mL',
  },

  // 7. TUMOR MARKERS (2)
  {
    name: 'Total PSA (ng/mL)',
    category: 'tumor',
    values: [1.69, null, null, 0.59, null, null],
    refLabel: '< 2.0',
    max: 2.0,
    polarity: 'lower-is-better',
    unit: 'ng/mL',
  },
  {
    name: 'Free PSA (ng/mL)',
    category: 'tumor',
    values: [null, null, null, 0.3, null, null],
    refLabel: 'N/A',
    polarity: 'lower-is-better',
    unit: 'ng/mL',
  },
];
