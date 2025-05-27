// file: scripts/dropIndex.js (contoh lokasi)

const mongoose = require('mongoose');

async function dropIndex() {
  try {
    await mongoose.connect('mongodb://localhost:27017/ontix', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection.db;

    // Hapus index 'id_1'
    await db.collection('histories').dropIndex('idHistory_1');

    console.log('Index id_1 berhasil dihapus.');

  } catch (error) {
    console.error('Gagal hapus index:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

dropIndex();
