// Module untuk validasi data
// Fungsi-fungsi untuk memvalidasi input data

/**
 * Validasi apakah string kosong atau tidak
 * @param {string} str - String yang akan divalidasi
 * @returns {boolean}
 */
function isNotEmpty(str) {
  return str !== null && str !== undefined && str.trim().length > 0;
}

/**
 * Validasi format ISBN (10 atau 13 digit)
 * @param {string} isbn - ISBN yang akan divalidasi
 * @returns {boolean}
 */
function isValidISBN(isbn) {
  const isbnClean = isbn.replace(/[-\s]/g, '');
  return /^\d{10}(\d{3})?$/.test(isbnClean);
}

/**
 * Validasi format email
 * @param {string} email - Email yang akan divalidasi
 * @returns {boolean}
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validasi nomor telepon (minimal 10 digit)
 * @param {string} phone - Nomor telepon yang akan divalidasi
 * @returns {boolean}
 */
function isValidPhone(phone) {
  const phoneClean = phone.replace(/[\s()-]/g, '');
  return /^\d{10,15}$/.test(phoneClean);
}

/**
 * Validasi tanggal (harus tanggal valid)
 * @param {Date} date - Tanggal yang akan divalidasi
 * @returns {boolean}
 */
function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}
module.exports = {
  isNotEmpty,
  isValidISBN,
  isValidEmail,
  isValidPhone,
  isValidDate
};