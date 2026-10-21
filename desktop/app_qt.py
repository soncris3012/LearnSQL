#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
LearnSQL Desktop - Qt Edition (PyQt6 / PySide6)
Cross-platform Desktop Application for Windows, macOS, Linux
Học viện Kỹ thuật Quân sự - Viện Công nghệ Thông tin và Truyền thông
Hỗ trợ cả chế độ Native Qt GUI lẫn chế độ nhúng WebEngineView cao cấp!
"""

import sys
import os
import sqlite3
import time

# Auto-detect Qt binding: PyQt6 or PySide6
QT_BINDING = None
try:
    from PyQt6.QtWidgets import (
        QApplication, QMainWindow, QWidget, QVBoxLayout, QHBoxLayout,
        QSplitter, QTreeWidget, QTreeWidgetItem, QTextEdit, QTableWidget,
        QTableWidgetItem, QPushButton, QLabel, QHeaderView, QMessageBox
    )
    from PyQt6.QtCore import Qt, QUrl
    from PyQt6.QtGui import QFont, QColor
    QT_BINDING = "PyQt6"
    try:
        from PyQt6.QtWebEngineWidgets import QWebEngineView
        HAS_WEBENGINE = True
    except ImportError:
        HAS_WEBENGINE = False
except ImportError:
    try:
        from PySide6.QtWidgets import (
            QApplication, QMainWindow, QWidget, QVBoxLayout, QHBoxLayout,
            QSplitter, QTreeWidget, QTreeWidgetItem, QTextEdit, QTableWidget,
            QTableWidgetItem, QPushButton, QLabel, QHeaderView, QMessageBox
        )
        from PySide6.QtCore import Qt, QUrl
        from PySide6.QtGui import QFont, QColor
        QT_BINDING = "PySide6"
        try:
            from PySide6.QtWebEngineWidgets import QWebEngineView
            HAS_WEBENGINE = True
        except ImportError:
            HAS_WEBENGINE = False
    except ImportError:
        print("Cần cài đặt PyQt6 hoặc PySide6 để chạy ứng dụng này:")
        print("  pip install PyQt6")
        print("hoặc:")
        print("  pip install PySide6")
        sys.exit(1)

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

QT_LESSONS = [
    {
        "title": "SELECT: Chọn cột từ bảng",
        "desc": "Lệnh SELECT lấy các trường dữ liệu từ bảng HOCVIEN.",
        "sql": "SELECT MaHV, HoTen, GT, DiaChi FROM HOCVIEN;"
    },
    {
        "title": "WHERE: Lọc học viên theo quê quán",
        "desc": "Mệnh đề WHERE lọc dữ liệu thoả mãn điều kiện.",
        "sql": "SELECT MaHV, HoTen, DiaChi FROM HOCVIEN WHERE DiaChi = 'Hà Nội';"
    },
    {
        "title": "JOIN: Ghép học viên và điểm thi",
        "desc": "INNER JOIN kết nối thông tin giữa hai bảng qua MaHV.",
        "sql": "SELECT hv.MaHV, hv.HoTen, hv.MaLop, d.DiemMH FROM HOCVIEN hv JOIN DIEM d ON hv.MaHV = d.MaHV;"
    },
    {
        "title": "RANK: Xếp hạng điểm thi",
        "desc": "Hàm Ranking ROW_NUMBER và RANK sắp xếp điểm môn học giảm dần.",
        "sql": "SELECT MaHV, DiemMH, ROW_NUMBER() OVER (ORDER BY DiemMH DESC) AS STT, RANK() OVER (ORDER BY DiemMH DESC) AS Hang FROM DIEM;"
    }
]

class LearnSQLQtApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("LearnSQL Studio - Học Viện Kỹ Thuật Quân Sự (Qt6)")
        self.resize(1200, 750)
        
        # SQLite Connection
        self.conn = sqlite3.connect(":memory:")
        self.cursor = self.conn.cursor()
        self.cursor.executescript(SEED_SQL)
        self.conn.commit()

        self.setup_ui()
        self.load_lessons()
        self.select_lesson(0)

    def setup_ui(self):
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        main_layout = QVBoxLayout(central_widget)
        main_layout.setContentsMargins(10, 10, 10, 10)

        # Top Bar
        top_bar = QHBoxLayout()
        lbl_title = QLabel("🎓 LearnSQL Desktop Studio - Viện CNTT&TT")
        lbl_title.setFont(QFont("Arial", 14, QFont.Weight.Bold))
        top_bar.addWidget(lbl_title)
        top_bar.addStretch()

        btn_run = QPushButton("▶ Chạy SQL (Ctrl+Enter)")
        btn_run.setStyleSheet("background-color: #0284c7; color: white; font-weight: bold; padding: 6px 14px; border-radius: 6px;")
        btn_run.clicked.connect(self.run_sql)
        top_bar.addWidget(btn_run)

        btn_reset = QPushButton("🔄 Reset CSDL")
        btn_reset.setStyleSheet("padding: 6px 12px; border-radius: 6px;")
        btn_reset.clicked.connect(self.reset_db)
        top_bar.addWidget(btn_reset)

        main_layout.addLayout(top_bar)

        # Splitter Layout (Left Tree, Middle Theory, Right Code & Table)
        splitter = QSplitter(Qt.Orientation.Horizontal)
        main_layout.addWidget(splitter)

        # 1. Left Tree Widget
        self.tree_lessons = QTreeWidget()
        self.tree_lessons.setHeaderLabel("Danh Sách Bài Học")
        self.tree_lessons.itemClicked.connect(self.on_lesson_clicked)
        splitter.addWidget(self.tree_lessons)
        splitter.setStretchFactor(0, 1)

        # 2. Middle Theory Widget
        self.txt_theory = QTextEdit()
        self.txt_theory.setReadOnly(True)
        self.txt_theory.setFont(QFont("Arial", 11))
        splitter.addWidget(self.txt_theory)
        splitter.setStretchFactor(1, 1)

        # 3. Right Panel (Code Editor + Table Result)
        right_panel = QWidget()
        right_layout = QVBoxLayout(right_panel)
        right_layout.setContentsMargins(0, 0, 0, 0)

        lbl_code = QLabel("Trình Soạn Thảo Câu Lệnh SQL:")
        lbl_code.setFont(QFont("Arial", 10, QFont.Weight.Bold))
        right_layout.addWidget(lbl_code)

        self.txt_code = QTextEdit()
        self.txt_code.setFont(QFont("Courier New", 11))
        self.txt_code.setStyleSheet("background-color: #090d16; color: #38bdf8; border-radius: 6px; padding: 8px;")
        right_layout.addWidget(self.txt_code, stretch=1)

        self.lbl_status = QLabel("Trạng thái: Sẵn sàng thực thi truy vấn.")
        self.lbl_status.setStyleSheet("color: #64748b; font-size: 11px;")
        right_layout.addWidget(self.lbl_status)

        self.tbl_results = QTableWidget()
        self.tbl_results.horizontalHeader().setSectionResizeMode(QHeaderView.ResizeMode.Stretch)
        right_layout.addWidget(self.tbl_results, stretch=2)

        splitter.addWidget(right_panel)
        splitter.setStretchFactor(2, 2)

    def load_lessons(self):
        for idx, item in enumerate(QT_LESSONS):
            tree_item = QTreeWidgetItem([f"Bài {idx+1}: {item['title']}"])
            tree_item.setData(0, Qt.ItemDataRole.UserRole, idx)
            self.tree_lessons.addTopLevelItem(tree_item)

    def on_lesson_clicked(self, item, column):
        idx = item.data(0, Qt.ItemDataRole.UserRole)
        if idx is not None:
            self.select_lesson(idx)

    def select_lesson(self, idx):
        lesson = QT_LESSONS[idx]
        self.txt_theory.setHtml(f"""
            <h2 style='color: #0284c7;'>{lesson['title']}</h2>
            <p style='font-size: 13px; line-height: 1.6;'>{lesson['desc']}</p>
            <div style='background: #f1f5f9; padding: 10px; border-left: 4px solid #0284c7; border-radius: 4px;'>
              <b>Cú pháp chuẩn:</b><br>
              <code>{lesson['sql']}</code>
            </div>
        """)
        self.txt_code.setPlainText(lesson['sql'])
        self.run_sql()

    def run_sql(self):
        query = self.txt_code.toPlainText().strip()
        if not query:
            return

        start_time = time.time()
        try:
            self.cursor.execute(query)
            duration_ms = round((time.time() - start_time) * 1000, 2)

            if self.cursor.description:
                columns = [desc[0] for desc in self.cursor.description]
                rows = self.cursor.fetchall()

                self.tbl_results.setColumnCount(len(columns))
                self.tbl_results.setHorizontalHeaderLabels(columns)
                self.tbl_results.setRowCount(len(rows))

                for r_idx, row in enumerate(rows):
                    for c_idx, val in enumerate(row):
                        item = QTableWidgetItem(str(val) if val is not None else "NULL")
                        self.tbl_results.setItem(r_idx, c_idx, item)

                self.lbl_status.setText(f"✅ Truy vấn thành công: {len(rows)} bản ghi trong {duration_ms} ms")
                self.lbl_status.setStyleSheet("color: #059669; font-weight: bold;")
            else:
                self.conn.commit()
                affected = self.cursor.rowcount
                self.tbl_results.setColumnCount(1)
                self.tbl_results.setHorizontalHeaderLabels(["Thông báo"])
                self.tbl_results.setRowCount(1)
                self.tbl_results.setItem(0, 0, QTableWidgetItem(f"Lệnh DDL/DML hoàn tất. Bản ghi bị tác động: {affected}"))
                self.lbl_status.setText(f"✅ Thực thi hoàn tất ({duration_ms} ms)")
                self.lbl_status.setStyleSheet("color: #059669; font-weight: bold;")

        except Exception as e:
            duration_ms = round((time.time() - start_time) * 1000, 2)
            self.tbl_results.setColumnCount(1)
            self.tbl_results.setHorizontalHeaderLabels(["Chi tiết lỗi"])
            self.tbl_results.setRowCount(1)
            self.tbl_results.setItem(0, 0, QTableWidgetItem(str(e)))
            self.lbl_status.setText(f"❌ Lỗi SQL ({duration_ms} ms)")
            self.lbl_status.setStyleSheet("color: #e11d48; font-weight: bold;")

    def reset_db(self):
        self.cursor.executescript(SEED_SQL)
        self.conn.commit()
        QMessageBox.information(self, "LearnSQL", "Đã khôi phục CSDL Học viện Kỹ thuật Quân sự!")
        self.run_sql()

def main():
    app = QApplication(sys.argv)
    window = LearnSQLQtApp()
    window.show()
    sys.exit(app.exec())

if __name__ == "__main__":
    main()
