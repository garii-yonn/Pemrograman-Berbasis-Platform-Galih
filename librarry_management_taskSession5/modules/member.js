// Module untuk manajemen anggota perpustakaan
const validator = require('./validator');

let members = [];
let memberIdCounter = 1;

class Member {
  constructor(name, email, phone, address) {
    this.id = memberIdCounter++;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.registrationDate = new Date();
    this.borrowedBooks = [];
  }
}

/**
 * Menambah anggota baru
 * @param {string} name - Nama anggota
 * @param {string} email - Email anggota
 * @param {string} phone - Nomor telepon
 * @param {string} address - Alamat
 * @returns {Object} - Hasil operasi
 */
function addMember(name, email, phone, address) {
  // Validasi input
  if (!validator.isNotEmpty(name)) {
    return { success: false, message: 'Nama tidak boleh kosong' };
  }
  
  if (!validator.isValidEmail(email)) {
    return { success: false, message: 'Format email tidak valid' };
  }
  
  if (!validator.isValidPhone(phone)) {
    return { success: false, message: 'Format nomor telepon tidak valid' };
  }
  
  // Cek apakah email sudah terdaftar
  const existingMember = members.find(member => member.email === email);
  if (existingMember) {
    return { success: false, message: 'Email sudah terdaftar' };
  }
  
  const newMember = new Member(name, email, phone, address);
  members.push(newMember);
  
  return { 
    success: true, 
    message: 'Anggota berhasil ditambahkan',
    member: newMember
  };
}

/**
 * Mendapatkan semua anggota
 * @returns {Array} - Array berisi semua anggota
 */
function getAllMembers() {
  return members;
}

/**
 * Mencari anggota berdasarkan ID
 * @param {number} id - ID anggota
 * @returns {Object|null} - Objek anggota atau null
 */
function getMemberById(id) {
  return members.find(member => member.id === id) || null;
}

/**
 * Mencari anggota berdasarkan email
 * @param {string} email - Email anggota
 * @returns {Object|null} - Objek anggota atau null
 */
function getMemberByEmail(email) {
  return members.find(member => member.email === email) || null;
}

/**
 * Menambah buku yang dipinjam anggota
 * @param {number} memberId - ID anggota
 * @param {number} bookId - ID buku
 * @returns {Object} - Hasil operasi
 */
function addBorrowedBook(memberId, bookId) {
  const member = getMemberById(memberId);
  
  if (!member) {
    return { success: false, message: 'Anggota tidak ditemukan' };
  }
  
  if (member.borrowedBooks.includes(bookId)) {
    return { success: false, message: 'Buku sudah dipinjam oleh anggota ini' };
  }
  
  member.borrowedBooks.push(bookId);
  return { success: true, message: 'Buku ditambahkan ke daftar pinjaman', member };
}

/**
 * Menghapus buku yang dipinjam anggota
 * @param {number} memberId - ID anggota
 * @param {number} bookId - ID buku
 * @returns {Object} - Hasil operasi
 */
function removeBorrowedBook(memberId, bookId) {
  const member = getMemberById(memberId);
  
  if (!member) {
    return { success: false, message: 'Anggota tidak ditemukan' };
  }
  
  const index = member.borrowedBooks.indexOf(bookId);
  if (index === -1) {
    return { success: false, message: 'Buku tidak ada dalam daftar pinjaman' };
  }
  
  member.borrowedBooks.splice(index, 1);
  return { success: true, message: 'Buku dihapus dari daftar pinjaman', member };
}
module.exports = {
  addMember,
  getAllMembers,
  getMemberById,
  getMemberByEmail,
  addBorrowedBook,
  removeBorrowedBook
};