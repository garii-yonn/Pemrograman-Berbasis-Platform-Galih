// File utama aplikasi - Library Management System
const bookModule = require('./modules/book');
const memberModule = require('./modules/member');
const transactionModule = require('./modules/transaction');

function printSeparator(title = '') {
  console.log('\n' + '='.repeat(60));
  if (title) {
    console.log(`  ${title}`);
    console.log('='.repeat(60));
  }
}
function printResult(result) {
  if (result.success) {
    console.log('✓ SUCCESS:', result.message);
    if (result.book) console.log('  Detail Buku:', result.book);
    if (result.member) console.log('  Detail Anggota:', result.member);
    if (result.transaction) console.log('  Detail Transaksi:', result.transaction);
  } else {
    console.log('✗ ERROR:', result.message);
  }
}

// Fungsi untuk menjalankan demo aplikasi
function runDemo() {
  printSeparator('APLIKASI MANAJEMEN PERPUSTAKAAN');
  console.log('Demonstrasi Modularisasi Node.js\n');
  
  // ========== DEMO 1: MENAMBAH BUKU ==========
  printSeparator('1. MENAMBAH BUKU');
  
  console.log('\n→ Menambahkan buku: "Ikigai: The Japanese Secret to a Long and Happy Life"');
  let result = bookModule.addBook(
    'Ikigai: The Japanese Secret to a Long and Happy Life',
    'Héctor García & Francesc Miralles',
    '978-602-1201-80-0',
    2019,
    5
  );
  printResult(result);
  
  console.log('\n→ Menambahkan buku: "Bumi Manusia"');
  result = bookModule.addBook(
    'Bumi Manusia',
    'Pramoedya Ananta Toer',
    '978-6024242534',
    1980,
    3
  );
  printResult(result);
  
  console.log('\n→ Menambahkan buku: "Ronggeng Dukuh Paruk"');
  result = bookModule.addBook(
    'Ronggeng Dukuh Paruk',
    'Ahmad Tohari',
    '978-6020331904',
    1982,
    4
  );
  printResult(result);
  
  console.log('\n→ Mencoba menambahkan buku dengan ISBN yang sama (harus gagal)');
  result = bookModule.addBook(
    'Ikigai: The Japanese Secret to a Long and Happy Life',
    'Héctor García & Francesc Miralles',
    '978-602-1201-80-0',
    2019,
    2
  );
  printResult(result);
  
  // ========== DEMO 2: MENAMBAH ANGGOTA ==========
  printSeparator('2. MENAMBAH ANGGOTA');
  
  console.log('\n→ Menambahkan anggota: Galih Pajriansyah');
  result = memberModule.addMember(
    'Galih Pajriansyah',
    'Galih Pajriansyah@email.com',
    '081234567890',
    'Jl. Cibolang'
  );
  printResult(result);
  
  console.log('\n→ Menambahkan anggota: Siti Aminah');
  result = memberModule.addMember(
    'Siti Aminah',
    'siti.aminah@email.com',
    '082345678901',
    'Jl. Sudirman No. 45, Bandung'
  );
  printResult(result);
  
  console.log('\n→ Menambahkan anggota: Ahmad Rizki');
  result = memberModule.addMember(
    'Ahmad Rizki',
    'ahmad.rizki@email.com',
    '083456789012',
    'Jl. Diponegoro No. 78, Surabaya'
  );
  printResult(result);
  
  console.log('\n→ Mencoba menambahkan anggota dengan email yang sama (harus gagal)');
  result = memberModule.addMember(
    'Galih Pajriansyah',
    'Galih Pajriansyah@email.com',
    '081234567890',
    'Jl. Cibolang'
  );
  printResult(result);
  
  // ========== DEMO 3: TRANSAKSI PEMINJAMAN ==========
  printSeparator('3. TRANSAKSI PEMINJAMAN BUKU');
  
  console.log('\n→ Galih meminjam buku "Ikigai: The Japanese Secret to a Long and Happy Lif"');
  result = transactionModule.borrowBook(1, 1);
  printResult(result);
  
  console.log('\n→ Galih meminjam buku "Bumi Manusia"');
  result = transactionModule.borrowBook(1, 2);
  printResult(result);
  
  console.log('\n→ Siti meminjam buku "Ronggeng Dukuh Paruk"');
  result = transactionModule.borrowBook(2, 3);
  printResult(result);
  
  console.log('\n→ Ahmad meminjam buku "Laskar Pelangi"');
  result = transactionModule.borrowBook(3, 1);
  printResult(result);
  
  console.log('\n→ Mencoba peminjaman buku yang sudah dipinjam (harus gagal)');
  result = transactionModule.borrowBook(1, 1);
  printResult(result);
  
  // ========== DEMO 4: PENCARIAN BUKU ==========
  printSeparator('4. PENCARIAN BUKU');
  
  console.log('\n→ Mencari buku dengan kata kunci "Laskar"');
  const searchResults = bookModule.searchBookByTitle('Laskar');
  console.log(`Ditemukan ${searchResults.length} buku:`);
  searchResults.forEach(book => {
    console.log(`  - ${book.title} oleh ${book.author} (Tersedia: ${book.available}/${book.stock})`);
  });
  
  // ========== DEMO 5: PENGEMBALIAN BUKU ==========
  printSeparator('5. PENGEMBALIAN BUKU');
  
  console.log('\n→ Galih mengembalikan buku "Ikigai: The Japanese Secret to a Long and Happy Lif"');
  result = transactionModule.returnBook(1, 1);
  printResult(result);
  
  console.log('\n→ Mencoba mengembalikan buku yang tidak dipinjam (harus gagal)');
  result = transactionModule.returnBook(2, 1);
  printResult(result);
  
  // ========== DEMO 6: STATISTIK PERPUSTAKAAN ==========
  printSeparator('6. STATISTIK PERPUSTAKAAN');
  
  const stats = transactionModule.getStatistics();
  console.log('\nStatistik Perpustakaan:');
  console.log(`  Total Buku dalam Koleksi: ${stats.totalBooks} buku`);
  console.log(`  Buku Tersedia: ${stats.availableBooks} buku`);
  console.log(`  Buku Dipinjam: ${stats.borrowedBooks} buku`);
  console.log(`  Total Anggota: ${stats.totalMembers} orang`);
  console.log(`  Anggota Aktif: ${stats.activeMembers} orang`);
  console.log(`  Total Transaksi: ${stats.totalTransactions} transaksi`);
  
  // ========== DEMO 7: DAFTAR SEMUA BUKU ==========
  printSeparator('7. DAFTAR SEMUA BUKU');
  
  const allBooks = bookModule.getAllBooks();
  console.log(`\nTotal ${allBooks.length} buku dalam koleksi:\n`);
  allBooks.forEach((book, index) => {
    console.log(`${index + 1}. "${book.title}"`);
    console.log(`   Penulis: ${book.author}`);
    console.log(`   ISBN: ${book.isbn}`);
    console.log(`   Tahun: ${book.year}`);
    console.log(`   Stok: ${book.available}/${book.stock}`);
    console.log('');
  });
  
  // ========== DEMO 8: DAFTAR SEMUA ANGGOTA ==========
  printSeparator('8. DAFTAR SEMUA ANGGOTA');
  
  const allMembers = memberModule.getAllMembers();
  console.log(`\nTotal ${allMembers.length} anggota terdaftar:\n`);
  allMembers.forEach((member, index) => {
    console.log(`${index + 1}. ${member.name}`);
    console.log(`   Email: ${member.email}`);
    console.log(`   Telepon: ${member.phone}`);
    console.log(`   Buku Dipinjam: ${member.borrowedBooks.length} buku`);
    if (member.borrowedBooks.length > 0) {
      console.log(`   ID Buku: [${member.borrowedBooks.join(', ')}]`);
    }
    console.log('');
  });
  
  // ========== DEMO 9: RIWAYAT TRANSAKSI ==========
  printSeparator('9. RIWAYAT TRANSAKSI');
  
  const allTransactions = transactionModule.getAllTransactions();
  console.log(`\nTotal ${allTransactions.length} transaksi:\n`);
  allTransactions.forEach((transaction, index) => {
    const member = memberModule.getMemberById(transaction.memberId);
    const book = bookModule.getBookById(transaction.bookId);
    const type = transaction.type === 'borrow' ? 'Peminjaman' : 'Pengembalian';
    
    console.log(`${index + 1}. ${type}`);
    console.log(`   Anggota: ${member.name}`);
    console.log(`   Buku: ${book.title}`);
    console.log(`   Tanggal: ${transaction.date.toLocaleString('id-ID')}`);
    console.log(`   Status: ${transaction.status}`);
    console.log('');
  });
  
  printSeparator('APLIKASI SELESAI');
  console.log('\nDemonstrasi modularisasi berhasil dijalankan!');
  console.log('Semua modul bekerja dengan baik.\n');
}
console.log('Memulai aplikasi...\n');
runDemo();