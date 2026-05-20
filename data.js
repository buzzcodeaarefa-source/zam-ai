// MedZamanti Clinical Database
// Contains: Drug Directory, Interaction Matrix, Pill Traits, and Symptom Flowchart

export const DRUGS_DB = [
  {
    id: "amoxicillin",
    name: "Amoxicillin",
    brand: "Amoxil, Moxatag",
    class: "Penicillin Antibiotic",
    description: "An antibiotic used to treat a wide variety of bacterial infections. It works by stopping the growth of bacteria.",
    indications: ["Strep throat", "Ear infections (Otitis Media)", "Pneumonia", "Sinusitis", "Urinary tract infections"],
    dosage: {
      adult: "500 mg to 875 mg orally every 12 hours, or 250 mg to 500 mg every 8 hours.",
      child: "20 to 45 mg/kg/day in divided doses every 8 to 12 hours, depending on infection severity."
    },
    sideEffects: ["Diarrhea", "Nausea", "Vomiting", "Skin rash or hives", "Yeast infection"],
    warnings: "Do not take if you have a known allergy to penicillin or cephalosporin antibiotics. Finish the entire prescribed course, even if symptoms disappear.",
    contraindications: ["Penicillin hypersensitivity", "Severe renal impairment (requires dose adjustment)", "Infectious mononucleosis (increases rash risk)"],
    foodInteractions: "Can be taken with or without food. Taking with food may reduce stomach upset.",
    pill: {
      color: "Blue/Pink",
      shape: "Capsule",
      imprint: "AMOX 500"
    }
  },
  {
    id: "ibuprofen",
    name: "Ibuprofen",
    brand: "Advil, Motrin, Nurofen",
    class: "Nonsteroidal Anti-inflammatory Drug (NSAID)",
    description: "A medication used for relieving pain, helping reduce fever, and reducing inflammation.",
    indications: ["Mild to moderate pain", "Fever reduction", "Osteoarthritis", "Rheumatoid arthritis", "Menstrual cramps"],
    dosage: {
      adult: "200 mg to 400 mg every 4 to 6 hours as needed. Maximum 1200 mg/day (OTC) or 3200 mg/day (prescription).",
      child: "10 mg/kg every 6 to 8 hours as needed. Maximum 4 doses per day."
    },
    sideEffects: ["Stomach pain", "Heartburn", "Nausea", "Dizziness", "Ringing in ears (tinnitus)"],
    warnings: "May increase the risk of serious cardiovascular thrombotic events, myocardial infarction, and stroke. Can cause severe gastrointestinal bleeding, ulceration, and perforation.",
    contraindications: ["Active gastrointestinal bleeding or peptic ulcer", "Severe heart failure", "Severe renal impairment", "Third trimester of pregnancy", "Coronary artery bypass graft (CABG) surgery peri-operative period"],
    foodInteractions: "Should ideally be taken with food or milk to minimize stomach irritation. Avoid alcohol, as it increases the risk of stomach bleeding.",
    pill: {
      color: "Brown",
      shape: "Round",
      imprint: "I-2"
    }
  },
  {
    id: "paracetamol",
    name: "Paracetamol (Acetaminophen)",
    brand: "Tylenol, Panadol, Calpol",
    class: "Analgesic & Antipyretic",
    description: "A medication used to treat pain and fever. Unlike NSAIDs, it does not have significant anti-inflammatory effects.",
    indications: ["Mild to moderate pain", "Headache", "Muscle aches", "Toothache", "Fever reduction"],
    dosage: {
      adult: "325 mg to 1000 mg every 4 to 6 hours. Do not exceed 4000 mg (4g) in a 24-hour period.",
      child: "10 to 15 mg/kg per dose every 4 to 6 hours. Do not exceed 5 doses (75 mg/kg) in 24 hours."
    },
    sideEffects: ["Nausea (rare)", "Stomach pain (rare)", "Allergic skin rash (very rare)", "Liver damage (in overdose)"],
    warnings: "Severe liver damage may occur if you take more than the maximum daily amount, take it with other drugs containing acetaminophen, or consume 3 or more alcoholic drinks daily.",
    contraindications: ["Severe hepatic impairment or active liver disease", "Hypersensitivity to acetaminophen"],
    foodInteractions: "Can be taken with or without food. Avoid alcohol due to increased risk of hepatotoxicity (liver damage).",
    pill: {
      color: "White",
      shape: "Oval",
      imprint: "TYLENOL 500"
    }
  },
  {
    id: "aspirin",
    name: "Aspirin (Acetylsalicylic Acid)",
    brand: "Bayer, Ecotrin",
    class: "NSAID / Antiplatelet Agent",
    description: "Used to reduce pain, fever, or inflammation, and as an antiplatelet agent to prevent blood clots and heart attacks.",
    indications: ["Pain and fever relief", "Acute myocardial infarction (heart attack) prevention", "Ischemic stroke prevention", "Rheumatoid arthritis"],
    dosage: {
      adult: "Pain/Fever: 325 mg to 650 mg every 4 hours. Heart Attack Prevention: 81 mg (baby aspirin) to 325 mg daily.",
      child: "Generally NOT recommended for children due to the risk of Reye's syndrome."
    },
    sideEffects: ["Dyspepsia (indigestion)", "Stomach ulcers", "Increased bleeding tendency", "Bruising", "Tinnitus"],
    warnings: "Do not give to children or teenagers with fever, flu symptoms, or chickenpox due to risk of Reye's Syndrome (a rare but serious liver/brain condition). Can trigger asthma attacks in sensitive individuals.",
    contraindications: ["Aspirin-induced asthma", "Bleeding disorders (Hemophilia, active GI bleeding)", "Children under 19 with viral infections", "Severe renal or hepatic failure"],
    foodInteractions: "Take with food to minimize GI irritation. Avoid alcohol as it compounds GI bleeding risks.",
    pill: {
      color: "White",
      shape: "Round",
      imprint: "BAYER"
    }
  },
  {
    id: "metformin",
    name: "Metformin",
    brand: "Glucophage, Fortamet, Glumetza",
    class: "Biguanide Antidiabetic",
    description: "The first-line medication for the treatment of type 2 diabetes. It works by reducing glucose production in the liver and improving insulin sensitivity.",
    indications: ["Type 2 Diabetes Mellitus", "Gestational diabetes", "Polycystic ovary syndrome (PCOS) (off-label)"],
    dosage: {
      adult: "Starting dose is usually 500 mg twice daily or 850 mg once daily, titrated up to a maximum of 2000 mg to 2550 mg daily in divided doses.",
      child: "Children 10+ years: Starting dose 500 mg twice daily. Maximum 2000 mg daily."
    },
    sideEffects: ["Diarrhea", "Nausea and vomiting", "Abdominal bloating or gas", "Metallic taste in mouth", "Vitamin B12 deficiency (long term)"],
    warnings: "Lactic Acidosis is a rare but serious metabolic complication that can occur due to metformin accumulation. Symptoms include deep rapid breathing, severe drowsiness, muscle pain, and cold extremities.",
    contraindications: ["Severe renal impairment (eGFR < 30 mL/min/1.73m²)", "Acute or chronic metabolic acidosis (including diabetic ketoacidosis)", "Severe liver disease or alcohol abuse"],
    foodInteractions: "Take with meals to reduce gastrointestinal side effects. Avoid excessive alcohol intake, as it increases the risk of lactic acidosis.",
    pill: {
      color: "White",
      shape: "Oval",
      imprint: "G 500"
    }
  },
  {
    id: "atorvastatin",
    name: "Atorvastatin",
    brand: "Lipitor",
    class: "HMG-CoA Reductase Inhibitor (Statin)",
    description: "Used to prevent cardiovascular disease in those at high risk and lower lipid levels (cholesterol and triglycerides).",
    indications: ["Hypercholesterolemia", "Prevention of cardiovascular disease (heart attack, stroke)"],
    dosage: {
      adult: "10 mg to 80 mg orally once daily, taken at any time of day, with or without food.",
      child: "Pediatric (10-17 years): 10 mg to 20 mg once daily."
    },
    sideEffects: ["Myalgia (muscle pain)", "Joint pain", "Diarrhea", "Common cold symptoms (nasopharyngitis)", "Elevated liver enzymes"],
    warnings: "Can cause myopathy, characterized by unexplained muscle pain, tenderness, or weakness. Rarely, this can progress to rhabdomyolysis (muscle breakdown causing kidney injury). Contact doctor immediately if unexplained muscle pain occurs.",
    contraindications: ["Active liver disease", "Pregnancy (known teratogen - fetal harm)", "Breastfeeding", "Hypersensitivity to statins"],
    foodInteractions: "Avoid large quantities of grapefruit juice (more than 1.2 liters daily), as it blocks enzymes that break down atorvastatin, raising drug levels in the blood.",
    pill: {
      color: "White",
      shape: "Round",
      imprint: "PD 155"
    }
  },
  {
    id: "lisinopril",
    name: "Lisinopril",
    brand: "Prinivil, Zestril",
    class: "ACE Inhibitor",
    description: "An Angiotensin-Converting Enzyme (ACE) inhibitor used to treat high blood pressure, heart failure, and to improve survival after a heart attack.",
    indications: ["Hypertension (High Blood Pressure)", "Heart Failure (adjunct)", "Post-Myocardial Infarction recovery"],
    dosage: {
      adult: "Hypertension: Starting dose 10 mg once daily, titrated to maintenance of 20-40 mg daily. Heart Failure: 5 mg to 40 mg daily.",
      child: "Children 6+ years: Starting dose 0.07 mg/kg once daily up to 5 mg/day."
    },
    sideEffects: ["Dry cough (chronic)", "Dizziness", "Headache", "Fatigue", "Hyperkalemia (high blood potassium)"],
    warnings: "Angioedema (life-threatening swelling of face, lips, tongue, or airway) can occur at any time during treatment. Discontinue immediately if this happens. Can cause injury or death to the developing fetus; discontinue immediately if pregnant.",
    contraindications: ["History of ACE inhibitor-induced angioedema", "Pregnancy", "Concomitant use of aliskiren in diabetic patients", "Concomitant use of sacubitril/valsartan within 36 hours"],
    foodInteractions: "Can be taken with or without food. Avoid potassium-containing salt substitutes or potassium supplements without consulting a doctor.",
    pill: {
      color: "Pink",
      shape: "Round",
      imprint: "LUPIN 10"
    }
  },
  {
    id: "albuterol",
    name: "Albuterol (Salbutamol)",
    brand: "ProAir HFA, Ventolin HFA, Proventil",
    class: "Beta-2 Adrenergic Agonist (Bronchodilator)",
    description: "A fast-acting rescue inhaler used to prevent and treat wheezing and shortness of breath caused by lung diseases such as asthma and COPD.",
    indications: ["Asthma exacerbations (acute bronchospasm)", "Exercise-induced bronchospasm prevention", "Chronic obstructive pulmonary disease (COPD)"],
    dosage: {
      adult: "Acute relief: 2 puffs every 4 to 6 hours as needed. Exercise prevention: 2 puffs 15 to 30 minutes before exercise.",
      child: "Children 4+ years: Same as adult dosage."
    },
    sideEffects: ["Tremor (especially hands)", "Nervousness or anxiety", "Rapid heart rate (tachycardia)", "Headache", "Throat irritation"],
    warnings: "Overuse of rescue inhalers (more than 2 days per week, excluding exercise prevention) indicates poorly controlled asthma; contact your doctor. Paradoxical bronchospasm (sudden worsening of breathing) can occur and is life-threatening.",
    contraindications: ["Hypersensitivity to albuterol or severe milk protein allergy (for dry-powder inhalers)"],
    foodInteractions: "None significant. Limit caffeine intake if you experience severe tremors or rapid heart rate.",
    pill: {
      color: "Blue",
      shape: "Inhaler",
      imprint: "VENTOLIN"
    }
  },
  {
    id: "omeprazole",
    name: "Omeprazole",
    brand: "Prilosec, Losec",
    class: "Proton Pump Inhibitor (PPI)",
    description: "Used to treat symptoms of gastroesophageal reflux disease (GERD) and other conditions caused by excess stomach acid. It works by blocking acid-producing pumps in the stomach.",
    indications: ["Gastroesophageal Reflux Disease (GERD)", "Heartburn", "Peptic Ulcer Disease", "Zollinger-Ellison syndrome", "H. pylori eradication (adjunct)"],
    dosage: {
      adult: "20 mg to 40 mg orally once daily, taken 30 to 60 minutes before a meal.",
      child: "Dosed by weight; typically 10 mg to 20 mg once daily for GERD in children."
    },
    sideEffects: ["Headache", "Abdominal pain", "Nausea", "Diarrhea", "Flatulence (gas)"],
    warnings: "Long-term use (over 1 year) may increase the risk of bone fractures (osteoporosis-related), vitamin B-12 deficiency, low magnesium (hypomagnesemia), and Clostridioides difficile-associated diarrhea.",
    contraindications: ["Hypersensitivity to proton pump inhibitors", "Concomitant use of rilpivirine-containing products"],
    foodInteractions: "Take 30-60 minutes before the first meal of the day (usually breakfast) for maximum effectiveness.",
    pill: {
      color: "Purple",
      shape: "Capsule",
      imprint: "PRILOSEC 20"
    }
  },
  {
    id: "cetirizine",
    name: "Cetirizine",
    brand: "Zyrtec",
    class: "Second-Generation Antihistamine",
    description: "An antihistamine used to relieve allergy symptoms such as watery eyes, runny nose, itching eyes/nose, sneezing, and hives.",
    indications: ["Seasonal allergic rhinitis", "Perennial allergic rhinitis", "Chronic urticaria (hives)"],
    dosage: {
      adult: "5 mg to 10 mg orally once daily. Maximum 10 mg/day.",
      child: "Children 2-5 years: 2.5 mg to 5 mg daily. Children 6+ years: 5 mg to 10 mg daily."
    },
    sideEffects: ["Drowsiness (mild, but more than other 2nd-gen antihistamines)", "Dry mouth", "Fatigue", "Dizziness", "Sore throat"],
    warnings: "May cause drowsiness. Avoid driving or operating machinery until you know how it affects you. Avoid alcohol or other central nervous system depressants, as they can cause additive impairment.",
    contraindications: ["Hypersensitivity to cetirizine, hydroxyzine, or levocetirizine", "Severe renal impairment (creatinine clearance < 10 mL/min)"],
    foodInteractions: "Can be taken with or without food. Avoid alcohol.",
    pill: {
      color: "White",
      shape: "Oval",
      imprint: "ZYRTEC"
    }
  },
  {
    id: "warfarin",
    name: "Warfarin",
    brand: "Coumadin, Jantoven",
    class: "Vitamin K Antagonist (Anticoagulant)",
    description: "A blood thinner used to prevent and treat blood clots in veins or arteries, which can reduce the risk of stroke, heart attack, or other serious conditions.",
    indications: ["Deep vein thrombosis (DVT)", "Pulmonary embolism (PE)", "Atrial fibrillation (Afib) thromboembolism prevention", "Prosthetic heart valves"],
    dosage: {
      adult: "Highly individualized, based on International Normalized Ratio (INR) blood test. Typically starts at 2 mg to 5 mg once daily, adjusted regularly.",
      child: "Strictly specialist pediatric dosing, based on INR targets."
    },
    sideEffects: ["Bleeding (minor nosebleeds, gum bleeding)", "Easy bruising", "Nausea", "Pale skin (from blood loss)"],
    warnings: "Can cause major, fatal bleeding. Regular blood monitoring (INR test) is mandatory. Watch for signs of internal bleeding: blood in urine, black tarry stools, coughing up blood, or severe headache.",
    contraindications: ["Active severe bleeding", "Pregnancy (except in high-risk women with mechanical heart valves)", "Severe uncontrolled hypertension", "Bacterial endocarditis", "Recent or upcoming surgery of brain or eye"],
    foodInteractions: "Maintain a consistent intake of Vitamin K-rich foods (e.g. spinach, kale, broccoli, green tea), as sudden dietary changes can dramatically alter warfarin's effectiveness. Avoid alcohol.",
    pill: {
      color: "Peach",
      shape: "Round",
      imprint: "COUMADIN 5"
    }
  },
  {
    id: "nitroglycerin",
    name: "Nitroglycerin",
    brand: "Nitrostat, Nitrolingual",
    class: "Vasodilator / Nitrate",
    description: "A medicine used to prevent or treat chest pain (angina). It works by relaxing and widening blood vessels so blood can flow more easily to the heart.",
    indications: ["Acute Angina Pectoris (chest pain) relief", "Angina prophylaxis (prevention before exertion)"],
    dosage: {
      adult: "1 sublingual tablet dissolved under tongue or cheek at first sign of angina. May repeat every 5 minutes up to 3 tablets in 15 minutes. Call emergency if pain persists after 1 dose.",
      child: "Not approved/recommended for children."
    },
    sideEffects: ["Severe headache (throbbing)", "Flushing (redness of face/neck)", "Dizziness or lightheadedness", "Low blood pressure (orthostatic hypotension)"],
    warnings: "Sit down before taking this medication, as it can cause sudden dizziness and low blood pressure. If chest pain is not relieved or worsens after the first tablet, call emergency services immediately.",
    contraindications: ["Concomitant use of PDE-5 inhibitors (e.g. sildenafil, tadalafil) within 24-48 hours", "Severe anemia", "Increased intracranial pressure", "Hypersensitivity to nitrates"],
    foodInteractions: "Do not drink alcohol, as it can increase the risk of low blood pressure, dizziness, and fainting.",
    pill: {
      color: "White",
      shape: "Round",
      imprint: "N 0.4"
    }
  },
  {
    id: "sildenafil",
    name: "Sildenafil",
    brand: "Viagra, Revatio",
    class: "Phosphodiesterase-5 (PDE-5) Inhibitor",
    description: "Used to treat erectile dysfunction (ED) and pulmonary arterial hypertension (PAH). It relaxes blood vessels, increasing blood flow.",
    indications: ["Erectile Dysfunction (ED)", "Pulmonary Arterial Hypertension (PAH)"],
    dosage: {
      adult: "ED: 50 mg orally once daily as needed, 1 hour before sexual activity (range 25 mg to 100 mg). PAH: 20 mg three times daily.",
      child: "PAH: Dosed by specialist weight calculations."
    },
    sideEffects: ["Headache", "Flushing", "Indigestion (dyspepsia)", "Nasal congestion", "Visual color distortion (blue tint)"],
    warnings: "Never take with nitroglycerin or other nitrates due to the risk of a sudden, life-threatening drop in blood pressure. Contact emergency services if an erection lasts longer than 4 hours (priapism).",
    contraindications: ["Concomitant use of organic nitrates", "Concomitant use of soluble guanylate cyclase (sGC) stimulators (e.g., riociguat)", "Hypersensitivity to sildenafil"],
    foodInteractions: "High-fat meals can delay the absorption and onset of sildenafil. Avoid grapefruit juice. Limit alcohol.",
    pill: {
      color: "Blue",
      shape: "Diamond",
      imprint: "VGR 50"
    }
  },
  {
    id: "spironolactone",
    name: "Spironolactone",
    brand: "Aldactone",
    class: "Potassium-Sparing Diuretic / Aldosterone Antagonist",
    description: "A water pill that prevents your body from absorbing too much salt and keeps your potassium levels from getting too low.",
    indications: ["Heart Failure", "Hypertension", "Edema (fluid retention)", "Primary Hyperaldosteronism", "Acne/Hirsutism in women (off-label)"],
    dosage: {
      adult: "Heart Failure: 12.5 mg to 25 mg once daily. Hypertension/Edema: 25 mg to 100 mg daily in single or divided doses.",
      child: "Pediatric edema: 1 to 3.3 mg/kg/day in single or divided doses."
    },
    sideEffects: ["Hyperkalemia (high potassium)", "Gynecomastia (breast swelling in men)", "Irregular menstruation", "Dehydration", "Dizziness"],
    warnings: "Can cause dangerously high potassium levels (hyperkalemia), which can lead to life-threatening heart rhythm issues. Regular monitoring of blood potassium and kidney function is essential.",
    contraindications: ["Anuria (absence of urine production)", "Acute or severe renal impairment (eGFR < 30 mL/min)", "Hyperkalemia", "Addison's disease"],
    foodInteractions: "Take consistently either with or without food. Avoid potassium supplements, salt substitutes containing potassium, and high-potassium foods (bananas, oranges, leafy greens) in large amounts.",
    pill: {
      color: "White",
      shape: "Round",
      imprint: "ALDACTONE 25"
    }
  },
  {
    id: "sertraline",
    name: "Sertraline",
    brand: "Zoloft",
    class: "Selective Serotonin Reuptake Inhibitor (SSRI) Antidepressant",
    description: "An antidepressant used to treat depression, anxiety, OCD, PTSD, and panic attacks by restoring the balance of serotonin in the brain.",
    indications: ["Major Depressive Disorder (MDD)", "Obsessive-Compulsive Disorder (OCD)", "Panic Disorder", "Social Anxiety Disorder", "Post-Traumatic Stress Disorder (PTSD)"],
    dosage: {
      adult: "Starting dose is 25 mg to 50 mg once daily, increased weekly up to a maximum of 200 mg daily.",
      child: "OCD (6-12 years): 25 mg daily. OCD (13-17 years): 50 mg daily. Maximum 200 mg daily."
    },
    sideEffects: ["Nausea", "Insomnia or somnolence", "Sexual dysfunction", "Dry mouth", "Increased sweating", "Tremor"],
    warnings: "Antidepressants may increase the risk of suicidal thoughts and behaviors in children, teenagers, and young adults. Watch closely for mood swings or worsening depression. Do not stop taking abruptly; consult a doctor to taper off.",
    contraindications: ["Concomitant use of Monoamine Oxidase Inhibitors (MAOIs) within 14 days", "Concomitant use of pimozide or disulfiram (with sertraline liquid formula)"],
    foodInteractions: "Can be taken with or without food. Avoid alcohol. Avoid grapefruit juice, as it can increase drug concentrations.",
    pill: {
      color: "Yellow",
      shape: "Oval",
      imprint: "Zoloft 50"
    }
  },
  {
    id: "tramadol",
    name: "Tramadol",
    brand: "Ultram, ConZip",
    class: "Synthetic Opioid Analgesic",
    description: "A prescription opioid medication used to treat moderate to moderately severe pain. It also has mild serotonin and norepinephrine reuptake inhibition.",
    indications: ["Moderate to moderately severe pain (acute or chronic)"],
    dosage: {
      adult: "50 mg to 100 mg orally every 4 to 6 hours as needed. Maximum 400 mg daily (or 300 mg daily for elderly).",
      child: "Contraindicated in children under 12 years of age; also contraindicated in children under 18 following tonsillectomy."
    },
    sideEffects: ["Dizziness", "Drowsiness or sleepiness", "Constipation", "Nausea and vomiting", "Headache"],
    warnings: "High risk of addiction, abuse, and misuse. Serious, life-threatening breathing problems (respiratory depression) can occur. Risk of Serotonin Syndrome when combined with other serotonergic medications.",
    contraindications: ["Children under 12", "Children under 18 post-tonsillectomy/adenoidectomy", "Severe asthma or respiratory depression", "Known or suspected gastrointestinal obstruction (paralytic ileus)", "Concomitant MAOI use in past 14 days"],
    foodInteractions: "Can be taken with or without food. Strictly avoid alcohol, as it can lead to fatal respiratory depression, extreme sedation, and coma.",
    pill: {
      color: "White",
      shape: "Round",
      imprint: "ULTRAM"
    }
  },
  {
    id: "clopidogrel",
    name: "Clopidogrel",
    brand: "Plavix",
    class: "Antiplatelet Agent / P2Y12 Inhibitor",
    description: "An oral antiplatelet medication that prevents platelets from sticking together and forming harmful blood clots in arteries.",
    indications: ["Recent stroke or heart attack", "Peripheral arterial disease", "Acute Coronary Syndrome (ACS) (usually dual therapy with aspirin)", "After coronary stent placement"],
    dosage: {
      adult: "75 mg orally once daily. (A loading dose of 300 mg to 600 mg is often given initially in acute situations).",
      child: "Safety and efficacy not established in pediatric patients."
    },
    sideEffects: ["Bleeding (nosebleeds, heavy bruising, GI bleeding)", "Itching", "Purpura (red/purple spots on skin)"],
    warnings: "If you are having surgery (including dental procedures), tell your doctor/dentist you take clopidogrel; it may need to be stopped 5 days prior. Report unusual or prolonged bleeding or blood in stools/urine.",
    contraindications: ["Active pathological bleeding (e.g. peptic ulcer, intracranial hemorrhage)", "Hypersensitivity to clopidogrel"],
    foodInteractions: "Can be taken with or without food. Avoid alcohol due to increased bleeding risk.",
    pill: {
      color: "Pink",
      shape: "Round",
      imprint: "75"
    }
  },
  {
    id: "prednisone",
    name: "Prednisone",
    brand: "Deltasone, Rayos",
    class: "Corticosteroid",
    description: "A powerful anti-inflammatory and immunosuppressant medication used to treat a wide variety of inflammatory, allergic, and autoimmune conditions.",
    indications: ["Asthma/COPD exacerbations", "Severe allergic reactions", "Rheumatoid arthritis", "Inflammatory Bowel Disease (Crohn's, Ulcerative Colitis)", "Lupus", "Immuno-suppressive therapy"],
    dosage: {
      adult: "Highly variable; ranges from 5 mg to 60 mg daily, adjusted based on the specific disease and response.",
      child: "Dosed by weight/condition; typically 1 to 2 mg/kg/day in single or divided doses for acute asthma."
    },
    sideEffects: ["Increased appetite and weight gain", "Fluid retention (puffiness in face - 'moon face')", "Insomnia and mood changes (irritability, anxiety)", "Increased blood sugar (hyperglycemia)", "Increased susceptibility to infections"],
    warnings: "Do not stop taking prednisone suddenly if you have used it for more than a couple of weeks, as this can cause acute adrenal insufficiency (severe fatigue, low blood pressure, dizziness). Must be tapered off under a doctor's supervision.",
    contraindications: ["Systemic fungal infections", "Administration of live or live-attenuated vaccines while on immunosuppressive doses", "Hypersensitivity"],
    foodInteractions: "Take with food or milk to prevent stomach irritation. Avoid alcohol as it increases gastric ulcer risks.",
    pill: {
      color: "White",
      shape: "Round",
      imprint: "5"
    }
  }
];

export const INTERACTIONS_DB = [
  {
    drug1: "warfarin",
    drug2: "aspirin",
    severity: "severe",
    title: "Increased Bleeding Risk (Anticoagulant + Antiplatelet)",
    description: "Combining aspirin (an antiplatelet) with warfarin (an anticoagulant) significantly increases the risk of serious, potentially life-threatening bleeding (including gastrointestinal and intracranial bleeding). This combination should only be used if specifically prescribed by a physician, such as after heart valve surgeries or stent placements, under close clinical monitoring."
  },
  {
    drug1: "warfarin",
    drug2: "ibuprofen",
    severity: "severe",
    title: "Increased Gastrointestinal & Systemic Bleeding Risk",
    description: "NSAIDs like ibuprofen can irritate the stomach lining and impair platelet aggregation, which, when combined with the anticoagulant effects of warfarin, dramatically increases the risk of severe stomach ulcers and internal bleeding. Use paracetamol (acetaminophen) for pain relief instead, keeping the dose below 2g/day."
  },
  {
    drug1: "lisinopril",
    drug2: "spironolactone",
    severity: "moderate",
    title: "Risk of Hyperkalemia (High Potassium Levels)",
    description: "Both lisinopril (an ACE inhibitor) and spironolactone (a potassium-sparing diuretic) cause the kidneys to retain potassium. Using them together increases the risk of hyperkalemia, which can cause dangerous, life-threatening heart arrhythmias. Regular monitoring of serum potassium levels and kidney function is essential."
  },
  {
    drug1: "ibuprofen",
    drug2: "aspirin",
    severity: "moderate",
    title: "Decreased Aspirin Cardioprotection / Increased Gastric Risk",
    description: "Ibuprofen can block the binding of low-dose aspirin to platelets, preventing aspirin from thinning the blood and reducing its heart protection. Additionally, taking both increases the risk of stomach ulcers. If both must be used, take ibuprofen at least 8 hours before or 30 minutes after low-dose aspirin."
  },
  {
    drug1: "nitroglycerin",
    drug2: "sildenafil",
    severity: "severe",
    title: "Critical, Life-Threatening Blood Pressure Drop",
    description: "Nitroglycerin dilates blood vessels, and sildenafil amplifies this effect. Combining them can lead to a sudden, severe, and irreversible drop in blood pressure (profound hypotension), causing fainting, heart attack, or death. Sildenafil must NOT be taken within 24 hours of using nitroglycerin (48 hours for tadalafil)."
  },
  {
    drug1: "sertraline",
    drug2: "tramadol",
    severity: "severe",
    title: "Risk of Serotonin Syndrome",
    description: "Both sertraline (an SSRI antidepressant) and tramadol (an opioid that also raises serotonin) increase serotonin levels in the brain. Taking them together can trigger Serotonin Syndrome, a rare but life-threatening emergency characterized by high fever, confusion, rapid heart rate, shivering, sweating, muscle rigidity, and seizures."
  },
  {
    drug1: "clopidogrel",
    drug2: "omeprazole",
    severity: "moderate",
    title: "Reduced Antiplatelet Efficacy of Clopidogrel",
    description: "Omeprazole blocks the liver enzyme (CYP2C19) that converts clopidogrel into its active form, making clopidogrel less effective at preventing blood clots. This increases the risk of heart attacks or strokes in stent patients. Consider alternative acid reducers like famotidine or pantoprazole."
  },
  {
    drug1: "lisinopril",
    drug2: "ibuprofen",
    severity: "moderate",
    title: "Reduced Blood Pressure Control & Risk of Kidney Injury",
    description: "NSAIDs like ibuprofen can cause fluid retention and constrict blood vessels in the kidneys. This reduces the blood pressure-lowering effect of lisinopril and increases the risk of acute kidney injury, especially in elderly patients, those with existing renal dysfunction, or dehydrated individuals."
  },
  {
    drug1: "prednisone",
    drug2: "ibuprofen",
    severity: "moderate",
    title: "Increased Gastrointestinal Ulceration & Bleeding",
    description: "Both corticosteroids (prednisone) and NSAIDs (ibuprofen) can cause gastric mucosal irritation and damage. Taking them together significantly increases the risk of developing stomach ulcers, stomach pain, or gastrointestinal bleeding. Consider stomach-protective agents like PPIs if co-administration is necessary."
  }
];

export const SYMPTOM_FLOWCHART = {
  start: {
    question: "Select your primary symptom group:",
    options: [
      { text: "Chest Pain / Breathing Difficulty", next: "chest_pain" },
      { text: "Fever / Infection Symptoms", next: "fever" },
      { text: "Severe Headache or Neurological Symptoms", next: "headache" },
      { text: "Abdominal / Stomach Pain", next: "abdominal" },
      { text: "Minor Common Cold / Cough", next: "cold" }
    ]
  },
  
  // Chest Pain Path
  chest_pain: {
    question: "Is the chest pain accompanied by crushing pressure, pain radiating to the left arm or jaw, shortness of breath, cold sweating, or dizziness?",
    options: [
      { text: "Yes, one or more of these are present", next: "triage_red_heart" },
      { text: "No, just mild pain/tightness", next: "chest_pain_cough" }
    ]
  },
  chest_pain_cough: {
    question: "Is the discomfort aggravated by deep breathing or coughing, or does it feel like burning in the chest after eating?",
    options: [
      { text: "Yes, it feels like acid burning (Reflux)", next: "triage_green_reflux" },
      { text: "No, it's a persistent dull ache with a cough", next: "triage_yellow_pulm" }
    ]
  },

  // Fever Path
  fever: {
    question: "Is the temperature above 103°F (39.4°C), or is the fever accompanied by a stiff neck, confusion, breathing issues, or extreme lethargy?",
    options: [
      { text: "Yes, high fever or severe symptoms present", next: "triage_red_fever" },
      { text: "No, moderate fever without severe symptoms", next: "fever_duration" }
    ]
  },
  fever_duration: {
    question: "Has the fever lasted for more than 3 consecutive days?",
    options: [
      { text: "Yes, it has been 3+ days", next: "triage_yellow_fever" },
      { text: "No, it just started (1-2 days)", next: "triage_green_fever" }
    ]
  },

  // Headache Path
  headache: {
    question: "Was the headache sudden and extremely severe (described as the 'worst headache of your life'), or is it accompanied by slurred speech, weakness on one side of the face/body, or vision loss?",
    options: [
      { text: "Yes, sudden severe onset or stroke-like symptoms", next: "triage_red_stroke" },
      { text: "No, typical migraine or tension-type headache", next: "headache_nausea" }
    ]
  },
  headache_nausea: {
    question: "Is the headache accompanied by severe nausea, sensitivity to light/sound, or visual auras?",
    options: [
      { text: "Yes, feels like a migraine", next: "triage_yellow_migraine" },
      { text: "No, standard tension headache (dull band-like pain)", next: "triage_green_headache" }
    ]
  },

  // Abdominal Pain Path
  abdominal: {
    question: "Is the abdominal pain severe, localized in the lower right side (possible appendicitis), or accompanied by persistent vomiting, high fever, or black/bloody stools?",
    options: [
      { text: "Yes, severe localized pain or bleeding signs", next: "triage_red_abdomen" },
      { text: "No, general cramping or mild stomach ache", next: "abdominal_food" }
    ]
  },
  abdominal_food: {
    question: "Is the pain accompanied by bloating, gas, watery diarrhea, or did it start shortly after eating questionable food?",
    options: [
      { text: "Yes, matches food poisoning or indigestion", next: "triage_green_gi" },
      { text: "No, persistent mild ache lasting over 48 hours", next: "triage_yellow_gi" }
    ]
  },

  // Cold Path
  cold: {
    question: "Are you experiencing wheezing, significant shortness of breath, or a barking cough with high fever?",
    options: [
      { text: "Yes, respiratory distress or severe cough", next: "triage_yellow_respiratory" },
      { text: "No, standard runny nose, sneezing, mild dry cough", next: "triage_green_cold" }
    ]
  },

  // Triage Outcomse (Red = Emergency, Yellow = See Doctor soon, Green = Self care)
  triage_red_heart: {
    type: "triage",
    level: "RED",
    title: "CRITICAL: Potential Cardiac Emergency",
    action: "Call Emergency Services (e.g. 911) immediately! Do not drive yourself. Sit quietly and wait for paramedics.",
    tips: [
      "If you have aspirin and are not allergic, chew one full tablet (325mg) or four baby aspirins (81mg each).",
      "Do not perform strenuous activity.",
      "Unlock your front door so emergency responders can enter."
    ]
  },
  triage_red_fever: {
    type: "triage",
    level: "RED",
    title: "CRITICAL: Severe Infection / Sepsis Risk",
    action: "Go to the nearest Emergency Room immediately. High fever accompanied by confusion, stiff neck, or breathing difficulty requires urgent diagnostic testing.",
    tips: [
      "Keep hydrated with small sips of water.",
      "Do not take cold baths (this can cause shivering and raise core temperature).",
      "Have list of active medicines ready for the ER doctor."
    ]
  },
  triage_red_stroke: {
    type: "triage",
    level: "RED",
    title: "CRITICAL: Potential Neurological Event (Stroke / Aneurysm)",
    action: "Call Emergency Services (e.g. 911) immediately. Remember the F.A.S.T. acronym: Face drooping, Arm weakness, Speech difficulty, Time to call 911.",
    tips: [
      "Note the exact time symptoms first started.",
      "Do not give the patient aspirin or any food/drink, as stroke can impair swallowing.",
      "Keep the person lying down and calm."
    ]
  },
  triage_red_abdomen: {
    type: "triage",
    level: "RED",
    title: "CRITICAL: Acute Abdomen (Appendicitis / Peritonitis)",
    action: "Go to the nearest Emergency Room. Localized lower right quadrant pain or bloody vomiting/stools require urgent surgical evaluation.",
    tips: [
      "Do NOT eat or drink anything (keep NPO) in case emergency surgery is needed.",
      "Do NOT take pain medications or laxatives, as they can mask symptoms or worsen bowel perforation.",
      "Rest in a comfortable position, often lying on your side with knees bent."
    ]
  },
  triage_yellow_pulm: {
    type: "triage",
    level: "YELLOW",
    title: "Urgent Care Recommended: Respiratory Discomfort",
    action: "Schedule a same-day appointment with your primary care provider or visit a local Urgent Care clinic.",
    tips: [
      "Monitor oxygen levels with a pulse oximeter if available.",
      "Avoid smoke, fumes, and intense exercise.",
      "Use a humidifier to moisten airways."
    ]
  },
  triage_yellow_fever: {
    type: "triage",
    level: "YELLOW",
    title: "Medical Evaluation Recommended: Persistent Fever",
    action: "Visit your doctor or an urgent care clinic within 24 hours. A fever lasting over 3 days requires a clinical workup (blood test, throat culture).",
    tips: [
      "Take Paracetamol (Tylenol) up to 1000mg or Ibuprofen up to 400mg to reduce discomfort (ensure no contraindications).",
      "Track your temperature readings hourly.",
      "Drink electrolyte-replacing fluids (oral rehydration salts)."
    ]
  },
  triage_yellow_migraine: {
    type: "triage",
    level: "YELLOW",
    title: "Clinical Care: Severe Migraine/Headache",
    action: "Consult your doctor. If you have prescribed migraine abortives (e.g., triptans), use them as directed. Seek care if this is your first severe migraine or if it differs from your usual pattern.",
    tips: [
      "Rest in a quiet, dark room.",
      "Apply a cool compress or ice pack to your forehead or the back of your neck.",
      "Avoid caffeine, screens, and loud noises."
    ]
  },
  triage_yellow_gi: {
    type: "triage",
    level: "YELLOW",
    title: "Clinical Evaluation: Persistent Abdominal Ache",
    action: "Schedule an appointment with your doctor. Abdominal pain lasting more than 2 days needs evaluation to rule out gallstones, gastritis, or ulcers.",
    tips: [
      "Eat a bland diet (BRAT diet: Bananas, Rice, Applesauce, Toast).",
      "Avoid dairy, greasy foods, caffeine, and NSAIDs like ibuprofen, which can irritate the stomach.",
      "Keep track of bowel movements (frequency, consistency, color)."
    ]
  },
  triage_yellow_respiratory: {
    type: "triage",
    level: "YELLOW",
    title: "Urgent Care: Respiratory Distress / Wheezing",
    action: "Seek medical attention promptly. If you are an asthmatic, use your rescue inhaler (Albuterol) immediately (2 puffs). If breathing does not improve in 15 minutes, seek emergency care.",
    tips: [
      "Sit upright; do not lie down, as it restricts lung expansion.",
      "Try to breathe slowly and deeply.",
      "Have your asthma action plan and controller inhalers ready."
    ]
  },
  triage_green_reflux: {
    type: "triage",
    level: "GREEN",
    title: "Self-Care: Gastroesophageal Acid Reflux (Heartburn)",
    action: "Manage at home with OTC antacids. If symptoms occur more than twice a week, consult a physician.",
    tips: [
      "Take an antacid (e.g., calcium carbonate) or acid reducer (e.g., Omeprazole or Famotidine).",
      "Do not lie down for at least 3 hours after eating.",
      "Elevate the head of your bed by 6 inches.",
      "Avoid trigger foods: chocolate, mint, caffeine, citrus, and fatty foods."
    ]
  },
  triage_green_fever: {
    type: "triage",
    level: "GREEN",
    title: "Self-Care: Mild/New Fever",
    action: "Monitor symptoms at home. Resting and staying hydrated is the primary treatment.",
    tips: [
      "Take Paracetamol (Acetaminophen) 500-1000mg every 6 hours as needed to reduce fever (Max 4g/day).",
      "Dress in light layers and use light blankets.",
      "Drink water, broth, or herbal teas."
    ]
  },
  triage_green_headache: {
    type: "triage",
    level: "GREEN",
    title: "Self-Care: Tension Headache",
    action: "Manage at home with simple pain relievers and stress reduction techniques.",
    tips: [
      "Take Paracetamol 500-1000mg or Ibuprofen 200-400mg with a glass of water.",
      "Massage tight muscles in your neck, shoulders, and temples.",
      "Take a break from screens and practice deep breathing or meditation."
    ]
  },
  triage_green_gi: {
    type: "triage",
    level: "GREEN",
    title: "Self-Care: Mild Gastroenteritis / Indigestion",
    action: "Manage symptoms at home. Focus on hydration and letting your digestive system rest.",
    tips: [
      "Drink oral rehydration solutions, diluted juices, or sports drinks in small, frequent sips.",
      "Gradually reintroduce bland foods once vomiting stops for several hours.",
      "Avoid dairy, alcohol, nicotine, caffeine, and fatty foods.",
      "Wash hands thoroughly to prevent spreading potential viruses to others."
    ]
  },
  triage_green_cold: {
    type: "triage",
    level: "GREEN",
    title: "Self-Care: Common Cold & Coryza",
    action: "Rest and symptomatic relief at home. The common cold is viral and will not respond to antibiotics (like amoxicillin).",
    tips: [
      "Use saline nasal sprays or rinses to clear nasal passages.",
      "Stay hydrated: warm fluids like tea or chicken soup soothe the throat.",
      "Use cough lozenges or honey (do not give honey to infants under 1 year).",
      "For congestion, consider an OTC antihistamine (e.g. cetirizine) or decongestant if safe for your blood pressure."
    ]
  }
};
