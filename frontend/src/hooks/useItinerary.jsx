import { useContext } from 'react';
import { ItineraryContext } from '../contexts/ItineraryContext';

export const useItinerary = () => {
  return useContext(ItineraryContext);
};