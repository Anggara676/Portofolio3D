# Portofolio 3D

Website portofolio satu halaman dengan layar sambutan, latar 3D (Three.js), dan komponen bergaya React Bits yang ditulis dengan JavaScript biasa.

## Isi folder

```
portofolio-3d/
├── index.html        Struktur halaman
├── css/style.css     Semua gaya (tema gelap/terang, kartu, dock, animasi)
├── img/              Taruh foto (img/foto.jpg) dan gambar sertifikat (img/sertifikat/)
├── js/config.js      DATA ANDA: nama, bio, skill, sertifikat, GitHub, sosmed, email
├── js/main.js        Logika: scene 3D, animasi, navigasi, efek kartu
└── README.md         Petunjuk ini
```

## Cara menjalankan

1. Buka `index.html` langsung di browser (klik dua kali), atau
2. Jalankan server lokal agar lebih stabil:
   - `python3 -m http.server 8000` lalu buka `http://localhost:8000`
   - atau di VS Code pakai ekstensi Live Server.

Perlu koneksi internet, karena Three.js dan font Google dimuat dari CDN.

## Cara mengganti isi

Buka `js/config.js`. Semua teks yang tampil di halaman ada di objek `CONFIG`:

| Kunci | Fungsi |
| --- | --- |
| `nama`, `inisial`, `peranTunggal` | Nama, monogram, dan jabatan |
| `foto` | Lokasi foto profil, mis. `"img/foto.jpg"`. Kosong = tampil monogram |
| `fotoTentang` | Daftar foto di kartu Tentang Saya, mis. `["img/foto/a.jpg", "img/foto/b.jpg"]`. Klik foto untuk berganti |
| `lencana` | Teks di kartu foto bergantung di Beranda: `level`, `judul`, `bawah` |
| `peran` | Daftar kalimat yang berganti di Beranda |
| `tagline`, `bio`, `info` | Teks Beranda dan Tentang Saya |
| `skills` | Bahasa pemrograman: `nama`, `mono` (singkatan di kartu), `level` (0-100), `ket` |
| `sertifikat` | `judul`, `penerbit`, `tahun`, `topik`, `url` (tautan kredensial, boleh kosong), `gambar` (lokasi gambar sertifikat, mis. `"img/sertifikat/web.jpg"`) |
| `github` | `username`, `deskripsi`, dan daftar `repos` |
| `sosmed` | `nama`, `handle`, `url`, `mono` |
| `email` | Alamat email yang tampil dan bisa disalin |

Isi bawaan hanyalah contoh, jadi ganti semuanya sebelum dipublikasikan.

## Mengubah warna dan font

Di bagian paling atas `css/style.css` ada token warna (`--accent`, `--bg`, `--fg`, dan lainnya) untuk tema gelap dan terang. Warna objek 3D mengikuti `--scene-a` dan `--scene-b`. Font diatur lewat `--f-display`, `--f-body`, dan `--f-mono`.

## Komponen bergaya React Bits

SplitText, ShinyText, GradientText, RotatingText, Magnet, Dock, TiltedCard, SpotlightCard, CountUp, dan ticker skill. Semuanya ada di `js/main.js` dan `css/style.css`, ditulis ulang tanpa React.

## Mempublikasikan

Karena hanya file statis, folder ini bisa diunggah ke GitHub Pages, Netlify, Vercel, atau Cloudflare Pages tanpa proses build.

## Layar awal dan kartu foto

- Layar awal: robot, grid titik yang menyala mengikuti kursor, nama besar, dan ikon sosial (diambil dari `sosmed` di `config.js`).
- Kartu foto bergantung di Beranda memakai `foto` dari `config.js`. Kartu bisa ditarik dan diayunkan dengan kursor atau jari.
