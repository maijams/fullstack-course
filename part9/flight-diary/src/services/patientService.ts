import patientData from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatient } from '../types';
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

const addPatient = ( entry: NewPatient ): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // eslint-disable-next-line
  const id: string = uuid();
  const newPatient = {
    id,
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};


export default {
  getPatients,
  addPatient
};