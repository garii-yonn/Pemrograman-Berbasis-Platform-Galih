// Module untuk manajemen buku
const validator = require('./validator');

let books = [];
let bookIdCounter = 1;

class Book {
  constructor(title, author, isbn, year, stock) {
    this.id = bookIdCounter++;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.year = year;
    this.stock = stock;
    this.available = stock;
  }
}

/**
 * Menambah buku baru ke perpustakaan
 * @param {string} title - Judul buku
 * @param {string} author - Penulis buku
 * @param {string} isbn - ISBN buku
 * @param {number} year - Tahun terbit
 * @param {number} stock - Jumlah stok
 * @returns {Object} - Hasil operasi
 */
function addBook(title, author, isbn, year, stock) {
  // Validasi input
  if (!validator.isNotEmpty(title)) {
    return { success: false, message: 'Judul buku tidak boleh kosong' };
  }
  
  if (!validator.isNotEmpty(author)) {
    return { success: false, message: 'Penulis tidak boleh kosong' };
  }
  
  if (!validator.isValidISBN(isbn)) {
    return { success: false, message: 'Format ISBN tidak valid' };
  }
  
  // Cek apakah ISBN sudah ada
  const existingBook = books.find(book => book.isbn === isbn);
  if (existingBook) {
    return { success: false, message: 'Buku dengan ISBN ini sudah ada' };
  }
  
  const newBook = new Book(title, author, isbn, year, stock);
  books.push(newBook);
  
  return { 
    success: true, 
    message: 'Buku berhasil ditambahkan',
    book: newBook
  };
}

/**
 * Mendapatkan semua buku
 * @returns {Array} - Array berisi semua buku
 */
function getAllBooks() {
  return books;
}

/**
 * Mencari buku berdasarkan ID
 * @param {number} id - ID buku
 * @returns {Object|null} - Objek buku atau null
 */
function getBookById(id) {
  return books.find(book => book.id === id) || null;
}

/**
 * Mencari buku berdasarkan judul
 * @param {string} title - Judul buku (partial match)
 * @returns {Array} - Array buku yang cocok
 */
function searchBookByTitle(title) {
  return books.filter(book => 
    book.title.toLowerCase().includes(title.toLowerCase())
  );
}

/**
 * Update ketersediaan buku
 * @param {number} id - ID buku
 * @param {number} change - Perubahan jumlah (positif atau negatif)
 * @returns {Object} - Hasil operasi
 */
function updateAvailability(id, change) {
  const book = getBookById(id);
  
  if (!book) {
    return { success: false, message: 'Buku tidak ditemukan' };
  }
  
  const newAvailable = book.available + change;
  
  if (newAvailable < 0 || newAvailable > book.stock) {
    return { success: false, message: 'Jumlah ketersediaan tidak valid' };
  }
  
  book.available = newAvailable;
  return { success: true, message: 'Ketersediaan buku berhasil diupdate', book };
}
module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  searchBookByTitle,
  updateAvailability
};