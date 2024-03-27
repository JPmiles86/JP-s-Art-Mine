// my-gallery/src/components/forms/LocationList.tsx

import React, { useState, useEffect } from 'react';
import LocationForm, { Location } from './LocationForm';
import buttonStyles from '../../screens/ButtonStyles.module.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LocationListProps {
  userId: number;
  locations: Location[];
  onUpdate: (locations: Location[]) => void;
  onRemove: (locationId: number) => void;
  isRequired?: boolean;
  selectedEntityType: string;
}

const LocationList: React.FC<LocationListProps> = ({ userId, locations, onUpdate, onRemove, isRequired = false, selectedEntityType }) => {
  const [locationList, setLocationList] = useState<Location[]>(locations);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get(`/api/users/${userId}/locations`);
      setLocationList(response.data);
      // onUpdate(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const handleAddLocation = async () => {
    try {
      const response = await axios.post(`/api/users/${userId}/locations`, {
        locationData: {
          addressLine1: '',
          city: '',
          stateProvince: '',
          postalCode: '',
          country: '',
          locationType: '',
        },
      });
      const newLocation = response.data;
      setLocationList((prevList) => [...prevList, newLocation]);
      // onUpdate([...locationList, newLocation]);
     
    } catch (error) {
      console.error('Error adding location:', error);
    }
  };

  const handleUpdateLocation = async (updatedLocation: Location) => {
    try {
      await axios.put(`/api/users/${userId}/locations/${updatedLocation.locationId}`, {
        locationData: updatedLocation,
      });
      const updatedLocations = locationList.map((location) =>
        location.locationId === updatedLocation.locationId ? updatedLocation : location
      );
      setLocationList(updatedLocations);
      onUpdate(updatedLocations);
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  const handleRemoveLocation = async (locationId: number) => {
    try {
      await axios.delete(`/api/users/${userId}/locations/${locationId}`);
      const updatedLocations = locationList.filter((location) => location.locationId !== locationId);
      setLocationList(updatedLocations);
      onUpdate(updatedLocations);
      onRemove(locationId);
    } catch (error) {
      console.error('Error removing location:', error);
    }
  };

  return (
    <div>
      {locationList.map((location, index) => (
        <LocationForm
          key={location.locationId}
          location={location}
          onSubmit={handleUpdateLocation}
          onRemove={() => handleRemoveLocation(location.locationId)}
          isRequired={isRequired}
          locationIndex={index + 1}
        />
      ))}
      {selectedEntityType && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="button" className={buttonStyles.button} onClick={handleAddLocation}>
            Add Location
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationList;