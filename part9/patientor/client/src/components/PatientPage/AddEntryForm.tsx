import { useState, SyntheticEvent } from 'react';
import { EntryType, EntryWithoutId, HealthCheckRating } from '../../types';
import { Grid, SelectChangeEvent, Alert } from '@mui/material';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Button } from '@mui/material';

interface Props {
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
  setError: React.Dispatch<React.SetStateAction<string>>
}

const AddEntryForm = ({ onClose, onSubmit, error, setError }: Props) => {
  const [type, setType] = useState(EntryType.Hospital);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    const value = event.target.value;
    const type = Object.values(EntryType).find(t => t === value);
    if (type) {
      setType(type);
      setError('');
    }
  };

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    const value = event.target.value;
    const rating = Object.values(HealthCheckRating).find(r => r === Number(value));
    if (rating) {
      setHealthCheckRating(rating as HealthCheckRating);
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const baseValues = {
      type,
      description,
      date,
      specialist,
      diagnosisCodes,
    };
    let entryValues;
    if (type === EntryType.Hospital) {
      entryValues = {
        ...baseValues,
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria
        }
      };
    } else if (type === EntryType.HealthCheck) {
      entryValues = {
        ...baseValues,
        healthCheckRating
      };
    } else if (type === EntryType.OccupationalHealthcare) {
      entryValues = {
        ...baseValues,
        employerName,
        sickLeave: {
          startDate: sickLeaveStartDate,
          endDate: sickLeaveEndDate
        }
      };
    }
    onSubmit(entryValues as EntryWithoutId);
  };

  return (
    <Box border={1} padding={3} paddingBottom={8} marginTop={4} marginBottom={4}>
      {error && <Alert severity="error">{error}</Alert>}
      <h3>New healthcare entry</h3>
      <form onSubmit={addEntry}>
        <FormControl fullWidth>
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            value={type}
            label="Type"
            onChange={onTypeChange}
          >
            <MenuItem value={EntryType.Hospital}>Hospital</MenuItem>
            <MenuItem value={EntryType.HealthCheck} >Health Check</MenuItem>
            <MenuItem value={EntryType.OccupationalHealthcare}>Occupational Healthcare</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value.split(','))}
        />
        {type === EntryType.Hospital && (
          <>
            <TextField
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        )}
        {type === EntryType.HealthCheck && (
          <FormControl fullWidth style={{ marginTop: 15 }}>
            <InputLabel id="health-check-rating-label" >Health Check Rating</InputLabel>
            <Select
              labelId="health-check-rating-label"
              id="health-check-rating"
              value={healthCheckRating.toString()}
              label="Health Check Rating"
              onChange={onHealthCheckRatingChange}
            >
              {Object.values(HealthCheckRating)
                .filter(option => typeof option === 'number')
                .map(option =>
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                )}
            </Select>
          </FormControl>
        )}
        {type === EntryType.OccupationalHealthcare && (
          <>
            <TextField
              label="Employer name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <TextField
              label="Sick leave start date"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
            />
            <TextField
              label="Sick leave end date"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
            />
          </>
        )}
        <Grid style={{ marginTop: 10 }}>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box >
  );
};

export default AddEntryForm;