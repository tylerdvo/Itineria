const { body, validationResult } = require('express-validator');

// Validate request data and return errors if any
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// User registration validation rules
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

// Login validation rules
const loginValidation = [
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').exists().withMessage('Password is required')
];

// Itinerary validation rules
const itineraryValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('destination').trim().notEmpty().withMessage('Destination is required'),
  body('startDate').isISO8601().toDate().withMessage('Valid start date is required'),
  body('endDate').isISO8601().toDate().withMessage('Valid end date is required')
    .custom((endDate, { req }) => {
      if (endDate <= new Date(req.body.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    })
];

// Preference validation rules
const preferenceValidation = [
  body('userId').trim().notEmpty().withMessage('User ID is required'),
  body('interests').isArray().withMessage('Interests must be an array'),
  body('accommodationType')
    .optional()
    .isIn(['budget', 'mid-range', 'luxury'])
    .withMessage('Valid accommodation type is required'),
  body('transportationPreference')
    .optional()
    .isIn(['public', 'rental', 'walking', 'tour'])
    .withMessage('Valid transportation preference is required')
];

module.exports = {
  validateRequest,
  registerValidation,
  loginValidation,
  itineraryValidation,
  preferenceValidation
};