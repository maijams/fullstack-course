import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { Favorite } from '@mui/icons-material';
import { Patient, Diagnosis, Entry, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry } from "../../types";
import patientService from "../../services/patients";

interface PatientPageProps {
  patientId: string;
  diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <> <b>Hospital</b>
      <p />
      <em>{entry.description}</em>
      <p/>
      Discharged {entry.discharge.date}. <em>{entry.discharge.criteria}</em>
    </>
  );
};

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const colors = ['green', 'yellow', 'orange', 'red'];
  return (
    <> <b>Health Check</b>
      <p />
      <em>{entry.description}</em>
      <p />
      <Favorite style={{ color: colors[entry.healthCheckRating] }} />
    </>
  );
};

const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <> <b>Occupational Healthcare</b> {entry.employerName}
      <p />
      <em>{entry.description}</em>
      <p />
      Sick leave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
    </>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <Hospital entry={entry} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const PatientPage = ({ patientId, diagnoses }: PatientPageProps) => {
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      const patient: Patient = await patientService.getPatient(patientId);
      setPatient(patient);
    };
    void fetchPatient();
  }, [patientId]);

  if (!patient) {
    return null;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      gender: {patient.gender}
      <br />
      ssn: {patient.ssn}
      <br />
      occupation: {patient.occupation}
      <h3>entries</h3>
      {patient.entries.map((entry) => (
        <Box key={entry.id} border={1} borderRadius={2} padding={2} style={{ marginBottom: 10 }}>
          {entry.date}
          <EntryDetails key={entry.id} entry={entry} />
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>{code} {diagnoses.find(diagnosis => diagnosis.code === code)?.name}</li>
            ))}
          </ul>
          diagnose by {entry.specialist}
        </Box>
      ))}
    </div>
  );
};

export default PatientPage;