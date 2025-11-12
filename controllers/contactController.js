const db = require('../config/database');

const listContacts = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { rows: contacts } = await db.query(
      'SELECT * FROM contacts WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    res.json({
      success: true,
      message: 'Contacts retrieved successfully',
      data: contacts
    });
  } catch (error) {
    console.error('List contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
};

const getContact = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const { rows } = await db.query(
      'SELECT * FROM contacts WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    const contact = rows[0];

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact retrieved successfully',
      data: contact
    });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
};

const addContact = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {
      first_name,
      last_name,
      phone_number,
      postcode,
      street_address,
      country,
      city,
      state_province,
      dob,
      email
    } = req.body;

    const insert = await db.query(
      `INSERT INTO contacts (
        user_id, first_name, last_name, phone_number, postcode,
        street_address, country, city, state_province, dob, email
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`,
      [
        userId,
        first_name,
        last_name,
        phone_number,
        postcode || null,
        street_address || null,
        country || null,
        city || null,
        state_province || null,
        dob || null,
        email || null
      ]
    );

    const contact = insert.rows[0];

    res.status(201).json({
      success: true,
      message: 'Contact added successfully',
      data: contact
    });
  } catch (error) {
    console.error('Add contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
};

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const {
      first_name,
      last_name,
      phone_number,
      postcode,
      street_address,
      country,
      city,
      state_province,
      dob,
      email
    } = req.body;

    // Check if contact exists and belongs to user
    const existing = await db.query(
      'SELECT id FROM contacts WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    const existingContact = existing.rows[0];

    if (!existingContact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    await db.query(
      `UPDATE contacts SET
        first_name = $1,
        last_name = $2,
        phone_number = $3,
        postcode = $4,
        street_address = $5,
        country = $6,
        city = $7,
        state_province = $8,
        dob = $9,
        email = $10,
        updated_at = NOW()
      WHERE id = $11 AND user_id = $12`,
      [
        first_name,
        last_name,
        phone_number,
        postcode || null,
        street_address || null,
        country || null,
        city || null,
        state_province || null,
        dob || null,
        email || null,
        id,
        userId
      ]
    );

    const { rows: updatedRows } = await db.query(
      'SELECT * FROM contacts WHERE id = $1',
      [id]
    );
    const updatedContact = updatedRows[0];

    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: updatedContact
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Check if contact exists and belongs to user
    const { rows: found } = await db.query(
      'SELECT id FROM contacts WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    const contact = found[0];

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    await db.query('DELETE FROM contacts WHERE id = $1 AND user_id = $2', [id, userId]);

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
};

module.exports = {
  listContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact
};

