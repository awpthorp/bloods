export interface ScienceCitation {
  authors: string;
  year: number;
  title: string;
  journal: string;
  finding: string;
  url: string;
}

export interface BiomarkerScienceEntry {
  tagline: string;
  whatItIs: string;
  whyItMatters: string;
  optimalTarget: string;
  nutritionHelps: string[];
  nutritionAvoid: string[];
  exerciseEffects: {
    chronic: string;
    acutePreDraw: string;
  };
  lifestyleAndSupplements: string[];
  citations: ScienceCitation[];
}

export const BIOMARKER_SCIENCE: Record<string, BiomarkerScienceEntry> = {
  // Hematology and glycemic
  'HbA1c (%)': {
    tagline: 'Three-month average of hemoglobin glycation, weighted toward the last 30 days.',
    whatItIs:
      'HbA1c is the share of adult hemoglobin that has been irreversibly glycated at the N-terminal valine of the beta chain. Red cells circulate about 110–120 days, so the value integrates mean glucose over 8–12 weeks rather than the morning of the draw. Recent weeks count more than the oldest cells.',
    whyItMatters:
      'Higher glycation tracks advanced glycation end products, stiffer vessels, and microvascular injury. In people without diabetes, risk of coronary disease and death still rises as HbA1c climbs through the “normal” range. A low value can also reflect rapid red-cell turnover or blood loss, not only excellent glucose control.',
    optimalTarget:
      'Standard lab range is under 5.7%; a longevity range often discussed is about 4.8–5.3% when red-cell lifespan is normal.',
    nutritionHelps: [
      'Soluble fiber (oats, barley, legumes, psyllium) before starch slows the glucose rise that drives glycation.',
      'Vinegar or other food acids with a high-carb meal blunt the post-meal glucose peak.',
      'Protein and non-starchy vegetables eaten before carbohydrate flatten the same meal.',
    ],
    nutritionAvoid: [
      'Sugar-sweetened drinks, which spike portal glucose without the braking effect of solid food.',
      'Large refined-starch meals late at night, when melatonin already dampens insulin release.',
    ],
    exerciseEffects: {
      chronic:
        'Months of combined strength and zone-2 work expand muscle glucose disposal and typically lower HbA1c by a few tenths of a percent.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw does not move HbA1c. Glycation is covalent and accumulated over months, so one workout cannot change it.',
    },
    lifestyleAndSupplements: [
      'A 10–15 minute walk after meals clears glucose without needing a change in the lab draw.',
      'Short sleep (about 4 hours) can cut next-day glucose disposal by roughly a fifth.',
      'Berberine with meals has trial support for lowering glucose; it is not a substitute for the average the A1c already recorded.',
    ],
    citations: [
      { authors: 'Khaw KT, Wareham N, Bingham S, et al.', year: 2004, journal: 'Annals of Internal Medicine',
        title: 'Association of hemoglobin A1c with cardiovascular disease and mortality in adults: the European Prospective Investigation into Cancer in Norfolk',
        finding: 'Cardiovascular events and death rose continuously with HbA1c well below the diabetic threshold.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Association%20of%20hemoglobin%20A1c%20with%20cardiovascular%20disease%20and%20mortality' },
      { authors: 'Selvin E, Steffes MW, Zhu H, et al.', year: 2010, journal: 'New England Journal of Medicine',
        title: 'Glycated hemoglobin, diabetes, and cardiovascular risk in nondiabetic adults',
        finding: 'In nondiabetic adults, HbA1c predicted later cardiovascular disease and death more strongly than a single fasting glucose.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Glycated%20hemoglobin%20diabetes%20and%20cardiovascular%20risk%20in%20nondiabetic%20adults' },
    ],
  },

  'Fasting Glucose (mg/dL)': {
    tagline: 'Morning blood sugar set by overnight liver output and basal muscle uptake.',
    whatItIs:
      'Fasting glucose is free glucose after 8–12 hours without calories. With no absorption from food, the liver supplies glucose by glycogen breakdown and gluconeogenesis, while brain, red cells, and resting muscle consume it. The insulin-to-glucagon ratio is what holds that balance overnight.',
    whyItMatters:
      'A fasting value creeping above about 95–100 mg/dL often means the liver is no longer fully restrained by basal insulin. Values in the 60s in a lean, trained person after morning training usually reflect rapid muscle uptake, not dangerous hypoglycemia, if there are no symptoms. Vascular risk in large cohorts starts rising as fasting glucose leaves the mid-80s.',
    optimalTarget:
      'Standard lab range is 70–100 mg/dL; a rested longevity window often discussed is about 72–88 mg/dL.',
    nutritionHelps: [
      'Finishing dinner 3–4 hours before sleep lowers overnight hepatic glucose output.',
      'Magnesium-rich foods (leafy greens, pumpkin seeds, legumes) support insulin signaling.',
      'An evening plate built on protein and vegetables, not refined starch, steadies the morning number.',
    ],
    nutritionAvoid: [
      'Alcohol in the evening, which disturbs hepatic redox state and can rebound the morning glucose.',
      'Coffee immediately before the draw: caffeine raises epinephrine and can lift glucose for 1–2 hours.',
    ],
    exerciseEffects: {
      chronic:
        'Regular aerobic and resistance training improves hepatic and muscle insulin sensitivity and parks resting glucose in the 70s to high 80s.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw can move this marker a lot. Contracting muscle pulls glucose in through GLUT4 without insulin, so a fasted lifting session within about 90 minutes can drop the reading into the 60s; a maximal sprint bout can instead spike it via liver glycogenolysis.',
    },
    lifestyleAndSupplements: [
      'Draw after a water-only fast, before coffee and before training, when you want the basal number.',
      'Morning light and a consistent wake time blunt an exaggerated dawn cortisol rise.',
    ],
    citations: [
      { authors: 'Richter EA, Hargreaves M', year: 2013, journal: 'Physiological Reviews',
        title: 'Exercise, GLUT4, and skeletal muscle glucose uptake',
        finding: 'Muscle contraction moves GLUT4 to the membrane and clears blood glucose independently of insulin.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Exercise%20GLUT4%20and%20skeletal%20muscle%20glucose%20uptake' },
      { authors: 'Emerging Risk Factors Collaboration', year: 2010, journal: 'The Lancet',
        title: 'Diabetes mellitus, fasting blood glucose concentration, and risk of vascular disease: a collaborative meta-analysis of 102 prospective studies',
        finding: 'Vascular death rose as fasting glucose increased above roughly 100 mg/dL across 102 cohorts.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=fasting%20blood%20glucose%20concentration%20and%20risk%20of%20vascular%20disease' },
    ],
  },

  'Fasting Insulin (uIU/mL)': {
    tagline: 'Basal pancreatic insulin required to keep the liver quiet overnight.',
    whatItIs:
      'Fasting insulin is the hormone concentration after an overnight fast, before a meal stimulates a spike. Beta cells secrete it in pulses to suppress hepatic glucose production and restrain lipolysis. A “normal” lab ceiling near 25 uIU/mL is far above what an insulin-sensitive adult needs.',
    whyItMatters:
      'Chronically high fasting insulin is an early sign of insulin resistance, often years before glucose or HbA1c leave range, and it tracks future coronary disease. Very low insulin with high glucose suggests failing beta cells. Mildly low insulin with low-normal glucose in a lean athlete is efficient signaling, not a deficiency.',
    optimalTarget:
      'Many labs flag only values above 25 uIU/mL; a longevity target often discussed is under about 6–8, ideally near or below 5 when glucose is also calm.',
    nutritionHelps: [
      'A lower refined-carbohydrate pattern reduces the basal insulin needed to restrain the liver.',
      'Protein-forward meals with fiber improve satiety without a large insulin requirement at rest.',
      'Unprocessed food patterns that correct visceral fat lower fasting insulin over months.',
    ],
    nutritionAvoid: [
      'Grazing on sugary snacks, which keeps insulin from ever returning to a true fasting baseline.',
      'A large liquid-calorie breakfast or coffee drink before the draw, which is no longer a fasting sample.',
    ],
    exerciseEffects: {
      chronic:
        'Training increases insulin sensitivity, so the same glucose control is achieved at a lower fasting insulin.',
      acutePreDraw:
        'A gym session in the prior 24 hours usually leaves fasting insulin the same or slightly lower, because muscle is more insulin-sensitive after work. It does not create a false high unless you ate carbohydrate during or after the session.',
    },
    lifestyleAndSupplements: [
      'Sleep loss raises insulin resistance the next day even if diet is unchanged.',
      'Visceral fat loss moves fasting insulin more than any single supplement.',
      'Magnesium repletion helps when intake is low; it will not override ongoing surplus and inactivity.',
    ],
    citations: [
      { authors: 'Després JP, Lamarche B, Mauriège P, et al.', year: 1996, journal: 'New England Journal of Medicine',
        title: 'Hyperinsulinemia as an independent risk factor for ischemic heart disease',
        finding: 'Fasting insulin predicted ischemic heart disease independently of conventional lipid risk in men.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Hyperinsulinemia%20as%20an%20independent%20risk%20factor%20for%20ischemic%20heart%20disease' },
      { authors: 'Facchini FS, Hua N, Abbasi F, Reaven GM', year: 2001, journal: 'Journal of Clinical Endocrinology and Metabolism',
        title: 'Insulin resistance as a predictor of age-related diseases',
        finding: 'Insulin-resistant adults developed more age-related disease over follow-up than insulin-sensitive peers.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Insulin%20resistance%20as%20a%20predictor%20of%20age-related%20diseases' },
    ],
  },

  'HOMA-IR Index': {
    tagline: 'A calculated product of fasting glucose and insulin that estimates hepatic insulin resistance.',
    whatItIs:
      'HOMA-IR uses the Matthews homeostasis model: with glucose in mg/dL it is (fasting glucose × fasting insulin) / 405. It is not a separate lab assay. The original papers used mmol/L and divided by 22.5; the 405 form is the same math in US units. It assumes a steady fasting state, which a post-workout draw violates.',
    whyItMatters:
      'Values climbing through 2 and above mark compensatory hyperinsulinemia and predict type 2 diabetes and cardiometabolic disease. A low index with both inputs in the optimal zone means the liver is easy to suppress. An isolated low index only because glucose was pulled down by exercise is not extra metabolic credit.',
    optimalTarget:
      'This panel treats under 2.0 as the reference; insulin-sensitive longevity discussions often aim under about 1.0–1.5 on a rested fasting draw.',
    nutritionHelps: [
      'The same pattern that lowers fasting insulin (fewer refined carbohydrates, adequate protein, fiber) lowers HOMA-IR.',
      'Weight loss of visceral fat improves the index even before HbA1c moves.',
      'Replacing evening alcohol and late starch with an earlier, higher-protein dinner helps the morning pair of inputs.',
    ],
    nutritionAvoid: [
      'Any calories in the 8–12 hours before the draw invalidate the fasting assumption inside the formula.',
      'Fructose-heavy drinks promote hepatic insulin resistance and push the index up over time.',
    ],
    exerciseEffects: {
      chronic:
        'Training lowers HOMA-IR over weeks by lowering the insulin required for a given fasting glucose.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw moves HOMA-IR because it moves the inputs. A fasted lifting session that drops glucose, and often insulin, can make the index look better than the rested baseline for that one sample.',
    },
    lifestyleAndSupplements: [
      'Repeat the calculation only on rested, water-fasted mornings if you want a trend.',
      'Sleep extension and visceral-fat loss change the index more reliably than supplement stacks.',
    ],
    citations: [
      { authors: 'Matthews DR, Hosker JP, Rudenski AS, et al.', year: 1985, journal: 'Diabetologia',
        title: 'Homeostasis model assessment: insulin resistance and beta-cell function from fasting plasma glucose and insulin concentrations in man',
        finding: 'Introduced HOMA as a fasting model of insulin resistance and beta-cell function against clamp data.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Homeostasis%20model%20assessment%20insulin%20resistance%20and%20beta-cell%20function' },
      { authors: 'Wallace TM, Levy JC, Matthews DR', year: 2004, journal: 'Diabetes Care',
        title: 'Use and abuse of HOMA modeling',
        finding: 'HOMA is useful for group trends but misleads when samples are not truly fasting or when beta cells are failing.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Use%20and%20abuse%20of%20HOMA%20modeling' },
    ],
  },

  'WBC (10⁹/L)': {
    tagline: 'Total circulating white cells: neutrophils, lymphocytes, monocytes, eosinophils, and basophils.',
    whatItIs:
      'The white-cell count is the number of leukocytes per liter of blood. Most of the number is neutrophils and lymphocytes produced in marrow and briefly circulating before they enter tissues. A large fraction of neutrophils is marginated on vessel walls and can be released into the countable pool within minutes.',
    whyItMatters:
      'A high count suggests infection, steroids, smoking, leukemia, or demargination. A low count suggests viral illness, drugs, autoimmune disease, or marrow problems. Even inside the reference range, a higher white-cell count predicts more coronary events in population studies, as a marker of low-grade inflammation.',
    optimalTarget:
      'Standard lab range is 4.0–10.0 × 10⁹/L; a rested longevity window often discussed is about 4.5–6.5, away from both marrow suppression and chronic inflammation.',
    nutritionHelps: [
      'A produce-rich pattern that lowers visceral fat tends to pull a chronically high-normal count down.',
      'Adequate energy and protein prevent the low counts seen in under-fueling.',
      'Correcting iron, B12, or folate deficiency matters when the white-cell count is low alongside anemia.',
    ],
    nutritionAvoid: [
      'Heavy alcohol use can suppress marrow and drop the count.',
      'Smoking is a classic cause of a persistently higher neutrophil count.',
    ],
    exerciseEffects: {
      chronic:
        'Trained people often sit at the lower half of the reference range at rest, with a brisk rise and fall around hard sessions.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw raises the white-cell count for several hours, mainly by demarginating neutrophils with cortisol and epinephrine. It is often back near baseline by the next day unless the session was very long.',
    },
    lifestyleAndSupplements: [
      'Draw resting counts after a day off hard training if you are trending inflammation rather than the workout.',
      'Persistent counts under 3.5 or over 11 at rest need a clinical review, not a diet tweak.',
    ],
    citations: [
      { authors: 'Danesh J, Collins R, Appleby P, Peto R', year: 1998, journal: 'JAMA',
        title: 'Association of fibrinogen, C-reactive protein, albumin, or leukocyte count with coronary heart disease: meta-analyses of prospective studies',
        finding: 'A higher leukocyte count was associated with coronary heart disease across prospective cohorts.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=fibrinogen%20C-reactive%20protein%20albumin%20or%20leukocyte%20count%20with%20coronary%20heart%20disease' },
      { authors: 'Margolis KL, Manson JE, Greenland P, et al.', year: 2005, journal: 'Archives of Internal Medicine',
        title: 'Leukocyte count as a predictor of cardiovascular events and mortality in postmenopausal women',
        finding: 'In the Women Health Initiative, higher white-cell counts predicted cardiovascular events and death.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Leukocyte%20count%20as%20a%20predictor%20of%20cardiovascular%20events%20and%20mortality' },
    ],
  },

  'NLR (Neutrophil/Lymphocyte)': {
    tagline: 'Ratio of absolute neutrophils to lymphocytes, a compact index of innate versus adaptive cells.',
    whatItIs:
      'NLR divides the absolute neutrophil count by the absolute lymphocyte count. It is derived, not a separate assay. Neutrophils rise with bacterial stress, cortisol, and catecholamines; lymphocytes fall with the same stress hormones and with some viral illnesses. The ratio amplifies those opposite shifts.',
    whyItMatters:
      'A persistently high NLR is linked with atherosclerotic events and worse outcomes in cancer and critical illness. A very low ratio is uncommon and usually means neutropenia. Because stress hormones move the two counts in opposite directions, a single high NLR on a training day can be physiology rather than disease.',
    optimalTarget:
      'This panel uses 1.0–3.0 as the reference, with lower favored; rested values around 1.5–2.5 are a practical longevity band.',
    nutritionHelps: [
      'Patterns that lower chronic inflammation (vegetables, fiber, weight stability) support a lower rested NLR.',
      'Adequate calories prevent the lymphopenia of prolonged under-eating.',
      'There is no single food that selectively “fixes” the ratio independent of the two counts.',
    ],
    nutritionAvoid: [
      'Smoking raises neutrophils and therefore the ratio.',
      'Crash dieting and sleep debt can drop lymphocytes and inflate NLR.',
    ],
    exerciseEffects: {
      chronic:
        'Fit people can show a high NLR only around hard sessions and a modest ratio on true rest days.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw reliably raises NLR. Epinephrine and cortisol demarginate neutrophils and traffic lymphocytes out of blood, so the ratio can exceed 3 for several hours even when total white cells and CRP are calm.',
    },
    lifestyleAndSupplements: [
      'Interpret NLR only against a rested draw if the question is chronic inflammation.',
      'If neutrophils stay high and lymphocytes stay low on rest days, look for infection, smoking, or non-thyroidal illness rather than a supplement.',
    ],
    citations: [
      { authors: 'Templeton AJ, McNamara MG, Šeruga B, et al.', year: 2014, journal: 'Journal of the National Cancer Institute',
        title: 'Prognostic role of neutrophil-to-lymphocyte ratio in solid tumors: a systematic review and meta-analysis',
        finding: 'A higher NLR predicted worse overall survival across many solid tumors.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Prognostic%20role%20of%20neutrophil-to-lymphocyte%20ratio%20in%20solid%20tumors' },
      { authors: 'Adamstein NH, MacFadyen JG, Rose LM, et al.', year: 2021, journal: 'European Heart Journal',
        title: 'The neutrophil-lymphocyte ratio and incident atherosclerotic events: analyses from five contemporary randomized trials',
        finding: 'Higher NLR predicted incident atherosclerotic events in contemporary prevention trials.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=neutrophil-lymphocyte%20ratio%20and%20incident%20atherosclerotic%20events' },
    ],
  },

  'RBC (10¹²/L)': {
    tagline: 'Concentration of circulating red cells that carry hemoglobin.',
    whatItIs:
      'The red-cell count is the number of erythrocytes per liter. Marrow produces them under erythropoietin, which the kidney releases when oxygen delivery falls. Each cell lives about four months. The count moves with true red-cell mass and also with plasma volume: dehydration concentrates it, and plasma expansion dilutes it.',
    whyItMatters:
      'A low count is anemia from blood loss, deficiency, marrow disease, or hemolysis, and it limits oxygen delivery. A high count can be polycythemia vera, secondary erythrocytosis from hypoxia or testosterone, or simply hemoconcentration. Both extremes raise risk: too few cells limit work capacity, too many raise viscosity.',
    optimalTarget:
      'Standard lab range is 4.5–5.5 × 10¹²/L for men; mid-range on a hydrated, rested draw is the practical target, read next to hemoglobin.',
    nutritionHelps: [
      'Iron, B12, and folate are required to build red cells when a low count is deficiency, not dilution.',
      'Adequate dietary protein supplies globin synthesis.',
      'Hydration status should be normal before you decide the count is truly high or low.',
    ],
    nutritionAvoid: [
      'Chronic under-eating with low iron intake stalls red-cell production.',
      'Excess alcohol suppresses marrow and can lower the count.',
    ],
    exerciseEffects: {
      chronic:
        'Endurance training expands plasma volume, so the rested red-cell count can sit lower even while total red-cell mass is higher.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw, especially if you are under-hydrated, raises the red-cell count slightly by pulling plasma into muscle. The change is concentration, not new cells.',
    },
    lifestyleAndSupplements: [
      'Sleep apnea and exogenous testosterone can raise the count; both deserve a look if it climbs over time.',
      'Altitude and smoking raise erythropoietin and the count for as long as the hypoxic stimulus lasts.',
    ],
    citations: [
      { authors: 'Haase VH', year: 2013, journal: 'Blood Reviews',
        title: 'Regulation of erythropoiesis by hypoxia-inducible factors',
        finding: 'Kidney hypoxia-inducible factors control erythropoietin and therefore red-cell production.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Regulation%20of%20erythropoiesis%20by%20hypoxia-inducible%20factors' },
      { authors: 'Koury MJ, Ponka P', year: 2004, journal: 'Annual Review of Nutrition',
        title: 'New insights into erythropoiesis: the roles of folate, vitamin B12, and iron',
        finding: 'Iron, folate, and B12 are obligate substrates for normal red-cell production.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=New%20insights%20into%20erythropoiesis%20folate%20vitamin%20B12%20and%20iron' },
    ],
  },

  'Hemoglobin (g/dL)': {
    tagline: 'Oxygen-carrying protein inside red cells, and the practical definition of anemia.',
    whatItIs:
      'Hemoglobin is the iron-containing protein that binds oxygen in the lung and releases it in tissues. It is reported as grams per deciliter of whole blood, so it reflects red-cell mass, the hemoglobin inside each cell, and plasma volume. Men lose little iron unless there is bleeding, donation, or gastrointestinal loss.',
    whyItMatters:
      'The World Health Organization defines anemia in men below 13 g/dL. Anemia worsens exercise capacity and, in heart-failure cohorts, predicts death. A high hemoglobin raises blood viscosity and can signal hypoxia, sleep apnea, or testosterone-driven erythrocytosis. Mild dilution from endurance plasma expansion is not anemia if the value stays in range and ferritin is healthy.',
    optimalTarget:
      'Standard lab range is 13.0–17.0 g/dL; for men a rested longevity band often discussed is about 14.0–15.5 g/dL.',
    nutritionHelps: [
      'Heme iron (meat, shellfish) and vitamin C with plant iron rebuild hemoglobin when stores are low.',
      'B12 and folate are required when the problem is megaloblastic anemia rather than iron.',
      'Adequate energy intake keeps production from falling in relative energy deficiency.',
    ],
    nutritionAvoid: [
      'Tea or coffee with iron-rich meals reduces non-heme iron absorption.',
      'Calcium supplements taken with an iron-containing meal compete with absorption.',
    ],
    exerciseEffects: {
      chronic:
        'Aerobic training can lower resting hemoglobin slightly via plasma-volume expansion while oxygen delivery improves.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw can raise hemoglobin a few tenths through hemoconcentration if fluid has shifted into muscle or you are dehydrated. It does not create new hemoglobin in one day.',
    },
    lifestyleAndSupplements: [
      'Treat the cause of a falling hemoglobin (blood loss, deficiency, illness) rather than starting iron blindly.',
      'Review testosterone dose if hemoglobin climbs toward the top of the range on therapy.',
    ],
    citations: [
      { authors: 'World Health Organization', year: 2011, journal: 'World Health Organization',
        title: 'Haemoglobin concentrations for the diagnosis of anaemia and assessment of severity',
        finding: 'Sets anemia thresholds, including under 13 g/dL for men, used worldwide to grade severity.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Haemoglobin%20concentrations%20for%20the%20diagnosis%20of%20anaemia' },
      { authors: 'Anand I, McMurray JJ, Whitmore J, et al.', year: 2004, journal: 'Circulation',
        title: 'Anemia and its relationship to clinical outcome in heart failure',
        finding: 'Lower hemoglobin in chronic heart failure was associated with worse symptoms and higher mortality.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Anemia%20and%20its%20relationship%20to%20clinical%20outcome%20in%20heart%20failure' },
    ],
  },

  'Hematocrit (%)': {
    tagline: 'The percentage of blood volume occupied by red cells.',
    whatItIs:
      'Hematocrit is the packed red-cell fraction after centrifugation, or the value calculated from red-cell count and mean cell volume. It moves almost in lockstep with hemoglobin, plus plasma volume. Standing versus lying down, and dehydration versus overhydration, change it within hours without any change in red-cell mass.',
    whyItMatters:
      'Framingham and later meta-analyses linked higher hematocrit with more cardiovascular events, consistent with viscosity and with hematocrit as a marker of other risk. Low hematocrit is anemia and limits oxygen delivery. In athletes the “sports anemia” pattern is a lower hematocrit from plasma expansion, with normal stores.',
    optimalTarget:
      'Standard lab range is 40–50%; a hydrated rested target for men is often about 42–48%, not the extreme of either end.',
    nutritionHelps: [
      'Iron, B12, and folate correct a low hematocrit when indices show deficiency.',
      'Normal salt and fluid intake before a draw avoids a falsely high packed-cell fraction.',
      'Protein adequacy supports globin production if intake has been very low.',
    ],
    nutritionAvoid: [
      'Deliberate dehydration (sauna, fluid restriction) before a draw inflates hematocrit.',
      'Chronic alcohol use can suppress production and lower hematocrit.',
    ],
    exerciseEffects: {
      chronic:
        'Endurance training expands plasma volume and often lowers resting hematocrit by a few points despite more total red cells.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw raises hematocrit if plasma has shifted into working muscle or sweat losses were not replaced. The rise is fluid, and it settles with rehydration.',
    },
    lifestyleAndSupplements: [
      'Altitude, smoking, and testosterone raise hematocrit and should be in the interpretation.',
      'A climbing hematocrit above 50% at rest deserves evaluation for hypoxia or a primary marrow disorder.',
    ],
    citations: [
      { authors: 'Gagnon DR, Zhang TJ, Brand FN, Kannel WB', year: 1994, journal: 'American Heart Journal',
        title: 'Hematocrit and the risk of cardiovascular disease: the Framingham study',
        finding: 'Higher hematocrit was associated with greater cardiovascular risk over long Framingham follow-up.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Hematocrit%20and%20the%20risk%20of%20cardiovascular%20disease%20Framingham' },
      { authors: 'Danesh J, Collins R, Peto R, Lowe GD', year: 2000, journal: 'European Heart Journal',
        title: 'Haematocrit, viscosity, erythrocyte sedimentation rate: meta-analyses of prospective studies of coronary heart disease',
        finding: 'Higher hematocrit and related viscosity measures tracked coronary risk in pooled prospective data.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Haematocrit%20viscosity%20erythrocyte%20sedimentation%20rate%20coronary%20heart%20disease' },
    ],
  },

  'MCV (fL)': {
    tagline: 'Average red-cell volume, the first branch point between microcytic and macrocytic anemia.',
    whatItIs:
      'Mean corpuscular volume is the average size of red cells in femtoliters, calculated from hematocrit and red-cell count. Small cells (low MCV) point toward iron deficiency or thalassemia trait. Large cells (high MCV) point toward B12 or folate deficiency, alcohol, hypothyroidism, liver disease, certain drugs, or a young reticulocyte response.',
    whyItMatters:
      'MCV narrows the cause of anemia before iron studies and vitamins return. A normal MCV does not exclude combined iron plus B12 deficiency, which can cancel out in the average. Isolated mild macrocytosis with normal hemoglobin still deserves a look at alcohol, thyroid, and B12, because neurologic injury from B12 can precede anemia.',
    optimalTarget:
      'Standard lab range is 80–96 fL; a mid-range value around 85–94 fL with a normal RDW is the usual healthy pattern.',
    nutritionHelps: [
      'B12 (animal foods or a supplement if intake is low) corrects macrocytosis from deficiency.',
      'Folate from greens and legumes corrects folate-deficiency macrocytosis.',
      'Iron repletion slowly normalizes a low MCV over weeks as new, larger cells replace microcytes.',
    ],
    nutritionAvoid: [
      'Regular heavy alcohol intake is a leading reversible cause of a high MCV.',
      'A long-term vegan pattern without B12 will eventually enlarge red cells.',
    ],
    exerciseEffects: {
      chronic:
        'Training does not resize the average red cell. Any MCV drift is nutritional, alcohol-related, or a shift in reticulocytes.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw does not meaningfully move MCV. Cell volume is set during marrow production, not by one workout.',
    },
    lifestyleAndSupplements: [
      'Hypothyroidism and drugs such as methotrexate, hydroxyurea, and some anticonvulsants raise MCV.',
      'If MCV is high, check B12 and folate before calling it “just alcohol.”',
    ],
    citations: [
      { authors: 'Savage DG, Ogundipe A, Allen RH, Stabler SP, Lindenbaum J', year: 2000, journal: 'American Journal of the Medical Sciences',
        title: 'Etiology and diagnostic evaluation of macrocytosis',
        finding: 'Alcohol, B12 or folate deficiency, drugs, and marrow disorders accounted for most macrocytosis in clinical series.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Etiology%20and%20diagnostic%20evaluation%20of%20macrocytosis' },
      { authors: 'Aslinia F, Mazza JJ, Yale SH', year: 2006, journal: 'Clinical Medicine and Research',
        title: 'Megaloblastic anemia and other causes of macrocytosis',
        finding: 'Reviews how megaloblastic anemias enlarge MCV and which non-megaloblastic causes mimic them.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Megaloblastic%20anemia%20and%20other%20causes%20of%20macrocytosis' },
    ],
  },

  'MCH (pg)': {
    tagline: 'Average hemoglobin mass inside one red cell.',
    whatItIs:
      'Mean corpuscular hemoglobin is hemoglobin divided by the red-cell count, reported in picograms per cell. It usually travels with MCV: small cells carry less hemoglobin. A low MCH is the typical picture of iron deficiency and of thalassemia trait. A high MCH accompanies macrocytosis.',
    whyItMatters:
      'MCH helps confirm that a low MCV is a hemoglobin-production problem rather than a lab artifact. Falling MCH can appear before hemoglobin itself drops out of range. A high MCH with a high MCV pushes the workup toward B12, folate, alcohol, or reticulocytosis rather than iron.',
    optimalTarget:
      'Standard lab range is 27–33 pg; values around 29–32 pg with a normal MCV are the expected healthy band.',
    nutritionHelps: [
      'Iron repletion raises MCH as newly made cells fill with hemoglobin.',
      'Vitamin C with plant meals improves non-heme iron absorption when MCH is low from diet.',
      'B12 and folate correct a high MCH when macrocytosis is the driver.',
    ],
    nutritionAvoid: [
      'Inhibitors of iron absorption (tea, coffee, calcium at the same meal) slow recovery of a low MCH.',
      'Unrestricted alcohol works against normalization when the MCH is high.',
    ],
    exerciseEffects: {
      chronic:
        'Training does not change how much hemoglobin each cell carries. Plasma-volume shifts change hemoglobin concentration, not MCH.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw does not meaningfully move MCH. Hemoconcentration changes the whole-blood hemoglobin, and the per-cell average stays put.',
    },
    lifestyleAndSupplements: [
      'Do not start iron for a low MCH until ferritin and a blood-loss history are checked.',
      'Thalassemia trait causes a stable low MCH that diet will not normalize.',
    ],
    citations: [
      { authors: 'Camaschella C', year: 2015, journal: 'New England Journal of Medicine',
        title: 'Iron-deficiency anemia',
        finding: 'Iron deficiency produces small, hemoglobin-poor red cells and is the leading cause of anemia worldwide.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Iron-deficiency%20anemia%20Camaschella' },
      { authors: 'Goddard AF, James MW, McIntyre AS, Scott BB', year: 2011, journal: 'Gut',
        title: 'Guidelines for the management of iron deficiency anaemia',
        finding: 'British Society of Gastroenterology guidance on confirming iron deficiency and finding the source of blood loss.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Guidelines%20for%20the%20management%20of%20iron%20deficiency%20anaemia' },
    ],
  },

  'MCHC (g/dL)': {
    tagline: 'Hemoglobin concentration inside the packed red cells, not in whole blood.',
    whatItIs:
      'Mean corpuscular hemoglobin concentration is hemoglobin divided by hematocrit. It asks how densely hemoglobin is packed inside cells, whereas whole-blood hemoglobin is diluted by plasma. MCHC stays in a narrow band. Low MCHC means hypochromia, classically iron deficiency. High MCHC is less common and suggests spherocytes or hemolysis, or occasionally a lab artifact.',
    whyItMatters:
      'A low MCHC supports iron-limited hemoglobin synthesis. A high MCHC with anemia raises hereditary spherocytosis and immune hemolysis on the differential, which are membrane problems, not diet problems. MCHC is a poor standalone screening test because it moves late.',
    optimalTarget:
      'Standard lab range is 31.5–36.2 g/dL; healthy cells usually sit around 33–35 g/dL.',
    nutritionHelps: [
      'Iron repletion corrects a low MCHC when ferritin confirms deficiency.',
      'Pairing plant iron with vitamin C supports hemoglobin packing during repletion.',
      'Treating the underlying blood loss matters more than any superfood once MCHC is low.',
    ],
    nutritionAvoid: [
      'Iron inhibitors with meals (tea, coffee, large calcium doses) delay recovery.',
      'There is no food pattern that should be used to chase a high MCHC; that finding is structural or hemolytic.',
    ],
    exerciseEffects: {
      chronic:
        'Training does not change intracellular hemoglobin concentration in a meaningful way.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw does not meaningfully move MCHC. Intravascular hemolysis can tint plasma or raise bilirubin, but the concentration inside intact cells stays stable.',
    },
    lifestyleAndSupplements: [
      'A persistently high MCHC needs a smear and hemolysis labs, not iron or B vitamins.',
      'A low MCHC with low ferritin is iron deficiency until proven otherwise, including in people who train.',
    ],
    citations: [
      { authors: 'Perrotta S, Gallagher PG, Mohandas N', year: 2008, journal: 'The Lancet',
        title: 'Hereditary spherocytosis',
        finding: 'Spherocytes are dehydrated and hemoglobin-dense, so MCHC is often high in hereditary spherocytosis.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Hereditary%20spherocytosis%20Perrotta%20Gallagher%20Mohandas' },
      { authors: 'Camaschella C', year: 2015, journal: 'New England Journal of Medicine',
        title: 'Iron-deficiency anemia',
        finding: 'Iron lack produces hypochromic cells, reflected in a low MCHC as well as a low MCV.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Iron-deficiency%20anemia%20Camaschella' },
    ],
  },

  'RDW (%)': {
    tagline: 'How widely red-cell sizes vary, not how large the average cell is.',
    whatItIs:
      'Red-cell distribution width is the coefficient of variation (or sometimes the standard deviation) of red-cell volume. A high RDW means anisocytosis: a mix of small and large cells. That happens when deficiency, bleeding, or transfusion is pushing a new population of cells into an older one. A normal MCV with a high RDW is an early clue to evolving iron or mixed deficiency.',
    whyItMatters:
      'RDW predicts mortality and heart-failure outcomes even when hemoglobin is only mildly abnormal, probably because it integrates inflammation, nutrient deficiency, and disordered erythropoiesis. Very low RDW is rarely a clinical problem. A rising RDW is more informative than a single number inside the reference range.',
    optimalTarget:
      'Standard lab range is 11.6–14%; lower-to-mid values, roughly 12–13.5%, are the pattern linked with better outcomes in cohort data.',
    nutritionHelps: [
      'Correcting iron deficiency narrows RDW once a uniform population of new cells replaces the mix.',
      'B12 and folate do the same when macrocytosis was widening the distribution.',
      'Stable intake beats short restriction-and-refeed cycles that change what the marrow produces.',
    ],
    nutritionAvoid: [
      'Erratic deficiency (starting and stopping iron, or a diet that oscillates in B12) keeps two cell populations in circulation.',
      'Alcohol plus a marginal B-vitamin intake is a common reason RDW and MCV drift up together.',
    ],
    exerciseEffects: {
      chronic:
        'Training does not widen red-cell size distribution. A rising RDW in an athlete is still a nutrition or marrow signal.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw does not meaningfully move RDW. Size variation is a property of cells already in blood, and one workout does not remix it.',
    },
    lifestyleAndSupplements: [
      'Pair a high RDW with ferritin, B12, and a smear before adding supplements.',
      'Inflammation can raise RDW; treating the inflammatory driver matters more than the width itself.',
    ],
    citations: [
      { authors: 'Felker GM, Allen LA, Pocock SJ, et al.', year: 2007, journal: 'Journal of the American College of Cardiology',
        title: 'Red cell distribution width as a novel prognostic marker in heart failure',
        finding: 'Higher RDW predicted death and hospitalization in the CHARM heart-failure program.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Red%20cell%20distribution%20width%20as%20a%20novel%20prognostic%20marker%20in%20heart%20failure' },
      { authors: 'Patel KV, Ferrucci L, Ershler WB, Longo DL, Guralnik JM', year: 2009, journal: 'Archives of Internal Medicine',
        title: 'Red blood cell distribution width and the risk of death in middle-aged and older adults',
        finding: 'In NHANES, higher RDW predicted all-cause mortality independent of hemoglobin.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Red%20blood%20cell%20distribution%20width%20and%20the%20risk%20of%20death' },
    ],
  },

  'Platelets (10³/uL)': {
    tagline: 'Circulating cell fragments from megakaryocytes that start clot formation.',
    whatItIs:
      'Platelets are anuclear fragments shed by marrow megakaryocytes under thrombopoietin. They circulate for about 7–10 days. The count is what is free in blood; another pool is sequestered in the spleen. They adhere at sites of vessel injury, release granules, and support coagulation.',
    whyItMatters:
      'Counts under about 150 × 10³/µL (thrombocytopenia) raise bleeding risk once they are very low, and they can reflect immune destruction, drugs, spleen sequestration, or marrow disease. High counts are often reactive (iron deficiency, inflammation, bleeding) or, when extreme and persistent, a myeloproliferative neoplasm. Mid-range counts in apparently healthy men have been tied to cardiovascular death in older cohort work, so higher is not automatically better.',
    optimalTarget:
      'Standard lab range is 150–410 × 10³/µL; a practical longevity band often discussed is about 150–250 on a rested draw.',
    nutritionHelps: [
      'Iron repletion lowers a reactively high platelet count caused by iron deficiency.',
      'Adequate B12 and folate support marrow production when platelets are low from deficiency.',
      'There is no food that should be used to push a normal count higher.',
    ],
    nutritionAvoid: [
      'Heavy alcohol use can suppress platelet production.',
      'Unaddressed iron deficiency is a classic dietary-linked cause of reactive thrombocytosis.',
    ],
    exerciseEffects: {
      chronic:
        'Habitual training does not reset the platelet set-point. Resting counts stay individual.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw can raise the platelet count modestly for a few hours via splenic release and demargination. The bump is transient and smaller than the neutrophil rise.',
    },
    lifestyleAndSupplements: [
      'New drugs (heparin, some antibiotics, anticonvulsants) are common causes of a sudden drop.',
      'A count drifting down toward 150 with no symptoms is often fine; a rapid fall needs a clinician.',
    ],
    citations: [
      { authors: 'Davì G, Patrono C', year: 2007, journal: 'New England Journal of Medicine',
        title: 'Platelet activation and atherothrombosis',
        finding: 'Platelet activation at sites of disrupted plaque is a core mechanism of arterial thrombosis.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Platelet%20activation%20and%20atherothrombosis' },
      { authors: 'Thaulow E, Erikssen J, Sandvik L, Stormorken H, Cohn PF', year: 1991, journal: 'Circulation',
        title: 'Blood platelet count and function are related to total and cardiovascular death in apparently healthy men',
        finding: 'Higher platelet counts in healthy men were associated with greater cardiovascular and total mortality.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Blood%20platelet%20count%20and%20function%20are%20related%20to%20total%20and%20cardiovascular%20death' },
    ],
  },

  'MPV (fL)': {
    tagline: 'Average platelet size, a rough clue to how recently platelets were released.',
    whatItIs:
      'Mean platelet volume is the average size of platelets in femtoliters. Younger platelets released under stress are larger and more granule-rich. When platelets are being destroyed in the periphery, the marrow responds with larger platelets, so MPV rises as the count falls. EDTA in the tube can also swell platelets if the sample sits, which is a lab artifact.',
    whyItMatters:
      'A high MPV with a low count suggests consumptive or immune destruction more than a production failure. Cohort data link higher MPV with myocardial infarction and vascular death, likely because larger platelets are more reactive. A low MPV with a low count fits underproduction. MPV should not be read without the platelet count.',
    optimalTarget:
      'Standard lab range is 7.4–11.4 fL; mid-range values are preferable to a persistently high MPV, which tracks platelet reactivity.',
    nutritionHelps: [
      'Correcting iron deficiency removes one driver of reactive large-platelet release.',
      'An anti-inflammatory dietary pattern may lower chronic platelet activation indirectly.',
      'No specific food reliably shrinks MPV independent of the underlying driver.',
    ],
    nutritionAvoid: [
      'Smoking and poorly controlled metabolic disease keep platelets more activated.',
      'There is little evidence for a single “bad food” that enlarges platelets overnight.',
    ],
    exerciseEffects: {
      chronic:
        'Regular training may slightly favor less reactive platelets over months, but MPV is not a training metric.',
      acutePreDraw:
        'A hard gym session 1–24 hours before the draw can nudge MPV up slightly as larger platelets enter circulation. The shift is small next to the effect of a delayed sample on EDTA.',
    },
    lifestyleAndSupplements: [
      'Ask whether the sample sat before analysis if MPV is unexpectedly high and the count is stable.',
      'Omega-3 intake has modest effects on platelet function, not a reliable MPV target.',
    ],
    citations: [
      { authors: 'Chu SG, Becker RC, Berger PB, et al.', year: 2010, journal: 'Journal of Thrombosis and Haemostasis',
        title: 'Mean platelet volume as a predictor of cardiovascular risk: a systematic review and meta-analysis',
        finding: 'Higher MPV was associated with myocardial infarction, restenosis, and cardiovascular death.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Mean%20platelet%20volume%20as%20a%20predictor%20of%20cardiovascular%20risk' },
      { authors: 'Slavka G, Perkmann T, Haslacher H, et al.', year: 2011, journal: 'Arteriosclerosis, Thrombosis, and Vascular Biology',
        title: 'Mean platelet volume may represent a predictive parameter for overall vascular mortality and ischemic heart disease',
        finding: 'In a large outpatient cohort, higher MPV predicted vascular and all-cause mortality.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Mean%20platelet%20volume%20may%20represent%20a%20predictive%20parameter%20for%20overall%20vascular%20mortality' },
    ],
  },

  // Biochemistry
  'Urea (mg/dL)': {
    tagline: 'The liver nitrogen end-product of amino-acid breakdown, cleared by the kidney.',
    whatItIs:
      'Urea is made in the hepatic urea cycle from ammonia released when amino acids are oxidized. Blood urea rises with dietary protein, tissue breakdown, gastrointestinal bleeding, and any fall in glomerular filtration or tubular flow. This panel reports urea itself in mg/dL, not blood urea nitrogen; BUN is urea divided by about 2.14.',
    whyItMatters:
      'A high urea with a high creatinine suggests reduced filtration. A high urea with a normal creatinine often means high protein intake, catabolism, dehydration, or a gut bleed. A low urea suggests low protein intake or, less often, severe liver failure that cannot run the urea cycle. In a muscular person eating ample protein, a high-normal urea can be diet rather than kidney disease.',
    optimalTarget:
      'Standard lab range here is 19.3–49.2 mg/dL; chronically sitting at the top of that range is worth a rested recheck, while mid-range is the more comfortable longevity band.',
    nutritionHelps: [
      'A steady, not extreme, protein intake keeps urea from swinging with crash intakes.',
      'Hydration supports renal urea clearance on the day of the draw.',
      'Spreading protein across meals avoids a single huge nitrogen load the evening before.',
    ],
    nutritionAvoid: [
      'A very high-protein day plus dehydration pushes urea up without a true GFR change.',
      'Gastrointestinal blood is a protein load; black stools with a high urea need urgent care, not a diet adjustment.',
    ],
    exerciseEffects: {
      chronic:
        'Trained muscle does not lower urea. People who eat more protein to support training often run a higher rested urea.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw can raise urea for about a day. Muscle protein turnover plus hemoconcentration both lift it, so a post-training value near the top of the range can fall once you repeat the draw at rest.',
    },
    lifestyleAndSupplements: [
      'Creatine supplements do not directly become urea, but the training and protein pattern around them often coexist with a higher urea.',
      'Compare urea with creatinine: if only urea moved after training, filtration is probably intact.',
    ],
    citations: [
      { authors: 'Weiner ID, Mitch WE, Sands JM', year: 2015, journal: 'Clinical Journal of the American Society of Nephrology',
        title: 'Urea and ammonia metabolism and the control of renal nitrogen excretion',
        finding: 'Reviews hepatic urea generation and how the kidney handles urea to excrete nitrogen.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Urea%20and%20ammonia%20metabolism%20and%20the%20control%20of%20renal%20nitrogen%20excretion' },
      { authors: 'Salazar JH', year: 2014, journal: 'Laboratory Medicine',
        title: 'Overview of urea and creatinine',
        finding: 'Urea and creatinine rise for different reasons; protein load and volume status move urea more than creatinine.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Overview%20of%20urea%20and%20creatinine%20Salazar' },
    ],
  },

  'Creatinine (mg/dL)': {
    tagline: 'A muscle waste product of creatine, used as a rough filter of glomerular filtration.',
    whatItIs:
      'Creatinine is formed at a fairly steady rate from muscle phosphocreatine and is excreted mostly by glomerular filtration, with a little tubular secretion. Serum creatinine therefore reflects muscle mass and filtration rate together. Cooking meat adds a small exogenous load. The number is not GFR; equations estimate GFR from it.',
    whyItMatters:
      'A rising creatinine is the everyday signal of acute or chronic kidney injury, but a muscular man can sit above a lab ceiling of 1.1 mg/dL with a normal cystatin C and a normal true GFR. A very low creatinine usually means low muscle mass, which itself predicts frailty. Creatine supplements raise the pool that becomes creatinine and can bump the serum value without harming the kidney.',
    optimalTarget:
      'Standard lab range is 0.6–1.1 mg/dL; in muscular adults the meaningful target is a stable personal baseline on rested draws, not the lowest possible number.',
    nutritionHelps: [
      'Hydration before the draw prevents a concentration rise that looks like worse filtration.',
      'Not eating a large cooked-meat meal the evening before avoids a small dietary creatinine load.',
      'Adequate energy intake preserves muscle, which is appropriate even if creatinine is not tiny.',
    ],
    nutritionAvoid: [
      'A huge grilled-meat dinner before the draw can nudge creatinine up.',
      'Dehydration plus a high-protein day is a common false “kidney” signal.',
    ],
    exerciseEffects: {
      chronic:
        'More muscle mass raises the rested creatinine set-point. That is expected and is not reduced kidney function by itself.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw raises creatinine for about 12–24 hours because working muscle breaks down phosphocreatine and releases creatinine. A rested baseline is the number to trend.',
    },
    lifestyleAndSupplements: [
      'Creatine monohydrate commonly lifts serum creatinine; cystatin C is the cleaner filtration check if you supplement.',
      'NSAIDs around hard training can truly reduce filtration, which is different from the workout artifact.',
    ],
    citations: [
      { authors: 'Stevens LA, Coresh J, Greene T, Levey AS', year: 2006, journal: 'New England Journal of Medicine',
        title: 'Assessing kidney function — measured and estimated glomerular filtration rate',
        finding: 'Serum creatinine is only a surrogate for GFR and is confounded by muscle mass and secretion.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Assessing%20kidney%20function%20measured%20and%20estimated%20glomerular%20filtration%20rate' },
      { authors: 'Waikar SS, Bonventre JV', year: 2009, journal: 'Journal of the American Society of Nephrology',
        title: 'Creatinine kinetics and the definition of acute kidney injury',
        finding: 'Creatinine rises slowly after a real GFR drop and also rises when generation increases, so kinetics matter.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Creatinine%20kinetics%20and%20the%20definition%20of%20acute%20kidney%20injury' },
    ],
  },

  'BUN (mg/dL)': {
    tagline: 'Urea reported as its nitrogen content, the US companion to the creatinine.',
    whatItIs:
      'Blood urea nitrogen is the same urea molecule expressed as nitrogen mass. In mg/dL, BUN is urea divided by about 2.14, which is how this panel derives it. Clinicians use the BUN-to-creatinine ratio: ratios above about 20:1 suggest prerenal physiology, high protein load, catabolism, or a gut bleed, whereas both rising together suggests intrinsic renal injury.',
    whyItMatters:
      'An isolated high BUN is often volume depletion or diet. A high BUN and high creatinine together need a kidney evaluation. A low BUN suggests low protein intake or severe hepatic synthetic failure. Because this value is calculated from urea, it cannot disagree with urea except by rounding.',
    optimalTarget:
      'Standard lab range is 9–23 mg/dL; mid-range on a hydrated rest day is preferable to living at the ceiling from protein load plus dehydration.',
    nutritionHelps: [
      'Even daily protein intake produces a steadier BUN than feast-and-fast protein swings.',
      'Fluid intake adequate to thirst, plus a bit more in heat, keeps the ratio from looking prerenal.',
      'Treating constipation is irrelevant here; the dietary lever is protein dose and hydration, not fiber by itself.',
    ],
    nutritionAvoid: [
      'Very high protein intake stacked on a dehydrated draw inflates BUN.',
      'Occult gastrointestinal bleeding is a nitrogen load that raises BUN out of proportion to creatinine.',
    ],
    exerciseEffects: {
      chronic:
        'Training changes BUN only insofar as it changes muscle turnover and how much protein you eat.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw raises BUN in parallel with urea, from catabolism and hemoconcentration. The ratio to creatinine may not change much if creatinine rose too.',
    },
    lifestyleAndSupplements: [
      'Read BUN next to creatinine and the clinical context (thirst, illness, protein, training).',
      'A lone elevation the morning after a hard session should be repeated at rest before any kidney conclusion.',
    ],
    citations: [
      { authors: 'Dossetor JB', year: 1966, journal: 'Annals of Internal Medicine',
        title: 'Creatininemia versus uremia: the relative significance of blood urea nitrogen and serum creatinine concentrations in azotemia',
        finding: 'BUN and creatinine diverge when protein load, volume, or urine flow change, so they are not interchangeable.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Creatininemia%20versus%20uremia%20blood%20urea%20nitrogen%20and%20serum%20creatinine' },
      { authors: 'Baum N, Dichoso CC, Carlton CE', year: 1975, journal: 'Urology',
        title: 'Blood urea nitrogen and serum creatinine: physiology and interpretations',
        finding: 'Walks through prerenal versus renal patterns using BUN, creatinine, and their ratio.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Blood%20urea%20nitrogen%20and%20serum%20creatinine%20physiology%20and%20interpretations' },
    ],
  },

  'eGFR (ml/min)': {
    tagline: 'An estimate of kidney filtration calculated from creatinine, age, and sex, not a measured clearance.',
    whatItIs:
      'Estimated GFR in this panel comes from the CKD-EPI creatinine equation. It reports filtration in mL/min/1.73 m² (labs often shorten the unit to mL/min). The equation assumes average muscle mass for age and sex. More muscle, a recent workout, or creatine supplements make creatinine higher and eGFR lower than the true filtration rate. Cystatin C equations are less fooled by muscle.',
    whyItMatters:
      'Across general-population cohorts, eGFR below 60 mL/min/1.73 m² marks chronic kidney disease and higher cardiovascular and all-cause mortality, especially with albumin in the urine. A single post-workout dip from the 100s into the 80s is usually the creatinine artifact, not a lost nephron. A rested eGFR that keeps falling needs urine albumin and, if muscle is high, cystatin C.',
    optimalTarget:
      'Standard reference here is above 90 mL/min; the longevity target is a stable rested value at or above 90, with urine albumin absent, not the number produced the morning after lifting.',
    nutritionHelps: [
      'Blood-pressure-friendly patterns (less sodium if salt-sensitive, more plants) protect filtration over years.',
      'Adequate hydration avoids prerenal dips that the equation reads as a lower eGFR.',
      'Protein restriction is for established CKD under a clinician, not for a muscular person with a workout-related dip.',
    ],
    nutritionAvoid: [
      'Habitual high sodium in someone with hypertension accelerates kidney risk.',
      'Combining dehydration with NSAIDs is a real filtration hit, unlike the creatine artifact.',
    ],
    exerciseEffects: {
      chronic:
        'Training protects vascular health that the kidney depends on. Extra muscle lowers creatinine-based eGFR on paper without lowering true GFR.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw lowers creatinine-based eGFR for about 12–24 hours because creatinine is temporarily higher. Recheck after a rest day before calling it a loss of kidney function.',
    },
    lifestyleAndSupplements: [
      'Blood pressure, glucose, and smoking cessation dominate long-term eGFR preservation.',
      'If you take creatine, ask for cystatin C when the creatinine-based eGFR looks worse than you expect.',
    ],
    citations: [
      { authors: 'Levey AS, Stevens LA, Schmid CH, et al.', year: 2009, journal: 'Annals of Internal Medicine',
        title: 'A new equation to estimate glomerular filtration rate',
        finding: 'The CKD-EPI creatinine equation estimates GFR more accurately than the older MDRD equation.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=A%20new%20equation%20to%20estimate%20glomerular%20filtration%20rate' },
      { authors: 'Chronic Kidney Disease Prognosis Consortium', year: 2010, journal: 'The Lancet',
        title: 'Association of estimated glomerular filtration rate and albuminuria with all-cause and cardiovascular mortality in general population cohorts',
        finding: 'Mortality rose once eGFR fell below 60 and as urine albumin increased, in the general population.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=estimated%20glomerular%20filtration%20rate%20and%20albuminuria%20with%20all-cause%20and%20cardiovascular%20mortality' },
    ],
  },

  'Uric Acid (mg/dL)': {
    tagline: 'The end product of purine breakdown, and the chemical that crystallizes in gout.',
    whatItIs:
      'Humans lack uricase, so purines from cell turnover and diet become uric acid and are excreted by the kidney and gut. Serum urate above about 6.8 mg/dL can precipitate as monosodium urate. Fructose, alcohol, and kidney under-excretion raise the level; it is also a marker of insulin resistance and metabolic syndrome.',
    whyItMatters:
      'Gout and kidney stones are the direct diseases. Independent of gout, higher uric acid tracks hypertension, kidney disease, and cardiovascular risk, though it is partly a fellow traveler of metabolic syndrome. Very low uric acid is uncommon and can reflect rare enzyme defects or uricosuric states. A single value just under a wide lab ceiling can still be high enough to grow crystals.',
    optimalTarget:
      'This lab range is 3.7–9.2 mg/dL; gout and longevity discussions usually want men under about 6.0, and under 5.5 if crystals have already occurred.',
    nutritionHelps: [
      'Dairy, cherries, and vitamin C–rich produce are associated with lower urate in observational and feeding data.',
      'Coffee (not sugary coffee drinks) is associated with lower gout risk.',
      'Water intake supports uric acid excretion and lowers stone risk.',
    ],
    nutritionAvoid: [
      'Beer, spirits, fructose-sweetened drinks, and large portions of organ meats, anchovies, and some shellfish raise urate.',
      'Crash weight loss and fasting temporarily increase uric acid from cell breakdown even as long-term weight loss lowers it.',
    ],
    exerciseEffects: {
      chronic:
        'Regular training and fat loss lower uric acid over months if the diet is not extremely high in fructose and alcohol.',
      acutePreDraw:
        'A very hard gym session 1–24 hours before the draw can raise uric acid via ATP breakdown to purines. An easy session usually does not move it enough to matter.',
    },
    lifestyleAndSupplements: [
      'Thiazide diuretics and low-dose aspirin raise uric acid; they belong in the interpretation.',
      'Vitamin C around 500 mg/day modestly lowers urate; it does not replace urate-lowering drugs after recurrent gout.',
    ],
    citations: [
      { authors: 'Feig DI, Kang DH, Johnson RJ', year: 2008, journal: 'New England Journal of Medicine',
        title: 'Uric acid and cardiovascular risk',
        finding: 'Reviews links between higher uric acid, hypertension, kidney disease, and cardiovascular risk.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Uric%20acid%20and%20cardiovascular%20risk%20Feig' },
      { authors: 'Choi HK, Atkinson K, Karlson EW, Willett W, Curhan G', year: 2004, journal: 'New England Journal of Medicine',
        title: 'Purine-rich foods, dairy and protein intake, and the risk of gout in men',
        finding: 'Meat and seafood raised gout risk, purine-rich vegetables did not, and dairy was associated with lower risk.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Purine-rich%20foods%20dairy%20and%20protein%20intake%20and%20the%20risk%20of%20gout%20in%20men' },
    ],
  },

  'Total Protein (g/L)': {
    tagline: 'Albumin plus globulins, the bulk protein concentration of plasma.',
    whatItIs:
      'Total protein sums albumin, made by the liver, and the globulin fraction, which includes immunoglobulins, complement, and carrier proteins. It is reported here in g/L (divide by 10 for g/dL). The number falls when the liver cannot synthesize protein, when protein is lost in urine or stool, or when plasma is diluted. It rises with dehydration or with extra immunoglobulin.',
    whyItMatters:
      'A normal total can hide a low albumin if globulins are high, which is why the split matters. Low total protein suggests malnutrition, liver synthetic failure, nephrotic syndrome, or protein-losing enteropathy. High total protein suggests dehydration or a chronic immune stimulation, including a monoclonal protein that needs electrophoresis.',
    optimalTarget:
      'Standard lab range is 57–82 g/L; a healthy adult band often discussed is about 68–78 g/L with a normal albumin and no monoclonal spike.',
    nutritionHelps: [
      'Adequate energy and protein intake corrects a low total protein from under-eating.',
      'Treating malabsorption (for example celiac disease) restores protein when the gut was the leak.',
      'Hydration keeps hemoconcentration from masquerading as a high total protein.',
    ],
    nutritionAvoid: [
      'Prolonged very-low-protein intake lowers hepatic albumin and therefore the total.',
      'Showing up dehydrated makes the total look healthier than the true protein mass.',
    ],
    exerciseEffects: {
      chronic:
        'Training does not set total protein. Plasma-volume expansion can dilute it slightly in endurance athletes.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw can raise total protein slightly for a few hours if plasma volume contracts. The rise is concentration of existing protein, not new synthesis.',
    },
    lifestyleAndSupplements: [
      'A high total protein with a high globulin deserves serum protein electrophoresis, not a protein shake.',
      'Chronic inflammation raises globulins and can hold the total up while albumin falls.',
    ],
    citations: [
      { authors: 'Busher JT', year: 1990, journal: 'Clinical Methods',
        title: 'Serum albumin and globulin',
        finding: 'Total protein is interpreted only after it is split into albumin and globulin fractions.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Serum%20albumin%20and%20globulin%20Busher%20Clinical%20Methods' },
      { authors: 'Gabay C, Kushner I', year: 1999, journal: 'New England Journal of Medicine',
        title: 'Acute-phase proteins and other systemic responses to inflammation',
        finding: 'Inflammation lowers albumin and raises several globulins, so the total can stay normal while the mix changes.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Acute-phase%20proteins%20and%20other%20systemic%20responses%20to%20inflammation' },
    ],
  },

  'Albumin (g/L)': {
    tagline: 'The main hepatic plasma protein, holding fluid in vessels and carrying hormones and drugs.',
    whatItIs:
      'Albumin is synthesized by hepatocytes and has a half-life of about 20 days. It provides most of the plasma oncotic pressure and binds fatty acids, bilirubin, calcium, and many hormones and drugs. This panel reports it in g/L. Production falls quickly in inflammation (a negative acute-phase response) and in severe liver disease, and the protein is lost in nephrotic syndrome and protein-losing enteropathy.',
    whyItMatters:
      'In older adults, a lower serum albumin predicts disability and death even within ranges that labs still call normal. Very low albumin causes edema. A high albumin is almost always dehydration, not “extra-good” synthesis. Because the half-life is long, albumin is a poor day-to-day nutrition marker and a better marker of inflammation plus synthetic reserve.',
    optimalTarget:
      'Standard lab range is 37–55 g/L; cohort data favor the upper half, roughly 44–50 g/L, in healthy adults.',
    nutritionHelps: [
      'Enough total energy and protein supports synthesis once inflammation is not suppressing the liver.',
      'Correcting nephrotic-range urinary loss or a malabsorption disease raises albumin more than extra dietary protein alone.',
      'A diet that reduces chronic inflammation indirectly lets albumin recover.',
    ],
    nutritionAvoid: [
      'Under-eating for weeks lowers albumin, but only after inflammation and illness are considered.',
      'Dehydration before the draw inflates albumin and should not be chased as a goal.',
    ],
    exerciseEffects: {
      chronic:
        'Endurance training expands plasma volume and can sit albumin slightly lower without disease.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw can raise albumin a little through hemoconcentration, and standing versus lying down does the same. It will not jump from illness-range to optimal in one workout.',
    },
    lifestyleAndSupplements: [
      'A falling albumin with a rising CRP is inflammation, not a protein-shake deficiency.',
      'About 40% of calcium is albumin-bound, so very low albumin changes how total calcium should be read.',
    ],
    citations: [
      { authors: 'Corti MC, Guralnik JM, Salive ME, Sorkin JD', year: 1994, journal: 'JAMA',
        title: 'Serum albumin level and physical disability as predictors of mortality in older persons',
        finding: 'Lower albumin predicted mortality in older adults alongside physical disability.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Serum%20albumin%20level%20and%20physical%20disability%20as%20predictors%20of%20mortality' },
      { authors: 'Goldwasser P, Feldman J', year: 1997, journal: 'Journal of Clinical Epidemiology',
        title: 'Association of serum albumin and mortality risk',
        finding: 'Mortality risk rose as serum albumin fell, across clinical and population samples.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Association%20of%20serum%20albumin%20and%20mortality%20risk%20Goldwasser' },
    ],
  },

  'Globulin (g/L)': {
    tagline: 'Total protein minus albumin: antibodies and other non-albumin plasma proteins.',
    whatItIs:
      'Globulin in this panel is calculated as total protein minus albumin. The fraction contains immunoglobulins (IgG, IgA, IgM), complement, and carrier proteins such as transferrin and hormone-binding globulins. It rises when the immune system makes more antibody, polyclonal or monoclonal, and it falls in antibody deficiency or when protein is lost.',
    whyItMatters:
      'A high globulin can be a polyclonal response to infection, autoimmune disease, or liver disease, or a monoclonal immunoglobulin from plasma-cell disorders. A low globulin raises immunodeficiency and protein loss. Because it is a leftover number, an abnormal globulin should be followed by electrophoresis rather than treated as its own disease.',
    optimalTarget:
      'Standard lab range is 16–36 g/L; a typical healthy adult value is about 20–30 g/L with no monoclonal band.',
    nutritionHelps: [
      'No food specifically lowers a polyclonal globulin; treating the inflammatory or infectious driver does.',
      'Adequate protein and energy prevent a globally low protein state if intake has collapsed.',
      'If globulin is low from a restricted diet plus illness, refeeding is supportive after the cause is identified.',
    ],
    nutritionAvoid: [
      'There is no dietary globulin to cut. Alcohol-related liver disease can raise the globulin fraction over time.',
      'Ignoring a rising globulin while adding protein shakes misses a possible monoclonal protein.',
    ],
    exerciseEffects: {
      chronic:
        'Training does not reset immunoglobulin levels in any useful direction for this marker.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw can raise globulin slightly via hemoconcentration, in parallel with albumin. Antibody production does not change in one day.',
    },
    lifestyleAndSupplements: [
      'A globulin creeping up over serial draws deserves serum protein electrophoresis.',
      'Chronic infections and autoimmune disease are the usual polyclonal explanations, not supplements.',
    ],
    citations: [
      { authors: 'Gabay C, Kushner I', year: 1999, journal: 'New England Journal of Medicine',
        title: 'Acute-phase proteins and other systemic responses to inflammation',
        finding: 'Inflammation raises several globulin-fraction proteins while albumin falls.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Acute-phase%20proteins%20and%20other%20systemic%20responses%20to%20inflammation' },
      { authors: 'Kyle RA, Rajkumar SV', year: 2004, journal: 'New England Journal of Medicine',
        title: 'Multiple myeloma',
        finding: 'A monoclonal immunoglobulin can raise the globulin fraction and is detected by electrophoresis, not by the total alone.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Multiple%20myeloma%20Kyle%20Rajkumar' },
    ],
  },

  'A/G Ratio': {
    tagline: 'Albumin divided by globulin, a snapshot of whether inflammation is crowding out albumin.',
    whatItIs:
      'The albumin-to-globulin ratio divides the two fractions of total protein. A healthy liver making albumin, without a large antibody excess, keeps the ratio well above 1. The ratio falls when albumin drops, globulin rises, or both. It is derived, so it contains no information beyond those two inputs, but it highlights the balance.',
    whyItMatters:
      'A low ratio in apparently healthy adults has been associated with higher later cancer incidence and mortality, largely because it captures occult inflammation and lower albumin. A very high ratio can mean low immunoglobulins. Liver disease classically lowers the ratio (albumin down, globulins up). Dehydration raises both inputs and often leaves the ratio nearly unchanged.',
    optimalTarget:
      'Standard lab range is 0.7–2.8; healthy adults usually sit about 1.5–2.2, and persistently low ratios deserve a look at albumin, globulin, and electrophoresis.',
    nutritionHelps: [
      'Patterns that support albumin (adequate energy and protein, less chronic inflammatory load) support the ratio.',
      'There is no food that selectively cuts globulin.',
      'Correcting a protein-losing disease raises the ratio by restoring albumin.',
    ],
    nutritionAvoid: [
      'Ongoing heavy alcohol use can lower albumin and raise globulins, dropping the ratio.',
      'Chasing a higher ratio by dehydrating only concentrates both proteins and does not fix the balance.',
    ],
    exerciseEffects: {
      chronic:
        'Training does not have a specific effect on the ratio beyond small plasma-volume shifts in both proteins.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw usually does not meaningfully move the A/G ratio, because hemoconcentration raises albumin and globulin together and they cancel in the division.',
    },
    lifestyleAndSupplements: [
      'If the ratio falls because globulin is rising, get electrophoresis rather than a supplement.',
      'If it falls because albumin is falling, look for inflammation, liver synthetic function, and urinary protein loss.',
    ],
    citations: [
      { authors: 'Suh B, Park S, Shin DW, et al.', year: 2014, journal: 'Annals of Oncology',
        title: 'Low albumin-to-globulin ratio associated with cancer incidence and mortality in generally healthy adults',
        finding: 'A lower albumin-to-globulin ratio predicted later cancer and death in a large healthy cohort.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Low%20albumin-to-globulin%20ratio%20associated%20with%20cancer%20incidence%20and%20mortality' },
      { authors: 'Gabay C, Kushner I', year: 1999, journal: 'New England Journal of Medicine',
        title: 'Acute-phase proteins and other systemic responses to inflammation',
        finding: 'Inflammation simultaneously lowers albumin and raises globulins, which is exactly what drops the ratio.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Acute-phase%20proteins%20and%20other%20systemic%20responses%20to%20inflammation' },
    ],
  },

  'ALP (U/L)': {
    tagline: 'A family of enzymes on bone, bile canaliculi, and other surfaces, cleared into blood.',
    whatItIs:
      'Alkaline phosphatase in adult serum is mostly bone and liver isoforms, plus a smaller intestinal share. The liver form rises when bile flow is impaired. The bone form rises with osteoblast activity: growth, fracture healing, hyperparathyroidism, Paget disease. GGT helps sort them: if GGT is normal, an isolated ALP rise is more often bone than bile.',
    whyItMatters:
      'A high ALP with a high GGT or bilirubin points to cholestasis and needs imaging and a medication review. A high ALP with normal GGT points to bone. A low ALP is easy to ignore and can mean zinc or magnesium deficiency, hypothyroidism, or the genetic disease hypophosphatasia. In healthy adults, ALP should sit comfortably inside the range, not trend upward without a reason.',
    optimalTarget:
      'Standard lab range is 46–116 U/L; a stable mid-range value, often under about 90–100 U/L in adults, with a normal GGT, is the reassuring pattern.',
    nutritionHelps: [
      'Zinc- and magnesium-containing foods (shellfish, meat, nuts, greens) matter if ALP is unexpectedly low.',
      'Vitamin D repletion treats osteomalacia, a cause of high bone ALP.',
      'There is no food that “lowers liver ALP” if the cause is bile obstruction.',
    ],
    nutritionAvoid: [
      'Excess vitamin A and poorly monitored high-dose vitamin D can disturb bone turnover.',
      'Alcohol is a weaker ALP signal than GGT, but chronic liver injury still belongs on the list.',
    ],
    exerciseEffects: {
      chronic:
        'Bone loading over months can slightly raise the bone isoform; it should not push ALP out of range.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw does not meaningfully move ALP. Fracture repair and bone disease change it over days to weeks, not after one workout.',
    },
    lifestyleAndSupplements: [
      'Review drugs (some antibiotics, antiepileptics) when ALP and GGT rise together.',
      'An isolated low ALP is a reason to think about zinc and alkaline phosphatase substrates, not to celebrate a “low enzyme.”',
    ],
    citations: [
      { authors: 'Pratt DS, Kaplan MM', year: 2000, journal: 'New England Journal of Medicine',
        title: 'Evaluation of abnormal liver-enzyme results in asymptomatic patients',
        finding: 'Pairs ALP with GGT and the other enzymes to separate cholestasis from bone and from hepatocellular injury.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Evaluation%20of%20abnormal%20liver-enzyme%20results%20in%20asymptomatic%20patients' },
      { authors: 'Shipman KE, Holt AD, Gama R', year: 2013, journal: 'BMJ',
        title: 'Interpreting an isolated raised serum alkaline phosphatase level in an asymptomatic patient',
        finding: 'An isolated ALP rise is worked up by isoform clues, GGT, vitamin D, and medications before invasive tests.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Interpreting%20an%20isolated%20raised%20serum%20alkaline%20phosphatase' },
    ],
  },

  'ALT (U/L)': {
    tagline: 'A cytosolic enzyme concentrated in hepatocytes, the standard blood marker of liver-cell injury.',
    whatItIs:
      'Alanine aminotransferase transfers amino groups in liver cells and, in much smaller amounts, in muscle. When hepatocytes are injured by fat, virus, alcohol, drugs, or ischemia, ALT leaks into blood. The half-life in serum is roughly 1–2 days, so it falls within days of the injury stopping. It is more liver-specific than AST.',
    whyItMatters:
      'Many labs still use an upper limit near 40–50 U/L, but population studies find liver-related risk rising well below that, and updated healthy cutoffs are closer to 30 U/L in men. The most common cause of a mild high ALT in adults is metabolic-associated fatty liver. Very high ALT (hundreds) suggests acute hepatitis, ischemic injury, or toxin. Low ALT is rarely disease; vitamin B6 deficiency can depress the activity.',
    optimalTarget:
      'This lab flags ALT at 49 U/L and above; a longevity target often discussed for men is under about 25–30 U/L.',
    nutritionHelps: [
      'Weight loss of about 7–10% from a calorie deficit is the most reliable diet lever for fatty-liver ALT.',
      'Cutting sugar-sweetened drinks removes a fructose load the liver turns into fat.',
      'Coffee, without a large sugar load, is associated with lower ALT and less fibrosis in liver cohorts.',
    ],
    nutritionAvoid: [
      'Regular alcohol raises ALT and synergizes with fatty liver.',
      'Crash supplements and high-dose vitamin A or green-tea extracts are occasional direct liver toxins.',
    ],
    exerciseEffects: {
      chronic:
        'Training that reduces liver fat lowers ALT over weeks to months.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw usually does not move ALT much, because muscle contains little ALT. Only unusually damaging eccentric work nudges it, and AST rises more.',
    },
    lifestyleAndSupplements: [
      'Review acetaminophen dose, isotretinoin, and new supplements when ALT jumps.',
      'Vaccination and treatment for viral hepatitis matter more than nutraceuticals if serology is positive.',
    ],
    citations: [
      { authors: 'Kim WR, Flamm SL, Di Bisceglie AM, Bodenheimer HC', year: 2008, journal: 'Hepatology',
        title: 'Serum activity of alanine aminotransferase (ALT) as an indicator of health and disease',
        finding: 'An AASLD committee argued that traditional ALT upper limits are too high for detecting liver disease.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Serum%20activity%20of%20alanine%20aminotransferase%20as%20an%20indicator%20of%20health%20and%20disease' },
      { authors: 'Kim HC, Nam CM, Jee SH, Han KH, Oh DK, Suh I', year: 2004, journal: 'BMJ',
        title: 'Normal serum aminotransferase concentration and risk of mortality from liver diseases: prospective cohort study',
        finding: 'Liver mortality rose with ALT even inside the conventional normal range.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Normal%20serum%20aminotransferase%20concentration%20and%20risk%20of%20mortality%20from%20liver%20diseases' },
    ],
  },

  'AST (U/L)': {
    tagline: 'A transaminase in liver and muscle mitochondria, less liver-specific than ALT.',
    whatItIs:
      'Aspartate aminotransferase sits in liver, skeletal muscle, heart, and red cells. Liver disease releases it, but so does muscle injury, hemolysis, and myocardial injury. The AST-to-ALT ratio (De Ritis ratio) helps: ALT higher than AST is typical of simple fatty liver, while AST higher than ALT, especially a ratio above 2, suggests alcohol-related injury or more advanced fibrosis.',
    whyItMatters:
      'An isolated AST rise after hard training is often muscle, particularly if creatine kinase is high and ALT, GGT, and bilirubin are quiet. An AST rise with ALT, GGT, or bilirubin is liver until proven otherwise. Like ALT, risk is not zero just because the value is under a wide lab cap near 40 U/L.',
    optimalTarget:
      'This lab flags AST at 40 U/L and above; a rested longevity target often discussed is under about 25–30 U/L, interpreted with ALT.',
    nutritionHelps: [
      'The same fat-loss and alcohol reduction that lower ALT lower a hepatic AST.',
      'Coffee is associated with better liver enzyme profiles in observational work.',
      'Adequate carbohydrate around very hard training reduces some muscle damage, which matters when AST is the muscle isoform.',
    ],
    nutritionAvoid: [
      'Alcohol is the classic dietary cause of an AST-predominant enzyme rise.',
      'Unregulated herbals and high-dose supplements that injure hepatocytes raise AST with ALT.',
    ],
    exerciseEffects: {
      chronic:
        'Fitter muscle is not a reason for a chronically high AST. A persistent elevation at rest still needs a source.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw, especially heavy eccentric lifting, can raise AST for 24–72 hours because muscle is rich in AST. Pair it with ALT and, if needed, creatine kinase before calling it hepatitis.',
    },
    lifestyleAndSupplements: [
      'If AST is up and ALT is not after a leg day, repeat the lab after 3–4 easy days.',
      'Statins can raise AST mildly; do not stop them without the prescriber if the rise is small and expected.',
    ],
    citations: [
      { authors: 'Botros M, Sikaris KA', year: 2013, journal: 'Clinical Biochemist Reviews',
        title: 'The De Ritis ratio: the test of time',
        finding: 'An AST/ALT ratio above 2 favors alcoholic liver injury; a ratio below 1 is typical of nonalcoholic fatty liver.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=The%20De%20Ritis%20ratio%20the%20test%20of%20time' },
      { authors: 'Giannini EG, Testa R, Savarino V', year: 2005, journal: 'CMAJ',
        title: 'Liver enzyme alteration: a guide for clinicians',
        finding: 'AST is present in muscle as well as liver, so the pattern of enzymes matters more than one cutoff.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Liver%20enzyme%20alteration%20a%20guide%20for%20clinicians' },
    ],
  },

  'GGT (U/L)': {
    tagline: 'A biliary and oxidative-stress enzyme induced by alcohol, drugs, and fatty liver.',
    whatItIs:
      'Gamma-glutamyl transferase sits on the canalicular membrane of hepatocytes and on bile-duct cells. It rises with cholestasis, enzyme-inducing drugs, alcohol, and metabolic fatty liver, and it participates in glutathione metabolism, so it also tracks oxidative stress. It is more sensitive than ALP for many biliary and alcohol-related signals, and a normal GGT next to a high ALP points away from the liver.',
    whyItMatters:
      'Lab ceilings near 70 U/L are late. Within the “normal” range, higher GGT predicts cardiovascular death, diabetes, and hypertension in large cohorts. Very low GGT is generally favorable. An isolated mild GGT rise is often alcohol, NAFLD, or a drug (phenytoin, barbiturates, some others), not a surgical biliary emergency.',
    optimalTarget:
      'This lab flags GGT at 73 U/L and above; longevity discussions often prefer values under about 20–25 U/L.',
    nutritionHelps: [
      'Stopping alcohol is the fastest dietary way to drop an alcohol-driven GGT, often within weeks.',
      'Weight loss improves GGT when fatty liver is the driver.',
      'Coffee intake is associated with lower GGT in several population studies.',
    ],
    nutritionAvoid: [
      'Even moderate regular alcohol induces GGT in susceptible people.',
      'Sugary drinks and excess energy that grow liver fat push GGT up over months.',
    ],
    exerciseEffects: {
      chronic:
        'Training helps GGT indirectly by reducing liver fat and improving insulin sensitivity.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw does not meaningfully move GGT. It is not released from muscle the way AST is.',
    },
    lifestyleAndSupplements: [
      'List enzyme-inducing medications when GGT is the only abnormality.',
      'A rising GGT with itching, dark urine, or a high ALP needs a biliary workup, not a supplement.',
    ],
    citations: [
      { authors: 'Whitfield JB', year: 2001, journal: 'Critical Reviews in Clinical Laboratory Sciences',
        title: 'Gamma glutamyl transferase',
        finding: 'Reviews GGT biology, alcohol induction, and why values predict disease inside the reference range.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Gamma%20glutamyl%20transferase%20Whitfield' },
      { authors: 'Ruttmann E, Brant LJ, Concin H, et al.', year: 2005, journal: 'Circulation',
        title: 'Gamma-glutamyltransferase as a risk factor for cardiovascular disease mortality: an epidemiological investigation in a cohort of 163,944 Austrian adults',
        finding: 'GGT predicted cardiovascular death in a dose-responsive way across a very large cohort.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Gamma-glutamyltransferase%20as%20a%20risk%20factor%20for%20cardiovascular%20disease%20mortality' },
    ],
  },

  'Bilirubin Total (mg/dL)': {
    tagline: 'Heme breakdown pigment, mostly unconjugated, processed by the liver for excretion.',
    whatItIs:
      'Macrophages break heme from aged red cells into unconjugated bilirubin, which albumin carries to the liver. Hepatocytes conjugate it and excrete it in bile. Total bilirubin is unconjugated plus conjugated. A mild isolated rise with normal enzymes is often Gilbert syndrome, a common partial UGT1A1 deficiency that shows up more when fasting or when heme turnover increases.',
    whyItMatters:
      'Marked elevation means hemolysis, hepatocellular injury, or biliary obstruction, and conjugated hyperbilirubinemia is the dangerous pattern. Mildly higher unconjugated bilirubin, by contrast, is an antioxidant, and cohort data link higher bilirubin with lower cardiovascular and respiratory risk. Chasing the lowest possible bilirubin is not a longevity goal if enzymes are normal.',
    optimalTarget:
      'Standard lab range is 0.3–1.2 mg/dL; values a little above that with normal ALT, ALP, and GGT are often Gilbert syndrome, whereas a climbing conjugated fraction is not a benign target.',
    nutritionHelps: [
      'Eating normally, rather than a prolonged fast before every draw, reduces the unconjugated bump of Gilbert syndrome.',
      'There is no food that should be used to suppress a physiologically higher bilirubin.',
      'Staying hydrated and not stacking a hard workout onto a long fast keeps heme turnover from adding to the number.',
    ],
    nutritionAvoid: [
      'Prolonged fasting exaggerates unconjugated bilirubin in Gilbert syndrome.',
      'Alcohol and hepatotoxic supplements matter when bilirubin rises together with ALT or GGT, not when it is an isolated Gilbert pattern.',
    ],
    exerciseEffects: {
      chronic:
        'Training does not chronically raise bilirubin. Foot-strike hemolysis in high-mileage running can contribute small bumps.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw can raise total bilirubin modestly via intravascular or foot-strike hemolysis and, if you are fasted, via Gilbert physiology. Enzymes that stay normal point away from hepatitis.',
    },
    lifestyleAndSupplements: [
      'Confirm the split (direct versus indirect) before worrying about an isolated total near 1.3–2.0.',
      'Hemolysis labs (haptoglobin, LDH, reticulocytes) belong in the workup if anemia is also present.',
    ],
    citations: [
      { authors: 'Stocker R, Yamamoto Y, McDonagh AF, Glazer AN, Ames BN', year: 1987, journal: 'Science',
        title: 'Bilirubin is an antioxidant of possible physiological importance',
        finding: 'Showed that bilirubin, at physiologic levels, is a potent antioxidant.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Bilirubin%20is%20an%20antioxidant%20of%20possible%20physiological%20importance' },
      { authors: 'Horsfall LJ, Rait G, Walters K, et al.', year: 2011, journal: 'JAMA',
        title: 'Serum bilirubin and risk of respiratory disease and death',
        finding: 'Higher bilirubin was associated with lower respiratory disease and all-cause mortality.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Serum%20bilirubin%20and%20risk%20of%20respiratory%20disease%20and%20death' },
    ],
  },

  'Bilirubin Direct (mg/dL)': {
    tagline: 'The conjugated fraction of bilirubin that has already been processed by hepatocytes.',
    whatItIs:
      'Direct bilirubin is conjugated bilirubin, water-soluble and ready for bile. In health it is a small slice of the total, often well under 0.3 mg/dL and under about 20% of total. It rises when conjugated pigment regurgitates into blood: cholestasis, Dubin-Johnson or Rotor syndrome, or hepatocellular injury that cannot excrete what it has conjugated. Unconjugated (indirect) bilirubin is total minus direct.',
    whyItMatters:
      'A high direct fraction means the problem is after conjugation — obstruction, excretion, or sick hepatocytes — and it is not the benign Gilbert pattern. Gilbert and simple hemolysis raise indirect bilirubin and leave direct almost unchanged. A mildly higher direct number that still tracks a mildly higher total, with normal ALP and GGT, is not the same as a conjugated jaundice.',
    optimalTarget:
      'This lab flags direct bilirubin at 0.3 mg/dL and above; the longevity pattern is a low direct fraction, typically under 0.2–0.3 mg/dL, and less than about 20% of the total.',
    nutritionHelps: [
      'No food selectively lowers conjugated bilirubin; relieving cholestasis or stopping the offending drug does.',
      'Avoiding a long fast reduces the unconjugated total, which can otherwise drag a small direct reading along.',
      'If enzymes are abnormal, the dietary step is alcohol cessation and removal of liver toxins while the cause is found.',
    ],
    nutritionAvoid: [
      'Alcohol and hepatotoxic supplements are relevant when direct bilirubin rises with ALP or GGT.',
      'Fasting is a confounder for total bilirubin, not a treatment for a truly conjugated elevation.',
    ],
    exerciseEffects: {
      chronic:
        'Training does not create cholestasis or a chronic rise in conjugated bilirubin.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw does not cause biliary obstruction. Hemolysis can lift total bilirubin; direct bilirubin should stay a small fraction. A large direct rise after training is not an exercise effect and needs evaluation.',
    },
    lifestyleAndSupplements: [
      'Dark urine, pale stool, or itching with a high direct bilirubin is a same-week clinical problem.',
      'Always read direct bilirubin as a fraction of total, not as a standalone “lower is better” score detached from ALP and GGT.',
    ],
    citations: [
      { authors: 'Fevery J', year: 2008, journal: 'Liver International',
        title: 'Bilirubin in clinical practice: a review',
        finding: 'Separates unconjugated from conjugated hyperbilirubinemia and the diseases that follow each pattern.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Bilirubin%20in%20clinical%20practice%20a%20review%20Fevery' },
      { authors: 'Levitt DG, Levitt MD', year: 2014, journal: 'Clinical and Experimental Gastroenterology',
        title: 'Quantitative assessment of the multiple processes responsible for bilirubin homeostasis in health and disease',
        finding: 'Quantifies production, hepatic uptake, conjugation, and excretion so direct and indirect fractions can be interpreted.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Quantitative%20assessment%20of%20the%20multiple%20processes%20responsible%20for%20bilirubin%20homeostasis' },
    ],
  },

  'Calcium (mg/dL)': {
    tagline: 'A tightly controlled mineral for bone, muscle contraction, clotting, and nerve signaling.',
    whatItIs:
      'Serum calcium is about half ionized and active, about 40% bound to albumin, and the rest complexed to anions. Parathyroid hormone, vitamin D, and the kidney hold the ionized fraction in a narrow band. This panel reports total calcium in mg/dL. When albumin is low, total calcium falls even if ionized calcium is normal, so the albumin context matters. Magnesium deficiency impairs parathyroid hormone release and can cause hypocalcemia.',
    whyItMatters:
      'High calcium suggests primary hyperparathyroidism, malignancy, excess vitamin D or calcium pills, or granulomatous disease, and it causes stones, bone pain, and constipation. Low calcium causes neuromuscular irritability and, when severe, seizures or arrhythmia. Food calcium and supplemental calcium are not the same exposure: meta-analyses have linked calcium supplements, more than dietary calcium, with cardiovascular events.',
    optimalTarget:
      'Standard lab range is 8.3–10.6 mg/dL; a practical target is about 9.0–10.0 mg/dL, confirmed with albumin and, if needed, ionized calcium.',
    nutritionHelps: [
      'Dietary calcium from dairy, fortified drinks, tofu, and greens supports bone without the bolus of a pill.',
      'Vitamin D sufficiency is required to absorb that calcium.',
      'Magnesium-rich foods support normal parathyroid control of calcium.',
    ],
    nutritionAvoid: [
      'High-dose calcium supplements, especially without a dietary shortfall, are the form linked to kidney stones and a possible cardiovascular signal.',
      'Excess vitamin D supplements can raise calcium; more is not a longevity strategy once the level is sufficient.',
    ],
    exerciseEffects: {
      chronic:
        'Weight-bearing training improves bone use of calcium. It does not chronically reset serum calcium, which is hormonally clamped.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw does not meaningfully move total calcium in most people. Sweat losses and a slight hemoconcentration can nudge it by a few tenths at most.',
    },
    lifestyleAndSupplements: [
      'Check PTH, vitamin D, and creatinine when calcium is repeatedly high or low.',
      'Thiazide diuretics raise serum calcium; loop diuretics tend to lower it.',
    ],
    citations: [
      { authors: 'Peacock M', year: 2010, journal: 'Clinical Journal of the American Society of Nephrology',
        title: 'Calcium metabolism in health and disease',
        finding: 'Reviews intestinal absorption, bone exchange, and renal control that keep serum calcium stable.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Calcium%20metabolism%20in%20health%20and%20disease%20Peacock' },
      { authors: 'Bolland MJ, Grey A, Avenell A, Gamble GD, Reid IR', year: 2011, journal: 'BMJ',
        title: 'Calcium supplements with or without vitamin D and risk of cardiovascular events: reanalysis of the Women Health Initiative limited access dataset and meta-analysis',
        finding: 'Calcium supplements were associated with more myocardial infarction in pooled trial data.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Calcium%20supplements%20with%20or%20without%20vitamin%20D%20and%20risk%20of%20cardiovascular%20events' },
    ],
  },

  'Magnesium (mg/dL)': {
    tagline: 'An intracellular cofactor for ATP, muscle and nerve function, and glucose handling.',
    whatItIs:
      'Most magnesium is in bone and inside cells. Serum magnesium, reported here in mg/dL, is under 1% of body stores and can look normal while tissue stores are low. The kidney is the main regulator. Deficiency is common with diuretics, proton-pump inhibitors, diarrhea, alcohol, and poorly controlled diabetes. Serum is still the test that finds overt depletion.',
    whyItMatters:
      'Low magnesium causes cramps, arrhythmia risk, refractory low potassium and low calcium, and worse insulin sensitivity. Higher dietary and circulating magnesium are associated with lower cardiovascular disease in meta-analyses. High serum magnesium is usually kidney failure or excess supplements, and severe hypermagnesemia depresses reflexes and breathing.',
    optimalTarget:
      'Standard lab range is 1.6–2.6 mg/dL; many preventive discussions favor the upper half, about 2.0–2.4 mg/dL, knowing serum is an imperfect store marker.',
    nutritionHelps: [
      'Nuts, seeds, legumes, leafy greens, and whole grains are the reliable food sources.',
      'Replacing refined grains with those foods raises intake without a pill.',
      'Correcting diarrhea or a magnesium-wasting drug does more than a short oral course if losses continue.',
    ],
    nutritionAvoid: [
      'Heavy alcohol intake increases urinary magnesium loss.',
      'Very high-dose supplements cause diarrhea and, in kidney disease, dangerous accumulation.',
    ],
    exerciseEffects: {
      chronic:
        'Training increases magnesium needs slightly through sweat and muscle use, but it does not chronically lower a well-fed person out of range.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw can dip serum magnesium slightly as it shifts into working cells and is lost in sweat. The change is usually small.',
    },
    lifestyleAndSupplements: [
      'If potassium will not correct, check magnesium; the kidney wastes potassium when magnesium is low.',
      'Proton-pump inhibitors and thiazides are common hidden causes of a low level.',
    ],
    citations: [
      { authors: 'Del Gobbo LC, Imamura F, Wu JHY, et al.', year: 2013, journal: 'American Journal of Clinical Nutrition',
        title: 'Circulating and dietary magnesium and risk of cardiovascular disease: a systematic review and meta-analysis',
        finding: 'Higher circulating magnesium was associated with a lower risk of cardiovascular disease, particularly fatal ischemic disease.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Circulating%20and%20dietary%20magnesium%20and%20risk%20of%20cardiovascular%20disease' },
      { authors: 'Rosanoff A, Weaver CM, Rude RK', year: 2012, journal: 'Nutrition Reviews',
        title: 'Suboptimal magnesium status in the United States: are the health consequences underestimated?',
        finding: 'Argues that usual intakes leave many people below estimates of magnesium requirement, with metabolic consequences.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Suboptimal%20magnesium%20status%20in%20the%20United%20States' },
    ],
  },

  'CRP (mg/L)': {
    tagline: 'A liver acute-phase protein that rises sharply with infection, injury, or inflammation.',
    whatItIs:
      'C-reactive protein is made by hepatocytes within hours of interleukin-6. A standard CRP assay is built to detect the big rises of infection, often into the tens or hundreds of mg/L, and its ceiling for “normal” can be as high as 5–10 mg/L. It is not sensitive enough to grade vascular risk inside the 0.5–3 mg/L band; that is what hs-CRP is for. CRP falls over a few days once the stimulus stops.',
    whyItMatters:
      'Values above about 10 mg/L usually mean infection, flare, or significant tissue injury, and they predict short-term clinical events in sick patients. A standard CRP of 0.5–2 mg/L is quiet by infection standards and says little about heart risk. Chronically detectable inflammation is associated with atherosclerosis, which is why the high-sensitivity assay exists as a separate marker.',
    optimalTarget:
      'This lab range is under 8.0 mg/L for acute-phase screening; in health the informative target is far lower, under about 1 mg/L, which a standard assay may only report as “low.”',
    nutritionHelps: [
      'Weight loss and a vegetable-and-fiber pattern lower chronic low-grade CRP over months.',
      'Treating a dental or sinus infection removes a surprising driver of a mid-range CRP.',
      'Omega-3-rich fish may modestly lower inflammatory tone; it will not touch a CRP of 80 from pneumonia.',
    ],
    nutritionAvoid: [
      'Excess visceral fat and ultra-processed intake sustain a higher baseline.',
      'A hard drinking bout can contribute to a short inflammatory rise, separate from GGT effects.',
    ],
    exerciseEffects: {
      chronic:
        'Trained people tend to have lower resting CRP once body fat is lower.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw can raise CRP, but the timing matters: at 90 minutes it is often still baseline, then it rises toward 24–48 hours after a damaging session, especially eccentric work.',
    },
    lifestyleAndSupplements: [
      'Repeat a surprise elevation after an easy week; CRP is bouncy.',
      'Use hs-CRP, not this assay, when the question is cardiovascular risk under 5 mg/L.',
    ],
    citations: [
      { authors: 'Pepys MB, Hirschfield GM', year: 2003, journal: 'Journal of Clinical Investigation',
        title: 'C-reactive protein: a critical update',
        finding: 'Reviews hepatic CRP synthesis, the acute-phase rise, and what standard assays can and cannot resolve.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=C-reactive%20protein%20a%20critical%20update%20Pepys' },
      { authors: 'Ridker PM, Cushman M, Stampfer MJ, Tracy RP, Hennekens CH', year: 1997, journal: 'New England Journal of Medicine',
        title: 'Inflammation, aspirin, and the risk of cardiovascular disease in apparently healthy men',
        finding: 'Higher baseline CRP predicted myocardial infarction and stroke in apparently healthy men.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Inflammation%20aspirin%20and%20the%20risk%20of%20cardiovascular%20disease%20in%20apparently%20healthy%20men' },
    ],
  },

  'hs-CRP (mg/L)': {
    tagline: 'The same CRP protein, measured precisely enough to grade low-grade vascular inflammation.',
    whatItIs:
      'High-sensitivity CRP detects concentrations around 0.1–10 mg/L that a standard infection assay lumps together as normal. The AHA/CDC cutpoints in primary prevention are under 1.0 mg/L (lower risk), 1.0–3.0 (average), and above 3.0 (higher relative risk), after excluding obvious infection. It is still an acute-phase protein, so a cold or a hard workout can put it in the “high” bin for a few days.',
    whyItMatters:
      'In primary prevention, hs-CRP adds risk information beyond lipids. The JUPITER trial enrolled people with LDL cholesterol that was not high but hs-CRP at or above 2 mg/L and found fewer cardiovascular events with rosuvastatin. A single elevated value should be repeated in two weeks at rest. Levels above 10 mg/L are usually infection, not a chronic risk score.',
    optimalTarget:
      'This panel already uses under 1.0 mg/L as the reference; that is the AHA lower-risk band, and many longevity discussions prefer a rested value under 0.5–1.0.',
    nutritionHelps: [
      'Fat loss is the strongest dietary route to a lower rested hs-CRP.',
      'A Mediterranean-style pattern with fish, olive oil, and vegetables has trial support for lowering CRP.',
      'Treating gingivitis and other smoldering infections removes non-dietary drivers.',
    ],
    nutritionAvoid: [
      'Visceral adiposity keeps interleukin-6 and therefore hs-CRP higher.',
      'Drawing the lab during or just after an illness makes the number uninterpretable for risk.',
    ],
    exerciseEffects: {
      chronic:
        'Months of training plus lower body fat lower resting hs-CRP.',
      acutePreDraw:
        'A gym session in the prior 24 hours, especially a new or eccentric one, can raise hs-CRP into the average or high band even though a draw within the first hour may still look normal. Repeat after 48–72 easy hours before you treat it as vascular risk.',
    },
    lifestyleAndSupplements: [
      'Sleep debt and smoking both raise hs-CRP.',
      'Do not start a statin from one elevated hs-CRP; confirm it twice and look at the whole risk picture.',
    ],
    citations: [
      { authors: 'Pearson TA, Mensah GA, Alexander RW, et al.', year: 2003, journal: 'Circulation',
        title: 'Markers of inflammation and cardiovascular disease: application to clinical and public health practice',
        finding: 'AHA/CDC statement setting hs-CRP cutpoints of under 1, 1–3, and over 3 mg/L for vascular risk.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Markers%20of%20inflammation%20and%20cardiovascular%20disease%20application%20to%20clinical%20and%20public%20health%20practice' },
      { authors: 'Ridker PM, Danielson E, Fonseca FAH, et al.', year: 2008, journal: 'New England Journal of Medicine',
        title: 'Rosuvastatin to prevent vascular events in men and women with elevated C-reactive protein',
        finding: 'In JUPITER, statin therapy cut events in people with hs-CRP at or above 2 mg/L and LDL under 130 mg/dL.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Rosuvastatin%20to%20prevent%20vascular%20events%20in%20men%20and%20women%20with%20elevated%20C-reactive%20protein' },
    ],
  },

  // Lipids
  'Total Cholesterol (mg/dL)': {
    tagline: 'The sum of cholesterol carried in LDL, HDL, VLDL, and related particles.',
    whatItIs:
      'Total cholesterol adds every circulating cholesterol pool. Most of it in a fasting sample is LDL, then HDL, then VLDL. It does not say which particles are present. A high total can be a high LDL, a high HDL, or both. Risk equations and modern guidelines have largely moved to LDL, non-HDL, and apoB because those track the atherogenic particles.',
    whyItMatters:
      'Across MRFIT and the Prospective Studies Collaboration, higher cholesterol tracked more coronary death, especially at younger ages, but the signal is carried by atherogenic lipoproteins rather than by HDL cholesterol inside the total. A very low total can reflect hyperthyroidism, malabsorption, or aggressive lipid therapy. Treating the total without looking at the split misses both protective HDL and harmful LDL.',
    optimalTarget:
      'Standard lab range here is under 200 mg/dL; longevity interpretation cares more that non-HDL and LDL are low than that the total itself is minimized if HDL is healthy.',
    nutritionHelps: [
      'Replacing saturated fat with unsaturated fat lowers LDL and therefore the total.',
      'Soluble fiber (oats, beans, psyllium) reduces cholesterol absorption.',
      'A diet that lifts HDL (more activity, less visceral fat) can raise the total for a benign reason, so read the fractions.',
    ],
    nutritionAvoid: [
      'A pattern high in saturated fat plus refined carbohydrate raises LDL and triglycerides together.',
      'Trans fats, where still present, raise LDL and lower HDL.',
    ],
    exerciseEffects: {
      chronic:
        'Training tends to raise HDL and lower triglycerides, so total cholesterol may change less than the quality of the split.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw concentrates lipoproteins a few percent if plasma volume falls. The total can look slightly higher than your rested baseline without a true change in particle number.',
    },
    lifestyleAndSupplements: [
      'Hypothyroidism raises total cholesterol; check TSH when the lipid panel drifts up together.',
      'Plant sterols and viscous fiber have modest LDL-lowering effects; they do not replace medication when risk is high.',
    ],
    citations: [
      { authors: 'Stamler J, Wentworth D, Neaton JD', year: 1986, journal: 'JAMA',
        title: 'Is relationship between serum cholesterol and risk of premature death from coronary heart disease continuous and graded?',
        finding: 'In 356,222 MRFIT screenees, coronary death rose continuously with serum cholesterol.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=relationship%20between%20serum%20cholesterol%20and%20risk%20of%20premature%20death%20from%20coronary%20heart%20disease' },
      { authors: 'Prospective Studies Collaboration', year: 2007, journal: 'The Lancet',
        title: 'Blood cholesterol and vascular mortality by age, sex, and blood pressure: a meta-analysis of individual data from 61 prospective studies',
        finding: 'Total cholesterol related to vascular mortality, with a stronger association at younger ages.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Blood%20cholesterol%20and%20vascular%20mortality%20by%20age%20sex%20and%20blood%20pressure' },
    ],
  },

  'HDL (mg/dL)': {
    tagline: 'High-density lipoprotein cholesterol, the fraction historically called protective.',
    whatItIs:
      'HDL particles are made in liver and intestine and pick up cholesterol from tissues and from other lipoproteins, returning it toward the liver. The lab reports the cholesterol mass inside those particles, not particle function or number. Men are often flagged below 40 mg/dL. Insulin resistance, smoking, and hypertriglyceridemia push HDL down; alcohol and some drugs push the cholesterol number up without proving the particles work better.',
    whyItMatters:
      'Observational studies show a strong inverse association between HDL cholesterol and coronary disease. Mendelian randomization and drug trials that raised HDL cholesterol (without lowering apoB) did not clearly cut heart attacks, so a higher number is not automatically causal protection. Very high HDL, roughly above 90–100 mg/dL, is not a free pass. Low HDL is still a useful marker of insulin resistance and residual risk.',
    optimalTarget:
      'Standard lab range here is above 40 mg/dL for men; a practical band often discussed is about 50–70 mg/dL, read with triglycerides and non-HDL.',
    nutritionHelps: [
      'Replacing refined carbohydrate with unsaturated fat tends to raise HDL and lower triglycerides.',
      'Weight loss raises HDL when the low value was part of metabolic syndrome.',
      'Fatty fish fits a pattern that improves the triglyceride-HDL pair, even if HDL itself moves modestly.',
    ],
    nutritionAvoid: [
      'A very-high-carbohydrate, low-fat pattern can suppress HDL in susceptible people.',
      'Industrial trans fats lower HDL and raise LDL.',
    ],
    exerciseEffects: {
      chronic:
        'Regular aerobic training is one of the more reliable ways to raise HDL cholesterol over months.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw can raise HDL slightly through hemoconcentration. That bump is not the training adaptation; the adaptation is the rested value over weeks.',
    },
    lifestyleAndSupplements: [
      'Smoking cessation raises HDL. Anabolic steroids markedly suppress it.',
      'Do not chase an ever-higher HDL with alcohol; the Mendelian and trial data do not support that strategy.',
    ],
    citations: [
      { authors: 'Gordon DJ, Probstfield JL, Garrison RJ, et al.', year: 1989, journal: 'Circulation',
        title: 'High-density lipoprotein cholesterol and cardiovascular disease: four prospective American studies',
        finding: 'Each 1 mg/dL higher HDL cholesterol was associated with lower coronary risk across four US cohorts.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=High-density%20lipoprotein%20cholesterol%20and%20cardiovascular%20disease%20four%20prospective%20American%20studies' },
      { authors: 'Voight BF, Peloso GM, Orho-Melander M, et al.', year: 2012, journal: 'The Lancet',
        title: 'Plasma HDL cholesterol and risk of myocardial infarction: a mendelian randomisation study',
        finding: 'Genetic variants that only raise HDL cholesterol did not lower myocardial infarction risk.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Plasma%20HDL%20cholesterol%20and%20risk%20of%20myocardial%20infarction%20mendelian%20randomisation' },
    ],
  },

  'LDL (mg/dL)': {
    tagline: 'Low-density lipoprotein cholesterol, the primary causal driver of atherosclerosis.',
    whatItIs:
      'LDL particles carry cholesterol from the liver to tissues. The lab value is usually calculated by Friedewald (total − HDL − triglycerides/5) when triglycerides are under 400 mg/dL, or measured directly. Particle number (apoB) can be high even when LDL cholesterol looks acceptable if the particles are small and numerous. This panel stores the cholesterol mass in mg/dL.',
    whyItMatters:
      'Genetic, epidemiologic, and trial evidence converge: LDL particles cause atherosclerotic cardiovascular disease, and the benefit of lowering them scales with how much and how long they are lowered. A single reading just after training can be a few percent higher from hemoconcentration. Very low LDL from therapy is the point of treatment in high-risk people, not a danger signal by itself.',
    optimalTarget:
      'This panel flags LDL at 100 mg/dL and above; prevention guidelines often want under 100, and under about 70 when overall risk is high.',
    nutritionHelps: [
      'Viscous fiber and plant sterols lower LDL cholesterol modestly.',
      'Swapping butter and fatty red meat for olive oil, nuts, and fish lowers LDL in feeding trials.',
      'Weight loss helps when excess weight is part of the picture, though triglycerides often move more than LDL.',
    ],
    nutritionAvoid: [
      'Diets high in saturated fat raise LDL cholesterol in most people.',
      'Dietary cholesterol is a smaller lever than saturated fat, but large intakes still matter in hyper-responders.',
    ],
    exerciseEffects: {
      chronic:
        'Training improves triglycerides and HDL more reliably than it lowers LDL cholesterol. LDL particle number can improve even when the cholesterol number is stubborn.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw can raise calculated LDL a few percent through plasma-volume contraction. It is not new atherogenic burden from that workout.',
    },
    lifestyleAndSupplements: [
      'Check TSH when LDL rises without a diet change; hypothyroidism is a reversible cause.',
      'Soluble fiber is reasonable support; statins, ezetimibe, or other drugs are the tools when risk requires a large drop.',
    ],
    citations: [
      { authors: 'Ference BA, Ginsberg HN, Graham I, et al.', year: 2017, journal: 'European Heart Journal',
        title: 'Low-density lipoproteins cause atherosclerotic cardiovascular disease: evidence from genetic, epidemiologic, and clinical studies',
        finding: 'European Atherosclerosis Society consensus that LDL particles are causal and that lower exposure for longer is better.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Low-density%20lipoproteins%20cause%20atherosclerotic%20cardiovascular%20disease' },
      { authors: 'Cholesterol Treatment Trialists Collaboration', year: 2010, journal: 'The Lancet',
        title: 'Efficacy and safety of more intensive lowering of LDL cholesterol: a meta-analysis of data from 170,000 participants in 26 randomised trials',
        finding: 'Each 1 mmol/L greater LDL reduction reduced major vascular events by about a fifth.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Efficacy%20and%20safety%20of%20more%20intensive%20lowering%20of%20LDL%20cholesterol' },
    ],
  },

  'VLDL (mg/dL)': {
    tagline: 'Very-low-density lipoprotein cholesterol, the liver export vehicle for triglycerides.',
    whatItIs:
      'The liver packages triglycerides into VLDL and secretes them. On a standard panel, VLDL cholesterol is not measured; it is triglycerides divided by 5 (Friedewald), which fails when triglycerides exceed about 400 mg/dL. High VLDL production is the lipoprotein signature of insulin resistance: the liver overproduces large, triglyceride-rich particles that later become small, dense LDL.',
    whyItMatters:
      'VLDL and its remnants are atherogenic, not just a passive triglyceride taxi. A high calculated VLDL means triglycerides are high and remnant cholesterol is likely high too. A low VLDL is favorable and usually means triglycerides are low. Because the number is derived, it cannot add information beyond the triglyceride value on a Friedewald panel.',
    optimalTarget:
      'Standard lab range is 0–40 mg/dL; with triglycerides under about 100 mg/dL, calculated VLDL sits under about 20, which is the more useful target.',
    nutritionHelps: [
      'Cutting sugar-sweetened drinks and excess refined starch lowers hepatic VLDL output.',
      'Weight loss reduces the insulin-resistant overproduction of VLDL.',
      'Marine omega-3s lower hepatic triglyceride secretion into VLDL.',
    ],
    nutritionAvoid: [
      'Alcohol and fructose both increase hepatic triglyceride packaging into VLDL.',
      'A large late carbohydrate load the night before a “fasting” draw can still influence morning triglycerides and therefore calculated VLDL.',
    ],
    exerciseEffects: {
      chronic:
        'Training improves insulin sensitivity and lowers fasting VLDL over weeks.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw can raise VLDL during recovery because catecholamines mobilize fatty acids and the liver exports more triglyceride. The next rested fasting value is the one to trend.',
    },
    lifestyleAndSupplements: [
      'If triglycerides are above 400 mg/dL, do not trust the divided-by-5 VLDL or the Friedewald LDL.',
      'Icosapent ethyl and prescription omega-3s are drug therapy for high triglycerides, not a reason to megadose unregulated fish oil.',
    ],
    citations: [
      { authors: 'Adiels M, Olofsson SO, Taskinen MR, Borén J', year: 2008, journal: 'Arteriosclerosis, Thrombosis, and Vascular Biology',
        title: 'Overproduction of very low-density lipoproteins is the hallmark of the dyslipidemia in the metabolic syndrome',
        finding: 'Insulin-resistant livers oversecrete VLDL, which drives high triglycerides and atherogenic remnants.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Overproduction%20of%20very%20low-density%20lipoproteins%20is%20the%20hallmark%20of%20the%20dyslipidemia' },
      { authors: 'Choi SH, Ginsberg HN', year: 2011, journal: 'Trends in Endocrinology and Metabolism',
        title: 'Increased very low density lipoprotein secretion, hepatic steatosis, and insulin resistance',
        finding: 'Links fatty liver, insulin resistance, and increased VLDL secretion as one pathway.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Increased%20very%20low%20density%20lipoprotein%20secretion%20hepatic%20steatosis%20and%20insulin%20resistance' },
    ],
  },

  'Non-HDL (mg/dL)': {
    tagline: 'Total cholesterol minus HDL: every atherogenic cholesterol pool in one number.',
    whatItIs:
      'Non-HDL cholesterol subtracts HDL from the total. What remains is cholesterol in LDL, VLDL, IDL, lipoprotein(a), and remnants. It needs no fasting sample to be valid, and it tracks apoB better than LDL cholesterol does when triglycerides are high. This panel calculates it directly from total and HDL.',
    whyItMatters:
      'On statin therapy and in primary prevention, non-HDL predicts events at least as well as LDL cholesterol, and better when triglycerides are elevated. Guidelines treat it as a co-target: often 30 mg/dL above the LDL goal. A high non-HDL with a “not terrible” LDL means remnant cholesterol is hiding in the gap.',
    optimalTarget:
      'This panel flags non-HDL at 130 mg/dL and above; a tighter prevention target is often under 130, and under about 100 when risk is high.',
    nutritionHelps: [
      'The LDL-lowering pattern (unsaturated fat instead of saturated fat, soluble fiber) lowers non-HDL.',
      'The triglyceride-lowering pattern (less sugar and alcohol, weight loss) lowers the remnant piece that LDL misses.',
      'Because both levers count, a mixed Mediterranean-style pattern beats chasing only one fraction.',
    ],
    nutritionAvoid: [
      'Saturated fat plus sugar raises non-HDL from two directions at once.',
      'Ignoring triglycerides because LDL “is the real number” misses the remnant cholesterol non-HDL captures.',
    ],
    exerciseEffects: {
      chronic:
        'Training lowers non-HDL mainly by lowering VLDL remnants and sometimes LDL, alongside a higher HDL that is subtracted out.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw can raise non-HDL slightly via hemoconcentration of all particles. The ratio-like subtraction of HDL removes only part of that fluid effect.',
    },
    lifestyleAndSupplements: [
      'Ask for apoB if non-HDL and LDL disagree or if metabolic syndrome is present.',
      'Non-HDL is still valid non-fasting, which makes it a fairer trend marker than Friedewald LDL after a workout.',
    ],
    citations: [
      { authors: 'Boekholdt SM, Arsenault BJ, Mora S, et al.', year: 2012, journal: 'JAMA',
        title: 'Association of LDL cholesterol, non-HDL cholesterol, and apolipoprotein B levels with risk of cardiovascular events among patients treated with statins',
        finding: 'Among statin-treated patients, non-HDL and apoB related to events more strongly than LDL cholesterol.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Association%20of%20LDL%20cholesterol%20non-HDL%20cholesterol%20and%20apolipoprotein%20B%20levels%20with%20risk' },
      { authors: 'Grundy SM, Stone NJ, Bailey AL, et al.', year: 2019, journal: 'Circulation',
        title: '2018 AHA/ACC/multisociety guideline on the management of blood cholesterol',
        finding: 'Sets non-HDL goals about 30 mg/dL above the LDL goal and endorses it when triglycerides are high.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=2018%20AHA%20ACC%20guideline%20on%20the%20management%20of%20blood%20cholesterol' },
    ],
  },

  'Triglycerides (mg/dL)': {
    tagline: 'Circulating fat, mostly inside VLDL when fasting, and a direct window on insulin sensitivity.',
    whatItIs:
      'Triglycerides in a fasting sample live mainly in VLDL made by the liver. After meals they also ride in chylomicrons from the gut. Insulin normally suppresses fat breakdown and limits hepatic VLDL output; when it cannot, fasting triglycerides rise and HDL falls. This panel uses mg/dL. Values above 400 break the Friedewald LDL calculation. Values above about 500–1000 raise pancreatitis risk.',
    whyItMatters:
      'The AHA calls under 100 mg/dL optimal, with under 150 the usual lab flag. Higher fasting and non-fasting triglycerides associate with coronary disease, partly through remnant particles. A low triglyceride level is favorable. A jump from a low rested baseline into the 80s after training can be lipolysis, not a new metabolic syndrome.',
    optimalTarget:
      'Standard lab range is under 150 mg/dL; longevity and AHA discussions often aim under about 80–100 mg/dL on a rested fast.',
    nutritionHelps: [
      'Cutting sugar-sweetened drinks and excess fructose lowers triglycerides more reliably than cutting fat.',
      'Weight loss and lower refined-starch intake reduce hepatic production.',
      'Fatty fish or prescription omega-3s lower triglycerides in a dose-dependent way.',
    ],
    nutritionAvoid: [
      'Alcohol is one of the strongest short-term triglyceride raisers.',
      'A high-glycemic eating pattern with surplus energy keeps fasting triglycerides up.',
    ],
    exerciseEffects: {
      chronic:
        'Regular aerobic work is among the most effective lifestyle tools for lowering fasting triglycerides.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw can raise triglycerides for several hours, even if you are still fasted, because catecholamines free fatty acids and the liver exports more VLDL. A long easy session can instead leave them lower the next day.',
    },
    lifestyleAndSupplements: [
      'Uncontrolled diabetes and hypothyroidism both raise triglycerides; treat those before blaming diet alone.',
      'If triglycerides exceed 400 mg/dL, ignore calculated LDL and VLDL until a direct LDL is measured.',
    ],
    citations: [
      { authors: 'Nordestgaard BG, Varbo A', year: 2014, journal: 'The Lancet',
        title: 'Triglycerides and cardiovascular disease',
        finding: 'Reviews remnant cholesterol and why both fasting and non-fasting triglycerides predict coronary disease.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Triglycerides%20and%20cardiovascular%20disease%20Nordestgaard' },
      { authors: 'Miller M, Stone NJ, Ballantyne C, et al.', year: 2011, journal: 'Circulation',
        title: 'Triglycerides and cardiovascular disease: a scientific statement from the American Heart Association',
        finding: 'Defines under 100 mg/dL as optimal and outlines diet, alcohol, and drug effects on triglycerides.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Triglycerides%20and%20cardiovascular%20disease%20a%20scientific%20statement%20from%20the%20American%20Heart%20Association' },
    ],
  },

  'Total/HDL Ratio': {
    tagline: 'Total cholesterol divided by HDL, a Framingham-era summary of atherogenic versus HDL cholesterol.',
    whatItIs:
      'The ratio divides the whole cholesterol pool by the HDL fraction. A high total driven by HDL raises both the numerator and, indirectly, looks better only if HDL is a large share. Framingham popularized it because it discriminated coronary risk with a single figure when apoB was not measured. It is derived, so it adds no laboratory information beyond total and HDL, but it is easy to trend.',
    whyItMatters:
      'Higher ratios track more coronary disease in cohort data. A ratio can look acceptable when both total and HDL are low, which is not the same as a low-LDL, high-HDL pattern. Modern risk assessment prefers non-HDL or apoB when the two stories disagree. This panel treats under 3.5 as the reference.',
    optimalTarget:
      'Standard reference here is under 3.5; many prevention discussions prefer under about 3.0–3.5 when LDL is also at goal.',
    nutritionHelps: [
      'Lowering LDL with unsaturated fat and fiber reduces the numerator.',
      'Raising HDL via fat loss and less refined carbohydrate improves the denominator.',
      'Doing both, rather than only raising HDL with alcohol, is the point of the ratio.',
    ],
    nutritionAvoid: [
      'Saturated-fat-heavy patterns that raise LDL worsen the ratio even if HDL ticks up.',
      'A sugary pattern that drops HDL worsens the ratio even if total cholesterol looks unchanged.',
    ],
    exerciseEffects: {
      chronic:
        'Training tends to improve the ratio by lifting HDL and sometimes trimming the atherogenic share.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw usually does not meaningfully move the ratio, because hemoconcentration raises total cholesterol and HDL together and they partly cancel.',
    },
    lifestyleAndSupplements: [
      'If the ratio is high, act on LDL and triglycerides, not on the ratio as a separate target.',
      'Anabolic steroids crush HDL and can wreck the ratio even when total cholesterol looks ordinary.',
    ],
    citations: [
      { authors: 'Castelli WP, Garrison RJ, Wilson PW, Abbott RD, Kalousdian S, Kannel WB', year: 1986, journal: 'JAMA',
        title: 'Incidence of coronary heart disease and lipoprotein cholesterol levels: the Framingham Study',
        finding: 'Framingham showed coronary risk rising with total cholesterol and falling with HDL, the logic behind the ratio.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Incidence%20of%20coronary%20heart%20disease%20and%20lipoprotein%20cholesterol%20levels%20Framingham' },
      { authors: 'Ingelsson E, Schaefer EJ, Contois JH, et al.', year: 2007, journal: 'JAMA',
        title: 'Clinical utility of different lipid measures for prediction of coronary heart disease in men and women',
        finding: 'Compared ratio and non-HDL measures and found non-HDL and apoB at least as informative as classic ratios.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Clinical%20utility%20of%20different%20lipid%20measures%20for%20prediction%20of%20coronary%20heart%20disease' },
    ],
  },

  'LDL/HDL Ratio': {
    tagline: 'LDL cholesterol divided by HDL cholesterol, a simple atherogenic-to-HDL comparison.',
    whatItIs:
      'This ratio puts the main atherogenic cholesterol number over HDL cholesterol. It ignores remnants, so it understates risk when triglycerides are high and LDL cholesterol looks deceptively fine. Historical analyses found that ratios predicted coronary events about as well as the individual levels, which is why panels still print them. It is entirely derived from the two inputs.',
    whyItMatters:
      'A rising ratio means LDL is gaining on HDL. That can be more LDL, less HDL, or both, and the remedy differs. A low ratio from a very low HDL plus a low LDL is not the same achievement as a low LDL with a solid HDL. Non-HDL and apoB have largely superseded this ratio when decisions about drugs are being made.',
    optimalTarget:
      'This panel uses under 3.0 as the reference; a tighter practical target often discussed is under about 2.5.',
    nutritionHelps: [
      'LDL-lowering food swaps (unsaturated oils, nuts, soluble fiber) reduce the numerator.',
      'Activity and less refined carbohydrate support the HDL denominator.',
      'Weight loss helps both sides when metabolic syndrome is present.',
    ],
    nutritionAvoid: [
      'Saturated-fat excess raises LDL and the ratio.',
      'Smoking and a very-low-fat, high-sugar pattern can drop HDL and worsen the ratio from the bottom.',
    ],
    exerciseEffects: {
      chronic:
        'Aerobic training improves the ratio mostly by raising HDL, with a smaller effect on LDL cholesterol.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw usually does not meaningfully move the LDL/HDL ratio, because both lipids concentrate together when plasma volume falls.',
    },
    lifestyleAndSupplements: [
      'Use the ratio as a dashboard summary, and use LDL, non-HDL, or apoB for decisions.',
      'Anything that selectively crashes HDL (androgens) inflates the ratio without a diet change.',
    ],
    citations: [
      { authors: 'Kinosian B, Glick H, Garland G', year: 1994, journal: 'Annals of Internal Medicine',
        title: 'Cholesterol and coronary heart disease: predicting risks by levels and ratios',
        finding: 'Ratios of total or LDL cholesterol to HDL predicted coronary risk at least as well as the separate levels.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Cholesterol%20and%20coronary%20heart%20disease%20predicting%20risks%20by%20levels%20and%20ratios' },
      { authors: 'Fernandez ML, Webb D', year: 2008, journal: 'Journal of the American College of Nutrition',
        title: 'The LDL to HDL cholesterol ratio as a valuable tool to evaluate coronary heart disease risk',
        finding: 'Summarizes evidence for the LDL/HDL ratio as a compact coronary risk marker.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=The%20LDL%20to%20HDL%20cholesterol%20ratio%20as%20a%20valuable%20tool%20to%20evaluate%20coronary%20heart%20disease%20risk' },
    ],
  },

  'Trig/HDL Ratio': {
    tagline: 'Triglycerides divided by HDL, a bedside surrogate for insulin resistance.',
    whatItIs:
      'In mg/dL units, dividing fasting triglycerides by HDL cholesterol summarizes the atherogenic dyslipidemia of insulin resistance: high VLDL and low HDL. McLaughlin and colleagues showed that a high ratio identifies insulin-resistant people who already look unremarkable on glucose. The cutpoints are unit-specific; a ratio of 3.5 in mg/dL is not the same number as in mmol/L. This panel derives it from the two fasting inputs.',
    whyItMatters:
      'Ratios above about 3.5 (mg/dL) suggest insulin resistance and higher coronary risk; ratios under 2 are favorable. The marker moves when either input moves, so a post-workout triglyceride bump inflates it even if HDL is stable. It is not a diagnosis of diabetes, and it should agree with fasting insulin or HOMA-IR before you treat it as one.',
    optimalTarget:
      'This panel uses under 2.0 as the reference; values under about 1.5 on a rested fast are the stronger longevity pattern in mg/dL units.',
    nutritionHelps: [
      'Less sugar, less alcohol, and weight loss lower the triglyceride numerator.',
      'Replacing refined starch with unsaturated fat supports a higher HDL denominator.',
      'The ratio improves fastest when both change together, which is the usual result of a consistent training diet.',
    ],
    nutritionAvoid: [
      'Fructose-sweetened drinks and alcohol spike triglycerides and worsen the ratio within days.',
      'A draw that is not truly fasting makes the ratio look worse than the rested baseline.',
    ],
    exerciseEffects: {
      chronic:
        'Weeks of training lower triglycerides and raise HDL, so the rested ratio falls.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw can raise the ratio because recovery lipolysis lifts triglycerides while HDL is largely unchanged. Do not compare that sample with a rested ratio from another month.',
    },
    lifestyleAndSupplements: [
      'Use the mg/dL cutpoints only; converting the lab units without converting the threshold will mislabel you.',
      'If the ratio is high at rest, check fasting insulin rather than adding supplements aimed at cholesterol.',
    ],
    citations: [
      { authors: 'McLaughlin T, Reaven G, Abbasi F, et al.', year: 2005, journal: 'American Journal of Cardiology',
        title: 'Is there a simple way to identify insulin-resistant individuals at increased risk of cardiovascular disease?',
        finding: 'A triglyceride/HDL ratio above 3.5 (mg/dL) identified insulin-resistant overweight people.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=simple%20way%20to%20identify%20insulin-resistant%20individuals%20at%20increased%20risk%20of%20cardiovascular%20disease' },
      { authors: 'Gaziano JM, Hennekens CH, O Donnell CJ, Breslow JL, Buring JE', year: 1997, journal: 'Circulation',
        title: 'Fasting triglycerides, high-density lipoprotein, and risk of myocardial infarction',
        finding: 'The triglyceride-to-HDL relationship predicted myocardial infarction independent of other lipids.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Fasting%20triglycerides%20high-density%20lipoprotein%20and%20risk%20of%20myocardial%20infarction' },
    ],
  },

  // Hormones
  'TSH (uIU/mL)': {
    tagline: 'Pituitary thyroid-stimulating hormone, the most sensitive screen for thyroid set-point.',
    whatItIs:
      'Thyrotropin is released by the pituitary and tells the thyroid to make T4 and T3. Negative feedback from thyroid hormone keeps TSH in a narrow individual set-point. Small changes in free T4 move TSH a lot, which is why TSH detects hypothyroidism before T4 falls out of range. Biotin supplements and some assays can make TSH look falsely low. This panel reports uIU/mL, the same unit as mIU/L.',
    whyItMatters:
      'A high TSH with a low free T4 is overt hypothyroidism; a high TSH with a normal free T4 is subclinical, and treatment is clearer once TSH is above about 10 or when antibodies, symptoms, or pregnancy are present. A suppressed TSH suggests hyperthyroidism, excess thyroid hormone, or assay interference. Mortality associations exist at both extremes, especially in older adults. A value of 2–3 with normal free hormones and no symptoms is usually observation, not disease.',
    optimalTarget:
      'Standard lab range is 0.55–4.78 uIU/mL; many discussions of a healthy set-point cluster around 0.5–2.5, but treatment is guided by free hormones, antibodies, and symptoms, not a race to the bottom.',
    nutritionHelps: [
      'Adequate iodine (iodized salt, dairy, seafood) prevents deficiency hypothyroidism; more iodine is not better.',
      'Selenium-containing foods (fish, eggs, Brazil nuts in small amounts) support deiodinase enzymes.',
      'There is no diet that should be used to suppress a normal TSH.',
    ],
    nutritionAvoid: [
      'Very high iodine intakes, including kelp supplements, can raise TSH or trigger thyroid dysfunction.',
      'High-dose biotin before the draw interferes with many immunoassays and can fake a hyperthyroid pattern.',
    ],
    exerciseEffects: {
      chronic:
        'Training does not reset the pituitary-thyroid axis in a useful direction. Chronic energy deficit can alter thyroid hormones more than TSH alone shows.',
      acutePreDraw:
        'A typical gym session 1–24 hours before the draw does not meaningfully move TSH. Prolonged exhaustive exercise or a night of sleep loss can shift it slightly; a standard lifting session should not.',
    },
    lifestyleAndSupplements: [
      'Draw thyroid labs in the morning and stop biotin for at least 48 hours if your assay is biotin-sensitive.',
      'Do not start thyroid hormone for a single TSH inside the reference range.',
    ],
    citations: [
      { authors: 'Garber JR, Cobin RH, Gharib H, et al.', year: 2012, journal: 'Thyroid',
        title: 'Clinical practice guidelines for hypothyroidism in adults',
        finding: 'ATA/AACE guidance: confirm an elevated TSH, then use free T4 and clinical context to decide on treatment.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Clinical%20practice%20guidelines%20for%20hypothyroidism%20in%20adults%20Garber' },
      { authors: 'Surks MI, Ortiz E, Daniels GH, et al.', year: 2004, journal: 'JAMA',
        title: 'Subclinical thyroid disease: scientific review and guidelines for diagnosis and management',
        finding: 'Subclinical hypothyroidism is a high TSH with normal free T4; treatment benefit is clearest at higher TSH levels.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Subclinical%20thyroid%20disease%20scientific%20review%20and%20guidelines' },
    ],
  },

  'Free T3 (pg/mL)': {
    tagline: 'Unbound triiodothyronine, the active thyroid hormone at the nuclear receptor.',
    whatItIs:
      'Most circulating T3 is made outside the thyroid by deiodinases that strip an iodine from T4, especially in liver, muscle, and brain. Free T3 is the tiny unbound fraction that enters cells. The body defends plasma T3 across a wide range of thyroid supply. Illness, fasting, and carbohydrate restriction lower conversion (non-thyroidal illness, or “low T3 syndrome”) while TSH often stays normal. This panel uses pg/mL.',
    whyItMatters:
      'High free T3 with a suppressed TSH is hyperthyroidism. Low free T3 with a high TSH is hypothyroidism with poor conversion or advanced gland failure. A low free T3 with a normal TSH during weight loss or illness is usually adaptive, and treating it with T3 is not standard. Free T3 is a poor screening test compared with TSH, but it explains symptoms when TSH and free T4 do not match the picture.',
    optimalTarget:
      'Standard lab range is 2.0–4.2 pg/mL; with a normal TSH, mid-to-upper values around 3.0–3.8 pg/mL are a common healthy pattern, not a target to force with T3 drugs.',
    nutritionHelps: [
      'Enough carbohydrate and energy intake keep deiodinase conversion from falling during a hard diet.',
      'Selenium and zinc sufficiency support deiodinases; deficiency is the issue, not megadoses.',
      'Iodine adequacy supports thyroid hormone production upstream of T3.',
    ],
    nutritionAvoid: [
      'Prolonged very-low-calorie dieting lowers T3 on purpose as an energy-saving response.',
      'Excess iodine or kelp can disrupt the axis that supplies T3.',
    ],
    exerciseEffects: {
      chronic:
        'Reasonable training does not lower free T3. Chronic under-fueling plus high training load can, as part of low energy availability.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw does not meaningfully move free T3. The hormone changes over days of illness or calorie deficit, not after one workout.',
    },
    lifestyleAndSupplements: [
      'Do not add liothyronine to “optimize” a normal free T3; that suppresses TSH and has cardiac and bone costs.',
      'If free T3 is low, look at energy intake, illness, and free T4 before blaming a missing supplement.',
    ],
    citations: [
      { authors: 'Abdalla SM, Bianco AC', year: 2014, journal: 'Clinical Endocrinology',
        title: 'Defending plasma T3 is a biological priority',
        finding: 'The axis prioritizes a stable plasma T3, which is why T3 can look preserved until thyroid supply is quite limited.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Defending%20plasma%20T3%20is%20a%20biological%20priority' },
      { authors: 'Mullur R, Liu YY, Brent GA', year: 2014, journal: 'Physiological Reviews',
        title: 'Thyroid hormone regulation of metabolism',
        finding: 'Reviews how T3 controls metabolic rate, lipid metabolism, and the response to fasting.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Thyroid%20hormone%20regulation%20of%20metabolism%20Mullur' },
    ],
  },

  'Free T4 (ng/dL)': {
    tagline: 'Unbound thyroxine, the circulating prohormone the thyroid actually secretes.',
    whatItIs:
      'The thyroid gland secretes mostly T4, bound in blood to thyroxine-binding globulin and albumin. Free T4 is the unbound fraction available for conversion to T3. Its half-life is about a week, so it is stable day to day. TSH is a more sensitive screening test, but free T4 distinguishes overt from subclinical disease and monitors replacement. This panel uses ng/dL.',
    whyItMatters:
      'Low free T4 with high TSH is overt hypothyroidism and warrants treatment. High free T4 with low TSH is thyrotoxicosis and raises arrhythmia and bone-loss risk. A free T4 at the edge of the range with a normal TSH rarely needs action. During levothyroxine therapy, free T4 can sit high-normal while TSH is the better dose guide.',
    optimalTarget:
      'Standard lab range is 0.89–1.76 ng/dL; with a mid-normal TSH, a free T4 around 1.0–1.5 ng/dL is a typical healthy spot, not a number to push upward.',
    nutritionHelps: [
      'Iodine sufficiency is required for T4 synthesis.',
      'Adequate protein and calories avoid the binding-protein and conversion shifts of malnutrition.',
      'Selenium sufficiency supports later activation to T3 but does not replace iodine for T4 itself.',
    ],
    nutritionAvoid: [
      'Kelp and high-dose iodine supplements can provoke hypo- or hyperthyroidism.',
      'Biotin before the blood draw can distort free T4 immunoassays in either direction depending on the method.',
    ],
    exerciseEffects: {
      chronic:
        'Training does not chronically raise or lower free T4 in energy-balanced people.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw does not meaningfully move free T4. The half-life is days, so one workout cannot change the circulating store.',
    },
    lifestyleAndSupplements: [
      'Take levothyroxine consistently relative to food and calcium or iron pills, which block absorption, if you are already prescribed it.',
      'Estrogen therapy raises binding globulin and can change total T4 more than free T4.',
    ],
    citations: [
      { authors: 'Brent GA', year: 2012, journal: 'Journal of Clinical Investigation',
        title: 'Mechanisms of thyroid hormone action',
        finding: 'T4 is the secreted prohormone; local conversion to T3 carries out most thyroid hormone action.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Mechanisms%20of%20thyroid%20hormone%20action%20Brent' },
      { authors: 'Jonklaas J, Bianco AC, Bauer AJ, et al.', year: 2014, journal: 'Thyroid',
        title: 'Guidelines for the treatment of hypothyroidism',
        finding: 'American Thyroid Association guidance uses TSH, with free T4, to diagnose and to monitor levothyroxine.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Guidelines%20for%20the%20treatment%20of%20hypothyroidism%20Jonklaas' },
    ],
  },

  'LH (IU/L)': {
    tagline: 'Luteinizing hormone from the pituitary, the signal for testicular testosterone production.',
    whatItIs:
      'LH is released in pulses from the pituitary under GnRH, and it stimulates Leydig cells to make testosterone. Testosterone and estradiol feed back to slow that pulse generator. A single blood draw catches LH at a random point in a pulse, so the number jumps around more than testosterone does. High LH with low testosterone means the testes are not responding (primary hypogonadism). Low or inappropriately normal LH with low testosterone means the signal is the problem (secondary).',
    whyItMatters:
      'LH classifies hypogonadism and guides whether the workup looks at the testes or at the pituitary, prolactin, sleep, and medications. In a man with normal testosterone, a mid-range LH is simply an appropriate signal, not a hormone to maximize. Exogenous testosterone suppresses LH and, with it, sperm production.',
    optimalTarget:
      'Standard lab range is 1.5–9.3 IU/L; the useful target is an LH that matches testosterone, not a high LH by itself.',
    nutritionHelps: [
      'Adequate energy intake prevents the hypothalamic suppression seen in low energy availability.',
      'There is no food that selectively raises LH in a eugonadal man.',
      'Correcting obesity-related hypogonadism with weight loss can restore LH-testosterone coupling.',
    ],
    nutritionAvoid: [
      'Chronic heavy alcohol use can impair the axis at several levels.',
      'Very-low-calorie diets plus extreme training suppress GnRH and therefore LH.',
    ],
    exerciseEffects: {
      chronic:
        'Sustainable training does not suppress LH. Overreaching with under-eating can.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw does not reset LH. A single sample still varies because of pulses, which matters more than the workout.',
    },
    lifestyleAndSupplements: [
      'Opioids, anabolic steroids, and exogenous testosterone suppress LH.',
      'If testosterone is low, repeat a morning LH with prolactin rather than starting a booster supplement.',
    ],
    citations: [
      { authors: 'Santen RJ, Bardin CW', year: 1973, journal: 'Journal of Clinical Investigation',
        title: 'Episodic luteinizing hormone secretion in man: pulse analysis, clinical interpretation, physiologic mechanisms',
        finding: 'LH is secreted in pulses, so one blood level is a snapshot of a rhythmic signal.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Episodic%20luteinizing%20hormone%20secretion%20in%20man' },
      { authors: 'Hayes FJ, Seminara SB, DeCruz S, Boepple PA, Crowley WF', year: 2000, journal: 'Journal of Clinical Endocrinology and Metabolism',
        title: 'Aromatase inhibition in the human male reveals a hypothalamic site of estrogen feedback',
        finding: 'Estradiol, made from testosterone, feeds back on the hypothalamus to restrain LH.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Aromatase%20inhibition%20in%20the%20human%20male%20reveals%20a%20hypothalamic%20site%20of%20estrogen%20feedback' },
    ],
  },

  'FSH (IU/L)': {
    tagline: 'Follicle-stimulating hormone, the pituitary signal for sperm production in Sertoli cells.',
    whatItIs:
      'FSH acts on testicular Sertoli cells to support spermatogenesis. Inhibin B from those cells feeds back to restrain FSH. Unlike LH, FSH is less pulsatile and has a longer half-life, so a single level is more stable. A high FSH often means the seminiferous tubules are damaged even when testosterone and LH are still normal. A low FSH with a low sperm count points back at the pituitary or hypothalamus.',
    whyItMatters:
      'FSH is a fertility marker more than a muscle or mood marker. Men can have a normal testosterone and still have a high FSH with reduced sperm production. Suppressing FSH with exogenous testosterone is why anabolic steroids and testosterone therapy reduce fertility. A mid-range FSH in a man who is not trying to conceive, with normal testosterone, is usually just recorded.',
    optimalTarget:
      'Standard lab range is 1.4–18.1 IU/L; in men the informative pattern is a mid-range FSH that is not suppressed and not chronically high, read with sperm testing only if fertility is the question.',
    nutritionHelps: [
      'Energy availability sufficient for the hypothalamic axis keeps FSH from falling in under-fueled athletes.',
      'No specific food raises FSH productively in healthy men.',
      'Body-weight recovery is the nutrition intervention when low energy availability suppressed the axis.',
    ],
    nutritionAvoid: [
      'Anabolic steroid use suppresses FSH and spermatogenesis.',
      'Chronic energy deficit with high training volume can suppress GnRH, LH, and FSH together.',
    ],
    exerciseEffects: {
      chronic:
        'Ordinary training does not elevate FSH. A high rested FSH is tubular dysfunction, not a fitness badge.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw does not meaningfully move FSH. The half-life is long enough that one workout is invisible.',
    },
    lifestyleAndSupplements: [
      'If fertility matters, do not use testosterone or clomiphene experiments without a clinician and a semen analysis.',
      'Heat, anabolic agents, and some chemotherapy exposures belong in the history when FSH is high.',
    ],
    citations: [
      { authors: 'Simoni M, Gromoll J, Nieschlag E', year: 1997, journal: 'Endocrine Reviews',
        title: 'The follicle-stimulating hormone receptor: biochemistry, molecular biology, physiology, and pathophysiology',
        finding: 'FSH action on Sertoli cells is required for quantitatively normal spermatogenesis.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=follicle-stimulating%20hormone%20receptor%20biochemistry%20molecular%20biology%20physiology' },
      { authors: 'Plant TM, Marshall GR', year: 2001, journal: 'Endocrine Reviews',
        title: 'The functional significance of FSH in spermatogenesis and the control of its secretion in male primates',
        finding: 'Reviews how FSH and testosterone cooperate in spermatogenesis and how inhibin restrains FSH.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=functional%20significance%20of%20FSH%20in%20spermatogenesis%20and%20the%20control%20of%20its%20secretion' },
    ],
  },

  'SHBG (nmol/L)': {
    tagline: 'Sex hormone-binding globulin, the liver protein that sets how much testosterone stays free.',
    whatItIs:
      'SHBG is made in the liver and binds testosterone and estradiol with high affinity. Only the unbound fraction and the albumin-bound fraction are available to tissues. Insulin suppresses SHBG; hyperthyroidism, aging, and some anticonvulsants raise it. Because SHBG changes slowly, it is a metabolic marker as well as a carrier: low SHBG tracks insulin resistance and fatty liver.',
    whyItMatters:
      'Higher SHBG is associated with a lower risk of type 2 diabetes in men and women. The tradeoff is that a high SHBG lowers free testosterone for any given total. A low SHBG inflates free androgen index and can coexist with a “normal” total testosterone that is mostly not tightly bound, often in obesity. Interpreting total testosterone without SHBG misclassifies both groups.',
    optimalTarget:
      'Standard lab range is about 11.5–54.5 nmol/L; a practical male band often discussed is roughly 25–45 nmol/L, where free testosterone remains adequate and the metabolic signal is not one of insulin resistance.',
    nutritionHelps: [
      'Weight loss and better insulin sensitivity raise a suppressed SHBG.',
      'Thyroid hormone adequacy raises SHBG if hypothyroidism was suppressing it.',
      'There is no supplement that should be used to push SHBG above the range.',
    ],
    nutritionAvoid: [
      'A pattern that worsens insulin resistance (surplus energy, high fructose, inactivity) keeps SHBG low.',
      'Very-low-calorie crashes can shift sex hormones unpredictably and are not a SHBG strategy.',
    ],
    exerciseEffects: {
      chronic:
        'Training that improves insulin sensitivity tends to raise a low SHBG over weeks to months.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw does not meaningfully move SHBG. Its half-life is days, so one workout cannot change the binding capacity.',
    },
    lifestyleAndSupplements: [
      'Exogenous androgens and obesity both lower SHBG; hyperthyroidism raises it.',
      'Read SHBG with total and free testosterone, not as a standalone score to maximize.',
    ],
    citations: [
      { authors: 'Ding EL, Song Y, Manson JE, et al.', year: 2009, journal: 'New England Journal of Medicine',
        title: 'Sex hormone-binding globulin and risk of type 2 diabetes in women and men',
        finding: 'Higher SHBG predicted a lower risk of type 2 diabetes in both sexes.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Sex%20hormone-binding%20globulin%20and%20risk%20of%20type%202%20diabetes' },
      { authors: 'Hammond GL', year: 2011, journal: 'Biology of Reproduction',
        title: 'Diverse roles for sex hormone-binding globulin in reproduction',
        finding: 'SHBG regulates the free fraction of testosterone and estradiol, not just a passive carrier pool.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Diverse%20roles%20for%20sex%20hormone-binding%20globulin%20in%20reproduction' },
    ],
  },

  'Total Testosterone (ng/mL)': {
    tagline: 'All circulating testosterone, bound and free, best drawn in the morning at rest.',
    whatItIs:
      'Leydig cells make testosterone under LH. In blood most of it is bound to SHBG, a portion to albumin, and a small fraction is free. This panel reports ng/mL; multiply by 100 for the more familiar ng/dL, so 5.0 ng/mL is 500 ng/dL. The harmonized reference range for healthy nonobese men aged 19–39 is about 264–916 ng/dL (2.64–9.16 ng/mL). Morning samples are higher. Illness, poor sleep, obesity, and opioids suppress it.',
    whyItMatters:
      'Clearly low morning testosterone with symptoms and a low or inappropriately normal LH is hypogonadism and has evidence-based treatment criteria. Lower endogenous testosterone has been associated with higher mortality in meta-analyses, but the relationship is confounded by illness and obesity, and more is not linearly better. High testosterone from injections raises hematocrit, suppresses fertility, and can aromatize to estradiol. A single afternoon or post-illness level should not be used to diagnose.',
    optimalTarget:
      'Standard lab range is 2.64–9.16 ng/mL; many discussions of symptomatic men land near 5–8 ng/mL (500–800 ng/dL) on a rested morning draw, not the top of the range at any cost.',
    nutritionHelps: [
      'Weight loss in obesity often raises testosterone by improving LH signaling and lowering aromatization.',
      'Adequate dietary fat and energy availability support the axis in lean men who have been under-eating.',
      'Zinc and vitamin D repletion help only when those nutrients were deficient, not as boosters on top of sufficiency.',
    ],
    nutritionAvoid: [
      'Heavy regular alcohol intake lowers testosterone.',
      'A large calorie deficit with low fat intake can suppress the axis within weeks.',
    ],
    exerciseEffects: {
      chronic:
        'Resistance training supports the axis; chronic overreaching and low energy availability suppress testosterone.',
      acutePreDraw:
        'A gym session shortly before the draw can raise total testosterone for roughly 30–60 minutes after lifting, then it returns toward baseline. By the next morning the effect is gone, and a poor night of sleep after late training can leave it slightly lower.',
    },
    lifestyleAndSupplements: [
      'Treat sleep apnea; it is a common, reversible suppressor of testosterone.',
      'Confirm a low value with a second morning sample before any therapy discussion.',
    ],
    citations: [
      { authors: 'Travison TG, Vesper HW, Orwoll E, et al.', year: 2017, journal: 'Journal of Clinical Endocrinology and Metabolism',
        title: 'Harmonized reference ranges for circulating testosterone levels in men of four cohort studies in the United States and Europe',
        finding: 'Set a harmonized healthy young-male range of about 264–916 ng/dL.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Harmonized%20reference%20ranges%20for%20circulating%20testosterone%20levels%20in%20men' },
      { authors: 'Bhasin S, Brito JP, Cunningham GR, et al.', year: 2018, journal: 'Journal of Clinical Endocrinology and Metabolism',
        title: 'Testosterone therapy in men with hypogonadism: an Endocrine Society clinical practice guideline',
        finding: 'Diagnose hypogonadism with symptoms plus unequivocally low morning testosterone, confirmed by repeat testing.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Testosterone%20therapy%20in%20men%20with%20hypogonadism%20Endocrine%20Society' },
    ],
  },

  'Free Testosterone (nmol/L)': {
    tagline: 'The unbound testosterone fraction that can enter tissues, here in nmol/L.',
    whatItIs:
      'Free testosterone is the small share not bound to SHBG or albumin. This panel reports nmol/L; 0.2–0.6 nmol/L is about 200–600 pmol/L, a typical male free-testosterone span. Analog immunoassays are unreliable. The better estimates are equilibrium dialysis or a calculation from total testosterone, SHBG, and albumin (Vermeulen). Free testosterone falls when SHBG rises even if the testes are fine, and it can look adequate when total testosterone is low but SHBG is also low.',
    whyItMatters:
      'Symptoms of hypogonadism with a normal total testosterone and a clearly low free testosterone (high SHBG) are a recognized, if sometimes debated, treatment context. A high free testosterone from exogenous hormone carries the same erythrocytosis and fertility costs as a high total. Mortality data are stronger for clearly low endogenous androgens than for differences inside the mid-range.',
    optimalTarget:
      'Standard lab range is 0.198–0.619 nmol/L; values through the middle and upper half of that span are a practical target when symptoms are absent, not a mandate to exceed the range.',
    nutritionHelps: [
      'Weight loss raises total testosterone and can rebalance a low SHBG, which changes the free fraction in a favorable metabolic direction.',
      'Correcting hyperthyroidism, which raises SHBG, restores free testosterone if that was the cause.',
      'No food reliably increases free testosterone independent of the axis and SHBG.',
    ],
    nutritionAvoid: [
      'The same alcohol excess and starvation that lower total testosterone lower the free fraction.',
      'Crash diets that tank total testosterone are not offset by a lower SHBG in any useful way in the short term.',
    ],
    exerciseEffects: {
      chronic:
        'Sustainable resistance training supports free testosterone insofar as it supports total testosterone and insulin sensitivity.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw moves free testosterone only to the extent it moves total testosterone: a brief rise in the first hour after lifting, then a return toward baseline. SHBG does not change in that window.',
    },
    lifestyleAndSupplements: [
      'Prefer a calculated or dialysis free testosterone over a direct analog assay when the result will drive a decision.',
      'Sleep apnea treatment and a second morning test matter more than over-the-counter “free T” products.',
    ],
    citations: [
      { authors: 'Vermeulen A, Verdonck L, Kaufman JM', year: 1999, journal: 'Journal of Clinical Endocrinology and Metabolism',
        title: 'A critical evaluation of simple methods for the estimation of free testosterone in serum',
        finding: 'A calculation from total testosterone and SHBG matches equilibrium dialysis better than analog immunoassays.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=critical%20evaluation%20of%20simple%20methods%20for%20the%20estimation%20of%20free%20testosterone' },
      { authors: 'Goldman AL, Bhasin S, Wu FCW, et al.', year: 2017, journal: 'Endocrine Reviews',
        title: 'A reappraisal of testosterone binding in circulation: physiological and clinical implications',
        finding: 'Revisits free, albumin-bound, and SHBG-bound testosterone and which assays are fit for clinical use.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=reappraisal%20of%20testosterone%20binding%20in%20circulation' },
    ],
  },

  'Free Androgen Index': {
    tagline: 'A calculated ratio of total testosterone to SHBG, not a separate hormone.',
    whatItIs:
      'The free androgen index is total testosterone divided by SHBG, times 100. In this panel the formula converts ng/mL to nmol/L first (multiply by about 3.47) and then divides by SHBG. It was built as a simple stand-in for free testosterone. It works better in women, where testosterone is lower, than in men. When male SHBG is low, the index overestimates the free fraction compared with dialysis or the Vermeulen calculation.',
    whyItMatters:
      'A low index can mean low testicular output or a high SHBG binding up a normal total. Those are different problems. A high index in obesity often means low SHBG rather than unusually strong androgen production. Decisions about hypogonadism in men should not rest on the index alone. The panel range of about 35–93 is a laboratory reference, not proof that higher is safer.',
    optimalTarget:
      'Standard lab range is 35.0–92.6; treat a mid-to-upper value as reassuring only when total testosterone and SHBG are each acceptable, not as a number to maximize.',
    nutritionHelps: [
      'Weight loss that raises testosterone and normalizes a very low SHBG moves the index toward a more interpretable range.',
      'Adequate energy intake prevents a diet-driven fall in testosterone that would drop the index.',
      'There is no nutrient that improves the index without changing testosterone or SHBG.',
    ],
    nutritionAvoid: [
      'Alcohol excess and prolonged calorie deficit lower testosterone and therefore the index.',
      'A pattern that deepens insulin resistance lowers SHBG and can inflate the index while metabolic health worsens.',
    ],
    exerciseEffects: {
      chronic:
        'Training improves the index only through its effects on testosterone and on insulin-sensitive SHBG.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw can tick the index up during the brief post-lift testosterone rise, because SHBG stays flat. By the next day the index is back to the rested relationship of the two inputs.',
    },
    lifestyleAndSupplements: [
      'If the index and a calculated free testosterone disagree, trust the calculation or dialysis result.',
      'Do not use the index to titrate supplements or testosterone dose.',
    ],
    citations: [
      { authors: 'Vermeulen A, Verdonck L, Kaufman JM', year: 1999, journal: 'Journal of Clinical Endocrinology and Metabolism',
        title: 'A critical evaluation of simple methods for the estimation of free testosterone in serum',
        finding: 'The free androgen index is a rough ratio and a poorer match to dialysis free testosterone in men than a proper calculation.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=critical%20evaluation%20of%20simple%20methods%20for%20the%20estimation%20of%20free%20testosterone' },
      { authors: 'Morris PD, Malkin CJ, Channer KS, Jones TH', year: 2004, journal: 'European Journal of Endocrinology',
        title: 'A mathematical comparison of techniques to predict biologically available testosterone in a cohort of 1072 men',
        finding: 'Compared the free androgen index with other estimates and showed meaningful disagreement among methods in men.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=mathematical%20comparison%20of%20techniques%20to%20predict%20biologically%20available%20testosterone' },
    ],
  },

  'Estradiol (pg/mL)': {
    tagline: 'The main estrogen in men, made by aromatizing testosterone in fat, brain, and bone.',
    whatItIs:
      'Men produce estradiol by converting testosterone via aromatase, especially in adipose tissue. It binds estrogen receptors in bone, brain, liver, and vessels. This panel reports pg/mL with a male ceiling near 40. Sensitive assays are required; many female-range estradiol tests are too crude for male levels. Blocking aromatase drops estradiol and has measurable costs.',
    whyItMatters:
      'A controlled trial in men showed that estradiol, not only testosterone, defends bone, limits fat gain, and supports sexual function. Driving estradiol to zero is harmful. High estradiol suggests excess aromatization from adipose tissue or from exogenous testosterone, and it can accompany gynecomastia and a suppressed axis. The longevity pattern in men is a measurable mid-range value, not the lowest detectable number.',
    optimalTarget:
      'This lab flags estradiol at 39.8 pg/mL and above; a practical male window often discussed is about 20–35 pg/mL on a sensitive assay, with symptoms and bone context, not zero.',
    nutritionHelps: [
      'Fat loss reduces aromatase activity and brings a high estradiol down.',
      'Adequate zinc status is required for normal androgen metabolism, but zinc is not an aromatase-blocker strategy.',
      'Alcohol reduction helps when intake has been high enough to disturb the axis and the liver.',
    ],
    nutritionAvoid: [
      'Excess energy that expands adipose tissue raises aromatization.',
      'Alcohol excess is associated with a higher estradiol-to-androgen tone in men.',
    ],
    exerciseEffects: {
      chronic:
        'Training that reduces fat mass tends to lower a high estradiol toward the mid-range.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw does not meaningfully move estradiol. Aromatase conversion is too slow for one workout to shift the level.',
    },
    lifestyleAndSupplements: [
      'Do not use aromatase inhibitors to chase a lower estradiol; trial data show harm to bone and body composition.',
      'On testosterone therapy, measure estradiol with a sensitive male assay if symptoms suggest excess conversion.',
    ],
    citations: [
      { authors: 'Finkelstein JS, Lee H, Burnett-Bowie SAM, et al.', year: 2013, journal: 'New England Journal of Medicine',
        title: 'Gonadal steroids and body composition, strength, and sexual function in men',
        finding: 'Estrogen deficiency in men increased fat mass and impaired sexual function, separate from androgen deficiency.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Gonadal%20steroids%20and%20body%20composition%20strength%20and%20sexual%20function%20in%20men' },
      { authors: 'Cooke PS, Nanjappa MK, Ko C, Prins GS, Hess RA', year: 2017, journal: 'Physiological Reviews',
        title: 'Estrogens in male physiology',
        finding: 'Reviews aromatase, estrogen receptors, and essential roles of estradiol in the male skeleton, brain, and metabolism.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Estrogens%20in%20male%20physiology%20Cooke' },
    ],
  },

  // Vitamins
  'Vitamin B12 (pg/mL)': {
    tagline: 'A cobalt-containing cofactor for DNA synthesis and for myelin, stored for years in the liver.',
    whatItIs:
      'Vitamin B12 is absorbed in the terminal ileum after intrinsic factor from the stomach binds it. Animal foods are the dietary source. Stores last several years, so deficiency is slow. Serum B12 in pg/mL is a screening test with a wide reference range. Methylmalonic acid and homocysteine rise when tissue B12 is inadequate, sometimes while serum B12 is still inside the lab range, especially between about 200 and 400 pg/mL.',
    whyItMatters:
      'Deficiency causes megaloblastic anemia and, more importantly, neurologic injury that can be irreversible: neuropathy, ataxia, and cognitive change. High serum B12 is usually supplements or, less often, liver release or a myeloproliferative disorder. Metformin and proton-pump inhibitors reduce absorption over years. A value just above a floor of 211 pg/mL is not reassuring.',
    optimalTarget:
      'Standard lab range is 211–911 pg/mL; many clinicians want a working level above about 400–500 pg/mL, with methylmalonic acid if symptoms and a mid-range value disagree.',
    nutritionHelps: [
      'Meat, fish, eggs, and dairy are the reliable food sources.',
      'Fortified foods or a supplement are required on a vegan pattern; diet alone will not supply B12.',
      'Treating pernicious anemia needs injections or high-dose oral B12, not more steak, because intrinsic factor is missing.',
    ],
    nutritionAvoid: [
      'A long-term unsupplemented vegan diet depletes stores, just not in the first months.',
      'There is no food that “blocks” B12 the way tea blocks iron, but chronic PPI use and metformin are the practical absorption hits.',
    ],
    exerciseEffects: {
      chronic:
        'Training does not consume B12 stores in any meaningful way. A low level in an athlete is still diet, absorption, or a drug effect.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw does not meaningfully move serum B12. Stores and binding proteins do not shift with one workout.',
    },
    lifestyleAndSupplements: [
      'If you take metformin or a long-term acid suppressor, check B12 every few years.',
      'Oral cyanocobalamin or methylcobalamin corrects dietary deficiency; neurologic symptoms need a clinician, not a multivitamin guess.',
    ],
    citations: [
      { authors: 'Stabler SP', year: 2013, journal: 'New England Journal of Medicine',
        title: 'Vitamin B12 deficiency',
        finding: 'Serum B12 can miss tissue deficiency; methylmalonic acid confirms it, and neurologic disease can precede anemia.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Vitamin%20B12%20deficiency%20Stabler' },
      { authors: 'Green R, Allen LH, Bjørke-Monsen AL, et al.', year: 2017, journal: 'Nature Reviews Disease Primers',
        title: 'Vitamin B12 deficiency',
        finding: 'Reviews absorption, the limited dietary sources, and why cutoff values inside the reference range still matter.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Vitamin%20B12%20deficiency%20Green%20Nature%20Reviews' },
    ],
  },

  'Vitamin D (ng/mL)': {
    tagline: '25-hydroxyvitamin D, the storage form that reflects sun, diet, and supplements.',
    whatItIs:
      'Skin makes vitamin D3 from ultraviolet B, and diet or supplements add D3 or D2. The liver converts it to 25-hydroxyvitamin D, the form this panel measures in ng/mL, with a half-life of several weeks. The kidney then makes the active 1,25-dihydroxy hormone, which is not the screening test. 25-hydroxyvitamin D reflects supply. Obesity sequesters it in fat and lowers the measured level.',
    whyItMatters:
      'Deficiency impairs calcium absorption and causes osteomalacia, muscle weakness, and secondary hyperparathyroidism. The Institute of Medicine treated 20 ng/mL as sufficient for bone in most people; the Endocrine Society has used 30 ng/mL. Levels persistently above about 100–150 ng/mL with high calcium mark toxicity. Extra vitamin D beyond sufficiency has not clearly prevented cardiovascular disease or cancer in broad trials, so the target is repletion, not a maximum.',
    optimalTarget:
      'This panel flags values at or below 30 ng/mL; a practical band often discussed is about 30–50 ng/mL, with many longevity discussions extending toward 40–60 and avoiding levels above 80–100.',
    nutritionHelps: [
      'Fatty fish, egg yolks, and fortified dairy or plant milks are the few meaningful food sources.',
      'A daily supplement in the 600–2000 IU range is reasonable when sun is limited and the level is low, then recheck.',
      'Taking it with a meal that contains fat improves absorption.',
    ],
    nutritionAvoid: [
      'Megadose supplements taken without a level can overshoot into toxicity with hypercalcemia.',
      'There is no benefit to stacking high-dose vitamin D on top of an already sufficient level.',
    ],
    exerciseEffects: {
      chronic:
        'Outdoor training can raise vitamin D via sun on skin. The exercise itself does not synthesize it.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw does not meaningfully move 25-hydroxyvitamin D. The half-life is weeks.',
    },
    lifestyleAndSupplements: [
      'Recheck 8–12 weeks after a dose change; the level moves slowly.',
      'Latitude, season, skin pigment, sunscreen, and body fat explain most of the variation between people.',
    ],
    citations: [
      { authors: 'Holick MF', year: 2007, journal: 'New England Journal of Medicine',
        title: 'Vitamin D deficiency',
        finding: 'Reviews cutaneous synthesis, the 25-hydroxy storage form, and the skeletal consequences of deficiency.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Vitamin%20D%20deficiency%20Holick' },
      { authors: 'Holick MF, Binkley NC, Bischoff-Ferrari HA, et al.', year: 2011, journal: 'Journal of Clinical Endocrinology and Metabolism',
        title: 'Evaluation, treatment, and prevention of vitamin D deficiency: an Endocrine Society clinical practice guideline',
        finding: 'Endocrine Society guideline treating under 20 ng/mL as deficiency and 30 ng/mL or above as sufficiency.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Evaluation%20treatment%20and%20prevention%20of%20vitamin%20D%20deficiency%20Endocrine%20Society' },
    ],
  },

  // Iron studies
  'Iron (μg/dL)': {
    tagline: 'Iron bound to transferrin in the sample, a volatile snapshot rather than a store.',
    whatItIs:
      'Serum iron is the iron sitting on transferrin at the moment of the draw, reported here in µg/dL. It swings with the time of day (higher in the morning), with recent meals, with supplements taken that morning, and with any hemolysis that dumps hemoglobin iron into plasma. It is not ferritin and it is not total body iron. A single high or low value is weak evidence by itself.',
    whyItMatters:
      'Low serum iron with a high TIBC and a low ferritin is iron deficiency. Low serum iron with a low TIBC is anemia of inflammation. A high serum iron with a normal ferritin and a normal TIBC after training is usually transient hemolysis, not hemochromatosis. Hereditary hemochromatosis shows a persistently high transferrin saturation and a rising ferritin, not one spectacular serum iron.',
    optimalTarget:
      'Standard lab range is 65–175 µg/dL; a rested morning value roughly in the 70–150 band, next to a ferritin of about 50–150, is the interpretable healthy pattern.',
    nutritionHelps: [
      'Heme iron from meat and seafood is absorbed more reliably than plant iron when stores are low.',
      'Vitamin C with a plant-iron meal improves non-heme absorption.',
      'If the high iron is a one-off and ferritin is normal, no dietary iron restriction is required.',
    ],
    nutritionAvoid: [
      'Tea, coffee, and calcium taken with the iron-rich meal reduce non-heme absorption when you are trying to replete.',
      'Taking an iron supplement the morning of the draw will fake a high serum iron.',
    ],
    exerciseEffects: {
      chronic:
        'Foot-strike hemolysis and sweat iron losses in very high-mileage athletes can contribute to deficiency over months. Ordinary training does not.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw can spike serum iron for hours when intravascular hemolysis releases heme iron. Ferritin and TIBC that stay normal show it is not iron overload.',
    },
    lifestyleAndSupplements: [
      'Do not donate blood or start iron pills from a single serum iron. Use ferritin and saturation.',
      'A morning, fasted, rested draw is the only serum iron worth comparing over time.',
    ],
    citations: [
      { authors: 'Ganz T', year: 2013, journal: 'Physiological Reviews',
        title: 'Systemic iron homeostasis',
        finding: 'Serum iron is the transferrin-bound pool regulated by hepcidin, distinct from ferritin stores.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Systemic%20iron%20homeostasis%20Ganz' },
      { authors: 'Camaschella C', year: 2015, journal: 'New England Journal of Medicine',
        title: 'Iron-deficiency anemia',
        finding: 'Iron deficiency is diagnosed from ferritin and saturation, not from a lone serum iron.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Iron-deficiency%20anemia%20Camaschella' },
    ],
  },

  'TIBC (μg/dL)': {
    tagline: 'Total iron-binding capacity: how much iron transferrin could carry if every site were full.',
    whatItIs:
      'TIBC is a functional measure of transferrin, the liver protein that carries iron. Each transferrin holds up to two iron atoms. When stores fall, the liver makes more transferrin and TIBC rises. When inflammation, malnutrition, liver disease, or iron overload is present, transferrin synthesis falls and TIBC falls. TIBC changes over days, not hours. This panel reports µg/dL. UIBC is TIBC minus serum iron, and saturation is iron divided by TIBC.',
    whyItMatters:
      'A high TIBC supports iron deficiency even before anemia is severe. A low TIBC with a low serum iron supports anemia of chronic disease. A low TIBC with a high ferritin fits overload or inflammation. A normal, stable TIBC next to a wild serum iron means the iron swing is transient (hemolysis, a pill, diurnal variation), because the binding capacity did not change.',
    optimalTarget:
      'Standard lab range is 250–425 µg/dL; a mid-range value around 280–360 µg/dL, stable over time, is the expected healthy pattern.',
    nutritionHelps: [
      'Iron repletion slowly lowers a high TIBC as the liver stops overproducing transferrin.',
      'Adequate protein and energy intake keep transferrin from falling due to malnutrition.',
      'There is no food that should be used to push TIBC up or down directly.',
    ],
    nutritionAvoid: [
      'Chronic under-eating can lower transferrin and TIBC and mimic inflammation.',
      'Ignoring a high TIBC while drinking tea with every meal slows the iron repletion that would normalize it.',
    ],
    exerciseEffects: {
      chronic:
        'Training does not reset transferrin production. A rising TIBC over months in an athlete is still a deficiency signal.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw does not meaningfully move TIBC. Binding capacity stays put while serum iron may spike, which is why saturation and UIBC swing instead.',
    },
    lifestyleAndSupplements: [
      'Read TIBC with ferritin and serum iron; the trio separates deficiency, inflammation, and overload.',
      'Estrogen therapy can raise transferrin; inflammation does the opposite.',
    ],
    citations: [
      { authors: 'Wish JB', year: 2006, journal: 'Clinical Journal of the American Society of Nephrology',
        title: 'Assessing iron status: beyond serum ferritin and transferrin saturation',
        finding: 'TIBC and saturation distinguish iron deficiency from the low iron of inflammation.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Assessing%20iron%20status%20beyond%20serum%20ferritin%20and%20transferrin%20saturation' },
      { authors: 'Huebers HA, Finch CA', year: 1987, journal: 'Physiological Reviews',
        title: 'The physiology of transferrin and transferrin receptors',
        finding: 'Transferrin is the iron-binding protein whose concentration is what TIBC measures.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=The%20physiology%20of%20transferrin%20and%20transferrin%20receptors' },
    ],
  },

  'UIBC (μg/dL)': {
    tagline: 'Unsaturated iron-binding capacity: the empty seats left on transferrin.',
    whatItIs:
      'UIBC is TIBC minus serum iron, the reserve binding capacity that is not yet occupied. This panel calculates it that way. When serum iron is low and transferrin is high, UIBC is high: lots of empty seats, the deficiency pattern. When serum iron spikes or overload fills transferrin, UIBC collapses. It contains no extra biology beyond its two inputs, but it makes the empty-capacity story obvious.',
    whyItMatters:
      'A high UIBC supports iron deficiency alongside a low ferritin. A very low UIBC means transferrin is nearly saturated, which is either iron overload or a transient iron dump into a normal amount of transferrin. Treating a one-day low UIBC as hemochromatosis, without a high ferritin, is a mistake. Treating a chronically high UIBC as “good reserve” is also a mistake if ferritin is low.',
    optimalTarget:
      'Standard lab range is 125–345 µg/dL; a mid-range rested value is appropriate, and a collapsed UIBC is only meaningful if ferritin and TIBC say the iron is truly in excess.',
    nutritionHelps: [
      'Iron repletion fills empty sites gradually and brings a high UIBC down as TIBC also normalizes.',
      'Vitamin C with plant iron helps that repletion when deficiency is real.',
      'If UIBC is low only because serum iron spiked once, no dietary change is indicated.',
    ],
    nutritionAvoid: [
      'Iron inhibitors with meals (tea, coffee) slow correction of a high UIBC caused by deficiency.',
      'An iron pill the morning of the draw occupies sites and falsely lowers UIBC.',
    ],
    exerciseEffects: {
      chronic:
        'Training does not change unsaturated capacity except by slowly changing iron stores.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw can drop UIBC sharply if hemolysis raises serum iron while TIBC stays fixed. Empty seats look full for hours. Recheck at rest before any overload conclusion.',
    },
    lifestyleAndSupplements: [
      'Always pair a low UIBC with ferritin. Normal ferritin means the low UIBC is not stored iron overload.',
      'The number is derived, so a lab error in either iron or TIBC flows straight into it.',
    ],
    citations: [
      { authors: 'Huebers HA, Finch CA', year: 1987, journal: 'Physiological Reviews',
        title: 'The physiology of transferrin and transferrin receptors',
        finding: 'Transferrin has a fixed number of iron sites; unsaturated capacity is what remains after serum iron binds.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=The%20physiology%20of%20transferrin%20and%20transferrin%20receptors' },
      { authors: 'Wish JB', year: 2006, journal: 'Clinical Journal of the American Society of Nephrology',
        title: 'Assessing iron status: beyond serum ferritin and transferrin saturation',
        finding: 'Empty versus filled transferrin capacity separates deficiency from the iron restriction of inflammation.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Assessing%20iron%20status%20beyond%20serum%20ferritin%20and%20transferrin%20saturation' },
    ],
  },

  'Transferrin Sat (%)': {
    tagline: 'The percentage of transferrin sites that are currently holding iron.',
    whatItIs:
      'Transferrin saturation is serum iron divided by TIBC, times 100. This panel calculates it. Fasting morning values are preferred because serum iron varies. Saturation under about 20% with a low ferritin is iron deficiency. Saturation persistently above about 45% with a high ferritin is the screening pattern for hereditary hemochromatosis. A single very high saturation with a normal ferritin and a normal TIBC is not that pattern.',
    whyItMatters:
      'Saturation is the actionable iron number, more than raw serum iron. Guidelines use a repeated fasting saturation above 45%, plus ferritin, to decide on HFE genetic testing. Missing true overload leaves people exposed to liver and heart iron. Labeling a post-exercise spike as overload leads to needless worry and, worse, to inappropriate blood removal. Low saturation despite oral iron suggests ongoing blood loss, poor absorption, or inflammation (hepcidin).',
    optimalTarget:
      'Standard lab range is 20–50%; a rested fasting target often discussed is about 25–40%, with repeat testing before any diagnosis outside that band.',
    nutritionHelps: [
      'Heme iron plus vitamin C with meals raises a chronically low saturation when ferritin is low.',
      'Stopping tea and calcium at the iron-containing meal speeds that correction.',
      'No diet should be built to push saturation above the range.',
    ],
    nutritionAvoid: [
      'Daily high-dose iron when ferritin and saturation are already normal risks real overload.',
      'Alcohol worsens liver injury if true iron overload is present; it does not explain a one-hour post-workout spike.',
    ],
    exerciseEffects: {
      chronic:
        'Months of heavy foot-strike training can lower saturation if iron losses exceed intake. Ordinary gym training does not.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw can push saturation well above 50%, even above 80%, because serum iron rises and TIBC does not. A normal ferritin on that same draw means recheck fasted and rested, do not diagnose hemochromatosis.',
    },
    lifestyleAndSupplements: [
      'Confirm an abnormal saturation with a second fasting rested sample before genetic testing or phlebotomy.',
      'Inflammation can lower saturation via hepcidin even when ferritin looks normal or high.',
    ],
    citations: [
      { authors: 'Adams PC, Barton JC', year: 2010, journal: 'Blood',
        title: 'How I treat hemochromatosis',
        finding: 'A repeatedly high transferrin saturation with raised ferritin is the cue for HFE testing and, when indicated, phlebotomy.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=How%20I%20treat%20hemochromatosis%20Adams%20Barton' },
      { authors: 'Bacon BR, Adams PC, Kowdley KV, Powell LW, Tavill AS', year: 2011, journal: 'Hepatology',
        title: 'Diagnosis and management of hemochromatosis: 2011 practice guideline by the American Association for the Study of Liver Diseases',
        finding: 'AASLD recommends evaluating fasting transferrin saturation above 45% together with ferritin.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Diagnosis%20and%20management%20of%20hemochromatosis%202011%20practice%20guideline' },
    ],
  },

  'Ferritin (ng/mL)': {
    tagline: 'The blood reflection of stored iron, and also an acute-phase leakage protein.',
    whatItIs:
      'Ferritin is the intracellular iron-storage shell. A small amount leaks into blood in proportion to stores in the absence of inflammation. This panel reports ng/mL, equivalent to µg/L. Ferritin under about 30 ng/mL indicates depleted stores even when hemoglobin is still normal. Ferritin also rises with inflammation, fatty liver, alcohol, and cell injury, so a high value is not automatically excess iron. The WHO and hematology reviews treat the context (CRP, saturation, liver enzymes) as part of the test.',
    whyItMatters:
      'Low ferritin causes fatigue, restless legs, hair shedding, and eventually anemia, and it impairs training. High ferritin with a high transferrin saturation suggests hereditary or secondary iron overload and liver risk. High ferritin with a low saturation is inflammation or liver fat, and removing blood in that setting can cause deficiency. In men, a rested ferritin roughly between 50 and 150 ng/mL usually means enough stores without overload.',
    optimalTarget:
      'Standard lab range is 22–322 ng/mL; a longevity band often discussed for men is about 50–150 ng/mL, lower if saturation is high, and not below 30.',
    nutritionHelps: [
      'Heme iron and vitamin C with plant iron rebuild a ferritin under 30 over weeks to months.',
      'Finding and stopping occult blood loss (donation, gut, urine) matters more than the dose of iron.',
      'When ferritin is already in the 50–150 band, extra iron food or pills are unnecessary.',
    ],
    nutritionAvoid: [
      'Unmonitored iron supplements on top of a normal or high ferritin.',
      'Alcohol and a pattern that grows liver fat raise ferritin without adding useful iron stores.',
    ],
    exerciseEffects: {
      chronic:
        'Very high training volumes with poor iron intake can slowly lower ferritin. Resistance training itself is not an iron drain.',
      acutePreDraw:
        'A gym session 1–24 hours before the draw does not spike ferritin the way it spikes serum iron. Damaging exercise can raise ferritin as an acute-phase protein over 24–72 hours, so a draw the next day after a brutal eccentric session can look a bit higher than the true store.',
    },
    lifestyleAndSupplements: [
      'Pair ferritin with CRP or hs-CRP and with transferrin saturation before calling a high value overload.',
      'Oral iron every other day is often absorbed as well as daily dosing when you actually need repletion; confirm the need first.',
    ],
    citations: [
      { authors: 'Torti FM, Torti SV', year: 2002, journal: 'Blood',
        title: 'Regulation of ferritin genes and protein',
        finding: 'Ferritin synthesis is regulated by iron and by inflammation, which is why the blood level is not a pure store assay.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Regulation%20of%20ferritin%20genes%20and%20protein' },
      { authors: 'Kell DB, Pretorius E', year: 2014, journal: 'Metallomics',
        title: 'Serum ferritin is an important inflammatory disease marker, as it is mainly a leakage product from damaged cells',
        finding: 'Argues that much circulating ferritin is leaked from damaged cells, so it rises in inflammation as well as in iron overload.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Serum%20ferritin%20is%20an%20important%20inflammatory%20disease%20marker' },
    ],
  },

  // Tumor markers
  'Total PSA (ng/mL)': {
    tagline: 'Prostate-specific antigen, a kallikrein leaked into blood by prostate tissue, benign or malignant.',
    whatItIs:
      'PSA is a protease made by prostate epithelium to liquefy semen. A small amount reaches blood. Benign enlargement, prostatitis, ejaculation, cycling, and prostate cancer all raise it. This panel uses a ceiling of 2.0 ng/mL, stricter than the historical 4.0 ng/mL cutoff. Age matters: many clinicians use about 2.5 under age 50. 5-alpha-reductase inhibitors (finasteride, dutasteride) lower PSA by about half, so the value should be doubled for interpretation while on those drugs.',
    whyItMatters:
      'The ERSPC trial found fewer prostate-cancer deaths with PSA screening at the cost of overdiagnosis. Cancer also exists below 4.0 ng/mL, which is why a single “normal” cutoff is a poor rule. A rising velocity, a low percent free PSA, or a nodule matters more than one number just under or over a line. PSA is not a longevity vitamin to optimize downward with supplements.',
    optimalTarget:
      'This panel flags total PSA at 2.0 ng/mL and above; for many men under 50 a stable value well under 2.0 is reassuring, while any rise across serial tests needs context rather than a supplement.',
    nutritionHelps: [
      'A heart-healthy pattern may support prostate health indirectly; it does not replace PSA surveillance.',
      'Lycopene-rich tomato foods are studied for prostate biology with modest, inconsistent PSA effects.',
      'There is no food that should be used to drive PSA down before a test.',
    ],
    nutritionAvoid: [
      'No specific food falsely raises PSA the way ejaculation and cycling do.',
      'Do not take finasteride or saw palmetto to “improve” the number outside a clinical plan; the first changes the meaning of the test.',
    ],
    exerciseEffects: {
      chronic:
        'Regular training does not chronically reset PSA in a clinically useful way.',
      acutePreDraw:
        'A gym session, a long bike ride, or ejaculation in the 24–48 hours before the draw can raise total PSA. Skip cycling and ejaculation for two days before a PSA test, and repeat an unexpected rise at rest.',
    },
    lifestyleAndSupplements: [
      'Treat prostatitis or urinary infection and then repeat PSA; inflammation is a common reversible spike.',
      'Discuss screening interval and MRI with a clinician rather than acting on one value.',
    ],
    citations: [
      { authors: 'Thompson IM, Pauler DK, Goodman PJ, et al.', year: 2004, journal: 'New England Journal of Medicine',
        title: 'Prevalence of prostate cancer among men with a prostate-specific antigen level of 4.0 ng per milliliter or less',
        finding: 'Prostate cancer, including high-grade disease, was present at PSA levels under the historical 4.0 cutoff.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Prevalence%20of%20prostate%20cancer%20among%20men%20with%20a%20prostate-specific%20antigen%20level' },
      { authors: 'Schröder FH, Hugosson J, Roobol MJ, et al.', year: 2009, journal: 'New England Journal of Medicine',
        title: 'Screening and prostate-cancer mortality in a randomized European study',
        finding: 'PSA screening reduced prostate-cancer death in ERSPC and increased the detection of cancers that might never have presented.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Screening%20and%20prostate-cancer%20mortality%20in%20a%20randomized%20European%20study' },
    ],
  },

  'Free PSA (ng/mL)': {
    tagline: 'The unbound slice of PSA; useful mainly as a percentage of the total.',
    whatItIs:
      'PSA in blood is partly free and partly complexed to protease inhibitors. The free fraction, in ng/mL, is hard to interpret alone because a low free PSA can mean either a low total or a low percentage. The clinically used figure is percent free PSA: free divided by total, times 100. In the historical gray zone of total PSA (about 2–10 ng/mL, and in some series 4–10), a percent free PSA above about 25% favors benign tissue, and under about 10% raises the probability of cancer.',
    whyItMatters:
      'Percent free PSA improves specificity and can reduce unnecessary biopsies when total PSA is mildly elevated. A free PSA reported without the total, and without a reference range, is not a longevity marker to push up or down. Both free and total rise after mechanical stimulation of the prostate, so the percentage from a post-cycling draw is not reliable. This panel lists no numeric reference range for free PSA alone.',
    optimalTarget:
      'There is no standalone optimal free-PSA concentration; the target is a percent free PSA above about 25% when total PSA is in a biopsy gray zone, and a repeated rested pair if either value just moved.',
    nutritionHelps: [
      'No diet reliably raises the free fraction independent of prostate biology.',
      'The same general pattern that supports vascular health is reasonable and does not change how free PSA is read.',
      'Do not use foods or supplements to alter the number in the 48 hours before the test.',
    ],
    nutritionAvoid: [
      'There is no specific food that preferentially binds PSA.',
      'Starting or stopping a 5-alpha-reductase inhibitor between the free and total measurements makes the percentage meaningless.',
    ],
    exerciseEffects: {
      chronic:
        'Training does not set the free-to-total PSA relationship.',
      acutePreDraw:
        'A gym session that includes cycling, or ejaculation, in the 24–48 hours before the draw can raise free PSA along with total PSA. Draw both on a rested day so the percentage is interpretable.',
    },
    lifestyleAndSupplements: [
      'Always report free PSA as a percent of a simultaneous total PSA.',
      'A digital rectal exam shortly before the draw can also bump both values; schedule the blood test first.',
    ],
    citations: [
      { authors: 'Catalona WJ, Partin AW, Slawin KM, et al.', year: 1998, journal: 'JAMA',
        title: 'Use of the percentage of free prostate-specific antigen to enhance differentiation of prostate cancer from benign prostatic disease',
        finding: 'Percent free PSA improved the distinction between cancer and benign disease when total PSA was 4–10 ng/mL.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=percentage%20of%20free%20prostate-specific%20antigen%20to%20enhance%20differentiation%20of%20prostate%20cancer' },
      { authors: 'Lilja H, Ulmert D, Vickers AJ', year: 2008, journal: 'Nature Reviews Cancer',
        title: 'Prostate-specific antigen and prostate cancer: prediction, detection and monitoring',
        finding: 'Reviews total, free, and complexed PSA and why the free-to-total ratio outperforms free PSA alone.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Prostate-specific%20antigen%20and%20prostate%20cancer%20prediction%20detection%20and%20monitoring' },
    ],
  },
};

export function getBiomarkerScience(name: string): BiomarkerScienceEntry | null {
  return BIOMARKER_SCIENCE[name] ?? null;
}
