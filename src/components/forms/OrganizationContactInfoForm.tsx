// my-gallery/src/components/forms/OrganizationContactInfoForm.tsx

import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Button } from '@mui/material';
import buttonStyles from '../../screens/ButtonStyles.module.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import axios from 'axios';


interface UserData {
  userId?: number;
  email?: string;
  username?: string;
  isAnonymous?: boolean;
  profilePhotoUrl?: string;
}

interface OrganizationContactInfoFormProps {
  userData: UserData | null;
  organizationContactInfo: OrganizationContactInfo;
  onSubmit: (organizationContactInfo: OrganizationContactInfo) => void;
  isRequired?: boolean;
  isFormModified: boolean;
  setIsFormModified: (isModified: boolean) => void;
}

export interface OrganizationContactInfo {
  organizationContactId: number;
  entityId: number;
  username?: string;
  organizationName?: string;
  organizationType?: string;
  taxIdNumber?: string;
  primaryEmail?: string;
  secondaryEmail?: string;
  primaryPhone?: string;
  secondaryPhone?: string;
  locationId?: number;
  instagram?: string;
  twitter?: string;
  linkedIn?: string;
  website?: string;
  preferences?: string;
  notes?: string;
  contactPersons: ContactPerson[];
}

interface ContactPerson {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
}

const OrganizationContactInfoForm: React.FC<OrganizationContactInfoFormProps> = ({
  userData,
  organizationContactInfo,
  onSubmit,
  isRequired = false,
  isFormModified,
  setIsFormModified,
}) => {
  console.log('OrganizationContactInfoForm props:', { userData, organizationContactInfo });

  // const [isFormModified, setIsFormModified] = useState(false);

  const [formData, setFormData] = useState<OrganizationContactInfo>({
    ...organizationContactInfo,
    primaryEmail: userData?.email || organizationContactInfo?.primaryEmail || '',
    contactPersons: organizationContactInfo?.contactPersons || [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    const normalizedValue = name === 'primaryEmail' || name === 'secondaryEmail' ? value.toLowerCase() : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setIsFormModified(true);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const phoneNumber = parsePhoneNumberFromString(value);
    if (phoneNumber && phoneNumber.isValid()) {
      setFormData((prevData) => ({
        ...prevData,
        [name as keyof OrganizationContactInfo]: phoneNumber.format('E.164') as string,
      }));
    }
  };

  const handleContactPersonChange = (index: number, field: keyof ContactPerson, value: string) => {
    setFormData((prevData) => {
      const contactPersons = [...prevData.contactPersons];
      contactPersons[index] = {
        ...contactPersons[index],
        [field]: value,
      };
      return { ...prevData, contactPersons };
    });
  };

  const addContactPerson = () => {
    setFormData((prevData) => ({
      ...prevData,
      contactPersons: [...prevData.contactPersons, {}],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Render other form fields */}
      {formData.contactPersons.map((contactPerson, index) => (
        <div key={index}>
          <h4>Contact Person {index + 1}</h4>
          <TextField
            className={buttonStyles.formfieldsmall}
            label="Name"
            name={`contactPerson${index + 1}`}
            value={contactPerson.name || ''}
            onChange={(e) => handleContactPersonChange(index, 'name', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            className={buttonStyles.formfieldsmall}
            label="Role"
            name={`contactPerson${index + 1}Role`}
            value={contactPerson.role || ''}
            onChange={(e) => handleContactPersonChange(index, 'role', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            className={buttonStyles.formfieldsmall}
            label="Email"
            name={`contactPerson${index + 1}Email`}
            value={contactPerson.email || ''}
            onChange={(e) => handleContactPersonChange(index, 'email', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            className={buttonStyles.formfieldsmall}
            label="Phone"
            name={`contactPerson${index + 1}Phone`}
            value={contactPerson.phone || ''}
            onChange={(e) => handleContactPersonChange(index, 'phone', e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
      ))}
      <button className={buttonStyles.button} onClick={addContactPerson}>Add Contact Person</button>
      {isFormModified && (
        <button type="submit" className={buttonStyles.button}>
          Save
        </button>
      )}
    </form>
  );
};

export default OrganizationContactInfoForm;