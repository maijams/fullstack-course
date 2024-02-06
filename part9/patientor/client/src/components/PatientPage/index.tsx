import { useEffect, useState } from "react";
import { Patient } from "../../types";
import patientService from "../../services/patients";

const PatientPage = ({ patientId }: { patientId: string }) => {
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
              <li key={code}>{code}</li>
          ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientPage;