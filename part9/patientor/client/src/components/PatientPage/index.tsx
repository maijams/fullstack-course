import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { Favorite } from '@mui/icons-material';
import axios from "axios";
import { Patient, Diagnosis, Entry, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry, EntryWithoutId } from "../../types";
import patientService from "../../services/patients";
import AddEntryForm from "./AddEntryForm";

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
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openForm = (): void => setFormOpen(true);
  const closeForm = (): void => setFormOpen(false);

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

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      const entry = await patientService.addEntry(patient.id, values);
      patient.entries.push(entry);
      setPatient(patient);
      setFormOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } 
        else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
      <h2>{patient.name}</h2>
      gender: {patient.gender}
      <br />
      ssn: {patient.ssn}
      <br />
      occupation: {patient.occupation}

      {formOpen && <AddEntryForm onClose={closeForm} onSubmit={submitNewEntry} error={error} setError={setError} />}
      {!formOpen && <p><Button variant="contained" onClick={() => openForm()}>Add New Entry</Button></p> }
      
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