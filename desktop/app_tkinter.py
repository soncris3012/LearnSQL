#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
LearnSQL Desktop - Native Tkinter Edition
Cross-platform Desktop Application (Windows, macOS, Linux)
Học viện Kỹ thuật Quân sự - Viện Công nghệ Thông tin và Truyền thông
Sử dụng 100% Python Standard Library (không cần cài thêm thư viện ngoài).
"""

import sys
import os
import sqlite3
import time

try:
    import tkinter as tk
    from tkinter import ttk, messagebox, scrolledtext
except ImportError:
    print("Tkinter chưa được cài đặt trong môi trường Python hiện tại.")
    print("Trên macOS (Homebrew): brew install python-tk")
    print("Trên Ubuntu/Debian: sudo apt-get install python3-tk")
    print("Trên Windows: Tkinter được tích hợp sẵn cùng Python installer.")
    sys.exit(1)

# Schema & Seed data
SEED_SQL = """
CREATE TABLE IF NOT EXISTS KHOAVIEN (
  MaKV VARCHAR(10) PRIMARY KEY,
  TenKV TEXT NOT NULL
);
INSERT OR IGNORE INTO KHOAVIEN VALUES 
  ('KV01', 'Viện Công nghệ Thông tin và Truyền thông'),
  ('KV02', 'Khoa Vô tuyến Điện tử');

CREATE TABLE IF NOT EXISTS BOMON (
  MaBM VARCHAR(10) PRIMARY KEY,
  TenBM TEXT NOT NULL,
  MaKV VARCHAR(10)
);
INSERT OR IGNORE INTO BOMON VALUES 
  ('BM01', 'Hệ thống thông tin', 'KV01'),
  ('BM02', 'Khoa học máy tính', 'KV01');

CREATE TABLE IF NOT EXISTS LOPCN (
  MaLop VARCHAR(10) PRIMARY KEY,
  TenLop TEXT NOT NULL,
  MaBM VARCHAR(10)
);
INSERT OR IGNORE INTO LOPCN VALUES 
  ('CNTTK58', 'Công nghệ Thông tin K58', 'BM01'),
  ('KHMTK58', 'Khoa học Máy tính K58', 'BM02');

CREATE TABLE IF NOT EXISTS HOCVIEN (
  MaHV VARCHAR(10) PRIMARY KEY,
  HoTen TEXT NOT NULL,
  GT TEXT,
  NS DATE,
  DiaChi TEXT,
  MaLop VARCHAR(10)
);
INSERT OR IGNORE INTO HOCVIEN VALUES 
  ('HV01', 'Nguyễn Văn An', 'Nam', '2003-05-15', 'Hà Nội', 'CNTTK58'),
  ('HV02', 'Trần Thị Bình', 'Nữ', '2003-08-22', 'Hải Phòng', 'CNTTK58'),
  ('HV03', 'Lê Hoàng Cường', 'Nam', '2002-11-04', 'Nam Định', 'CNTTK58'),
  ('HV04', 'Phạm Minh Đức', 'Nam', '2003-01-30', 'Hà Nội', 'KHMTK58'),
  ('HV05', 'Vũ Thị Hoa', 'Nữ', '2003-09-18', 'Bắc Ninh', 'KHMTK58');

CREATE TABLE IF NOT EXISTS MONHOC (
  MaMH VARCHAR(10) PRIMARY KEY,
  TenMH TEXT NOT NULL,
  SoTC INT,
  SoTiet INT,
  MaBM VARCHAR(10)
);
INSERT OR IGNORE INTO MONHOC VALUES 
  ('CSDL', 'Cơ sở dữ liệu', 4, 60, 'BM01'),
  ('TSQL', 'Lập trình CSDL nâng cao T-SQL', 3, 45, 'BM01');

CREATE TABLE IF NOT EXISTS DIEM (
  MaHV VARCHAR(10),
  MaLMH VARCHAR(10),
  DiemCC REAL,
  DiemTX REAL,
  DiemThi REAL,
  DiemMH REAL,
  PRIMARY KEY (MaHV, MaLMH)
);
INSERT OR IGNORE INTO DIEM VALUES 
  ('HV01', 'LMH01', 9.5, 9.0, 8.5, 8.8),
  ('HV02', 'LMH01', 8.0, 7.5, 8.0, 7.9),
  ('HV03', 'LMH01', 9.0, 8.5, 8.0, 8.3),
  ('HV04', 'LMH01', 7.5, 6.5, 5.5, 6.1),
  ('HV05', 'LMH01', 9.0, 9.5, 9.0, 9.1);
"""

LESSONS = [
    {
        "chapter": "1. Chọn dữ liệu cần xem",
        "title": "SELECT: chọn cột từ một bảng",
        "theory": "Mệnh đề SELECT dùng để chỉ định các cột cần lấy từ bảng dữ liệu.\nCú pháp: SELECT Cot1, Cot2 FROM TenBang;\nVí dụ trong hệ thống Quản lý Điểm Học Viên:",
        "query": "SELECT MaHV, HoTen, GT, DiaChi FROM HOCVIEN;"
    },
    {
        "chapter": "2. Lọc các dòng cần lấy",
        "title": "WHERE: lọc dòng theo điều kiện",
        "theory": "Mệnh đề WHERE lọc ra các bản ghi thoả mãn biểu thức so sánh (=, <>, >, <, >=, <=, LIKE, IN).\nVí dụ lọc học viên quê ở Hà Nội:",
        "query": "SELECT MaHV, HoTen, DiaChi FROM HOCVIEN WHERE DiaChi = 'Hà Nội';"
    },
    {
        "chapter": "5. Tính tổng và chỉ số",
        "title": "GROUP BY và AVG: Thống kê điểm",
        "theory": "GROUP BY gom nhóm dữ liệu để tính các giá trị tổng hợp (COUNT, SUM, AVG, MIN, MAX).",
        "query": "SELECT MaLMH, COUNT(*) AS SoHV, ROUND(AVG(DiemMH), 2) AS DiemTB FROM DIEM GROUP BY MaLMH;"
    },
    {
        "chapter": "6. Kết hợp dữ liệu từ nhiều bảng",
        "title": "INNER JOIN: Ghép bảng Học Viên và Điểm",
        "theory": "INNER JOIN kết nối các bản ghi giữa bảng HOCVIEN và DIEM dựa trên khóa chính - khóa ngoại MaHV.",
        "query": "SELECT hv.MaHV, hv.HoTen, hv.MaLop, d.DiemMH FROM HOCVIEN hv INNER JOIN DIEM d ON hv.MaHV = d.MaHV;"
    },
    {
        "chapter": "9. Khung nhìn (View) & Ranking",
        "title": "Ranking: ROW_NUMBER và RANK",
        "theory": "Các hàm xếp hạng ranking trong T-SQL kết hợp với mệnh đề OVER (ORDER BY ...):",
        "query": "SELECT MaHV, DiemMH, ROW_NUMBER() OVER (ORDER BY DiemMH DESC) AS STT, RANK() OVER (ORDER BY DiemMH DESC) AS XepHang FROM DIEM;"
    }
]

class LearnSQLTkinterApp:
    def __init__(self, root):
        self.root = root
        self.root.title("LearnSQL Desktop - Viện CNTT&TT - HVKTQS")
        self.root.geometry("1180x720")
        self.root.minsize(900, 600)
        
        # Configure style
        self.style = ttk.Style()
        self.style.theme_use('clam')
        
        # Setup In-Memory SQLite Database
        self.conn = sqlite3.connect(":memory:")
        self.cursor = self.conn.cursor()
        self.cursor.executescript(SEED_SQL)
        self.conn.commit()

        self.setup_ui()
        self.load_curriculum_tree()
        self.select_lesson(0)

    def setup_ui(self):
        # Top toolbar
        toolbar = ttk.Frame(self.root, padding=6)
        toolbar.pack(side=tk.TOP, fill=tk.X)

        title_lbl = ttk.Label(toolbar, text="🎓 LearnSQL Workbench - HVKTQS", font=("Helvetica", 13, "bold"))
        title_lbl.pack(side=tk.LEFT, padx=10)

        btn_run = tk.Button(toolbar, text="▶ Chạy SQL (Ctrl+Enter)", bg="#0284c7", fg="white", 
                            font=("Helvetica", 10, "bold"), relief="flat", padx=12, pady=4, command=self.run_sql)
        btn_run.pack(side=tk.RIGHT, padx=6)

        btn_reset = tk.Button(toolbar, text="🔄 Reset CSDL", relief="groove", padx=8, pady=4, command=self.reset_db)
        btn_reset.pack(side=tk.RIGHT, padx=6)

        # Paned Window (Left Tree, Center Theory, Right Editor + Table)
        paned = ttk.PanedWindow(self.root, orient=tk.HORIZONTAL)
        paned.pack(fill=tk.BOTH, expand=True, padx=6, pady=6)

        # Left Frame: Curriculum Tree
        left_frame = ttk.LabelFrame(paned, text="Danh Sách Bài Học", width=260)
        self.tree = ttk.Treeview(left_frame, show="tree", selectmode="browse")
        self.tree.pack(fill=tk.BOTH, expand=True, padx=4, pady=4)
        self.tree.bind("<<TreeviewSelect>>", self.on_tree_select)
        paned.add(left_frame, weight=1)

        # Center Frame: Theory
        center_frame = ttk.LabelFrame(paned, text="Lý Thuyết & Đề Bài", width=340)
        self.txt_theory = scrolledtext.ScrolledText(center_frame, wrap=tk.WORD, font=("Helvetica", 11), padx=8, pady=8)
        self.txt_theory.pack(fill=tk.BOTH, expand=True)
        paned.add(center_frame, weight=1)

        # Right Frame: SQL Code + Result Table
        right_frame = ttk.Frame(paned)
        paned.add(right_frame, weight=2)

        # Code Editor
        editor_frame = ttk.LabelFrame(right_frame, text="Trình Soạn Thảo SQL (T-SQL / SQLite)")
        editor_frame.pack(fill=tk.BOTH, expand=True, padx=2, pady=2)

        self.txt_code = scrolledtext.ScrolledText(editor_frame, wrap=tk.NONE, font=("Courier", 11), 
                                                 background="#0f172a", foreground="#38bdf8",
                                                 insertbackground="white", padx=8, pady=8)
        self.txt_code.pack(fill=tk.BOTH, expand=True)
        self.txt_code.bind("<Control-Return>", lambda e: self.run_sql())

        # Result Panel
        result_frame = ttk.LabelFrame(right_frame, text="Bảng Kết Quả Thực Thi")
        result_frame.pack(fill=tk.BOTH, expand=True, padx=2, pady=4)

        # Status Bar
        self.lbl_status = ttk.Label(result_frame, text="Sẵn sàng thực thi...", font=("Helvetica", 9))
        self.lbl_status.pack(side=tk.BOTTOM, fill=tk.X, padx=4, pady=2)

        # Treeview for Table Grid
        self.res_table = ttk.Treeview(result_frame, show="headings", selectmode="browse")
        scroll_y = ttk.Scrollbar(result_frame, orient=tk.VERTICAL, command=self.res_table.yview)
        scroll_x = ttk.Scrollbar(result_frame, orient=tk.HORIZONTAL, command=self.res_table.xview)
        self.res_table.configure(yscrollcommand=scroll_y.set, xscrollcommand=scroll_x.set)

        scroll_y.pack(side=tk.RIGHT, fill=tk.Y)
        scroll_x.pack(side=tk.BOTTOM, fill=tk.X)
        self.res_table.pack(fill=tk.BOTH, expand=True)

    def load_curriculum_tree(self):
        for idx, item in enumerate(LESSONS):
            self.tree.insert("", "end", iid=str(idx), text=f"Bài {idx+1}: {item['title']}")

    def on_tree_select(self, event):
        selected = self.tree.selection()
        if selected:
            idx = int(selected[0])
            self.select_lesson(idx)

    def select_lesson(self, idx):
        lesson = LESSONS[idx]
        self.txt_theory.delete("1.0", tk.END)
        self.txt_theory.insert(tk.END, f"CHƯƠNG: {lesson['chapter']}\n\n")
        self.txt_theory.insert(tk.END, f"BÀI: {lesson['title']}\n\n")
        self.txt_theory.insert(tk.END, f"{lesson['theory']}\n")

        self.txt_code.delete("1.0", tk.END)
        self.txt_code.insert(tk.END, lesson['query'])
        self.run_sql()

    def run_sql(self):
        query = self.txt_code.get("1.0", tk.END).strip()
        if not query:
            return

        # Clear existing table columns and rows
        self.res_table.delete(*self.res_table.get_children())
        self.res_table["columns"] = ()

        start_time = time.time()
        try:
            self.cursor.execute(query)
            duration_ms = round((time.time() - start_time) * 1000, 2)

            if self.cursor.description:
                columns = [desc[0] for desc in self.cursor.description]
                rows = self.cursor.fetchall()

                self.res_table["columns"] = columns
                for col in columns:
                    self.res_table.heading(col, text=col)
                    self.res_table.column(col, width=120, anchor="w")

                for row in rows:
                    self.res_table.insert("", "end", values=row)

                self.lbl_status.config(text=f"✅ Thành công: {len(rows)} bản ghi trong {duration_ms} ms")
            else:
                self.conn.commit()
                affected = self.cursor.rowcount
                self.res_table["columns"] = ("Thông báo",)
                self.res_table.heading("Thông báo", text="Thông báo hệ thống")
                self.res_table.column("Thông báo", width=300)
                self.res_table.insert("", "end", values=(f"Lệnh DDL/DML thực thi thành công! Bản ghi bị ảnh hưởng: {affected}",))
                self.lbl_status.config(text=f"✅ Lệnh hoàn thành trong {duration_ms} ms")

        except Exception as e:
            duration_ms = round((time.time() - start_time) * 1000, 2)
            self.res_table["columns"] = ("Lỗi SQL",)
            self.res_table.heading("Lỗi SQL", text="Chi tiết lỗi cú pháp")
            self.res_table.column("Lỗi SQL", width=400)
            self.res_table.insert("", "end", values=(str(e),))
            self.lbl_status.config(text=f"❌ Lỗi: {str(e)} ({duration_ms} ms)")

    def reset_db(self):
        self.cursor.executescript(SEED_SQL)
        self.conn.commit()
        messagebox.showinfo("LearnSQL", "Đã khôi phục CSDL Điểm Học Viên về trạng thái ban đầu!")
        self.run_sql()

def main():
    root = tk.Tk()
    app = LearnSQLTkinterApp(root)
    root.mainloop()

if __name__ == "__main__":
    main()
