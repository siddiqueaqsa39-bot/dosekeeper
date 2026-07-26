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

## AI Feature
The **DoseKeeper AI Health Coach** lets patients describe a problem in plain 
language (e.g. "I keep forgetting my evening pill"). It sends their recent 
dose logs, active medications, and free-text input to the Gemini API 
(`gemini-flash-latest`), which returns compassionate, practical, bullet-point 
advice for improving adherence — without ever diagnosing or recommending 
dosage changes.

**System instruction used:**
