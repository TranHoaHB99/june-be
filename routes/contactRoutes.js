const express = require('express');
const router = express.Router();
const {
  listContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact
} = require('../controllers/contactController');
const { validateContact } = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');

// All contact routes require authentication
router.use(authenticateToken);

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Lấy danh sách tất cả liên hệ của người dùng
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách liên hệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Không có token hoặc token không hợp lệ
 */
router.get('/', listContacts);

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết một liên hệ
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của liên hệ
 *     responses:
 *       200:
 *         description: Thông tin liên hệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Không tìm thấy liên hệ
 *       401:
 *         description: Không có token hoặc token không hợp lệ
 */
router.get('/:id', getContact);

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Thêm liên hệ mới
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactRequest'
 *           example:
 *             first_name: Jane
 *             last_name: Smith
 *             phone_number: "1234567890"
 *             postcode: "12345"
 *             street_address: 123 Main Street
 *             country: United States
 *             city: New York City
 *             state_province: New York
 *             dob: "1990-01-01"
 *             email: jane@example.com
 *     responses:
 *       201:
 *         description: Thêm liên hệ thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Không có token hoặc token không hợp lệ
 */
router.post('/', validateContact, addContact);

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Cập nhật thông tin liên hệ
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của liên hệ
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactRequest'
 *           example:
 *             first_name: Jane
 *             last_name: Smith
 *             phone_number: "9876543210"
 *             postcode: "54321"
 *             street_address: 456 Oak Avenue
 *             country: United States
 *             city: Los Angeles
 *             state_province: California
 *             dob: "1995-05-15"
 *             email: jane.smith@example.com
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Không tìm thấy liên hệ
 *       401:
 *         description: Không có token hoặc token không hợp lệ
 */
router.put('/:id', validateContact, updateContact);

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Xóa liên hệ
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của liên hệ
 *     responses:
 *       200:
 *         description: Xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Không tìm thấy liên hệ
 *       401:
 *         description: Không có token hoặc token không hợp lệ
 */
router.delete('/:id', deleteContact);

module.exports = router;

