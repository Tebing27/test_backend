## Fitur & Hasil API (Screen Capture)

Berikut merupakan detail dari fitur yang berjalan di sistem dan dokumentasi hasil uji API dari Postman sesuai instruksi pengerjaan:

### 1. Modul Users 
Handling *business logic* untuk operasi User (Soft delete, auto hashing password, Unique Email constraint).

* **POST `/users` (Create User)**
  ![Create User](./ss/Users/create_user.png)
  
* **GET `/users` (All Users)**
  ![All Users](./ss/Users/all_user.png)

* **GET `/users/:id` (User by ID)**
  ![User by ID](./ss/Users/byId_user.png)

* **GET `/users/email/:email` (User by Email)**
  ![User by Email](./ss/Users/byEmail_user.png)

* **PATCH/PUT `/users/:id` (Update User Name)**
  ![Update User](./ss/Users/updateName_user.png)

* **DELETE `/users/:id` (Soft-Delete User)**
  ![Soft Delete User](./ss/Users/delete_user.png)

---

### 2. Modul Autentikasi (Login & JWT)
Sistem proteksi aplikasi API dengan Token.

* **POST `/auth/login` (Login & Access Token)**
  *(Token dikembalikan setelah validasi payload `email` & `password`)*
  ![Login](./ss/Auth/login.png)

* **Refresh Token Mechanism**
  *(Sistem memperbarui token di atas durasi 15 menit)*
  ![Refresh Token](./ss/Auth/refreshToken_user.png)

---

### 3. Modul Mahasiswa
Sistem CRUD (Create, Read, Update, Delete) entitas `data_mhs` dengan constraint Unique Mahasiswa, Pagination, dan Dynamic Search.

* **POST `/mahasiswa` (Create Data Mahasiswa)**
  ![Create Mahasiswa](./ss/Mahasiswa/create_mahasiswa.png)

* **GET `/mahasiswa` (List Semua Data & Pagination + Dynamic Query)**
  *(Melakukan testing filter data API dengan request query tertentu misal `email` / `nim`)*
  ![Pagination & Filter Mahasiswa](./ss/Mahasiswa/pagination_mahasiswa.png)

* **GET `/mahasiswa/:id` (Read Data Mahasiswa - By ID)**
  ![Read Mahasiswa By ID](./ss/Mahasiswa/byId_mahasiswa.png)

* **PATCH/PUT `/mahasiswa/:id` (Update Informasi Mahasiswa)**
  ![Update Mahasiswa](./ss/Mahasiswa/update_mahasiswa.png)

* **DELETE `/mahasiswa/:id` (Hapus Data Mahasiswa)**
  ![Delete Mahasiswa](./ss/Mahasiswa/delete_mahasiswa.png)