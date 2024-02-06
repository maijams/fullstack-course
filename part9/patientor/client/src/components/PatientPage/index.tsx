import { useEffect, useState } from "react";
import { Patient, Diagnosis } from "../../types";
import patientService from "../../services/patients";

interface PatientPageProps {
  patientId: string;
  diagnoses: Diagnosis[];
}

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
        <div key={entry.id}>
          {entry.date} <em>{entry.description}</em>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>{code} {diagnoses.find(diagnosis => diagnosis.code === code)?.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientPage;