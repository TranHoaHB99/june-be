const { body, validationResult } = require('express-validator');
const db = require('../config/database');

// Helper to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// Signup validation
const validateSignup = [
  body('first_name')
    .trim()
    .notEmpty().withMessage('First name is required')
    .matches(/^[a-zA-Z]+$/).withMessage('First name must contain only letters (no spaces or special characters)'),
  
  body('last_name')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .matches(/^[a-zA-Z]+$/).withMessage('Last name must contain only letters (no spaces or special characters)'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email must be in valid format')
    .custom(async (value) => {
      const { rows } = await db.query('SELECT id FROM users WHERE email = $1', [value]);
      if (rows[0]) {
        throw new Error('Email is already registered');
      }
      return true;
    }),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6, max: 10 }).withMessage('Password must be between 6 and 10 characters')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character'),
  
  handleValidationErrors
];

// Login validation
const validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email must be in valid format'),
  
  body('password')
    .notEmpty().withMessage('Password is required'),
  
  handleValidationErrors
];

// Contact validation
const validateContact = [
  body('first_name')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ max: 20 }).withMessage('First name must not exceed 20 characters'),
  
  body('last_name')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ max: 20 }).withMessage('Last name must not exceed 20 characters'),
  
  body('phone_number')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^\d+$/).withMessage('Phone number must contain only digits')
    .isLength({ min: 8, max: 15 }).withMessage('Phone number must be between 8 and 15 characters'),
  
  body('postcode')
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^\d+$/).withMessage('Postcode must contain only digits')
    .isLength({ min: 5, max: 10 }).withMessage('Postcode must be between 5 and 10 characters'),
  
  body('street_address')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 4, max: 40 }).withMessage('Street address must be between 4 and 40 characters'),
  
  body('country')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 4, max: 40 }).withMessage('Country must be between 4 and 40 characters'),
  
  body('city')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 4, max: 40 }).withMessage('City must be between 4 and 40 characters'),
  
  body('state_province')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 4, max: 40 }).withMessage('State or province must be between 4 and 40 characters'),
  
  body('dob')
    .optional({ checkFalsy: true })
    .trim()
    .isISO8601().withMessage('Date of birth must be in yyyy-MM-dd format'),
  
  body('email')
    .optional({ checkFalsy: true })
    .trim()
    .isEmail().withMessage('Email must be in valid format'),
  
  handleValidationErrors
];

module.exports = {
  validateSignup,
  validateLogin,
  validateContact,
  handleValidationErrors
};

