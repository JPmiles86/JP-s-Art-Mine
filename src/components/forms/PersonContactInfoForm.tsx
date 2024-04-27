// my-gallery/src/components/forms/PersonContactInfoForm.tsx

import React, { useState, useEffect } from 'react';
import { FormLabel, TextFieldProps, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Grid, Typography } from '@mui/material';
import buttonStyles from '../../screens/ButtonStyles.module.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { countries } from './countries';

interface UserData {
  userId?: number;
  email?: string;
  username?: string;
  isAnonymous?: boolean;
  profilePhotoUrl?: string;
  entityType?: string;
}

interface PersonContactInfoFormProps {
  userData: UserData | null;
  personContactInfo: PersonalContactInfo;
  onSubmit: (personContactInfo: PersonalContactInfo) => void;
  isRequired?: boolean;
  isEditMode: boolean;
}

export interface PersonalContactInfo {
  personContactId: number;
  userId?: number;
  username?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  preferredName?: string;
  primaryEmail?: string;
  secondaryEmail?: string;
  primaryPhone?: string;
  secondaryPhone?: string;
  profession?: string;
  locationId?: number;
  instagram?: string;
  twitter?: string;
  linkedIn?: string;
  website?: string;
  relationshipToArtist?: string;
  dateOfBirth?: string | null;
  countryOfBirth?: string;
  countryOfResidence?: string;
}

const PersonContactInfoForm: React.FC<PersonContactInfoFormProps> = ({
  userData,
  personContactInfo,
  onSubmit,
  isRequired = false,
  isEditMode,
}) => {
  console.log('PersonContactInfoForm props:', { userData, personContactInfo });

  const [formData, setFormData] = useState<PersonalContactInfo>({
    personContactId: personContactInfo?.personContactId || 0,
    username: userData?.username || '',
    firstName: personContactInfo?.firstName || '',
    middleName: personContactInfo?.middleName || '',
    lastName: personContactInfo?.lastName || '',
    preferredName: personContactInfo?.preferredName || '',
    primaryEmail: userData?.email || personContactInfo?.primaryEmail || '',
    secondaryEmail: personContactInfo?.secondaryEmail || '',
    primaryPhone: personContactInfo?.primaryPhone || '',
    secondaryPhone: personContactInfo?.secondaryPhone || '',
    profession: personContactInfo?.profession || '',
    locationId: personContactInfo?.locationId || 0,
    instagram: personContactInfo?.instagram || '',
    twitter: personContactInfo?.twitter || '',
    linkedIn: personContactInfo?.linkedIn || '',
    website: personContactInfo?.website || '',
    relationshipToArtist: personContactInfo?.relationshipToArtist || '',
    dateOfBirth: personContactInfo?.dateOfBirth || null,
    countryOfBirth: personContactInfo?.countryOfBirth || '',
    countryOfResidence: personContactInfo?.countryOfResidence || '',
  });

  const [isEditing, setIsEditing] = useState(isEditMode);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 125 }, (_, index) => currentYear - index);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const days = Array.from({ length: 31 }, (_, index) => index + 1);

  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

  const handleYearChange = (event: SelectChangeEvent<string>) => {
    const selectedYear = event.target.value as string;
    setSelectedYear(selectedYear);
  };

  const handleMonthChange = (event: SelectChangeEvent<string>) => {
    const selectedMonth = event.target.value as string;
    setSelectedMonth(selectedMonth);
  };

  const handleDayChange = (event: SelectChangeEvent<string>) => {
    const selectedDay = event.target.value as string;
    const formattedDay = selectedDay.padStart(2, '0');
    setSelectedDay(formattedDay);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    const normalizedValue = name === 'primaryEmail' || name === 'secondaryEmail' ? value.toLowerCase() : value;
    setFormData((prevData) => ({
      ...prevData,
      [name as keyof PersonalContactInfo]: normalizedValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSubmit: PersonalContactInfo = {
      ...formData,
      dateOfBirth: selectedYear && selectedMonth && selectedDay
        ? `${selectedYear}-${selectedMonth}-${selectedDay}`
        : null,
      userId: userData?.userId,
    };
    onSubmit(formDataToSubmit);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const getCountryName = (countryCode: string) => {
    const country = countries.find((c) => c.code === countryCode);
    return country ? country.name : '—';
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    const month = months[date.getMonth()];
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const renderFormField = (label: string, name: keyof PersonalContactInfo) => {
    const value = formData[name];
    const formattedValue =
      value === undefined
        ? '—'
        : typeof value === 'string'
        ? name === 'dateOfBirth'
          ? formatDate(value || null)
          : name === 'countryOfBirth' || name === 'countryOfResidence'
          ? getCountryName(value)
          : value.trim() || '—'
        : value;
  
    return (
      <Grid container>
        <Grid item xs={6}>
          <Typography align="right" style={{ fontWeight: 'bold' }}>
            {label}:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align="left" style={{ marginLeft: '10px' }}>
            {formattedValue}
          </Typography>
        </Grid>
      </Grid>
    );
  };


  useEffect(() => {
    if (personContactInfo?.dateOfBirth) {
      const [year, month, day] = personContactInfo.dateOfBirth.split('-');
      setSelectedYear(year);
      setSelectedMonth(month);
      setSelectedDay(day);
    }
  }, [personContactInfo]);

  return (
    <form onSubmit={handleSubmit}>
      {isEditing ? (
        <>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={3}>
              <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField label="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField label="Preferred Name" name="preferredName" value={formData.preferredName} onChange={handleChange} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Primary Email" name="primaryEmail" type="email" value={formData.primaryEmail} onChange={handleChange} required={isRequired} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Secondary Email" name="secondaryEmail" type="email" value={formData.secondaryEmail} onChange={handleChange} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Primary Phone" name="primaryPhone" value={formData.primaryPhone} onChange={handleChange} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Secondary Phone" name="secondaryPhone" value={formData.secondaryPhone} onChange={handleChange} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Profession" name="profession" value={formData.profession} onChange={handleChange} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Relationship to Artist" name="relationshipToArtist" value={formData.relationshipToArtist} onChange={handleChange} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField label="Instagram" name="instagram" value={formData.instagram} onChange={handleChange} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField label="Twitter" name="twitter" value={formData.twitter} onChange={handleChange} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField label="LinkedIn" name="linkedIn" value={formData.linkedIn} onChange={handleChange} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField label="Website" name="website" value={formData.website} onChange={handleChange} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormLabel component="legend">Date of Birth</FormLabel>
              <Grid container spacing={0} alignItems="center">
                <Select
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'month' }}
                >
                  <MenuItem value="" disabled>
                    Month
                  </MenuItem>
                  {months.map((month, index) => (
                    <MenuItem key={month} value={(index + 1).toString().padStart(2, '0')}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
                <Select
                  value={selectedDay}
                  onChange={handleDayChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'day' }}
                >
                  <MenuItem value="" disabled>
                    Day
                  </MenuItem>
                  {days.map((day) => (
                    <MenuItem key={day} value={day.toString().padStart(2, '0')}>
                      {day.toString().padStart(2, '0')}
                    </MenuItem>
                  ))}
                </Select>
                <Select
                  value={selectedYear}
                  onChange={handleYearChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'year' }}
                >
                  <MenuItem value="" disabled>
                    Year
                  </MenuItem>
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Country of Birth</InputLabel>
                <Select
                  value={formData.countryOfBirth}
                  onChange={handleChange}
                  name="countryOfBirth"
                  label="Country of Birth"
                >
                  <MenuItem value="">Select Country</MenuItem>
                  {countries.map((country) => (
                    <MenuItem key={country.code} value={country.code}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Country of Residence</InputLabel>
                <Select
                  value={formData.countryOfResidence}
                  onChange={handleChange}
                  name="countryOfResidence"
                  label="Country of Residence"
                >
                  <MenuItem value="">Select Country</MenuItem>
                  {countries.map((country) => (
                    <MenuItem key={country.code} value={country.code}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
              <button type="submit" className={buttonStyles.button}>
                Save
              </button>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', marginBottom: '0px' }}>
            <>
              <Typography variant="h6" style={{ textAlign: 'center' }}>
                <strong>Profile Information:</strong>
              </Typography>
              <br />
            </>
          </div>
          <br />
          <Grid container spacing={2}>
            {renderFormField('First Name', 'firstName')}
            {renderFormField('Middle Name', 'middleName')}
            {renderFormField('Last Name', 'lastName')}
            {renderFormField('Preferred Name', 'preferredName')}
            {renderFormField('Email (Primary)', 'primaryEmail')}
            {renderFormField('Email (Secondary)', 'secondaryEmail')}
            {renderFormField('Phone (Primary)', 'primaryPhone')}
            {renderFormField('Phone (Secondary)', 'secondaryPhone')}
            {renderFormField('Profession', 'profession')}
            {renderFormField('Relationship to Artist', 'relationshipToArtist')}
            {renderFormField('Instagram', 'instagram')}
            {renderFormField('Twitter', 'twitter')}
            {renderFormField('LinkedIn', 'linkedIn')}
            {renderFormField('Website', 'website')}
            {renderFormField('Date of Birth', 'dateOfBirth')}
            {renderFormField('Country (Birth)', 'countryOfBirth')}
            {renderFormField('Country (Residence)', 'countryOfResidence')}
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <button type="button" style={{ marginTop: '20px' }} onClick={handleEditClick} className={buttonStyles.button}>
              Edit
            </button>
          </Grid>
        </>
      )}
    </form>
  );
};

export default PersonContactInfoForm;