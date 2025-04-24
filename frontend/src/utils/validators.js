// Email validation
export const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  // Password validation (at least 6 characters)
  export const isValidPassword = (password) => {
    return password && password.length >= 6;
  };
  
  // Name validation (not empty)
  export const isValidName = (name) => {
    return name && name.trim().length > 0;
  };
  
  // Date validation
  export const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };
  
  // Date range validation (end date must be after start date)
  export const isValidDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return start <= end;
  };
  
  // Form validation for registration
  export const validateRegistration = (formData) => {
    const errors = {};
  
    if (!isValidName(formData.name)) {
      errors.name = 'Name is required';
    }
  
    if (!isValidEmail(formData.email)) {
      errors.email = 'Valid email is required';
    }
  
    if (!isValidPassword(formData.password)) {
      errors.password = 'Password must be at least 6 characters';
    }
  
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };
  
  // Form validation for login
  export const validateLogin = (formData) => {
    const errors = {};
  
    if (!isValidEmail(formData.email)) {
      errors.email = 'Valid email is required';
    }
  
    if (!formData.password) {
      errors.password = 'Password is required';
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };
  
  // Form validation for itinerary creation
  export const validateItinerary = (formData) => {
    const errors = {};
  
    if (!formData.title || formData.title.trim() === '') {
      errors.title = 'Title is required';
    }
  
    if (!formData.destination || formData.destination.trim() === '') {
      errors.destination = 'Destination is required';
    }
  
    if (!isValidDate(formData.startDate)) {
      errors.startDate = 'Valid start date is required';
    }
  
    if (!isValidDate(formData.endDate)) {
      errors.endDate = 'Valid end date is required';
    }
  
    if (
      isValidDate(formData.startDate) &&
      isValidDate(formData.endDate) &&
      !isValidDateRange(formData.startDate, formData.endDate)
    ) {
      errors.endDate = 'End date must be after start date';
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };
  
  // Form validation for activity
  export const validateActivity = (formData) => {
    const errors = {};
  
    if (!formData.title || formData.title.trim() === '') {
      errors.title = 'Title is required';
    }
  
    if (!isValidDate(formData.date)) {
      errors.date = 'Valid date is required';
    }
  
    // Time format validation (HH:MM)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    
    if (formData.startTime && !timeRegex.test(formData.startTime)) {
      errors.startTime = 'Valid time format required (HH:MM)';
    }
    
    if (formData.endTime && !timeRegex.test(formData.endTime)) {
      errors.endTime = 'Valid time format required (HH:MM)';
    }
    
    // End time should be after start time
    if (
      formData.startTime &&
      formData.endTime &&
      timeRegex.test(formData.startTime) &&
      timeRegex.test(formData.endTime) &&
      formData.startTime >= formData.endTime
    ) {
      errors.endTime = 'End time must be after start time';
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };