# Shipment Tracker

Aplikasi untuk melacak dan mengelola pengiriman (shipment) menggunakan Vue 3 (Composition API).  
Dibuat sebagai bagian dari Frontend Engineer Test Case.

---

## Fitur Utama

### 1. List Shipment
- Menampilkan daftar shipment dalam bentuk:
  - Table (desktop)
  - Card (mobile)
- Informasi:
  - Shipment ID
  - Origin (titik awal) & Destination (destinasi)
  - Status (Assigned / Not Assigned)

### 2. Detail Shipment
- Menampilkan detail:
  - Route
  - Vehicle Type
  - Transporter
- Assign transporter melalui dropdown

### 3. Assign Transporter
- Validasi input (tidak boleh kosong)
- Update status menjadi **Assigned**
- Feedback:
  - Success message
  - Error message

### 4. Real-time Simulation 
- Simulasi update data setiap 5 detik
- Menggunakan `setInterval`
- Meniru sistem real-time seperti WebSocket / polling API

### 5. Responsive Design 
- Mobile: Card layout
- Desktop: Table layout
- Menggunakan TailwindCSS

### 6. State Management
- Menggunakan Pinia
- Single source of truth untuk semua data shipment

### 7. Unit Testing
- Menggunakan Vitest
- Test pada:
  - assignTransporter
  - getById

---

## Tech Stack

- Vue 3 (Composition API)
- Vue Router
- Pinia
- TailwindCSS
- Vitest

---

## Struktur Project
```
shipment-tracker/
├── public/
├── src/
│ ├── assets/ 
│ │
│ ├── views/ # Halaman utama
│ │ ├── ShipmentListView.vue
│ │ └── ShipmentDetailView.vue
│ │
│ ├── stores/ (Pinia)
│ │ └── shipment.js
│ │
│ ├── data / mock data
│ │ └── shipments.js
│ │
│ ├── router/ 
│ │ └── index.js
│ │
│ ├── App.vue 
│ ├── main.js 
│ └── style.css
│
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## Cara Menjalankan Project

### 1. Clone repository
```bash
git clone https://github.com/Rifqialba/shipmentTrack.git
cd shipment-tracker
```
### 2. Install Dependensi
```bash
npm install
npm run dev
Aplikasi akan berjalan di:
```
### Aplikasi akan berjalan di 
```bash
http://localhost:5173
```

---

## Menjalankan Testing
```bash
npm run test
```

## Asumsi Pribadi

- Tidak ada autentikasi user
- Data bersifat lokal (tidak persistent)
- Fokus pada UI, state management, dan interaksi

## Video Simulasi 
Untuk video simulasi sudah saya letakan di gdirve, berikut linknya 
[klik disini untuk melihat simulasi aplikasi](https://drive.google.com/file/d/1yfEnZkoJnlB4hrcjiAb6v5K7pFE06Rp_/view?usp=sharing)
