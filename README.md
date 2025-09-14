# Habit Forge

## Deskripsi

**Habit Forge** adalah aplikasi pelacak kebiasaan yang dirancang untuk membantu pengguna membangun dan mempertahankan kebiasaan positif, terinspirasi oleh buku "Atomic Habits". Aplikasi ini menggabungkan pelacakan kebiasaan dengan elemen gamifikasi untuk membuat prosesnya lebih menarik dan memotivasi.

* **Tujuan Proyek yang Jelas 🎯**: Tujuan utama dari "Habit Forge" adalah untuk membantu pengguna membangun dan mempertahankan kebiasaan positif. Hal ini terinspirasi dari buku "Atomic Habits", yang memberikan landasan konseptual yang kuat untuk aplikasi ini. Dengan fokus pada pelacakan kebiasaan yang digabungkan dengan gamifikasi, proyek ini memiliki sasaran yang spesifik dan terukur.
* **Latar Belakang yang Kuat 💪**: Proyek ini didasarkan pada prinsip-prinsip yang telah terbukti dari buku "Atomic Habits", yang memberikan kerangka kerja yang solid untuk pengembangan fitur-fitur aplikasi. Penggunaan teknologi modern seperti Node.js, Express, dan Replicate untuk AI menunjukkan pemahaman yang baik tentang pengembangan aplikasi web saat ini. Pemanfaatan AI dari IBM Granite untuk pembuatan dan optimalisasi kode juga menunjukkan pendekatan yang inovatif dalam proses pengembangan.
* **Permasalahan yang Spesifik dan Relevan 🧐**: "Habit Forge" secara langsung menjawab tantangan umum yang dihadapi banyak orang dalam membentuk kebiasaan baru, yaitu kurangnya motivasi dan konsistensi. Dengan mengintegrasikan elemen gamifikasi seperti lencana pencapaian dan sistem level, aplikasi ini menawarkan solusi yang menarik untuk menjaga keterlibatan pengguna. Selain itu, fitur Pomodoro Timer juga menjawab kebutuhan pengguna untuk tetap fokus pada tugas-tugas mereka, yang sering kali merupakan bagian dari kebiasaan yang ingin mereka bentuk.
* **Pendekatan yang Runtut dan Mudah Dipahami 📝**: Struktur proyek ini sangat terorganisir, dengan pemisahan yang jelas antara logika front-end dan back-end. Penggunaan modul-modul terpisah untuk manajemen data, gamifikasi, dan utilitas menunjukkan pendekatan pengembangan yang bersih dan dapat dipelihara. Penjelasan dalam README.md juga sangat jelas, memberikan instruksi pengaturan yang mudah diikuti dan pemahaman yang baik tentang arsitektur proyek. Integrasi AI untuk kategorisasi kebiasaan juga dijelaskan dengan baik, menunjukkan bagaimana teknologi canggih dapat diterapkan untuk meningkatkan pengalaman pengguna.
---
## Teknologi, Bahasa Pemrograman, Framework, dan Tools

### **Backend**

* **Bahasa Pemrograman: JavaScript**
    * **Alasan Pemilihan**: JavaScript dipilih karena merupakan bahasa yang serbaguna dan dapat digunakan baik di sisi *client* (*front-end*) maupun *server* (*back-end*). Hal ini memungkinkan konsistensi dalam pengembangan dan mempermudah pengelolaan kode.

* **Lingkungan Runtime: Node.js**
    * **Alasan Pemilihan**: Node.js digunakan sebagai lingkungan *runtime* untuk menjalankan JavaScript di sisi *server*. Pilihan ini ideal untuk membangun aplikasi web yang cepat dan *scalable* seperti "Habit Forge", terutama dalam menangani permintaan API secara efisien.

* ***Framework*: Express.js**
    * **Alasan Pemilihan**: Express.js adalah *framework* web minimalis untuk Node.js yang mempermudah pengembangan aplikasi web dan API. Dalam proyek ini, Express digunakan untuk membuat *server*, mengelola *routing* API (seperti `/api/categorize`), dan menangani *middleware* untuk keamanan dan pemrosesan data.

### **Frontend**

* **Bahasa Pemrograman: HTML, CSS, dan JavaScript**
    * **Alasan Pemilihan**: Ketiga bahasa ini merupakan fondasi dari pengembangan web modern:
        * **HTML**: Digunakan untuk menstrukturkan konten aplikasi web.
        * **CSS**: Digunakan untuk mengatur tampilan dan gaya, menciptakan antarmuka yang menarik dan responsif.
        * **JavaScript**: Digunakan untuk mengimplementasikan logika interaktif di sisi klien, seperti menambah, menghapus, dan menyelesaikan kebiasaan, serta memperbarui antarmuka pengguna secara dinamis.

### **Integrasi AI**

* **Replicate API dengan IBM Granite**
    * **Alasan Pemilihan**: Proyek ini memanfaatkan kecerdasan buatan (AI) melalui Replicate API untuk mengakses model bahasa **IBM Granite**. Tujuannya adalah untuk mengkategorikan kebiasaan secara otomatis berdasarkan nama dan deskripsi yang dimasukkan oleh pengguna. Pemilihan ini sangat relevan karena:
        * **Mempercepat Proses**: Mengotomatiskan kategorisasi kebiasaan, sehingga pengguna tidak perlu melakukannya secara manual.
        * **Meningkatkan Pengalaman Pengguna**: Memberikan pengalaman yang lebih cerdas dan interaktif.
        * **Optimalisasi Kode**: Seperti yang disebutkan dalam `README.md`, AI juga membantu dalam pembuatan dan optimalisasi kode selama proses pengembangan.

### **Tools dan Library Tambahan**

* **`dotenv`**
    * **Alasan Pemilihan**: *Library* ini digunakan untuk mengelola variabel lingkungan, seperti kunci API Replicate, dengan menyimpannya dalam *file* `.env`. Ini adalah praktik terbaik untuk menjaga keamanan informasi sensitif dan memisahkannya dari kode sumber.

* **`cors`**
    * **Alasan Pemilihan**: *Middleware* `cors` digunakan untuk mengaktifkan *Cross-Origin Resource Sharing*, yang memungkinkan aplikasi *front-end* untuk berkomunikasi dengan API *back-end* yang berjalan di *origin* yang berbeda.

* **Vercel**
    * **Alasan Pemilihan**: Vercel digunakan untuk *deployment* aplikasi. *File* `vercel.json` menunjukkan konfigurasi *build* dan *routing* untuk men-deploy aplikasi ini sebagai *serverless functions*. Vercel dipilih karena kemudahan penggunaannya dalam men-deploy aplikasi Node.js modern.

---
## Fitur Utama Aplikasi "Habit Forge"

Aplikasi "Habit Forge" memiliki beberapa fitur utama yang dirancang untuk membantu pengguna membangun dan mempertahankan kebiasaan positif dengan cara yang menarik dan memotivasi.

---

### **Manajemen Kebiasaan**

Fitur ini adalah inti dari aplikasi "Habit Forge", yang memungkinkan pengguna untuk melacak kebiasaan mereka sehari-hari.

* **Cara Kerja**:
    1.  **Menambah Kebiasaan**: Pengguna dapat menambahkan kebiasaan baru melalui formulir yang tersedia, dengan mengisi nama dan deskripsi kebiasaan.
    2.  **Kategorisasi Otomatis**: Setelah pengguna mengirimkan formulir, aplikasi akan secara otomatis mengkategorikan kebiasaan tersebut menggunakan AI (IBM Granite) melalui Replicate API.
    3.  **Menyelesaikan Kebiasaan**: Pengguna dapat menandai kebiasaan sebagai "selesai", yang akan memberikan mereka poin pengalaman (EXP).
    4.  **Menghapus Kebiasaan**: Jika suatu kebiasaan tidak lagi relevan, pengguna dapat menghapusnya dari daftar.
    5.  **Penyimpanan Lokal**: Semua data kebiasaan disimpan di *local storage* peramban, sehingga tetap tersedia saat pengguna kembali membuka aplikasi.

---

### **Gamifikasi**

Untuk meningkatkan motivasi, "Habit Forge" mengintegrasikan elemen gamifikasi yang memberikan penghargaan kepada pengguna atas konsistensi mereka.

* **Cara Kerja**:
    1.  **Sistem Level dan EXP**: Setiap kali pengguna menyelesaikan suatu kebiasaan, mereka akan mendapatkan sejumlah poin pengalaman (EXP). Akumulasi EXP akan meningkatkan level pengguna, yang memberikan rasa pencapaian.
    2.  **Lencana Pencapaian**: Pengguna akan mendapatkan lencana (badges) ketika mereka mencapai *milestone* tertentu, seperti menyelesaikan kebiasaan pertama atau mencapai level baru.
    3.  **Tampilan Progres**: Progres pengguna, termasuk level, EXP, dan lencana, ditampilkan secara visual di dasbor, sehingga mereka dapat dengan mudah melihat kemajuan mereka.

---

### **Timer Pomodoro**

Fitur ini dirancang untuk membantu pengguna tetap fokus pada tugas-tugas yang membutuhkan konsentrasi, sejalan dengan tujuan membangun kebiasaan yang produktif.

* **Cara Kerja**:
    1.  ***Timer* 25 Menit**: Pengguna dapat memulai *timer* Pomodoro yang berjalan selama 25 menit untuk sesi kerja yang terfokus.
    2.  **Notifikasi**: Setelah sesi selesai, aplikasi akan memberikan notifikasi suara untuk memberitahu pengguna bahwa waktu kerja telah berakhir.
    3.  **Mode Istirahat**: Setelah sesi kerja, *timer* akan otomatis beralih ke mode istirahat selama 5 menit sebelum pengguna dapat memulai sesi kerja berikutnya.
    4.  **Kontrol Fleksibel**: Pengguna memiliki kontrol penuh untuk memulai, menjeda, dan me-reset *timer* sesuai kebutuhan mereka.
 
Tentu, ini adalah penjelasan mendalam mengenai dukungan dan penggunaan AI dalam proyek "Habit Forge".

## Penjelasan Dukungan AI (*AI Support Explanation*)

Penggunaan kecerdasan buatan (AI) dalam proyek "Habit Forge" sangat relevan dan terintegrasi dengan baik, baik dalam proses pengembangan maupun sebagai fitur inti aplikasi. AI tidak hanya menjadi pelengkap, tetapi memberikan nilai tambah yang signifikan.

---

### **Penggunaan AI dalam Aplikasi**

AI dimanfaatkan secara langsung sebagai salah satu fitur utama untuk meningkatkan pengalaman pengguna, yaitu **kategorisasi kebiasaan otomatis**.

* **Cara Penggunaan**:
    1.  **Input Pengguna**: Ketika pengguna menambahkan kebiasaan baru dengan memasukkan nama dan deskripsi (contoh: "Baca 10 halaman" - "Baca buku fiksi setiap malam sebelum tidur"), data ini dikirim ke *backend* aplikasi.
    2.  **Proses di Backend**: *Server* yang dibangun dengan Node.js dan Express menerima data ini. Selanjutnya, *server* memanggil **Replicate API** untuk mengakses model bahasa **IBM Granite**.
    3.  **Prompt Engineering**: Sebuah *prompt* (perintah) yang spesifik dibuat untuk AI, yang berbunyi: `Categorize the following habit: '[Nama Kebiasaan] - [Deskripsi Kebiasaan]'. Choose only one category from this list: Health, Work, Learning, Personal, Social, Other. Respond with only the category name.`.
    4.  **Hasil dari AI**: Model AI akan menganalisis teks dan mengembalikan satu kategori yang paling sesuai dari daftar yang telah ditentukan (misalnya, "Learning").
    5.  **Integrasi ke Aplikasi**: Kategori ini kemudian disimpan bersama data kebiasaan baru dan ditampilkan di antarmuka pengguna, membantu mengelompokkan dan melacak progres berdasarkan kategori.

* **Dampak Nyata pada Hasil Aplikasi**:
    * **Pengalaman Pengguna yang Lebih Cerdas**: Pengguna tidak perlu repot-repot memilih kategori secara manual. Ini membuat proses penambahan kebiasaan menjadi lebih cepat dan mulus (seamless).
    * **Konsistensi Data**: Dengan kategori yang dihasilkan oleh AI dari daftar yang telah ditentukan, data menjadi lebih terstruktur dan konsisten di seluruh aplikasi.
    * **Fitur Inovatif**: Penggunaan AI untuk tugas sederhana seperti ini menunjukkan pendekatan modern dan inovatif dalam pengembangan aplikasi.

---

### **Penggunaan AI dalam Proses Pengembangan**

Seperti yang dijelaskan dalam `README.md`, AI juga memainkan peran penting di belakang layar selama proses pengembangan proyek.

* **Cara Penggunaan**:
    1.  **Pembuatan Kode (*Code Generation*)**: IBM Granite digunakan untuk menghasilkan cuplikan kode dan fungsi-fungsi tertentu, yang mempercepat proses pengkodean.
    2.  **Optimalisasi Kode**: AI membantu dalam menganalisis dan mengoptimalkan kode yang sudah ada agar lebih efisien, baik dari segi kinerja maupun keterbacaan (*readability*).
    3.  **Curah Gagasan (*Brainstorming*)**: Pada tahap awal, AI digunakan sebagai rekan diskusi untuk bertukar pikiran mengenai ide-ide proyek, seperti pemilihan tumpukan teknologi (*tech stack*), fitur yang akan diimplementasikan, dan struktur keseluruhan proyek.

* **Dampak Nyata pada Pengembangan**:
    * **Akselerasi Pengembangan**: Dengan bantuan AI, waktu yang dibutuhkan untuk menulis kode berulang dan mencari solusi untuk masalah teknis dapat dikurangi secara signifikan.
    * **Peningkatan Kualitas Kode**: Saran dari AI membantu memastikan bahwa kode yang ditulis mengikuti praktik terbaik, sehingga lebih mudah dipelihara dan dikembangkan di masa depan.
    * **Perencanaan yang Lebih Matang**: Kemampuan AI untuk memberikan wawasan dan ide membantu dalam membuat perencanaan proyek yang lebih solid dan komprehensif sejak awal.
---

## Instruksi Pengaturan

1.  **Kloning repositori**:
    ```bash
    git clone [https://github.com/nama-pengguna-anda/habit-forge.git](https://github.com/nama-pengguna-anda/habit-forge.git)
    cd habit-forge
    ```

2.  **Instal dependensi**:
    ```bash
    npm install
    ```

3.  **Buat file `.env`**:
    Buat file `.env` di direktori root dan tambahkan variabel lingkungan yang diperlukan.

4.  **Jalankan aplikasi**:
    * Untuk mode pengembangan (menggunakan Vercel CLI):
        ```bash
        vercel dev
        ```
    * Untuk mode produksi:
        ```bash
        npm start
        ```

---
