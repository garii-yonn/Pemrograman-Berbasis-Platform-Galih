// Module untuk manajemen transaksi peminjaman
const bookModule = require('./book');
const memberModule = require('./member');

// Array untuk menyimpan data transaksi
let transactions = [];
let transactionIdCounter = 1;

class Transaction {
  constructor(memberId, bookId, type) {
    this.id = transactionIdCounter++;
    this.memberId = memberId;
    this.bookId = bookId;
    this.type = type; // 'borrow' atau 'return'
    this.date = new Date();
    this.status = 'active';
  }
}

/**
 * Meminjam buku
 * @param {number} memberId - ID anggota
 * @param {number} bookId - ID buku
 * @returns {Object} - Hasil operasi
 */
function borrowBook(memberId, bookId) {
  // Validasi anggota
  const member = memberModule.getMemberById(memberId);
  if (!member) {
    return { success: false, message: 'Anggota tidak ditemukan' };
  }
  
  // Validasi buku
  const book = bookModule.getBookById(bookId);
  if (!book) {
    return { success: false, message: 'Buku tidak ditemukan' };
  }
  
  // Cek ketersediaan buku
  if (book.available <= 0) {
    return { success: false, message: 'Buku tidak tersedia untuk dipinjam' };
  }
  
  // Cek apakah anggota sudah meminjam buku ini
  if (member.borrowedBooks.includes(bookId)) {
    return { success: false, message: 'Anggota sudah meminjam buku ini' };
  }
  
  // Cek batas peminjaman (maksimal 3 buku)
  if (member.borrowedBooks.length >= 3) {
    return { success: false, message: 'Anggota sudah mencapai batas peminjaman (3 buku)' };
  }
  
  // Proses peminjaman
  const updateBook = bookModule.updateAvailability(bookId, -1);
  if (!updateBook.success) {
    return updateBook;
  }
  
  const addToBorrowed = memberModule.addBorrowedBook(memberId, bookId);
  if (!addToBorrowed.success) {
    // Rollback update buku
    bookModule.updateAvailability(bookId, 1);
    return addToBorrowed;
  }
  
  // Buat transaksi
  const transaction = new Transaction(memberId, bookId, 'borrow');
  transactions.push(transaction);
  
  return {
    success: true,
    message: `Buku "${book.title}" berhasil dipinjam oleh ${member.name}`,
    transaction
  };
}

/**
 * Mengembalikan buku
 * @param {number} memberId - ID anggota
 * @param {number} bookId - ID buku
 * @returns {Object} - Hasil operasi
 */
function returnBook(memberId, bookId) {
  // Validasi anggota
  const member = memberModule.getMemberById(memberId);
  if (!member) {
    return { success: false, message: 'Anggota tidak ditemukan' };
  }
  
  // Validasi buku
  const book = bookModule.getBookById(bookId);
  if (!book) {
    return { success: false, message: 'Buku tidak ditemukan' };
  }
  
  // Cek apakah anggota meminjam buku ini
  if (!member.borrowedBooks.includes(bookId)) {
    return { success: false, message: 'Anggota tidak meminjam buku ini' };
  }
  
  // Proses pengembalian
  const updateBook = bookModule.updateAvailability(bookId, 1);
  if (!updateBook.success) {
    return updateBook;
  }
  
  const removeFromBorrowed = memberModule.removeBorrowedBook(memberId, bookId);
  if (!removeFromBorrowed.success) {
    bookModule.updateAvailability(bookId, -1);
    return removeFromBorrowed;
  }
  
  const transaction = new Transaction(memberId, bookId, 'return');
  transaction.status = 'completed';
  transactions.push(transaction);
  
  return {
    success: true,
    message: `Buku "${book.title}" berhasil dikembalikan oleh ${member.name}`,
    transaction
  };
}

/**
 * Mendapatkan semua transaksi
 * @returns {Array} - Array berisi semua transaksi
 */
function getAllTransactions() {
  return transactions;
}

/**
 * Mendapatkan transaksi berdasarkan anggota
 * @param {number} memberId - ID anggota
 * @returns {Array} - Array transaksi anggota
 */
function getTransactionsByMember(memberId) {
  return transactions.filter(t => t.memberId === memberId);
}

/**
 * Mendapatkan statistik perpustakaan
 * @returns {Object} - Statistik perpustakaan
 */
function getStatistics() {
  const allBooks = bookModule.getAllBooks();
  const allMembers = memberModule.getAllMembers();
  
  const totalBooks = allBooks.reduce((sum, book) => sum + book.stock, 0);
  const availableBooks = allBooks.reduce((sum, book) => sum + book.available, 0);
  const borrowedBooks = totalBooks - availableBooks;
  
  return {
    totalBooks,
    availableBooks,
    borrowedBooks,
    totalMembers: allMembers.length,
    totalTransactions: transactions.length,
    activeMembers: allMembers.filter(m => m.borrowedBooks.length > 0).length
  };
}
module.exports = {
  borrowBook,
  returnBook,
  getAllTransactions,
  getTransactionsByMember,
  getStatistics
};