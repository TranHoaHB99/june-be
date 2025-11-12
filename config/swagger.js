const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'June Backend API',
      version: '1.0.0',
      description: 'API documentation cho ứng dụng quản lý người dùng và danh bạ liên hệ',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://june-be.onrender.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            first_name: {
              type: 'string',
              example: 'John',
            },
            last_name: {
              type: 'string',
              example: 'Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com',
            },
          },
        },
        SignupRequest: {
          type: 'object',
          required: ['first_name', 'last_name', 'email', 'password'],
          properties: {
            first_name: {
              type: 'string',
              description: 'Chỉ chữ cái, không có khoảng trắng',
              example: 'John',
            },
            last_name: {
              type: 'string',
              description: 'Chỉ chữ cái, không có khoảng trắng',
              example: 'Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email chưa được đăng ký',
              example: 'john@example.com',
            },
            password: {
              type: 'string',
              description: '6-10 ký tự, phải có số, chữ hoa, chữ thường, ký tự đặc biệt',
              example: 'Pass123!',
            },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com',
            },
            password: {
              type: 'string',
              example: 'Pass123!',
            },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              example: 'User registered successfully',
            },
            data: {
              type: 'object',
              properties: {
                user: {
                  $ref: '#/components/schemas/User',
                },
                token: {
                  type: 'string',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                },
              },
            },
          },
        },
        Contact: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            user_id: {
              type: 'integer',
              example: 1,
            },
            first_name: {
              type: 'string',
              maxLength: 20,
              example: 'Jane',
            },
            last_name: {
              type: 'string',
              maxLength: 20,
              example: 'Smith',
            },
            phone_number: {
              type: 'string',
              description: 'Chỉ số, 8-15 ký tự',
              example: '1234567890',
            },
            postcode: {
              type: 'string',
              nullable: true,
              description: 'Tùy chọn, chỉ số, 5-10 ký tự',
              example: '12345',
            },
            street_address: {
              type: 'string',
              nullable: true,
              description: 'Tùy chọn, 4-40 ký tự',
              example: '123 Main Street',
            },
            country: {
              type: 'string',
              nullable: true,
              description: 'Tùy chọn, 4-40 ký tự',
              example: 'United States',
            },
            city: {
              type: 'string',
              nullable: true,
              description: 'Tùy chọn, 4-40 ký tự',
              example: 'New York City',
            },
            state_province: {
              type: 'string',
              nullable: true,
              description: 'Tùy chọn, 4-40 ký tự',
              example: 'New York',
            },
            dob: {
              type: 'string',
              format: 'date',
              nullable: true,
              description: 'Tùy chọn, định dạng yyyy-MM-dd',
              example: '1990-01-01',
            },
            email: {
              type: 'string',
              format: 'email',
              nullable: true,
              description: 'Tùy chọn, định dạng email hợp lệ',
              example: 'jane@example.com',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-01T00:00:00Z',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-01T00:00:00Z',
            },
          },
        },
        ContactRequest: {
          type: 'object',
          required: ['first_name', 'last_name', 'phone_number'],
          properties: {
            first_name: {
              type: 'string',
              maxLength: 20,
              example: 'Jane',
            },
            last_name: {
              type: 'string',
              maxLength: 20,
              example: 'Smith',
            },
            phone_number: {
              type: 'string',
              description: 'Chỉ số, 8-15 ký tự',
              example: '1234567890',
            },
            postcode: {
              type: 'string',
              description: 'Tùy chọn, chỉ số, 5-10 ký tự',
              example: '12345',
            },
            street_address: {
              type: 'string',
              description: 'Tùy chọn, 4-40 ký tự',
              example: '123 Main Street',
            },
            country: {
              type: 'string',
              description: 'Tùy chọn, 4-40 ký tự',
              example: 'United States',
            },
            city: {
              type: 'string',
              description: 'Tùy chọn, 4-40 ký tự',
              example: 'New York City',
            },
            state_province: {
              type: 'string',
              description: 'Tùy chọn, 4-40 ký tự',
              example: 'New York',
            },
            dob: {
              type: 'string',
              format: 'date',
              description: 'Tùy chọn, định dạng yyyy-MM-dd',
              example: '1990-01-01',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Tùy chọn, định dạng email hợp lệ',
              example: 'jane@example.com',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              example: 'Validation failed',
            },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: {
                    type: 'string',
                    example: 'email',
                  },
                  message: {
                    type: 'string',
                    example: 'Email must be in valid format',
                  },
                },
              },
            },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              example: 'Operation successful',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js', './server.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

