
import { NewPatient, Gender, Diagnosis, EntryWithoutId, HealthCheckRating, BaseEntryWithoutId } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (text: unknown): text is number => {
  return typeof text === 'number' || text instanceof Number;
};

const parseString = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newPatient: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    };
    return newPatient;
  }
  throw new Error('Incorrect data: a field missing');
};

const isEntryType = (param: string): boolean => {
  const types = ["Hospital", "OccupationalHealthcare", "HealthCheck"];
  return types.includes(param);
};


const parseType = (entryType: unknown): string => {
  if (!isString(entryType) || !isEntryType(entryType)) {
    throw new Error('Incorrect or missing type: ' + entryType);
  }
  return entryType;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object) {
    let base: BaseEntryWithoutId = {
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
    };
    if ('diagnosisCodes' in object) {
      base = {
        ...base,
        diagnosisCodes: parseDiagnosisCodes(object),
      };
    }
    const type = parseType(object.type);

    if (type === "HealthCheck" && 'healthCheckRating' in object) {
      const newEntry: EntryWithoutId = {
        ...base,
        type: type,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
      return newEntry;

    } else if (type === "OccupationalHealthcare" && 'employerName' in object) {
      let newEntry: EntryWithoutId = {
        ...base,
        type: type,
        employerName: parseString(object.employerName),
      };
      if ('sickLeave' in object) {
        newEntry = {
          ...newEntry,
          sickLeave: {
            startDate: parseDate((object.sickLeave as { startDate: unknown }).startDate),
            endDate: parseDate((object.sickLeave as { endDate: unknown }).endDate)
          }
        };
      }
      return newEntry;

    } else if (type === "Hospital" && 'discharge' in object) {
      const newEntry: EntryWithoutId = {
        ...base,
        type: type,
        discharge: {
          date: parseDate((object.discharge as { date: unknown }).date),
          criteria: parseString((object.discharge as { criteria: unknown }).criteria)
        }
      };
      return newEntry;
    }
    throw new Error('Incorrect or missing data: a field missing');
  }
  throw new Error('Incorrect data: a field missing');
};

export { toNewPatient, toNewEntry };