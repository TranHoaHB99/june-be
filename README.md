# June Backend API

Ứng dụng Node.js backend cho quản lý người dùng và danh bạ liên hệ.

## Tính năng

### 1. Đăng ký (Sign Up)
- **First name**: Bắt buộc, chỉ chữ cái
- **Last name**: Bắt buộc, chỉ chữ cái
- **Email**: Bắt buộc, định dạng hợp lệ, không được đăng ký trước
- **Password**: 6-10 ký tự, phải có số, chữ hoa, chữ thường, ký tự đặc biệt
- Hiển thị thông báo lỗi rõ ràng khi dữ liệu không hợp lệ

### 2. Đăng nhập (Login)
- Đăng nhập thành công với email và password đúng
- Hiển thị thông báo lỗi rõ ràng khi dữ liệu không hợp lệ

### 3. Danh sách liên hệ (List Contacts)
- Xem danh sách tất cả liên hệ của người dùng
- Có thể click vào liên hệ để xem chi tiết (để chỉnh sửa)
- Có thể xóa liên hệ từ danh sách

### 4. Thêm/Sửa liên hệ (Add/Edit Contact)
- **First name, Last name**: Bắt buộc, tối đa 20 ký tự
- **Phone number**: Bắt buộc, chỉ số, 8-15 ký tự
- **Postcode**: Tùy chọn, chỉ số, 5-10 ký tự
- **Street address, Country, City**: Tùy chọn, 4-40 ký tự
- **State or Province**: Tùy chọn, 4-40 ký tự
- **DOB**: Tùy chọn, định dạng yyyy-MM-dd
- **Email**: Tùy chọn, định dạng hợp lệ

## Cài đặt

### Yêu cầu
- Node.js (v18 trở lên)
- npm hoặc yarn

### Các bước cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Tạo file `.env` từ template (tùy chọn):
```bash
# Tạo file .env với nội dung:
PORT=3000
JWT_SECRET=your-secret-key-change-this-in-production
# Postgres connection string (Neon/Supabase/Render Postgres)
DATABASE_URL=postgres://<user>:<password>@<host>:<port>/<db>
# Với Neon/Supabase cần SSL
PGSSL=true
```

3. Chạy ứng dụng:
```bash
# Development mode (với nodemon)
npm run dev

# Production mode
npm start
```

Server sẽ chạy tại `http://localhost:3000`

## Swagger API Documentation

Sau khi khởi động server, bạn có thể truy cập Swagger UI để xem và test tất cả các API endpoints:

**Swagger UI**: http://localhost:3000/api-docs

Swagger UI cung cấp:
- 📖 Documentation đầy đủ cho tất cả endpoints
- 🧪 Test API trực tiếp từ trình duyệt
- 🔐 Hỗ trợ authentication với JWT token
- 📝 Xem request/response schemas
- ✅ Validation rules và examples

### Cách sử dụng Swagger UI:

1. Truy cập http://localhost:3000/api-docs
2. Để test các endpoint cần authentication:
   - Đầu tiên, đăng ký hoặc đăng nhập qua `/api/auth/signup` hoặc `/api/auth/login`
   - Copy JWT token từ response
   - Click nút **"Authorize"** ở đầu trang Swagger UI
   - Nhập token vào ô (format: `Bearer <token>` hoặc chỉ `<token>`)
   - Click **"Authorize"** và **"Close"**
   - Bây giờ bạn có thể test các endpoint contacts

## API Endpoints

### Authentication

#### POST `/api/auth/signup`
Đăng ký người dùng mới

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "password": "Pass123!"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": "john@example.com"
    },
    "token": "jwt-token-here"
  }
}
```

#### POST `/api/auth/login`
Đăng nhập

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "Pass123!"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": "john@example.com"
    },
    "token": "jwt-token-here"
  }
}
```

### Contacts

Tất cả các endpoint liên hệ yêu cầu xác thực. Thêm header:
```
Authorization: Bearer <token>
```

#### GET `/api/contacts`
Lấy danh sách tất cả liên hệ của người dùng

**Response:**
```json
{
  "success": true,
  "message": "Contacts retrieved successfully",
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "first_name": "Jane",
      "last_name": "Smith",
      "phone_number": "1234567890",
      "postcode": "12345",
      "street_address": "123 Main St",
      "country": "USA",
      "city": "New York",
      "state_province": "NY",
      "dob": "1990-01-01",
      "email": "jane@example.com",
      "created_at": "2024-01-01 00:00:00",
      "updated_at": "2024-01-01 00:00:00"
    }
  ]
}
```

#### GET `/api/contacts/:id`
Lấy thông tin chi tiết một liên hệ

#### POST `/api/contacts`
Thêm liên hệ mới

**Request Body:**
```json
{
  "first_name": "Jane",
  "last_name": "Smith",
  "phone_number": "1234567890",
  "postcode": "12345",
  "street_address": "123 Main St",
  "country": "USA",
  "city": "New York",
  "state_province": "NY",
  "dob": "1990-01-01",
  "email": "jane@example.com"
}
```

#### PUT `/api/contacts/:id`
Cập nhật thông tin liên hệ

**Request Body:** (tương tự POST)

#### DELETE `/api/contacts/:id`
Xóa liên hệ

**Response:**
```json
{
  "success": true,
  "message": "Contact deleted successfully"
}
```

## Cấu trúc dự án

```
june-be/
├── config/
│   └── database.js          # Cấu hình database Postgres (pg Pool)
├── controllers/
│   ├── authController.js    # Xử lý đăng ký/đăng nhập
│   └── contactController.js # Xử lý CRUD liên hệ
├── middleware/
│   ├── auth.js              # Middleware xác thực JWT
│   └── validation.js        # Validation rules
├── routes/
│   ├── authRoutes.js        # Routes cho authentication
│   └── contactRoutes.js     # Routes cho contacts
├── server.js                # Entry point
├── package.json
└── README.md
```

## Công nghệ sử dụng

- **Express.js**: Web framework
- **Postgres (pg)**: Database
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **express-validator**: Input validation
- **CORS**: Cross-origin resource sharing
- **Swagger (swagger-ui-express, swagger-jsdoc)**: API docs

## Deploy miễn phí (Render + Neon)

### 1) Tạo Postgres miễn phí với Neon
- Đăng ký Neon: `https://neon.tech`
- Tạo Project + Database
- Lấy `connection string` (Database URL), dạng: `postgres://user:pass@host/db`
- Bật SSL (Neon yêu cầu). Trong `.env` đặt:
  - `DATABASE_URL=<neon-connection-string>`
  - `PGSSL=true`

### 2) Deploy backend miễn phí với Render
- Đăng ký Render: `https://render.com`
- New > Web Service > chọn repo GitHub này
- Runtime: Node 18+
- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variables:
  - `PORT=10000` (Render sẽ override, có thể bỏ qua)
  - `JWT_SECRET=<chuoi_bi_mat_cua_ban>`
  - `DATABASE_URL=<neon-connection-string>`
  - `PGSSL=true`
- Chọn Plan Free

Sau khi deploy xong, truy cập:
- API: `https://<service-name>.onrender.com`
- Swagger UI: `https://<service-name>.onrender.com/api-docs`

Lưu ý: Free tier có thể “spin down” sau một thời gian không dùng, lần gọi đầu có thể chậm.

## Validation Rules

### Signup
- First name, Last name: Chỉ chữ cái (a-z, A-Z), không có khoảng trắng
- Email: Định dạng email hợp lệ, không được đăng ký trước
- Password: 6-10 ký tự, phải có:
  - Ít nhất 1 số
  - Ít nhất 1 chữ hoa
  - Ít nhất 1 chữ thường
  - Ít nhất 1 ký tự đặc biệt

### Contact
- First name, Last name: Bắt buộc, tối đa 20 ký tự
- Phone number: Bắt buộc, chỉ số, 8-15 ký tự
- Postcode: Tùy chọn, chỉ số, 5-10 ký tự
- Street address, Country, City, State/Province: Tùy chọn, 4-40 ký tự
- DOB: Tùy chọn, định dạng yyyy-MM-dd
- Email: Tùy chọn, định dạng email hợp lệ

## Lỗi và xử lý

Tất cả các response lỗi đều có format:
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Email must be in valid format"
    }
  ]
}
```

## Health Check

GET `/health` - Kiểm tra trạng thái server
