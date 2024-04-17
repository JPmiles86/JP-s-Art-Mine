// my-gallery/src/components/forms/PersonContactInfoForm.tsx

import React, { useState, useEffect } from 'react';
import { FormLabel, TextFieldProps, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Grid } from '@mui/material';
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
  isFormModified: boolean;
  setIsFormModified: (isModified: boolean) => void;
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
  isFormModified,
  setIsFormModified,
}) => {
  console.log('PersonContactInfoForm props:', { userData, personContactInfo });

  const [formData, setFormData] = useState({
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
    setIsFormModified(true);
  };

  const handleMonthChange = (event: SelectChangeEvent<string>) => {
    const selectedMonth = event.target.value as string;
    setSelectedMonth(selectedMonth);
    setIsFormModified(true);
  };

  const handleDayChange = (event: SelectChangeEvent<string>) => {
    const selectedDay = event.target.value as string;
    const formattedDay = selectedDay.padStart(2, '0');
    setSelectedDay(formattedDay);
    setIsFormModified(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    const normalizedValue = name === 'primaryEmail' || name === 'secondaryEmail' ? value.toLowerCase() : value;

    setFormData((prevData) => ({
      ...prevData,
      [name as keyof PersonalContactInfo]: normalizedValue,
    }));
    setIsFormModified(true);
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
      <Grid container spacing={2}>
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
        {isFormModified && (
          <Grid item xs={12} display="flex" justifyContent="center">
            <button type="submit" className={buttonStyles.button}>
              Save Profile
            </button>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default PersonContactInfoForm;