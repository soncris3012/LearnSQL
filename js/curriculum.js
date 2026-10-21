/**
 * curriculum.js - Toàn bộ 11 Chương & 53 Bài giảng Chuẩn Viện CNTT&TT - HVKTQS
 * Tích hợp lý thuyết trực quan, cú pháp chuẩn mực, bộ dữ liệu thực tế và câu truy vấn tương tác.
 */

const SQLCurriculum = [
  // =========================================================================
  // CHƯƠNG 1: CHỌN DỮ LIỆU CẦN XEM (5 BÀI)
  // =========================================================================
  {
    id: 'c1-intro',
    chapterId: 1,
    chapterTitle: '1. Chọn dữ liệu cần xem',
    title: 'SQL giúp bạn làm gì?',
    duration: '5 phút',
    difficulty: 'Cơ bản',
    dataset: 'student',
    theory: `
      <h3>1. SQL là gì và vì sao lại quan trọng?</h3>
      <p><strong>SQL (Structured Query Language)</strong> là ngôn ngữ truy vấn mang tính chuẩn quốc tế để giao tiếp và thao tác với các <em>Hệ quản trị Cơ sở dữ liệu quan hệ (RDBMS)</em> như Microsoft SQL Server, PostgreSQL, MySQL, SQLite, Oracle...</p>
      
      <div class="note-box info">
        <span class="icon">💡</span>
        <div>
          <strong>Phân loại các tập lệnh SQL cốt lõi:</strong>
          <ul>
            <li><strong>DQL (Data Query Language):</strong> Truy xuất dữ liệu (SELECT).</li>
            <li><strong>DDL (Data Definition Language):</strong> Định nghĩa cấu trúc lược đồ (CREATE, ALTER, DROP).</li>
            <li><strong>DML (Data Manipulation Language):</strong> Thao tác bản ghi nghiệp vụ (INSERT, UPDATE, DELETE).</li>
            <li><strong>T-SQL (Transact-SQL):</strong> Phần mở rộng của SQL Server hỗ trợ lập trình logic (IF, WHILE, CURSOR, PROCEDURE, FUNCTION).</li>
          </ul>
        </div>
      </div>

      <p>Trong bài học đầu tiên này, bạn sẽ làm quen với việc gửi một truy vấn đơn giản nhất đến máy chủ CSDL để lấy dữ liệu từ bảng <code>HOCVIEN</code> trong hệ thống Quản lý Điểm Học Viên của Học viện Kỹ thuật Quân sự.</p>
    `,
    defaultQuery: `SELECT * FROM HOCVIEN;`,
    solution: `SELECT * FROM HOCVIEN;`,
    hint: `Nhấn nút 'Chạy truy vấn' hoặc nhấn tổ hợp phím Ctrl + Enter để xem toàn bộ danh sách học viên.`
  },
  {
    id: 'c1-select',
    chapterId: 1,
    chapterTitle: '1. Chọn dữ liệu cần xem',
    title: 'SELECT: chọn cột từ một bảng',
    duration: '6 phút',
    difficulty: 'Cơ bản',
    dataset: 'student',
    theory: `
      <h3>2. Mệnh đề SELECT chọn trường dữ liệu</h3>
      <p>Trong thực tế phát triển phần mềm, bạn hiếm khi dùng <code>SELECT *</code> vì nó gây lãng phí băng thông mạng và giảm hiệu năng hệ thống. Thay vào đó, bạn cần chỉ định rõ các cột cần hiển thị.</p>
      
      <div class="syntax-box">
        <div class="syntax-label">CÚ PHÁP CHUẨN</div>
        <code>SELECT Cot1, Cot2, Cot3 FROM TenBang;</code>
      </div>

      <div class="note-box tip">
        <span class="icon">⚡</span>
        <div><strong>Quy tắc tối ưu từ slide bài giảng:</strong> Chỉ định rõ tên cột trong câu lệnh SELECT để tránh lỗi tiềm ẩn khi cấu trúc bảng bị thay đổi trong tương lai và tăng tốc độ đọc từ đĩa cứng.</div>
      </div>
      
      <p><strong>Nhiệm vụ:</strong> Lấy ra thông tin gồm Mã học viên (<code>MaHV</code>), Họ tên (<code>HoTen</code>) và Giới tính (<code>GT</code>) từ bảng <code>HOCVIEN</code>.</p>
    `,
    defaultQuery: `SELECT MaHV, HoTen, GT FROM HOCVIEN;`,
    solution: `SELECT MaHV, HoTen, GT FROM HOCVIEN;`,
    hint: `Liệt kê các cột cách nhau bởi dấu phẩy sau từ khóa SELECT.`
  },
  {
    id: 'c1-as',
    chapterId: 1,
    chapterTitle: '1. Chọn dữ liệu cần xem',
    title: 'AS: đặt tên cột trong kết quả',
    duration: '5 phút',
    difficulty: 'Cơ bản',
    dataset: 'student',
    theory: `
      <h3>3. Đổi tên hiển thị cột với từ khóa AS (Alias)</h3>
      <p>Từ khóa <code>AS</code> (Bí danh - Alias) cho phép bạn đặt tên lại cho cột trong tập kết quả trả về, giúp người dùng và tầng Frontend dễ đọc, dễ hiển thị hơn.</p>

      <div class="syntax-box">
        <div class="syntax-label">CÚ PHÁP</div>
        <code>SELECT TenCot AS [Tên Mới], TenCot2 AS TenTiengViet FROM TenBang;</code>
      </div>

      <p>Nếu tên mới có dấu cách hoặc tiếng Việt, bạn có thể đặt trong dấu ngoặc vuông <code>[...]</code> hoặc nháy đơn <code>'...'</code>.</p>
      <p><strong>Nhiệm vụ:</strong> Chọn mã học viên đổi tên thành <code>[Mã số]</code>, họ tên đổi thành <code>[Họ và tên]</code> từ bảng <code>HOCVIEN</code>.</p>
    `,
    defaultQuery: `SELECT MaHV AS [Mã số], HoTen AS [Họ và tên], DiaChi AS [Quê quán] FROM HOCVIEN;`,
    solution: `SELECT MaHV AS [Mã số], HoTen AS [Họ và tên], DiaChi AS [Quê quán] FROM HOCVIEN;`,
    hint: `Dùng cú pháp: SELECT TenCot AS [Tên hiển thị mới]...`
  },
  {
    id: 'c1-calc',
    chapterId: 1,
    chapterTitle: '1. Chọn dữ liệu cần xem',
    title: 'Tính toán trên từng dòng',
    duration: '7 phút',
    difficulty: 'Cơ bản',
    dataset: 'student',
    theory: `
      <h3>4. Thực hiện phép tính số học trên dòng</h3>
      <p>SQL cho phép tính toán trực tiếp giá trị của từng dòng bằng các toán tử số học: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code>.</p>

      <div class="syntax-box">
        <div class="syntax-label">CÔNG THỨC ĐIỂM HỌC PHẦN</div>
        <code>DiemHocPhan = DiemCC * 0.1 + DiemTX * 0.2 + DiemThi * 0.7</code>
      </div>

      <p>Xét bảng <code>DIEM</code> trong hệ thống điểm học viên, điểm môn học (<code>DiemMH</code>) thường được tổng hợp theo hệ số chuyên cần (10%), thường xuyên (20%) và thi kết thúc môn (70%).</p>
      <p><strong>Nhiệm vụ:</strong> Hãy tính điểm tổng kết mô phỏng theo công thức trên cho từng bản ghi điểm.</p>
    `,
    defaultQuery: `SELECT MaHV, MaLMH, DiemCC, DiemTX, DiemThi, 
  ROUND(DiemCC * 0.1 + DiemTX * 0.2 + DiemThi * 0.7, 2) AS [Điểm Tính Toán],
  DiemMH AS [Điểm Trong Sổ]
FROM DIEM;`,
    solution: `SELECT MaHV, MaLMH, ROUND(DiemCC * 0.1 + DiemTX * 0.2 + DiemThi * 0.7, 2) AS [Điểm Tính Toán] FROM DIEM;`,
    hint: `Sử dụng hàm ROUND(biểu thức, 2) để làm tròn 2 chữ số thập phân.`
  },
  {
    id: 'c1-distinct',
    chapterId: 1,
    chapterTitle: '1. Chọn dữ liệu cần xem',
    title: 'DISTINCT: bỏ giá trị trùng',
    duration: '5 phút',
    difficulty: 'Cơ bản',
    dataset: 'student',
    theory: `
      <h3>5. Loại bỏ bản ghi trùng lặp với DISTINCT</h3>
      <p>Khi truy xuất dữ liệu từ một cột có nhiều dòng giống nhau (ví dụ: quê quán của học viên, mã lớp), từ khóa <code>DISTINCT</code> sẽ giữ lại duy nhất một giá trị đại diện cho mỗi nhóm giá trị trùng.</p>

      <div class="syntax-box">
        <div class="syntax-label">CÚ PHÁP</div>
        <code>SELECT DISTINCT TenCot FROM TenBang;</code>
      </div>

      <p><strong>Nhiệm vụ:</strong> Tìm danh sách các tỉnh/thành phố quê quán (<code>DiaChi</code>) của toàn bộ học viên mà không bị trùng lặp.</p>
    `,
    defaultQuery: `SELECT DISTINCT DiaChi AS [Tỉnh Thành Quê Quán] FROM HOCVIEN;`,
    solution: `SELECT DISTINCT DiaChi FROM HOCVIEN;`,
    hint: `Đặt DISTINCT ngay sau từ khóa SELECT.`
  },

  // =========================================================================
  // CHƯƠNG 2: LỌC CÁC DÒNG CẦN LẤY (8 BÀI)
  // =========================================================================
  {
    id: 'c2-where',
    chapterId: 2,
    chapterTitle: '2. Lọc các dòng cần lấy',
    title: 'WHERE: lọc dòng theo điều kiện',
    duration: '6 phút',
    difficulty: 'Cơ bản',
    dataset: 'student',
    theory: `
      <h3>6. Mệnh đề WHERE trong lọc dữ liệu</h3>
      <p>Mệnh đề <code>WHERE</code> được dùng để chỉ lọc ra các dòng dữ liệu thoả mãn một biểu thức logic nhất định.</p>
      
      <div class="syntax-box">
        <div class="syntax-label">CÁC TOÁN TỬ SO SÁNH</div>
        <code>= (bằng), <> hoặc != (khác), >, <, >=, <=</code>
      </div>

      <p><strong>Nhiệm vụ:</strong> Lấy danh sách tất cả các học viên có giới tính là 'Nữ'.</p>
    `,
    defaultQuery: `SELECT MaHV, HoTen, GT, DiaChi FROM HOCVIEN WHERE GT = 'Nữ';`,
    solution: `SELECT MaHV, HoTen, GT, DiaChi FROM HOCVIEN WHERE GT = 'Nữ';`,
    hint: `Chú ý chuỗi ký tự phải được bao quanh bởi cặp nháy đơn '...'.`
  },
  {
    id: 'c2-and',
    chapterId: 2,
    chapterTitle: '2. Lọc các dòng cần lấy',
    title: 'AND: cần đúng cả hai điều kiện',
    duration: '6 phút',
    difficulty: 'Cơ bản',
    dataset: 'student',
    theory: `
      <h3>7. Toán tử logic AND</h3>
      <p>Toán tử <code>AND</code> trả về TRUE khi và chỉ khi <strong>tất cả</strong> các biểu thức điều kiện thành phần đều đúng.</p>
      
      <p><strong>Nhiệm vụ:</strong> Tìm các học viên Nam có quê quán ở 'Hà Nội'.</p>
    `,
    defaultQuery: `SELECT MaHV, HoTen, GT, DiaChi FROM HOCVIEN WHERE GT = 'Nam' AND DiaChi = 'Hà Nội';`,
    solution: `SELECT MaHV, HoTen, GT, DiaChi FROM HOCVIEN WHERE GT = 'Nam' AND DiaChi = 'Hà Nội';`,
    hint: `Kết hợp hai điều kiện bằng từ khóa AND.`
  },
  {
    id: 'c2-or',
    chapterId: 2,
    chapterTitle: '2. Lọc các dòng cần lấy',
    title: 'OR: chỉ cần đúng một điều kiện',
    duration: '5 phút',
    difficulty: 'Cơ bản',
    dataset: 'student',
    theory: `
      <h3>8. Toán tử logic OR</h3>
      <p>Toán tử <code>OR</code> trả về TRUE nếu có <strong>ít nhất một</strong> trong các điều kiện đúng.</p>
      
      <p><strong>Nhiệm vụ:</strong> Lấy danh sách học viên có quê ở 'Hà Nội' hoặc ở 'Hải Phòng'.</p>
    `,
    defaultQuery: `SELECT MaHV, HoTen, DiaChi FROM HOCVIEN WHERE DiaChi = 'Hà Nội' OR DiaChi = 'Hải Phòng';`,
    solution: `SELECT MaHV, HoTen, DiaChi FROM HOCVIEN WHERE DiaChi = 'Hà Nội' OR DiaChi = 'Hải Phòng';`,
    hint: `Dùng điều kiện DiaChi = 'Hà Nội' OR DiaChi = 'Hải Phòng'.`
  },
  {
    id: 'c2-not',
    chapterId: 2,
    chapterTitle: '2. Lọc các dòng cần lấy',
    title: 'NOT: loại điều kiện không muốn lấy',
    duration: '5 phút',
    difficulty: 'Cơ bản',
    dataset: 'student',
    theory: `
      <h3>9. Toán tử phủ định NOT</h3>
      <p>Toán tử <code>NOT</code> đảo ngược giá trị logic của điều kiện theo sau nó.</p>
      <p><strong>Nhiệm vụ:</strong> Tìm những học viên <em>không</em> thuộc lớp 'CNTTK58'.</p>
    `,
    defaultQuery: `SELECT MaHV, HoTen, MaLop FROM HOCVIEN WHERE NOT (MaLop = 'CNTTK58');`,
    solution: `SELECT MaHV, HoTen, MaLop FROM HOCVIEN WHERE NOT (MaLop = 'CNTTK58');`,
    hint: `Có thể viết: WHERE NOT (MaLop = 'CNTTK58') hoặc WHERE MaLop <> 'CNTTK58'.`
  },
  {
    id: 'c2-in',
    chapterId: 2,
    chapterTitle: '2. Lọc các dòng cần lấy',
    title: 'IN: lọc theo một danh sách',
    duration: '6 phút',
    difficulty: 'Cơ bản',
    dataset: 'student',
    theory: `
      <h3>10. Toán tử IN rút gọn nhiều điều kiện OR</h3>
      <p>Thay vì viết liên tiếp nhiều mệnh đề OR (<code>DiaChi = 'Hà Nội' OR DiaChi = 'Nam Định' OR ...</code>), bạn nên dùng <code>IN (giá trị 1, giá trị 2, ...)</code>.</p>
      
      <div class="syntax-box">
        <div class="syntax-label">CÚ PHÁP</div>
        <code>WHERE TenCot IN ('GT1', 'GT2', 'GT3');</code>
      </div>
    `,
    defaultQuery: `SELECT MaHV, HoTen, DiaChi FROM HOCVIEN WHERE DiaChi IN ('Hà Nội', 'Nam Định', 'Nghệ An');`,
    solution: `SELECT MaHV, HoTen, DiaChi FROM HOCVIEN WHERE DiaChi IN ('Hà Nội', 'Nam Định', 'Nghệ An');`,
    hint: `Đưa các giá trị cần kiểm tra vào cặp dấu ngoặc đơn.`
  },
  {
    id: 'c2-between',
    chapterId: 2,
    chapterTitle: '2. Lọc các dòng cần lấy',
    title: 'BETWEEN: lọc trong một khoảng',
    duration: '6 phút',
    difficulty: 'Cơ bản',
    dataset: 'student',
    theory: `
      <h3>11. Toán tử BETWEEN ... AND</h3>
      <p>Toán tử <code>BETWEEN cận_dưới AND cận_trên</code> kiểm tra giá trị nằm trong đoạn đóng (bao gồm cả 2 đầu mút).</p>
      <p><strong>Nhiệm vụ:</strong> Lọc danh sách điểm học viên có điểm thi (<code>DiemThi</code>) nằm trong khoảng từ 8.0 đến 9.5.</p>
    `,
    defaultQuery: `SELECT MaHV, MaLMH, DiemThi, DiemMH FROM DIEM WHERE DiemThi BETWEEN 8.0 AND 9.5;`,
    solution: `SELECT MaHV, MaLMH, DiemThi, DiemMH FROM DIEM WHERE DiemThi BETWEEN 8.0 AND 9.5;`,
    hint: `Dùng cú pháp: WHERE DiemThi BETWEEN 8.0 AND 9.5`
  },
  {
    id: 'c2-like',
    chapterId: 2,
    chapterTitle: '2. Lọc các dòng cần lấy',
    title: 'LIKE: tìm theo một phần của chữ',
    duration: '8 phút',
    difficulty: 'Trung bình',
    dataset: 'student',
    theory: `
      <h3>12. Toán tử so khớp mẫu LIKE trong SQL Server</h3>
      <p>Theo slide bài giảng Viện CNTT&TT - HVKTQS, toán tử <code>LIKE</code> hỗ trợ các ký tự đại diện mạnh mẽ:</p>
      <ul>
        <li><code>%</code>: Đại diện cho 0 hoặc một chuỗi ký tự bất kỳ. Ví dụ: <code>LIKE 'Nguyễn%'</code> tìm người họ Nguyễn.</li>
        <li><code>_</code>: Đại diện cho đúng 1 ký tự đơn lẻ.</li>
        <li><code>[ ]</code>: Đại diện cho 1 ký tự nằm trong tập liệt kê.</li>
        <li><code>[ - ]</code>: 1 ký tự trong phạm vi. Ví dụ <code>'N[A-J]'</code>.</li>
        <li><code>[^ ]</code>: 1 ký tự không nằm trong danh sách.</li>
      </ul>
      <p><strong>Nhiệm vụ:</strong> Tìm tất cả học viên có họ là 'Nguyễn' hoặc có chữ lót là 'Thị'.</p>
    `,
    defaultQuery: `SELECT MaHV, HoTen, DiaChi FROM HOCVIEN WHERE HoTen LIKE 'Nguyễn%' OR HoTen LIKE '%Thị%';`,
    solution: `SELECT MaHV, HoTen, DiaChi FROM HOCVIEN WHERE HoTen LIKE 'Nguyễn%' OR HoTen LIKE '%Thị%';`,
    hint: `Ký tự % đại diện cho phần chuỗi bất kỳ đằng trước hoặc đằng sau.`
  },
  {
    id: 'c2-null',
    chapterId: 2,
    chapterTitle: '2. Lọc các dòng cần lấy',
    title: 'IS NULL: tìm dữ liệu còn thiếu',
    duration: '5 phút',
    difficulty: 'Cơ bản',
    dataset: 'student',
    theory: `
      <h3>13. Kiểm tra giá trị rỗng với IS NULL và IS NOT NULL</h3>
      <p>Trong CSDL, <code>NULL</code> biểu thị giá trị chưa xác định hoặc còn thiếu. Ta <strong>không thể</strong> dùng toán tử <code>= NULL</code> mà bắt buộc phải dùng <code>IS NULL</code> hoặc <code>IS NOT NULL</code>.</p>
      
      <p><strong>Nhiệm vụ:</strong> Xem danh sách các giảng viên chưa có thông tin học hàm (<code>HocHam IS NULL</code>).</p>
    `,
    defaultQuery: `SELECT MaGV, HoTen, HocHam, HocVi, SDT FROM GIAOVIEN WHERE HocHam IS NULL;`,
    solution: `SELECT MaGV, HoTen, HocHam, HocVi, SDT FROM GIAOVIEN WHERE HocHam IS NULL;`,
    hint: `Sử dụng IS NULL thay vì = NULL.`
  },

  // =========================================================================
  // CHƯƠNG 3: SẮP XẾP VÀ GIỚI HẠN KẾT QUẢ (3 BÀI)
  // =========================================================================
  {
    id: 'c3-orderby',
    chapterId: 3,
    chapterTitle: '3. Sắp xếp và giới hạn kết quả',
    title: 'ORDER BY: xếp các dòng',
    duration: '5 phút',
    difficulty: 'Cơ bản',
    dataset: 'student',
    theory: `
      <h3>14. Mệnh đề sắp xếp ORDER BY</h3>
      <p>Mặc định bảng dữ liệu trong CSDL quan hệ không có thứ tự bảo đảm. Để sắp xếp kết quả, ta dùng <code>ORDER BY</code>:</p>
      <ul>
        <li><code>ASC</code>: Tăng dần (Ascending - mặc định).</li>
        <li><code>DESC</code>: Giảm dần (Descending).</li>
      </ul>
      <p><strong>Nhiệm vụ:</strong> Lấy danh sách điểm thi môn CSDL sắp xếp giảm dần theo điểm môn học (<code>DiemMH</code>).</p>
    `,
    defaultQuery: `SELECT MaHV, MaLMH, DiemCC, DiemTX, DiemThi, DiemMH 
FROM DIEM 
WHERE MaLMH = 'LMH01' 
ORDER BY DiemMH DESC;`,
    solution: `SELECT MaHV, MaLMH, DiemMH FROM DIEM ORDER BY DiemMH DESC;`,
    hint: `Thêm ORDER BY DiemMH DESC vào cuối câu truy vấn.`
  },
  {
    id: 'c3-multisort',
    chapterId: 3,
    chapterTitle: '3. Sắp xếp và giới hạn kết quả',
    title: 'Sắp xếp khi hai dòng bằng nhau',
    duration: '6 phút',
    difficulty: 'Cơ bản',
    dataset: 'student',
    theory: `
      <h3>15. Sắp xếp trên nhiều cột (Multi-column Sorting)</h3>
      <p>Khi hai dòng có giá trị cột thứ nhất bằng nhau, SQL sẽ tiếp tục so sánh cột thứ hai, thứ ba được chỉ định.</p>
      
      <p><strong>Nhiệm vụ:</strong> Sắp xếp danh sách học viên theo Quê quán (<code>DiaChi</code>) tăng dần, nếu cùng quê quán thì sắp xếp theo Họ tên (<code>HoTen</code>) tăng dần.</p>
    `,
    defaultQuery: `SELECT MaHV, HoTen, DiaChi, GT FROM HOCVIEN ORDER BY DiaChi ASC, HoTen ASC;`,
    solution: `SELECT MaHV, HoTen, DiaChi, GT FROM HOCVIEN ORDER BY DiaChi ASC, HoTen ASC;`,
    hint: `Liệt kê các tiêu chí sắp xếp cách nhau bằng dấu phẩy.`
  },
  {
    id: 'c3-limit',
    chapterId: 3,
    chapterTitle: '3. Sắp xếp và giới hạn kết quả',
    title: 'LIMIT / TOP: chỉ lấy vài dòng đầu',
    duration: '6 phút',
    difficulty: 'Cơ bản',
    dataset: 'student',
    theory: `
      <h3>16. Giới hạn số dòng kết quả (TOP / LIMIT)</h3>
      <p>Trong SQL Server ta dùng từ khóa <code>TOP (n)</code> ngay sau <code>SELECT</code>, còn trong chuẩn ANSI SQL / SQLite / PostgreSQL ta dùng <code>LIMIT n</code> ở cuối câu lệnh.</p>
      <p><strong>Nhiệm vụ:</strong> Lấy ra Top 3 học viên có điểm môn học (<code>DiemMH</code>) cao nhất lớp <code>LMH01</code>.</p>
    `,
    defaultQuery: `SELECT MaHV, MaLMH, DiemMH 
FROM DIEM 
WHERE MaLMH = 'LMH01' 
ORDER BY DiemMH DESC 
LIMIT 3;`,
    solution: `SELECT MaHV, MaLMH, DiemMH FROM DIEM WHERE MaLMH = 'LMH01' ORDER BY DiemMH DESC LIMIT 3;`,
    hint: `Kết hợp ORDER BY ... DESC cùng với LIMIT 3.`
  },

  // =========================================================================
  // CHƯƠNG 4: XỬ LÝ GIÁ TRỊ TRONG TỪNG DÒNG (7 BÀI)
  // =========================================================================
  {
    id: 'c4-coalesce',
    chapterId: 4,
    chapterTitle: '4. Xử lý giá trị trong từng dòng',
    title: 'COALESCE: thay giá trị thiếu',
    duration: '6 phút',
    difficulty: 'Trung bình',
    dataset: 'student',
    theory: `
      <h3>17. Xử lý NULL với COALESCE</h3>
      <p>Hàm <code>COALESCE(val1, val2, ..., valN)</code> sẽ trả về giá trị đầu tiên khác <code>NULL</code> trong danh sách tham số. Rất hữu ích khi cần hiển thị giá trị mặc định thay vì để trống.</p>
      <p><strong>Nhiệm vụ:</strong> Hiển thị học hàm của giảng viên, nếu học hàm là NULL thì thay thế bằng nhãn <code>'Không có'</code>.</p>
    `,
    defaultQuery: `SELECT MaGV, HoTen, COALESCE(HocHam, 'Không có') AS [Học hàm chuẩn hoá], HocVi FROM GIAOVIEN;`,
    solution: `SELECT MaGV, HoTen, COALESCE(HocHam, 'Không có') AS [Học hàm chuẩn hoá], HocVi FROM GIAOVIEN;`,
    hint: `Dùng COALESCE(HocHam, 'Không có').`
  },
  {
    id: 'c4-nullif',
    chapterId: 4,
    chapterTitle: '4. Xử lý giá trị trong từng dòng',
    title: 'NULLIF: tránh chia cho 0',
    duration: '6 phút',
    difficulty: 'Trung bình',
    dataset: 'sales',
    theory: `
      <h3>18. Phòng chống lỗi chia cho 0 với NULLIF</h3>
      <p>Hàm <code>NULLIF(a, b)</code> trả về <code>NULL</code> nếu <code>a = b</code>, ngược lại trả về <code>a</code>. Khi tính toán tỷ lệ, chia một số cho <code>NULL</code> sẽ cho kết quả là <code>NULL</code> thay vì làm sập truy vấn bởi lỗi <em>Divide by zero error</em>.</p>
    `,
    defaultQuery: `SELECT MaSP, TenSP, GiaBan, SoLuong, 
  ROUND(GiaBan / NULLIF(SoLuong, 0), 2) AS [Đơn giá / đơn vị tồn]
FROM SanPham;`,
    solution: `SELECT MaSP, TenSP, ROUND(GiaBan / NULLIF(SoLuong, 0), 2) FROM SanPham;`,
    hint: `Bọc số chia vào hàm NULLIF(SoLuong, 0).`
  },
  {
    id: 'c4-trim-lower',
    chapterId: 4,
    chapterTitle: '4. Xử lý giá trị trong từng dòng',
    title: 'TRIM và LOWER: làm sạch chuỗi',
    duration: '5 phút',
    difficulty: 'Cơ bản',
    dataset: 'sales',
    theory: `
      <h3>19. Chuẩn hóa chuỗi với LOWER, UPPER, TRIM</h3>
      <p>Để đảm bảo tính nhất quán dữ liệu trước khi so sánh:</p>
      <ul>
        <li><code>LOWER(str)</code>: Chuyển toàn bộ ký tự thành chữ thường (ví dụ: email).</li>
        <li><code>UPPER(str)</code>: Chuyển toàn bộ ký tự thành chữ hoa.</li>
        <li><code>TRIM(str)</code>, <code>LTRIM()</code>, <code>RTRIM()</code>: Cắt bỏ khoảng trắng thừa ở 2 đầu.</li>
      </ul>
    `,
    defaultQuery: `SELECT MaKH, HoTen, LOWER(TRIM(Email)) AS [Email_Clean] FROM KhachHang;`,
    solution: `SELECT MaKH, LOWER(TRIM(Email)) FROM KhachHang;`,
    hint: `Lồng hàm: LOWER(TRIM(Email)).`
  },
  {
    id: 'c4-substr',
    chapterId: 4,
    chapterTitle: '4. Xử lý giá trị trong từng dòng',
    title: 'SUBSTR / SUBSTRING: lấy một phần chuỗi',
    duration: '6 phút',
    difficulty: 'Trung bình',
    dataset: 'student',
    theory: `
      <h3>20. Trích xuất xâu con với SUBSTRING / SUBSTR</h3>
      <p>Theo slide T-SQL Viện CNTT&TT: <code>SUBSTRING(expression, start, length)</code> trích xuất chuỗi con từ vị trí <code>start</code> với độ dài <code>length</code>.</p>
      <p><strong>Nhiệm vụ:</strong> Lấy ra năm sinh từ cột ngày sinh <code>NS</code> dạng 'YYYY-MM-DD' hoặc lấy 2 ký tự đầu mã lớp.</p>
    `,
    defaultQuery: `SELECT MaHV, HoTen, NS, SUBSTR(NS, 1, 4) AS [NamSinh], SUBSTR(MaLop, 1, 4) AS [ChuyenNganh] FROM HOCVIEN;`,
    solution: `SELECT MaHV, HoTen, SUBSTR(NS, 1, 4) AS NamSinh FROM HOCVIEN;`,
    hint: `Cú pháp: SUBSTR(chuỗi, vị_trí_bắt_đầu, độ_dài).`
  },
  {
    id: 'c4-cast',
    chapterId: 4,
    chapterTitle: '4. Xử lý giá trị trong từng dòng',
    title: 'CAST: đổi kiểu dữ liệu',
    duration: '6 phút',
    difficulty: 'Trung bình',
    dataset: 'student',
    theory: `
      <h3>21. Ép kiểu dữ liệu với CAST và CONVERT</h3>
      <p>Cú pháp chuẩn ANSI SQL: <code>CAST(expression AS target_type)</code>.</p>
      <p>Trong T-SQL SQL Server còn có <code>CONVERT(data_type, expression)</code>.</p>
      <p><strong>Nhiệm vụ:</strong> Ép điểm chuyên cần dạng float thành số nguyên integer để xem phần nguyên.</p>
    `,
    defaultQuery: `SELECT MaHV, MaLMH, DiemCC, CAST(DiemCC AS INT) AS [DiemNguyen] FROM DIEM;`,
    solution: `SELECT MaHV, MaLMH, CAST(DiemCC AS INT) FROM DIEM;`,
    hint: `Dùng cú pháp: CAST(DiemCC AS INT).`
  },
  {
    id: 'c4-date',
    chapterId: 4,
    chapterTitle: '4. Xử lý giá trị trong từng dòng',
    title: 'Lọc dữ liệu theo ngày',
    duration: '7 phút',
    difficulty: 'Trung bình',
    dataset: 'student',
    theory: `
      <h3>22. Xử lý ngày tháng trong cơ sở dữ liệu</h3>
      <p>Trong slide bài giảng:</p>
      <ul>
        <li><code>GETDATE()</code>: Lấy ngày giờ hiện tại của hệ thống.</li>
        <li><code>YEAR(date)</code>, <code>MONTH(date)</code>, <code>DAY(date)</code>: Trích xuất các thành phần ngày.</li>
        <li><code>DATEDIFF(datepart, startdate, enddate)</code>: Tính khoảng cách giữa hai mốc thời gian.</li>
      </ul>
      <p><strong>Nhiệm vụ:</strong> Lọc danh sách học viên sinh sau năm 2002.</p>
    `,
    defaultQuery: `SELECT MaHV, HoTen, NS FROM HOCVIEN WHERE NS >= '2003-01-01' ORDER BY NS;`,
    solution: `SELECT MaHV, HoTen, NS FROM HOCVIEN WHERE NS >= '2003-01-01';`,
    hint: `So sánh chuỗi ngày theo định dạng chuẩn ISO 'YYYY-MM-DD'.`
  },
  {
    id: 'c4-case',
    chapterId: 4,
    chapterTitle: '4. Xử lý giá trị trong từng dòng',
    title: 'CASE: gắn nhãn theo điều kiện',
    duration: '8 phút',
    difficulty: 'Trung bình',
    dataset: 'student',
    theory: `
      <h3>23. Cấu trúc rẽ nhánh CASE WHEN</h3>
      <p>Mệnh đề <code>CASE</code> cho phép rẽ nhánh có điều kiện ngay trong khối <code>SELECT</code>:</p>
      <div class="syntax-box">
        <div class="syntax-label">SEARCHED CASE</div>
        <code>CASE<br>
  &nbsp;&nbsp;WHEN DieuKien1 THEN GiaTri1<br>
  &nbsp;&nbsp;WHEN DieuKien2 THEN GiaTri2<br>
  &nbsp;&nbsp;ELSE GiaTriMacDinh<br>
END</code>
      </div>
      <p><strong>Nhiệm vụ:</strong> Phân loại học lực của học viên dựa vào điểm môn học (<code>DiemMH</code>): >= 8.5 là 'Giỏi', >= 7.0 là 'Khá', >= 5.5 là 'Trung bình', còn lại là 'Học lại'.</p>
    `,
    defaultQuery: `SELECT MaHV, MaLMH, DiemMH,
  CASE 
    WHEN DiemMH >= 8.5 THEN 'Giỏi'
    WHEN DiemMH >= 7.0 THEN 'Khá'
    WHEN DiemMH >= 5.5 THEN 'Trung bình'
    ELSE 'Học lại'
  END AS [Xếp loại học lực]
FROM DIEM;`,
    solution: `SELECT MaHV, MaLMH, DiemMH, CASE WHEN DiemMH >= 8.5 THEN 'Giỏi' WHEN DiemMH >= 7.0 THEN 'Khá' ELSE 'Trung bình' END AS XepLoai FROM DIEM;`,
    hint: `Chú ý kết thúc khối CASE bằng từ khóa END.`
  },

  // =========================================================================
  // CHƯƠNG 5: TÍNH TỔNG VÀ CHỈ SỐ (5 BÀI)
  // =========================================================================
  {
    id: 'c5-group-sum',
    chapterId: 5,
    chapterTitle: '5. Tính tổng và chỉ số',
    title: 'GROUP BY và SUM: cộng tiền theo nhóm',
    duration: '8 phút',
    difficulty: 'Trung bình',
    dataset: 'sales',
    theory: `
      <h3>24. Phân nhóm với GROUP BY và hàm tính tổng SUM</h3>
      <p>Mệnh đề <code>GROUP BY</code> gom các dòng có chung giá trị trong cột được chỉ định lại thành một dòng đại diện, sau đó áp dụng hàm tập hợp (Aggregate Function) như <code>SUM()</code>, <code>AVG()</code>.</p>
      <p><strong>Nhiệm vụ:</strong> Tính tổng tiền hàng (<code>TongTien</code>) mà mỗi khách hàng (<code>MaKH</code>) đã mua từ bảng <code>HoaDon</code>.</p>
    `,
    defaultQuery: `SELECT MaKH, COUNT(MaHD) AS [Số đơn hàng], SUM(TongTien) AS [Tổng chi tiêu]
FROM HoaDon
GROUP BY MaKH;`,
    solution: `SELECT MaKH, SUM(TongTien) AS TongChiTieu FROM HoaDon GROUP BY MaKH;`,
    hint: `Cột không nằm trong hàm tập hợp bắt buộc phải xuất hiện trong GROUP BY.`
  },
  {
    id: 'c5-count',
    chapterId: 5,
    chapterTitle: '5. Tính tổng và chỉ số',
    title: 'COUNT: đếm số dòng',
    duration: '6 phút',
    difficulty: 'Cơ bản',
    dataset: 'student',
    theory: `
      <h3>25. Hàm COUNT: Phân biệt COUNT(*) và COUNT(cot)</h3>
      <div class="note-box info">
        <span class="icon">🔍</span>
        <div>
          <ul>
            <li><code>COUNT(*)</code>: Đếm toàn bộ số dòng, bao gồm cả các dòng chứa NULL.</li>
            <li><code>COUNT(TenCot)</code>: Chỉ đếm các dòng mà cột đó có giá trị khác NULL.</li>
            <li><code>COUNT(DISTINCT TenCot)</code>: Đếm số lượng giá trị phân biệt.</li>
          </ul>
        </div>
      </div>
      <p><strong>Nhiệm vụ:</strong> Đếm số lượng học viên trong từng lớp chuyên ngành (<code>MaLop</code>).</p>
    `,
    defaultQuery: `SELECT MaLop, COUNT(*) AS [Sĩ số học viên] 
FROM HOCVIEN 
GROUP BY MaLop;`,
    solution: `SELECT MaLop, COUNT(*) AS SiSo FROM HOCVIEN GROUP BY MaLop;`,
    hint: `Nhóm theo MaLop và dùng COUNT(*).`
  },
  {
    id: 'c5-having',
    chapterId: 5,
    chapterTitle: '5. Tính tổng và chỉ số',
    title: 'HAVING: lọc sau khi tính tổng',
    duration: '8 phút',
    difficulty: 'Trung bình',
    dataset: 'student',
    theory: `
      <h3>26. Mệnh đề lọc nhóm HAVING</h3>
      <div class="note-box warning">
        <span class="icon">⚠️</span>
        <div><strong>Phân biệt cốt lõi:</strong><br>
        - <code>WHERE</code> lọc trên từng dòng dữ liệu cá thể <em>trước khi</em> gom nhóm.<br>
        - <code>HAVING</code> lọc trên các nhóm <em>sau khi</em> đã thực hiện hàm tổng hợp (COUNT, SUM, AVG).</div>
      </div>
      <p><strong>Nhiệm vụ:</strong> Tìm các lớp chuyên ngành có từ 3 học viên trở lên.</p>
    `,
    defaultQuery: `SELECT MaLop, COUNT(*) AS [Số lượng HV]
FROM HOCVIEN
GROUP BY MaLop
HAVING COUNT(*) >= 3;`,
    solution: `SELECT MaLop, COUNT(*) AS SoHV FROM HOCVIEN GROUP BY MaLop HAVING COUNT(*) >= 3;`,
    hint: `Đặt HAVING sau mệnh đề GROUP BY.`
  },
  {
    id: 'c5-avg-stats',
    chapterId: 5,
    chapterTitle: '5. Tính tổng và chỉ số',
    title: 'Tổng doanh thu theo tháng / Điểm TB',
    duration: '8 phút',
    difficulty: 'Trung bình',
    dataset: 'student',
    theory: `
      <h3>27. Thống kê điểm trung bình theo lớp môn học</h3>
      <p>Áp dụng hàm <code>AVG()</code> kết hợp với <code>MIN()</code>, <code>MAX()</code> để đánh giá chất lượng học tập của từng lớp môn học.</p>
      <p><strong>Nhiệm vụ:</strong> Tính điểm trung bình môn, điểm cao nhất và thấp nhất của từng lớp môn học <code>MaLMH</code>.</p>
    `,
    defaultQuery: `SELECT MaLMH, 
  COUNT(*) AS [Số HV dự thi],
  ROUND(AVG(DiemMH), 2) AS [Điểm Trung Bình],
  MIN(DiemMH) AS [Điểm Thấp Nhất],
  MAX(DiemMH) AS [Điểm Cao Nhất]
FROM DIEM
GROUP BY MaLMH;`,
    solution: `SELECT MaLMH, ROUND(AVG(DiemMH), 2) AS DiemTB, MIN(DiemMH), MAX(DiemMH) FROM DIEM GROUP BY MaLMH;`,
    hint: `Sử dụng các hàm tập hợp AVG(), MIN(), MAX().`
  },
  {
    id: 'c5-rate-calc',
    chapterId: 5,
    chapterTitle: '5. Tính tổng và chỉ số',
    title: 'Tính tỷ lệ học viên giỏi / đơn thanh toán',
    duration: '9 phút',
    difficulty: 'Nâng cao',
    dataset: 'sales',
    theory: `
      <h3>28. Kỹ thuật tính tỷ lệ % nâng cao với SUM + CASE</h3>
      <p>Bằng cách kết hợp hàm <code>SUM()</code> với biểu thức <code>CASE WHEN TrangThai = 1 THEN 1 ELSE 0 END</code>, ta có thể đếm có điều kiện các bản ghi thoả mãn mà không cần tách thành subquery.</p>
    `,
    defaultQuery: `SELECT 
  COUNT(*) AS [Tổng số đơn],
  SUM(CASE WHEN TrangThai = 1 THEN 1 ELSE 0 END) AS [Đơn đã thanh toán],
  ROUND(100.0 * SUM(CASE WHEN TrangThai = 1 THEN 1 ELSE 0 END) / COUNT(*), 1) AS [Tỷ lệ hoàn thành %]
FROM HoaDon;`,
    solution: `SELECT ROUND(100.0 * SUM(CASE WHEN TrangThai = 1 THEN 1 ELSE 0 END) / COUNT(*), 1) AS TyLe FROM HoaDon;`,
    hint: `Nhân với 100.0 để tránh phép chia số nguyên.`
  },

  // =========================================================================
  // CHƯƠNG 6: KẾT HỢP DỮ LIỆU TỪ NHIỀU BẢNG (4 BÀI)
  // =========================================================================
  {
    id: 'c6-left-join',
    chapterId: 6,
    chapterTitle: '6. Kết hợp dữ liệu từ nhiều bảng',
    title: 'LEFT JOIN: thêm giá vào danh sách',
    duration: '8 phút',
    difficulty: 'Trung bình',
    dataset: 'student',
    theory: `
      <h3>29. Phép kết nối LEFT OUTER JOIN</h3>
      <p>Theo slide giảng dạy: <code>LEFT JOIN</code> trả về <strong>tất cả</strong> các bản ghi của bảng bên trái (table A). Nếu có bản ghi khớp ở bảng phải (table B) thì ghép vào, nếu không khớp thì các cột của bảng phải sẽ nhận giá trị <code>NULL</code>.</p>
      
      <p><strong>Nhiệm vụ:</strong> Lấy danh sách tất cả học viên và điểm thi môn CSDL của họ (kể cả những học viên chưa có điểm).</p>
    `,
    defaultQuery: `SELECT hv.MaHV, hv.HoTen, hv.MaLop, d.MaLMH, d.DiemMH
FROM HOCVIEN hv
LEFT JOIN DIEM d ON hv.MaHV = d.MaHV AND d.MaLMH = 'LMH01'
ORDER BY hv.MaHV;`,
    solution: `SELECT hv.MaHV, hv.HoTen, d.DiemMH FROM HOCVIEN hv LEFT JOIN DIEM d ON hv.MaHV = d.MaHV;`,
    hint: `Cú pháp: FROM BangA LEFT JOIN BangB ON BangA.Khoa = BangB.Khoa`
  },
  {
    id: 'c6-inner-join',
    chapterId: 6,
    chapterTitle: '6. Kết hợp dữ liệu từ nhiều bảng',
    title: 'INNER JOIN: chỉ giữ dòng ghép được',
    duration: '8 phút',
    difficulty: 'Trung bình',
    dataset: 'student',
    theory: `
      <h3>30. Phép kết nối trong INNER JOIN</h3>
      <p><code>INNER JOIN</code> là phép nối phổ biến nhất trong CSDL quan hệ: chỉ giữ lại các dòng mà điều kiện kết nối ở cả 2 bảng đều thoả mãn (phần giao của 2 tập hợp).</p>
      
      <p><strong>Nhiệm vụ:</strong> Ghép thông tin Học viên, Tên lớp chuyên ngành và Điểm môn học.</p>
    `,
    defaultQuery: `SELECT hv.MaHV, hv.HoTen, lp.TenLop, mh.TenMH, d.DiemMH
FROM HOCVIEN hv
INNER JOIN LOPCN lp ON hv.MaLop = lp.MaLop
INNER JOIN DIEM d ON hv.MaHV = d.MaHV
INNER JOIN LOPMH lm ON d.MaLMH = lm.MaLMH
INNER JOIN MONHOC mh ON lm.MaMH = mh.MaMH
ORDER BY d.DiemMH DESC;`,
    solution: `SELECT hv.MaHV, hv.HoTen, lp.TenLop FROM HOCVIEN hv INNER JOIN LOPCN lp ON hv.MaLop = lp.MaLop;`,
    hint: `Sử dụng INNER JOIN giữa bảng HOCVIEN và LOPCN.`
  },
  {
    id: 'c6-union-all',
    chapterId: 6,
    chapterTitle: '6. Kết hợp dữ liệu từ nhiều bảng',
    title: 'UNION ALL: nối bảng theo chiều dọc',
    duration: '6 phút',
    difficulty: 'Trung bình',
    dataset: 'student',
    theory: `
      <h3>31. Hợp các tập kết quả với UNION ALL</h3>
      <p><code>UNION ALL</code> gộp kết quả của 2 hoặc nhiều truy vấn lại với nhau theo chiều dọc, giữ nguyên toàn bộ các dòng (bao gồm cả dòng trùng).</p>
      <div class="note-box tip">
        <span class="icon">💡</span>
        <div><strong>Điều kiện áp dụng:</strong> Các câu lệnh SELECT thành phần phải có cùng số lượng cột và các cột tương ứng phải có kiểu dữ liệu tương thích.</div>
      </div>
    `,
    defaultQuery: `SELECT MaHV AS [Mã Định Danh], HoTen AS [Họ và Tên], 'Học viên' AS [Vai trò] FROM HOCVIEN
UNION ALL
SELECT MaGV AS [Mã Định Danh], HoTen AS [Họ và Tên], 'Giảng viên' AS [Vai trò] FROM GIAOVIEN;`,
    solution: `SELECT MaHV, HoTen FROM HOCVIEN UNION ALL SELECT MaGV, HoTen FROM GIAOVIEN;`,
    hint: `Đặt từ khóa UNION ALL ở giữa 2 khối câu lệnh SELECT.`
  },
  {
    id: 'c6-union',
    chapterId: 6,
    chapterTitle: '6. Kết hợp dữ liệu từ nhiều bảng',
    title: 'UNION: nối rồi bỏ dòng trùng',
    duration: '7 phút',
    difficulty: 'Trung bình',
    dataset: 'student',
    theory: `
      <h3>32. Toán tử tập hợp UNION, INTERSECT, EXCEPT</h3>
      <p>Theo slide bài giảng:</p>
      <ul>
        <li><code>UNION</code>: Hợp hai tập kết quả và tự động lọc bỏ các dòng trùng lặp.</li>
        <li><code>INTERSECT</code>: Lấy phần giao (những dòng xuất hiện ở cả hai tập).</li>
        <li><code>EXCEPT</code>: Lấy tập thứ nhất trừ đi những dòng có trong tập thứ hai.</li>
      </ul>
      <p><strong>Nhiệm vụ:</strong> Lấy danh sách tổng hợp địa chỉ quê quán từ cả bảng Học viên lẫn bảng Giảng viên (loại bỏ trùng).</p>
    `,
    defaultQuery: `SELECT DiaChi FROM HOCVIEN
UNION
SELECT DiaChi FROM GIAOVIEN;`,
    solution: `SELECT DiaChi FROM HOCVIEN UNION SELECT DiaChi FROM GIAOVIEN;`,
    hint: `UNION tự động loại bỏ các địa chỉ trùng lặp giữa 2 bảng.`
  },

  // =========================================================================
  // CHƯƠNG 7: CHIA TRUY VẤN THÀNH CÁC BƯỚC (4 BÀI)
  // =========================================================================
  {
    id: 'c7-cte',
    chapterId: 7,
    chapterTitle: '7. Chia truy vấn thành các bước',
    title: 'CTE: đặt tên cho một bước xử lý',
    duration: '9 phút',
    difficulty: 'Nâng cao',
    dataset: 'student',
    theory: `
      <h3>33. Biểu thức bảng chung CTE (Common Table Expressions)</h3>
      <p>Theo slide giảng dạy: <code>WITH CTE_Name AS (...)</code> định nghĩa một bảng tạm thời có tên trong phạm vi thực thi của câu lệnh. CTE giúp câu lệnh mạch lạc, dễ đọc và hỗ trợ cả truy vấn đệ quy.</p>

      <div class="syntax-box">
        <div class="syntax-label">CÚ PHÁP</div>
        <code>WITH BangTam AS (<br>
  &nbsp;&nbsp;SELECT ...<br>
)<br>
SELECT * FROM BangTam WHERE ...;</code>
      </div>
    `,
    defaultQuery: `WITH BangDiemChiTiet AS (
  SELECT hv.MaHV, hv.HoTen, lp.TenLop, d.DiemMH
  FROM HOCVIEN hv
  JOIN LOPCN lp ON hv.MaLop = lp.MaLop
  JOIN DIEM d ON hv.MaHV = d.MaHV
  WHERE d.MaLMH = 'LMH01'
)
SELECT * FROM BangDiemChiTiet WHERE DiemMH >= 8.0 ORDER BY DiemMH DESC;`,
    solution: `WITH BangDiemChiTiet AS (SELECT MaHV, DiemMH FROM DIEM) SELECT * FROM BangDiemChiTiet;`,
    hint: `Bắt đầu bằng từ khóa WITH TênCTE AS (...) rồi tiếp tục với câu lệnh SELECT chính.`
  },
  {
    id: 'c7-subquery',
    chapterId: 7,
    chapterTitle: '7. Chia truy vấn thành các bước',
    title: 'Subquery: truy vấn lồng nhau',
    duration: '8 phút',
    difficulty: 'Nâng cao',
    dataset: 'student',
    theory: `
      <h3>34. Truy vấn con lồng nhau (Subquery)</h3>
      <p>Theo trang lý thuyết duaedu.net và slide Viện CNTT&TT, Subquery là truy vấn nằm bên trong một truy vấn khác (trong mệnh đề WHERE, FROM hoặc SELECT).</p>
      <p><strong>Nhiệm vụ:</strong> Tìm tất cả các học viên có điểm môn CSDL cao hơn <strong>điểm trung bình</strong> của toàn bộ học viên lớp môn học đó.</p>
    `,
    defaultQuery: `SELECT hv.MaHV, hv.HoTen, d.DiemMH
FROM HOCVIEN hv
JOIN DIEM d ON hv.MaHV = d.MaHV
WHERE d.MaLMH = 'LMH01' 
  AND d.DiemMH > (
    SELECT AVG(DiemMH) 
    FROM DIEM 
    WHERE MaLMH = 'LMH01'
  );`,
    solution: `SELECT MaHV, DiemMH FROM DIEM WHERE DiemMH > (SELECT AVG(DiemMH) FROM DIEM);`,
    hint: `Đặt truy vấn con tính điểm trung bình bên trong cặp dấu ngoặc đơn (...) trong WHERE.`
  },
  {
    id: 'c7-exists',
    chapterId: 7,
    chapterTitle: '7. Chia truy vấn thành các bước',
    title: 'EXISTS: kiểm tra có dòng liên quan',
    duration: '7 phút',
    difficulty: 'Nâng cao',
    dataset: 'student',
    theory: `
      <h3>35. Lượng từ EXISTS trong truy vấn con tương quan</h3>
      <p>Toán tử <code>EXISTS (subquery)</code> trả về <code>TRUE</code> ngay khi truy vấn con tìm thấy ít nhất một dòng thoả mãn điều kiện. Đây là kỹ thuật tối ưu vượt trội so với <code>IN</code> trên các bảng dữ liệu lớn.</p>
      <p><strong>Nhiệm vụ:</strong> Tìm các giảng viên đang thực tế có phân công giảng dạy trong bảng <code>GV_LopMH</code>.</p>
    `,
    defaultQuery: `SELECT gv.MaGV, gv.HoTen, gv.HocVi
FROM GIAOVIEN gv
WHERE EXISTS (
  SELECT 1 
  FROM GV_LopMH pc 
  WHERE pc.MaGV = gv.MaGV
);`,
    solution: `SELECT MaGV, HoTen FROM GIAOVIEN gv WHERE EXISTS (SELECT 1 FROM GV_LopMH pc WHERE pc.MaGV = gv.MaGV);`,
    hint: `Sử dụng SELECT 1 trong truy vấn con EXISTS.`
  },
  {
    id: 'c7-not-exists',
    chapterId: 7,
    chapterTitle: '7. Chia truy vấn thành các bước',
    title: 'NOT EXISTS: tìm học viên chưa có điểm',
    duration: '8 phút',
    difficulty: 'Nâng cao',
    dataset: 'student',
    theory: `
      <h3>36. Tìm bản ghi mồ côi với NOT EXISTS</h3>
      <p><code>NOT EXISTS</code> trả về <code>TRUE</code> khi không có bất kỳ bản ghi liên kết nào tồn tại ở bảng con. Đây là phương pháp chuẩn mực an toàn khi dữ liệu có thể chứa giá trị NULL.</p>
      <p><strong>Nhiệm vụ:</strong> Tìm những học viên chưa tham gia học bất kỳ lớp môn học nào (chưa có bản ghi nào trong bảng <code>DIEM</code>).</p>
    `,
    defaultQuery: `SELECT hv.MaHV, hv.HoTen, hv.MaLop
FROM HOCVIEN hv
WHERE NOT EXISTS (
  SELECT 1 
  FROM DIEM d 
  WHERE d.MaHV = hv.MaHV
);`,
    solution: `SELECT MaHV, HoTen FROM HOCVIEN hv WHERE NOT EXISTS (SELECT 1 FROM DIEM d WHERE d.MaHV = hv.MaHV);`,
    hint: `Dùng NOT EXISTS kết hợp điều kiện d.MaHV = hv.MaHV.`
  },

  // =========================================================================
  // CHƯƠNG 8: NGÔN NGỮ ĐỊNH NGHĨA & THAO TÁC DỮ LIỆU (DDL & DML) (4 BÀI)
  // =========================================================================
  {
    id: 'c8-ddl-create',
    chapterId: 8,
    chapterTitle: '8. Định nghĩa & Thao tác dữ liệu (DDL & DML)',
    title: 'Cấu trúc bảng: CREATE, ALTER, DROP',
    duration: '10 phút',
    difficulty: 'Trung bình',
    dataset: 'student',
    theory: `
      <h3>37. Ngôn ngữ định nghĩa dữ liệu (DDL)</h3>
      <p>Theo slide bài giảng Viện CNTT&TT - HVKTQS:</p>
      <ul>
        <li><code>CREATE TABLE &lt;Tên bảng&gt; (&lt;Tên cột&gt; &lt;Kiểu&gt; [&lt;Ràng buộc&gt;]);</code></li>
        <li><code>ALTER TABLE &lt;Tên bảng&gt; ADD &lt;Tên cột&gt; &lt;Kiểu&gt;;</code></li>
        <li><code>ALTER TABLE &lt;Tên bảng&gt; DROP COLUMN &lt;Tên cột&gt;;</code></li>
        <li><code>DROP TABLE &lt;Tên bảng&gt;;</code></li>
      </ul>
      <p><strong>Thử thách:</strong> Tạo một bảng mới <code>KHENTHUONG</code> để lưu danh sách khen thưởng học viên rèn luyện thể lực và học tập tốt.</p>
    `,
    defaultQuery: `CREATE TABLE KHENTHUONG (
  MaKT VARCHAR(10) PRIMARY KEY,
  MaHV VARCHAR(10) REFERENCES HOCVIEN(MaHV),
  HinhThuc NVARCHAR(100) NOT NULL,
  NgayKhen DATE DEFAULT '2026-10-20'
);

INSERT INTO KHENTHUONG VALUES ('KT01', 'HV01', 'Chiến sĩ Thi đua cơ sở', '2026-10-20');
SELECT * FROM KHENTHUONG;`,
    solution: `CREATE TABLE KHENTHUONG (MaKT VARCHAR(10) PRIMARY KEY);`,
    hint: `Chạy toàn bộ khối lệnh để tạo bảng và xem kết quả trực tiếp trong bộ nhớ.`
  },
  {
    id: 'c8-constraints',
    chapterId: 8,
    chapterTitle: '8. Định nghĩa & Thao tác dữ liệu (DDL & DML)',
    title: 'Thiết lập ràng buộc (Constraints)',
    duration: '10 phút',
    difficulty: 'Nâng cao',
    dataset: 'student',
    theory: `
      <h3>38. Kiểm soát toàn vẹn dữ liệu với Table Constraints</h3>
      <p>Theo slide số 8-11:</p>
      <ul>
        <li><code>PRIMARY KEY</code>: Khóa chính, định danh duy nhất mỗi bản ghi, không nhận NULL.</li>
        <li><code>FOREIGN KEY ... REFERENCES</code>: Khóa ngoại, bảo đảm toàn vẹn tham chiếu.</li>
        <li><code>CHECK (condition)</code>: Giới hạn miền giá trị hợp lệ (ví dụ <code>CHECK(DiemThi BETWEEN 0 AND 10)</code>).</li>
        <li><code>UNIQUE</code>: Đảm bảo không trùng lặp trên một hoặc tập hợp nhiều cột.</li>
        <li><code>NOT NULL</code>: Bắt buộc phải có giá trị.</li>
        <li><code>DEFAULT</code>: Thiết lập giá trị mặc định khi chèn bản ghi mới.</li>
      </ul>
      <p><strong>Ví dụ thực tế:</strong> Thêm cột Email vào bảng HOCVIEN với ràng buộc kiểm tra đuôi <code>CHECK (Email LIKE '%@%')</code>.</p>
    `,
    defaultQuery: `ALTER TABLE HOCVIEN ADD Email VARCHAR(100);
UPDATE HOCVIEN SET Email = LOWER(MaHV) || '@mta.edu.vn';
SELECT MaHV, HoTen, Email FROM HOCVIEN LIMIT 5;`,
    solution: `ALTER TABLE HOCVIEN ADD Email VARCHAR(100);`,
    hint: `Dùng ALTER TABLE ... ADD cột để bổ sung trường mới.`
  },
  {
    id: 'c8-insert',
    chapterId: 8,
    chapterTitle: '8. Định nghĩa & Thao tác dữ liệu (DDL & DML)',
    title: 'Thao tác dữ liệu: INSERT INTO',
    duration: '8 phút',
    difficulty: 'Cơ bản',
    dataset: 'student',
    theory: `
      <h3>39. Chèn bản ghi với lệnh INSERT</h3>
      <p>Theo slide số 16-18:</p>
      <ul>
        <li><strong>Chèn đơn dòng (Single Row):</strong><br>
        <code>INSERT INTO Bang (Cot1, Cot2) VALUES (GiaTri1, GiaTri2);</code></li>
        <li><strong>Chèn đa dòng (Multiple Rows):</strong><br>
        <code>INSERT INTO Bang VALUES (row1...), (row2...), (row3...);</code></li>
        <li><strong>Chèn từ kết quả câu hỏi con (INSERT INTO ... SELECT):</strong><br>
        Sao chép dữ liệu từ bảng này sang bảng khác.</li>
      </ul>
    `,
    defaultQuery: `INSERT INTO HOCVIEN (MaHV, HoTen, GT, NS, DiaChi, MaLop)
VALUES 
  ('HV98', 'Lê Viết Sang', 'Nam', '2003-09-09', 'Ninh Bình', 'CNTTK58'),
  ('HV99', 'Nguyễn Thu Trang', 'Nữ', '2003-12-12', 'Hà Nội', 'CNTTK58');

SELECT * FROM HOCVIEN WHERE MaHV IN ('HV98', 'HV99');`,
    solution: `INSERT INTO HOCVIEN (MaHV, HoTen) VALUES ('HV99', 'Nguyễn Thu Trang');`,
    hint: `Chú ý liệt kê đúng thứ tự cột tương ứng với các giá trị.`
  },
  {
    id: 'c8-update-delete',
    chapterId: 8,
    chapterTitle: '8. Định nghĩa & Thao tác dữ liệu (DDL & DML)',
    title: 'Cập nhật UPDATE và Xoá DELETE',
    duration: '9 phút',
    difficulty: 'Trung bình',
    dataset: 'sales',
    theory: `
      <h3>40. Cập nhật và Xóa dữ liệu (UPDATE & DELETE)</h3>
      <p>Theo slide số 19-25:</p>
      <div class="note-box warning">
        <span class="icon">🚨</span>
        <div><strong>Cảnh báo sống còn:</strong> Luôn luôn có mệnh đề <code>WHERE</code> khi chạy UPDATE hoặc DELETE, nếu không bạn sẽ sửa hoặc xóa sạch toàn bộ cơ sở dữ liệu!</div>
      </div>
      <p><strong>Cú pháp nâng cao:</strong> UPDATE/DELETE kết hợp với Subquery hoặc JOIN để cập nhật hàng loạt theo điều kiện bảng liên kết.</p>
    `,
    defaultQuery: `UPDATE SanPham 
SET GiaBan = GiaBan * 1.1 
WHERE MaDM = 2;

SELECT MaSP, TenSP, MaDM, GiaBan FROM SanPham WHERE MaDM = 2;`,
    solution: `UPDATE SanPham SET GiaBan = GiaBan * 1.1 WHERE MaDM = 2;`,
    hint: `Mệnh đề SET chỉ định cột cần sửa và giá trị mới.`
  },

  // =========================================================================
  // CHƯƠNG 9: TRUY VẤN NÂNG CAO, KHUNG NHÌN (VIEW) & RANKING (4 BÀI)
  // =========================================================================
  {
    id: 'c9-view',
    chapterId: 9,
    chapterTitle: '9. Khung nhìn (View) & Ranking nâng cao',
    title: 'Khung nhìn: CREATE VIEW',
    duration: '9 phút',
    difficulty: 'Nâng cao',
    dataset: 'student',
    theory: `
      <h3>41. Khung nhìn ảo (View) trong cơ sở dữ liệu</h3>
      <p>Theo slide số 48-53 (Viện CNTT&TT): <em>View là một bảng ảo được định nghĩa bởi một câu truy vấn SELECT</em>.</p>
      <ul>
        <li><strong>Bảo mật:</strong> Ẩn các cột nhạy cảm (như mật khẩu, số CMND, mức lương) đối với người dùng cuối.</li>
        <li><strong>Tái sử dụng:</strong> Đóng gói các câu JOIN phức tạp thành một nguồn dữ liệu đơn giản như một bảng thường.</li>
        <li><strong>Criteria pane trong SSMS:</strong> Hỗ trợ thiết kế View với các cột Column, Alias, Table, Output, Sort Type, Filter.</li>
      </ul>
    `,
    defaultQuery: `SELECT * FROM View_KetQuaHocTap WHERE XepLoai = 'Giỏi';`,
    solution: `SELECT * FROM View_KetQuaHocTap;`,
    hint: `View có thể được truy vấn y hệt như một bảng vật lý bằng câu lệnh SELECT.`
  },
  {
    id: 'c9-ranking',
    chapterId: 9,
    chapterTitle: '9. Khung nhìn (View) & Ranking nâng cao',
    title: 'Hàm xếp hạng: ROW_NUMBER, RANK, DENSE_RANK',
    duration: '10 phút',
    difficulty: 'Nâng cao',
    dataset: 'student',
    theory: `
      <h3>42. Phân biệt các hàm Ranking Function</h3>
      <p>Theo slide số 31-35:</p>
      <ul>
        <li><code>ROW_NUMBER() OVER (ORDER BY ...)</code>: Đánh số thứ tự tuần tự không trùng (1, 2, 3, 4...).</li>
        <li><code>RANK() OVER (ORDER BY ...)</code>: Xếp hạng có bước nhảy khi bằng điểm (ví dụ: 1, 2, 2, 4, 5...).</li>
        <li><code>DENSE_RANK() OVER (ORDER BY ...)</code>: Xếp hạng liên tục không có khoảng trống (ví dụ: 1, 2, 2, 3, 4...).</li>
        <li><code>PARTITION BY Cot</code>: Chia nhóm xếp hạng độc lập cho từng phân vùng.</li>
      </ul>
    `,
    defaultQuery: `SELECT 
  d.MaHV, 
  hv.HoTen, 
  d.MaLMH, 
  d.DiemMH,
  ROW_NUMBER() OVER (PARTITION BY d.MaLMH ORDER BY d.DiemMH DESC) AS [Row_Num],
  RANK() OVER (PARTITION BY d.MaLMH ORDER BY d.DiemMH DESC) AS [Rank_Col],
  DENSE_RANK() OVER (PARTITION BY d.MaLMH ORDER BY d.DiemMH DESC) AS [Dense_Rank_Col]
FROM DIEM d
JOIN HOCVIEN hv ON d.MaHV = hv.MaHV
ORDER BY d.MaLMH, d.DiemMH DESC;`,
    solution: `SELECT MaHV, RANK() OVER (ORDER BY DiemMH DESC) FROM DIEM;`,
    hint: `Chú ý cú pháp OVER (PARTITION BY ... ORDER BY ...)`
  },
  {
    id: 'c9-rollup-cube',
    chapterId: 9,
    chapterTitle: '9. Khung nhìn (View) & Ranking nâng cao',
    title: 'Thống kê đa chiều: ROLLUP và CUBE',
    duration: '10 phút',
    difficulty: 'Nâng cao',
    dataset: 'sales',
    theory: `
      <h3>43. Thống kê tổng hợp trung gian với ROLLUP và CUBE</h3>
      <p>Theo slide số 36-39:</p>
      <ul>
        <li><code>ROLLUP(A, B)</code>: Tạo ra các dòng tổng phân cấp theo hình cây (tổng cho từng A, sau đó tổng toàn bộ bảng).</li>
        <li><code>CUBE(A, B)</code>: Tạo ra tất cả các tổ hợp thống kê đa chiều (A, B), (A), (B) và Đại tổng (Grand Total).</li>
      </ul>
      <p><strong>Minh họa truy vấn:</strong> Báo cáo doanh số theo danh mục và hóa đơn.</p>
    `,
    defaultQuery: `SELECT 
  COALESCE(dm.TenDM, '--- TỔNG TOÀN BỘ CSDL ---') AS [Tên Danh Mục],
  COUNT(sp.MaSP) AS [Số Đầu Sản Phẩm],
  SUM(sp.SoLuong) AS [Tổng Tồn Kho],
  SUM(sp.GiaBan * sp.SoLuong) AS [Tổng Giá Trị Kho]
FROM SanPham sp
JOIN DanhMuc dm ON sp.MaDM = dm.MaDM
GROUP BY dm.TenDM;`,
    solution: `SELECT dm.TenDM, SUM(sp.GiaBan) FROM SanPham sp JOIN DanhMuc dm ON sp.MaDM = dm.MaDM GROUP BY dm.TenDM;`,
    hint: `ROLLUP mở rộng mệnh đề GROUP BY để phát sinh các dòng tổng trung gian.`
  },
  {
    id: 'c9-pivot',
    chapterId: 9,
    chapterTitle: '9. Khung nhìn (View) & Ranking nâng cao',
    title: 'Xoay trục dữ liệu: PIVOT và UNPIVOT',
    duration: '10 phút',
    difficulty: 'Nâng cao',
    dataset: 'sales',
    theory: `
      <h3>44. Kỹ thuật xoay bảng PIVOT / UNPIVOT</h3>
      <p>Theo slide số 40-44:</p>
      <ul>
        <li><code>PIVOT</code>: Xoay các giá trị duy nhất trong một cột thành các tiêu đề cột riêng biệt và thực hiện hàm thống kê.</li>
        <li><code>UNPIVOT</code>: Thao tác ngược lại, biến các tiêu đề cột thành các giá trị của một dòng.</li>
      </ul>
      <p>Trong thực tế, bạn có thể mô phỏng PIVOT cực kỳ linh hoạt bằng cách sử dụng <code>SUM(CASE WHEN ...)</code> theo tháng như slide 42 chỉ rõ!</p>
    `,
    defaultQuery: `SELECT 
  strftime('%Y', NgayLap) AS [Năm],
  SUM(CASE WHEN strftime('%m', NgayLap) = '09' THEN TongTien ELSE 0 END) AS [Tháng 9],
  SUM(CASE WHEN strftime('%m', NgayLap) = '10' THEN TongTien ELSE 0 END) AS [Tháng 10],
  SUM(TongTien) AS [Cả Năm]
FROM HoaDon
GROUP BY strftime('%Y', NgayLap);`,
    solution: `SELECT SUM(CASE WHEN strftime('%m', NgayLap) = '10' THEN TongTien ELSE 0 END) FROM HoaDon;`,
    hint: `Sử dụng hàm SUM(CASE WHEN ...) để chuyển giá trị dòng thành cột kết quả.`
  },

  // =========================================================================
  // CHƯƠNG 10: LẬP TRÌNH T-SQL (5 BÀI)
  // =========================================================================
  {
    id: 'c10-variables',
    chapterId: 10,
    chapterTitle: '10. Lập trình T-SQL',
    title: 'Biến, Lô lệnh (Batch) và DECLARE',
    duration: '8 phút',
    difficulty: 'Trung bình',
    dataset: 'student',
    theory: `
      <h3>45. Transaction SQL (T-SQL) & Khai báo biến</h3>
      <p>Theo slide Lập trình T-SQL (trang 3, 9, 10):</p>
      <ul>
        <li><strong>Biến cục bộ:</strong> Bắt đầu bằng ký tự <code>@</code>, khai báo bằng <code>DECLARE @TenBien KieuDuLieu</code>.</li>
        <li><strong>Gán giá trị:</strong> Dùng lệnh <code>SET @TenBien = GiaTri</code> hoặc dùng <code>SELECT @TenBien = Cot FROM ...</code></li>
        <li><strong>Khối lệnh:</strong> Đóng gói bằng cặp từ khóa <code>BEGIN ... END</code>.</li>
        <li><strong>Lô lệnh (Batch):</strong> Kết thúc bằng lệnh <code>GO</code> để máy chủ SQL Server phân tách kế hoạch thực thi.</li>
      </ul>
    `,
    defaultQuery: `DECLARE @SearchTerm NVARCHAR(50) = 'Hà Nội';
DECLARE @CountHV INT;

SELECT @CountHV = COUNT(*) FROM HOCVIEN WHERE DiaChi = @SearchTerm;

PRINT 'Tìm thấy ' + CAST(@CountHV AS VARCHAR) + ' học viên quê ở ' + @SearchTerm;`,
    solution: `DECLARE @x INT = 10; PRINT @x;`,
    hint: `Nhấn 'Chạy truy vấn' để xem trình giả lập T-SQL xử lý biến và in thông báo ra tab 'Thông báo'.`
  },
  {
    id: 'c10-if-else',
    chapterId: 10,
    chapterTitle: '10. Lập trình T-SQL',
    title: 'Rẽ nhánh IF...ELSE và CASE trong T-SQL',
    duration: '8 phút',
    difficulty: 'Trung bình',
    dataset: 'student',
    theory: `
      <h3>46. Cấu trúc rẽ nhánh IF...ELSE</h3>
      <p>Theo slide số 11-15:</p>
      <div class="syntax-box">
        <div class="syntax-label">CÚ PHÁP T-SQL</div>
        <code>IF (DieuKien)<br>
BEGIN<br>
&nbsp;&nbsp;-- Các câu lệnh<br>
END<br>
ELSE<br>
BEGIN<br>
&nbsp;&nbsp;-- Các câu lệnh khác<br>
END</code>
      </div>
      <p>Cho phép bạn kiểm tra điều kiện nghiệp vụ trước khi tiến hành thêm, sửa, xóa bản ghi trong cơ sở dữ liệu.</p>
    `,
    defaultQuery: `DECLARE @DiemThi FLOAT = 8.5;

IF (@DiemThi >= 8.5)
BEGIN
  PRINT 'Học viên đạt loại Giỏi. Cần đề xuất khen thưởng quân sự!';
END
ELSE
BEGIN
  PRINT 'Học viên cần tiếp tục phấn đấu học kỳ tới.';
END`,
    solution: `IF (1 = 1) BEGIN PRINT 'Đúng'; END`,
    hint: `Khối lệnh có từ 2 câu trở lên phải được bọc trong BEGIN ... END.`
  },
  {
    id: 'c10-while',
    chapterId: 10,
    chapterTitle: '10. Lập trình T-SQL',
    title: 'Vòng lặp WHILE, BREAK, CONTINUE, GOTO',
    duration: '9 phút',
    difficulty: 'Nâng cao',
    dataset: 'student',
    theory: `
      <h3>47. Cấu trúc lặp WHILE trong T-SQL</h3>
      <p>Theo slide số 19-23:</p>
      <ul>
        <li><code>WHILE Boolean_expression BEGIN ... END</code></li>
        <li><code>BREAK</code>: Ngắt vòng lặp ngay lập tức.</li>
        <li><code>CONTINUE</code>: Bỏ qua các lệnh còn lại của chu kỳ hiện tại và quay về kiểm tra điều kiện lặp tiếp theo.</li>
        <li><code>GOTO &lt;Nhãn&gt;</code>: Nhảy trực tiếp đến vị trí nhãn được định nghĩa.</li>
      </ul>
      <p><strong>Bài toán kinh điển (Slide 42):</strong> Tính tổng các giá trị từ 1 đến 1000 rồi in kết quả ra màn hình.</p>
    `,
    defaultQuery: `DECLARE @i INT = 1;
DECLARE @Tong INT = 0;

WHILE (@i <= 1000)
BEGIN
  SET @Tong = @Tong + @i;
  SET @i = @i + 1;
END

PRINT 'Tổng các giá trị từ 1 đến 1000 là: ' + CAST(@Tong AS VARCHAR);`,
    solution: `DECLARE @i INT = 0; WHILE (@i < 10) BEGIN SET @i = @i + 1; END`,
    hint: `Đừng quên tăng biến chỉ số @i = @i + 1 để tránh vòng lặp vô tận.`
  },
  {
    id: 'c10-try-catch',
    chapterId: 10,
    chapterTitle: '10. Lập trình T-SQL',
    title: 'Bắt lỗi TRY...CATCH & Transaction (Giao dịch)',
    duration: '10 phút',
    difficulty: 'Nâng cao',
    dataset: 'student',
    theory: `
      <h3>48. Kiểm soát ngoại lệ và Giao dịch an toàn</h3>
      <p>Theo slide số 24-25:</p>
      <div class="syntax-box">
        <div class="syntax-label">CÚ PHÁP TRANSACTION VÀ TRY...CATCH</div>
        <code>BEGIN TRANSACTION;<br>
BEGIN TRY<br>
&nbsp;&nbsp;-- Thực thi các lệnh DML (INSERT/UPDATE/DELETE)<br>
&nbsp;&nbsp;COMMIT TRANSACTION;<br>
END TRY<br>
BEGIN CATCH<br>
&nbsp;&nbsp;ROLLBACK TRANSACTION; -- Hoàn tác an toàn<br>
&nbsp;&nbsp;THROW;<br>
END CATCH</code>
      </div>
      <p>Nếu bất kỳ lỗi nào xảy ra trong khối <code>TRY</code>, quyền điều khiển được chuyển sang khối <code>CATCH</code> để <code>ROLLBACK</code> toàn bộ, đảm bảo tính toàn vẹn (ACID) cho hệ thống phần mềm thực tế.</p>
    `,
    defaultQuery: `BEGIN TRANSACTION
BEGIN TRY
  -- Thử thực thi thao tác
  PRINT 'Bắt đầu cập nhật điểm học kỳ mới...';
  -- Giả sử phát sinh lỗi kiểu dữ liệu
  -- THROW 50000, 'Lỗi điểm không hợp lệ!', 1;
  COMMIT TRANSACTION;
  PRINT 'Giao dịch thành công!';
END TRY
BEGIN CATCH
  ROLLBACK TRANSACTION;
  PRINT 'Đã Rollback toàn bộ dữ liệu!';
END CATCH`,
    solution: `BEGIN TRY PRINT 'OK'; END TRY BEGIN CATCH PRINT 'Error'; END CATCH`,
    hint: `Lệnh ROLLBACK TRANSACTION hoàn tác mọi thay đổi chưa được commit.`
  },
  {
    id: 'c10-cursor',
    chapterId: 10,
    chapterTitle: '10. Lập trình T-SQL',
    title: 'Con trỏ (Cursor): Duyệt dữ liệu từng dòng',
    duration: '12 phút',
    difficulty: 'Nâng cao',
    dataset: 'sales',
    theory: `
      <h3>49. Đối tượng Con trỏ (Cursor) trong T-SQL</h3>
      <p>Theo slide số 26-40:</p>
      <ul>
        <li><strong>Khái niệm:</strong> Cursor cho phép duyệt và thao tác xử lý nghiệp vụ trên từng dòng dữ liệu tuần tự (Fetch row-by-row).</li>
        <li><strong>Vòng đời của con trỏ:</strong>
          <ol>
            <li><code>DECLARE &lt;TênConTrỏ&gt; CURSOR FOR SELECT ...</code></li>
            <li><code>OPEN &lt;TênConTrỏ&gt;</code></li>
            <li><code>FETCH NEXT FROM ... INTO @vars</code></li>
            <li><code>WHILE @@FETCH_STATUS = 0 BEGIN ... FETCH NEXT ... END</code></li>
            <li><code>CLOSE &lt;TênConTrỏ&gt;</code></li>
            <li><code>DEALLOCATE &lt;TênConTrỏ&gt;</code></li>
          </ol>
        </li>
      </ul>
      <div class="note-box warning">
        <span class="icon">⚖️</span>
        <div><strong>Hạn chế của Cursor (Slide 36-38):</strong> Cursor tiêu tốn nhiều bộ nhớ RAM và làm chậm hệ thống do xử lý theo từng dòng. Nếu bài toán có thể giải quyết bằng phép <code>JOIN</code> hoặc cập nhật tập hợp thì luôn ưu tiên dùng JOIN thay vì Cursor!</div>
      </div>
    `,
    defaultQuery: `DECLARE @MaHD VARCHAR(10);
DECLARE @curHoaDon CURSOR;

SET @curHoaDon = CURSOR FOR
  SELECT MaHD FROM HoaDon;

OPEN @curHoaDon;
FETCH NEXT FROM @curHoaDon INTO @MaHD;

WHILE @@FETCH_STATUS = 0
BEGIN
  PRINT 'Đang duyệt và xử lý tính toán cho Hoá đơn: ' + @MaHD;
  FETCH NEXT FROM @curHoaDon INTO @MaHD;
END;

CLOSE @curHoaDon;
DEALLOCATE @curHoaDon;`,
    solution: `OPEN cur; FETCH NEXT FROM cur INTO @x; CLOSE cur; DEALLOCATE cur;`,
    hint: `Kiểm tra điều kiện @@FETCH_STATUS = 0 để biết con trỏ còn dòng tiếp theo hay không.`
  },

  // =========================================================================
  // CHƯƠNG 11: ĐÓNG GÓI LOGIC: THỦ TỤC & HÀM (4 BÀI)
  // =========================================================================
  {
    id: 'c11-procedure',
    chapterId: 11,
    chapterTitle: '11. Đóng gói Logic: Thủ tục & Hàm',
    title: 'Thủ tục lưu trữ: CREATE PROCEDURE',
    duration: '11 phút',
    difficulty: 'Nâng cao',
    dataset: 'student',
    theory: `
      <h3>50. Thủ tục lưu trữ (Stored Procedure)</h3>
      <p>Theo slide Procedure - Function (trang 3-10):</p>
      <ul>
        <li><strong>Khái niệm:</strong> Stored Procedure là tập hợp các câu lệnh T-SQL được lưu trữ và biên dịch sẵn thành một kế hoạch thực thi trên máy chủ CSDL.</li>
        <li><strong>Ưu điểm vượt trội:</strong>
          <ul>
            <li><em>Giảm lưu lượng mạng:</em> Chỉ cần gửi lời gọi <code>EXEC TênThủTục</code> thay vì gửi cả đoạn mã SQL dài.</li>
            <li><em>Tối ưu hiệu năng:</em> Được biên dịch 1 lần và lưu trong bộ nhớ đệm (Cache).</li>
            <li><em>Bảo mật cao:</em> Ẩn giấu cấu trúc bảng thật đối với hacker và ứng dụng ngoài.</li>
          </ul>
        </li>
        <li><strong>Cú pháp tham số:</strong> Tham số đầu vào (Input) và tham số đầu ra (<code>OUTPUT</code>).</li>
      </ul>
    `,
    defaultQuery: `CREATE PROCEDURE sp_KiemTraDiemHocVien
  @MaHV VARCHAR(10),
  @DiemTB FLOAT OUTPUT
AS
BEGIN
  SELECT @DiemTB = AVG(DiemMH)
  FROM DIEM
  WHERE MaHV = @MaHV;
  
  PRINT 'Thủ tục đã tính toán xong điểm TB cho học viên: ' + @MaHV;
END;`,
    solution: `CREATE PROCEDURE sp_Test AS BEGIN SELECT 1; END;`,
    hint: `Dùng từ khóa OUTPUT đằng sau tham số nếu muốn trả giá trị ngược lại cho chương trình gọi.`
  },
  {
    id: 'c11-scalar-function',
    chapterId: 11,
    chapterTitle: '11. Đóng gói Logic: Thủ tục & Hàm',
    title: 'Hàm vô hướng: Scalar Function',
    duration: '9 phút',
    difficulty: 'Nâng cao',
    dataset: 'student',
    theory: `
      <h3>51. Hàm trả về một giá trị đơn (Scalar Function)</h3>
      <p>Theo slide số 18-21: Hàm vô hướng nhận tham số đầu vào và trả về đúng một giá trị duy nhất (kiểu INT, VARCHAR, FLOAT...).</p>
      <div class="syntax-box">
        <div class="syntax-label">CÚ PHÁP</div>
        <code>CREATE FUNCTION fn_XepLoai (@Diem FLOAT)<br>
RETURNS NVARCHAR(20)<br>
AS<br>
BEGIN<br>
&nbsp;&nbsp;DECLARE @KetQua NVARCHAR(20);<br>
&nbsp;&nbsp;IF (@Diem >= 8.5) SET @KetQua = N'Giỏi';<br>
&nbsp;&nbsp;ELSE IF (@Diem >= 7.0) SET @KetQua = N'Khá';<br>
&nbsp;&nbsp;ELSE SET @KetQua = N'Trung bình';<br>
&nbsp;&nbsp;RETURN @KetQua;<br>
END;</code>
      </div>
      <p>Điểm mạnh của Function: Có thể gọi trực tiếp trong câu lệnh <code>SELECT TenHV, dbo.fn_XepLoai(Diem) FROM ...</code></p>
    `,
    defaultQuery: `CREATE FUNCTION fn_XepLoai (@Diem FLOAT)
RETURNS NVARCHAR(20)
AS
BEGIN
  DECLARE @KetQua NVARCHAR(20);
  IF (@Diem >= 8.5) SET @KetQua = 'Giỏi';
  ELSE IF (@Diem >= 7.0) SET @KetQua = 'Khá';
  ELSE SET @KetQua = 'Đạt';
  RETURN @KetQua;
END;`,
    solution: `CREATE FUNCTION fn_Test() RETURNS INT AS BEGIN RETURN 1; END;`,
    hint: `Bắt buộc phải có mệnh đề RETURNS kiểu_dữ_liệu và lệnh RETURN giá_trị bên trong khối BEGIN...END.`
  },
  {
    id: 'c11-table-function',
    chapterId: 11,
    chapterTitle: '11. Đóng gói Logic: Thủ tục & Hàm',
    title: 'Hàm trả về bảng: Table-valued Function',
    duration: '10 phút',
    difficulty: 'Nâng cao',
    dataset: 'student',
    theory: `
      <h3>52. Hàm trả về kiểu bảng (Table-valued Function)</h3>
      <p>Theo slide số 20, 22, 23: Hàm trả về một bảng hoàn chỉnh (<code>RETURNS TABLE</code>) cho phép truyền tham số lọc và gọi trực tiếp trong mệnh đề <code>FROM</code> như một bảng động.</p>
      
      <p><strong>Ví dụ slide 23:</strong> Viết hàm <code>fncDSSV(@MaLop CHAR(10))</code> trả về danh sách học viên của lớp truyền vào.</p>
    `,
    defaultQuery: `CREATE FUNCTION fncDSSV (@MaLop VARCHAR(10))
RETURNS TABLE
AS
RETURN (
  SELECT MaHV, HoTen, GT, NS, DiaChi
  FROM HOCVIEN
  WHERE MaLop = @MaLop
);

-- Khi gọi trong chương trình:
-- SELECT * FROM fncDSSV('CNTTK58');`,
    solution: `CREATE FUNCTION fnc_LayLop(@x VARCHAR(10)) RETURNS TABLE AS RETURN (SELECT * FROM LOPCN WHERE MaLop = @x);`,
    hint: `Với Inline Table Function, phần thân chỉ cần AS RETURN (câu_lệnh_SELECT).`
  },
  {
    id: 'c11-final-project',
    chapterId: 11,
    chapterTitle: '11. Đóng gói Logic: Thủ tục & Hàm',
    title: 'Thực hành BTL môn học: Khai thác CSDL',
    duration: '15 phút',
    difficulty: 'Nâng cao',
    dataset: 'student',
    theory: `
      <h3>53. Khai thác dữ liệu BTL Quản lý Điểm Học Viên</h3>
      <p>Theo các slide thảo luận bài tập lớn (Slide 26-30 DDL & Slide 25-26 Stored Procedure):</p>
      <div class="note-box success">
        <span class="icon">🎓</span>
        <div>
          <strong>Đề bài tổng hợp cuối khóa:</strong><br>
          Viết truy vấn tổng hợp báo cáo điểm chi tiết toàn bộ học viên thuộc Viện Công nghệ Thông tin và Truyền thông, kèm tên giảng viên phụ trách, điểm số thành phần và xếp loại học tập.
        </div>
      </div>
    `,
    defaultQuery: `SELECT 
  hv.MaHV AS [Mã HV],
  hv.HoTen AS [Họ Tên Học Viên],
  lp.TenLop AS [Lớp Chuyên Ngành],
  mh.TenMH AS [Tên Môn Học],
  gv.HoTen AS [Giảng Viên],
  d.DiemCC AS [Chuyên Cần],
  d.DiemTX AS [Thường Xuyên],
  d.DiemThi AS [Thi Kết Thúc],
  d.DiemMH AS [Tổng Kết MH],
  CASE 
    WHEN d.DiemMH >= 8.5 THEN 'Giỏi'
    WHEN d.DiemMH >= 7.0 THEN 'Khá'
    WHEN d.DiemMH >= 5.5 THEN 'Trung bình'
    ELSE 'Học lại'
  END AS [Xếp Loại]
FROM HOCVIEN hv
JOIN LOPCN lp ON hv.MaLop = lp.MaLop
JOIN DIEM d ON hv.MaHV = d.MaHV
JOIN LOPMH lm ON d.MaLMH = lm.MaLMH
JOIN MONHOC mh ON lm.MaMH = mh.MaMH
LEFT JOIN GV_LopMH pc ON lm.MaLMH = pc.MaLMH
LEFT JOIN GIAOVIEN gv ON pc.MaGV = gv.MaGV
ORDER BY d.DiemMH DESC;`,
    solution: `SELECT hv.MaHV, hv.HoTen, d.DiemMH FROM HOCVIEN hv JOIN DIEM d ON hv.MaHV = d.MaHV;`,
    hint: `Chúc mừng bạn đã hoàn thành trọn vẹn toàn bộ 53 bài giảng chuẩn của chương trình CSDL & T-SQL!`
  }
];

if (typeof module !== 'undefined') {
  module.exports = SQLCurriculum;
}
