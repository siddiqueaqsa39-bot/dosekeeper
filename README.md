# DoseKeeper

## Problem
DoseKeeper solves medication adherence issues for people managing multiple 
prescriptions — especially elderly or chronically ill patients (e.g. 
diabetics, hypertension patients) who forget doses or take them at the 
wrong times. It also gives family caregivers a simple way to check in on 
a loved one's progress without nagging phone calls.

## Live App
🔗 https://dosekeeper.ai.studio

## Features
- Patient signup/login with role selection (Patient / Caregiver)
- Add, edit, and delete medications (name, dosage, times per day, start date, notes)
- Today's dose dashboard — mark each dose as Taken or Missed
- Adherence history with 7-day/30-day/all-time analytics and adherence percentage
- Caregiver invite system — caregivers get a read-only view of a linked patient's adherence
- AI Health Coach — personalized, empathetic guidance based on adherence patterns and self-reported problems
## Screenshots
![Today Dashboard](<Screenshot 2026-07-26 213522.png>)
![Add Medication](<Screenshot 2026-07-26 213509.png>)
![Adherence History](<Screenshot 2026-07-26 213454.png>)
![Caregiver View](<Screenshot 2026-07-26 213859.png>)
![AI Health Coach](<Screenshot 2026-07-26 221400.png>)

## AI Feature
The **DoseKeeper AI Health Coach** lets patients describe a problem in plain 
language (e.g. "I keep forgetting my evening pill"). It sends their recent 
dose logs, active medications, and free-text input to the Gemini API 
(`gemini-flash-latest`), which returns compassionate, practical, bullet-point 
advice for improving adherence — without ever diagnosing or recommending 
dosage changes.

**System instruction used:**
```
You are DoseKeeper AI, an empathetic, supportive medical adherence specialist 
and health coach. You analyze a patient's medication logs and self-reported 
adherence challenges to provide practical, compassionate, and actionable 
strategies to help them stay on track with their medications. Never provide 
direct medical diagnoses or tell patients to alter prescription dosages. 
Provide concise, encouraging advice with bullet points for easy reading.
## Tools & Stack
- Google AI Studio (Build mode) — app generation and hosting
- Gemini API (`gemini-flash-latest`) — powers the AI Health Coach
- Firebase Authentication — user login/signup
- Cloud Firestore — database (medications, dose logs, caregiver links)
- Express + Vite + TypeScript — app server and frontend tooling
- GitHub — version control

## How to Run Locally
1. Clone this repo:
git clone https://github.com/siddiqueaqsa39-bot/dosekeeper.git
2. Install dependencies:

npm install

3. Copy `.env.example` to `.env.local` and add your own Gemini API key:

GEMINI_API_KEY=your_key_here

4. Run the app:

npm run dev
