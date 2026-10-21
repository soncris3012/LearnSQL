# LearnSQL - Nền Tảng Học Cơ Sở Dữ Liệu & T-SQL Trực Quan 🎓

> **Học viện Kỹ thuật Quân sự - Viện Công nghệ Thông tin và Truyền thông**  
> Dựa trên giáo trình và slide bài giảng học phần *Cơ sở dữ liệu* & *Lập trình T-SQL* (Bộ môn Hệ thống thông tin).

![LearnSQL Banner](https://img.shields.io/badge/Platform-Web%20%7C%20Qt6%20%7C%20Tkinter-38bdf8?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge)
![Deploy to Vercel](https://img.shields.io/badge/Deploy-Vercel%20Ready-black?style=for-the-badge&logo=vercel)

---

## 🌟 Tổng Quan Dự Án

**LearnSQL** là nền tảng học SQL và T-SQL trực quan, hiện đại, lấy cảm hứng từ phong cách trình bày khoa học của [DuaEdu](https://duaedu.net/theory/sql?lesson=sql-subquery) kết hợp cùng phòng thực hành truy vấn SQL tương tác ngay trên trình duyệt (sử dụng động cơ **WebAssembly SQLite - `sql.js`** chạy 100% Client-side).

Hệ thống được thiết kế hoàn chỉnh theo **11 Chương học** bao gồm 7 chương DQL nền tảng + 4 mảng kiến thức nâng cao cốt lõi được giảng dạy tại Viện CNTT&TT - HVKTQS.

---

## 📚 Lộ Trình Đào Tạo (11 Chương - 53 Bài Học)

### Phần I: Nền Tảng Truy Xuất Dữ Liệu (DQL Cơ Bản Đến Nâng Cao)
1. **Chương 1: Chọn dữ liệu cần xem (5 bài)**
   - SQL giúp bạn làm gì? (RDBMS & DQL)
   - `SELECT`: Chọn cột từ bảng
   - `AS`: Đặt tên cột trong kết quả (Bí danh Alias)
   - Tính toán trên từng dòng (Biểu thức số học, làm tròn `ROUND`)
   - `DISTINCT`: Bỏ giá trị trùng lặp

2. **Chương 2: Lọc các dòng cần lấy (8 bài)**
   - `WHERE`: Lọc dòng theo điều kiện cơ bản
   - `AND`: Cần đúng cả hai điều kiện
   - `OR`: Chỉ cần đúng một điều kiện
   - `NOT`: Loại điều kiện không muốn lấy
   - `IN`: Lọc theo danh sách giá trị
   - `BETWEEN`: Lọc trong một khoảng đóng
   - `LIKE`: Tìm kiếm theo mẫu ký tự (`%`, `_`, `[]`, `[^]`)
   - `IS NULL`: Tìm và xử lý dữ liệu thiếu (`IS NULL` / `IS NOT NULL`)

3. **Chương 3: Sắp xếp và giới hạn kết quả (3 bài)**
   - `ORDER BY`: Sắp xếp tăng dần (`ASC`) và giảm dần (`DESC`)
   - Sắp xếp khi hai dòng bằng nhau (Sắp xếp đa cột)
   - `LIMIT` / `TOP`: Giới hạn số dòng đầu và phân trang

4. **Chương 4: Xử lý giá trị trong từng dòng (7 bài)**
   - `COALESCE`: Thay thế giá trị NULL
   - `NULLIF`: Tránh lỗi chia cho 0
   - `TRIM` và `LOWER`: Làm sạch chuỗi và chuẩn hoá email
   - `SUBSTR` / `SUBSTRING`: Trích xuất một phần chuỗi
   - `CAST` và `CONVERT`: Chuyển đổi kiểu dữ liệu
   - Lọc dữ liệu theo ngày (`GETDATE()`, `YEAR()`, `MONTH()`, `DATEPART`)
   - `CASE`: Rẽ nhánh logic và gắn nhãn theo điều kiện (Simple & Searched CASE)

5. **Chương 5: Tính tổng và chỉ số (5 bài)**
   - `GROUP BY` và `SUM`: Gom nhóm và tính tổng
   - `COUNT`: Đếm số dòng (`COUNT(*)` vs `COUNT(cột)`)
   - `HAVING`: Lọc trên các nhóm sau khi tổng hợp
   - Thống kê điểm trung bình, điểm Min/Max theo lớp môn học
   - Kỹ thuật tính tỷ lệ % nâng cao với `SUM(CASE WHEN...)`

6. **Chương 6: Kết hợp dữ liệu từ nhiều bảng (4 bài)**
   - `LEFT JOIN`: Giữ toàn bộ bảng trái và ghép bảng phải
   - `INNER JOIN`: Chỉ giữ dòng khớp giữa hai bảng
   - `UNION ALL`: Nối các bảng theo chiều dọc (giữ dòng trùng)
   - `UNION`: Hợp các tập kết quả, loại bỏ dòng trùng (`INTERSECT`, `EXCEPT`)

7. **Chương 7: Chia truy vấn thành các bước (4 bài)**
   - `CTE`: `WITH ... AS` đặt tên cho bước xử lý tạm thời
   - `Subquery`: Truy vấn con lồng nhau (trong `WHERE`, `FROM`, `SELECT`)
   - `EXISTS`: Kiểm tra có bản ghi liên quan tồn tại
   - `NOT EXISTS`: Tìm bản ghi độc lập (học viên chưa có điểm / khách chưa có đơn)

---

### Phần II: 4 Mảng Cốt Lõi Cơ Sở Dữ Liệu Nâng Cao (Slide HVKTQS)
8. **Chương 8: Ngôn ngữ Định nghĩa & Thao tác dữ liệu (DDL & DML)**
   - Cấu trúc bảng: `CREATE TABLE`, `ALTER TABLE`, `DROP TABLE`
   - Thiết lập ràng buộc (Constraints): `PRIMARY KEY`, `FOREIGN KEY`, `CHECK`, `UNIQUE`, `NOT NULL`, `DEFAULT`
   - Thao tác dữ liệu: `INSERT INTO` (đơn dòng, đa dòng, chèn từ truy vấn con)
   - Cập nhật & Xóa dữ liệu: `UPDATE` và `DELETE` (có điều kiện, kết hợp JOIN & Subquery)

9. **Chương 9: Truy vấn nâng cao, Khung nhìn (View) & Ranking**
   - Khung nhìn (`VIEW`): `CREATE VIEW`, tăng tính bảo mật và tái sử dụng mã
   - Hàm xếp hạng (Ranking Functions): `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()` kết hợp `OVER (PARTITION BY ... ORDER BY ...)`
   - Thống kê đa chiều: `ROLLUP` và `CUBE` tự động phát sinh các dòng tổng trung gian
   - Xoay trục dữ liệu: `PIVOT` và `UNPIVOT` biến dòng thành tiêu đề cột và ngược lại

10. **Chương 10: Lập trình T-SQL**
    - Biến, Lô lệnh (Batch `GO`) và Khối lệnh: `DECLARE @var`, `SET`, `SELECT @var`, `BEGIN ... END`
    - Rẽ nhánh điều khiển: `IF ... ELSE`, `ELSE IF` lồng nhau
    - Cấu trúc lặp: Vòng lặp `WHILE`, ngắt `BREAK`, tiếp tục `CONTINUE`, nhãn lệnh `GOTO`
    - Kiểm soát ngoại lệ & Giao dịch: `BEGIN TRY ... BEGIN CATCH`, `BEGIN TRANSACTION`, `COMMIT`, `ROLLBACK`, `THROW`
    - Con trỏ (`CURSOR`): `DECLARE CURSOR`, `OPEN`, `FETCH NEXT`, `@@FETCH_STATUS`, `CLOSE`, `DEALLOCATE`, đánh giá ưu/nhược điểm so với JOIN

11. **Chương 11: Đóng gói Logic: Thủ tục (Stored Procedure) & Hàm (Function)**
    - Thủ tục lưu trữ (`STORED PROCEDURE`): `CREATE PROCEDURE`, tham số đầu vào, tham số đầu ra `OUTPUT`, lệnh `RETURN`
    - Hàm vô hướng (`Scalar Function`): `CREATE FUNCTION ... RETURNS kiểu_vô_hướng`
    - Hàm bảng (`Table-valued Function`): `RETURNS TABLE` gọi trực tiếp trong lệnh `SELECT`
    - Thực hành thiết kế và khai thác Bài Tập Lớn (BTL) môn học thực tế

---

## 🗄️ Bộ Dữ Liệu Thực Tế Tích Hợp

Hệ thống tích hợp sẵn 2 bộ dữ liệu chuẩn mực:
1. **Quản lý Điểm Học Viên (Viện CNTT&TT - HVKTQS):**
   - `KHOAVIEN(MaKV, TenKV)`
   - `BOMON(MaBM, TenBM, MaKV)`
   - `LOPCN(MaLop, TenLop, MaBM)`
   - `HOCVIEN(MaHV, HoTen, GT, NS, DiaChi, MaLop)`
   - `MONHOC(MaMH, TenMH, SoTC, SoTiet, MaBM)`
   - `LOPMH(MaLMH, HocKy, NamHoc, MaMH)`
   - `DIEM(MaHV, MaLMH, DiemCC, DiemTX, DiemThi, DiemMH)`
   - `GIAOVIEN(MaGV, HoTen, DiaChi, SDT, HocHam, HocVi, MaBM)`
   - `GV_LopMH(MaGV, MaLMH, ThuTu, SoTietDay)`
   - Khung nhìn `View_KetQuaHocTap`

2. **Quản lý Bán Hàng & Đơn Hàng:**
   - `DanhMuc`, `SanPham`, `KhachHang`, `HoaDon`, `ChiTietHD`

---

## 🚀 Hướng Dẫn Cài Đặt & Sử Dụng

### 1. Chạy Bản Web Trên Máy Tính Cá Nhân
Mở Terminal tại thư mục `LearnSQL`:
```bash
# Sử dụng Python built-in server (nhanh nhất)
python3 -m http.server 3000
```
Truy cập trình duyệt: `http://localhost:3000`

Hoặc với Node.js:
```bash
npx serve . -p 3000
```

---

### 2. Triển Khai Lên Vercel (1-Click Deployment)
Dự án đã được cấu hình sẵn file `vercel.json`.
1. Đẩy mã nguồn lên tài khoản GitHub của bạn:
   ```bash
   git add .
   git commit -m "feat: complete LearnSQL platform"
   git remote add origin https://github.com/<your-username>/LearnSQL.git
   git push -u origin main
   ```
2. Truy cập [vercel.com](https://vercel.com), bấm **Add New Project** -> Chọn repository `LearnSQL` -> Bấm **Deploy**.
3. Dự án sẽ lập tức có tên miền trực tuyến miễn phí (VD: `learn-sql.vercel.app`) để mọi người truy cập!

---

### 3. Phiên Bản Desktop (Windows, macOS, Linux)

#### 🔹 Bản Tkinter (Python Standard Library - Không cần cài đặt gì thêm)
Chạy ngay lập tức trên mọi hệ thống có Python:
```bash
python3 desktop/app_tkinter.py
```

#### 🔹 Bản Qt6 (Giao diện cao cấp PyQt6 / PySide6)
Cài đặt thư viện:
```bash
pip install -r desktop/requirements.txt
```
Khởi chạy ứng dụng:
```bash
python3 desktop/app_qt.py
```

---

## ⌨️ Phím Tắt Tiện Dụng

| Phím tắt | Tác vụ |
| :--- | :--- |
| `Ctrl + Enter` (hoặc `Cmd + Enter`) | Thực thi ngay câu lệnh SQL |
| `Ctrl + K` (hoặc `Cmd + K`) | Tìm kiếm nhanh bài học / chủ đề |
| `Tab` | Thụt lề 2 khoảng trắng trong trình soạn thảo |

---

## 👨‍🏫 Tác giả & Giảng viên
- **Giảng viên:** Chu Thị Hường - Bộ môn Hệ thống thông tin
- **Đơn vị:** Viện Công nghệ Thông tin và Truyền thông - Học viện Kỹ thuật Quân sự
- **Dự án:** LearnSQL Interactive Education Platform
