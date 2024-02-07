import patientData from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatient, Entry, EntryWithoutId } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData;

const getPatients = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) =>
  ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
  const id: string = uuid();
  const newPatient: Patient = {
    id,
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: EntryWithoutId): Entry | undefined => {
  const patient = patients.find(p => p.id === patientId);
  if (!patient) {
    return undefined;
  }
  const entryId: string = uuid();
  const newEntry: Entry = {
    id: entryId,
    ...entry
  };
  patient.entries.push(newEntry);
  return newEntry;
};


export default {
  getPatients,
  getPatient,
  addPatient,
  addEntry
};