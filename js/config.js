/* ===================== DATA ANDA — ganti isi di bawah ini =====================
   Semua teks, skill, sertifikat, repo, dan tautan di sini masih contoh.
   Cukup ubah objek CONFIG, tampilan akan menyesuaikan otomatis. */
const CONFIG = {
  nama: "Ganesha Anggara Sidy",
  inisial: "GAS",
  // Foto profil: taruh file di folder img/ lalu tulis namanya di sini, mis. "img/foto.jpg". Kosongkan untuk memakai monogram.
  foto: "img/sertifikat/gambar7.png",
  // Foto di kartu "Tentang Saya": klik foto untuk berganti ke foto berikutnya. Isi 1 foto atau lebih.
  fotoTentang: ["img/foto/foto5.jpeg", "img/foto/foto4.jpeg", "img/foto/foto3.jpeg", "img/foto/foto2.jpeg", "img/foto/foto1.jpeg", "img/foto/foto6.jpeg", "img/foto/foto7.jpeg", "img/foto/foto8.jpeg", "img/foto/foto9.jpeg", "img/foto/foto10.jpeg"],
  // Kartu foto bergantung di Beranda (teks di kartu)
  lencana: { level: "JUNIOR", judul: "DEVELOPER", bawah: "PORTFOLIO" },
  peranTunggal: "Junior Developer",
  peran: ["membangun situs web", "merancang antarmuka", "menulis kode yang rapi"],
  tagline: "Saya suka menyatukan baris kode yang rapi dengan infrastruktur IT yang aman.Developer yang senang mengubah ide menjadi produk digital yang cepat, rapi, dan nyaman dipakai sekaligus memastikan jaringan dan sistem di belakangnya berjalan tanpa hambatan. Jelajahi skill, sertifikat, dan proyek saya di sini.",
  bio: [
    "Bagi saya, sistem yang hebat itu seperti mesin yang bekerja tanpa suara: tampilannya responsif di depan, sementara jaringan dan infrastrukturnya berjalan aman tanpa celah di belakang.",
    "Sebagai lulusan Teknik Informatika, saya senang menjembatani dunia web development dengan keandalan infrastruktur IT. Mulai dari merancang antarmuka web, mengamankan jaringan (Network Security), hingga bongkar-pasang troubleshooting perangkat keras maupun lunak - saya memastikan seluruh sistem berjalan mulus dan siap pakai."
  ],
  info: [["Fokus", "Junior Developer & Cyber Security"], ["Bahasa", "Indonesia, Inggris"], ["Lokasi", "Indonesia"]],
  skills: [
    { nama: "JavaScript", mono: "JS", level: 90, ket: "Frontend dan Node.js" },
    { nama: "TypeScript", mono: "TS", level: 78, ket: "Proyek berskala besar" },
    { nama: "Python", mono: "PY", level: 80, ket: "Otomasi dan data" },
    { nama: "PHP", mono: "PHP", level: 72, ket: "Backend dan API" },
    { nama: "Java", mono: "JV", level: 65, ket: "Dasar OOP dan aplikasi" },
    { nama: "HTML & CSS", mono: "CSS", level: 92, ket: "Layout dan animasi" },
    { nama: "SQL", mono: "SQL", level: 75, ket: "MySQL dan PostgreSQL" },
    { nama: "Bash", mono: "SH", level: 60, ket: "Skrip dan otomasi" }
  ],
  // Sertifikat: isi "gambar" dengan lokasi file, mis. "img/sertifikat/dasar-web.jpg". Kosong = tampil kotak placeholder.
  sertifikat: [
    { judul: "Classical Cryptography for Beginner Course", penerbit: "Cyber Academy Indonesia", tahun: "2025", topik: ["Mempelajari sejarah dan dasar-dasar kriptografi klasik."], url: "", gambar: "img/sertifikat/gambar1.jpg" },
    { judul: "Introduction to Information Security Course", penerbit: "Cyber Academy Indonesia", tahun: "2025", topik: ["Mempelajari konsep dasar keamanan informasi, prinsip (CIA Triad Confidentiality, Integrity, Availability), serta manajemen risiko keamanan data."], url: "", gambar: "img/sertifikat/gambar2.jpg" },
    { judul: "Ethical Hacker Course", penerbit: "Cisco Networking Academy", tahun: "2026", topik: ["Memahami teknik pemindaian jaringan, analisis kerentanan, serta standar operasional keamanan siber yang etis."], url: "", gambar: "img/sertifikat/gambar3.jpg" },
    { judul: "Data Analyst", penerbit: "PT Ebiz Karisma Internasional", tahun: "2026", topik: ["Melakukan pengolahan, pembersihan, dan analisis data menggunakan Microsoft Excel serta Google Cloud, serta membangun dasbor interaktif dengan Power BI."], url: "", gambar: "img/sertifikat/gambar4.jpg" },
  ],
  github: {
    username: "Anggara16",
    deskripsi: "Kode, eksperimen, dan proyek yang saya bagikan secara terbuka.",
    repos: [
      { nama: "portofolio-3d", desk: "Situs portofolio dengan Three.js dan animasi interaktif.", bahasa: "JavaScript", topik: ["three.js", "css"] },
      { nama: "aplikasi-catatan", desk: "Aplikasi catatan sederhana dengan penyimpanan lokal.", bahasa: "TypeScript", topik: ["pwa"] },
      { nama: "api-toko", desk: "REST API toko daring lengkap dengan autentikasi.", bahasa: "PHP", topik: ["api", "mysql"] },
      { nama: "skrip-otomasi", desk: "Kumpulan skrip Python untuk merapikan file dan data.", bahasa: "Python", topik: ["otomasi"] }
    ]
  },
  sosmed: [
    { nama: "GitHub", handle: "@username-anda", url: "https://github.com/Anggara16", mono: "GH" },
    { nama: "LinkedIn", handle: "in/username-anda", url: "https://www.linkedin.com/in/ganesha-anggara-sidy-92114930a/", mono: "in" },
    { nama: "Instagram", handle: "@username.anda", url: "https://www.instagram.com/anggaara_01?exln=MXBreHp0YTFuY2dmdA%3D%3D&utm_source=qr", mono: "IG" },
    { nama: "X", handle: "@username_anda", url: "https://x.com/username_anda", mono: "X" }
  ],
  email: "ganeshaanggarasidy@gmail.com"
};
/* ============================================================================== */
