/**
 * app.js - UI Controller & State Manager for LearnSQL
 * Học viện Kỹ thuật Quân sự - Viện Công nghệ Thông tin và Truyền thông
 */

document.addEventListener('DOMContentLoaded', async () => {
  // ==========================================
  // 1. APPLICATION STATE
  // ==========================================
  let currentLessonIndex = 0;
  let completedLessons = new Set(JSON.parse(localStorage.getItem('learnsql_completed') || '[]'));
  let activeTab = 'results';
  let activeFilter = 'all';

  // DOM Elements
  const curriculumListEl = document.getElementById('curriculum-list');
  const lessonSearchInput = document.getElementById('lesson-search');
  const filterPills = document.querySelectorAll('.filter-pill');
  
  const breadcrumbChapter = document.getElementById('breadcrumb-chapter');
  const breadcrumbLesson = document.getElementById('breadcrumb-lesson');
  const lessonTitleEl = document.getElementById('lesson-title');
  const metaDurationEl = document.getElementById('meta-duration');
  const metaDifficultyEl = document.getElementById('meta-difficulty');
  const metaDatasetEl = document.getElementById('meta-dataset');
  const lessonContentEl = document.getElementById('lesson-content');

  const btnPrevLesson = document.getElementById('btn-prev-lesson');
  const btnNextLesson = document.getElementById('btn-next-lesson');
  const btnToggleComplete = document.getElementById('btn-toggle-complete');

  const sqlInput = document.getElementById('sql-input');
  const lineNumbers = document.getElementById('line-numbers');
  const btnRunSql = document.getElementById('btn-run-sql');
  const btnResetCode = document.getElementById('btn-reset-code');
  const btnFormatSql = document.getElementById('btn-format-sql');

  const consoleTabs = document.querySelectorAll('.console-tab');
  const execStatus = document.getElementById('exec-status');
  const execRows = document.getElementById('exec-rows');
  const execTime = document.getElementById('exec-time');
  const tableHead = document.getElementById('table-head');
  const tableBody = document.getElementById('table-body');
  const tabMessages = document.getElementById('tab-messages');
  const tabSchema = document.getElementById('tab-schema');
  const tabSolution = document.getElementById('tab-solution');

  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');

  const btnDatasetStudent = document.getElementById('btn-dataset-student');
  const btnDatasetSales = document.getElementById('btn-dataset-sales');
  const btnResetDb = document.getElementById('btn-reset-db');
  const btnThemeToggle = document.getElementById('btn-theme-toggle');
  const btnCheatsheet = document.getElementById('btn-cheatsheet');
  const btnDesktopInfo = document.getElementById('btn-desktop-info');

  // ==========================================
  // 2. DATABASE INITIALIZATION
  // ==========================================
  showToast('Đang nạp động cơ WebAssembly SQLite...', 'info');
  await SQLDatabase.init();
  showToast('CSDL Học viện Kỹ thuật Quân sự đã sẵn sàng!', 'success');

  // Load last visited lesson if saved
  const savedIndex = parseInt(localStorage.getItem('learnsql_last_lesson') || '0', 10);
  if (savedIndex >= 0 && savedIndex < SQLCurriculum.length) {
    currentLessonIndex = savedIndex;
  }

  // ==========================================
  // 3. RENDER CURRICULUM SIDEBAR
  // ==========================================
  function renderCurriculum() {
    curriculumListEl.innerHTML = '';

    // Group lessons by Chapter
    const chapters = {};
    SQLCurriculum.forEach((lesson, index) => {
      // Filter logic
      if (activeFilter === 'basic' && lesson.chapterId > 5) return;
      if (activeFilter === 'advanced' && (lesson.chapterId <= 5 || lesson.chapterId >= 8)) return;
      if (activeFilter === 'ddl' && (lesson.chapterId < 8 || lesson.chapterId > 9)) return;
      if (activeFilter === 'tsql' && lesson.chapterId < 10) return;

      // Search filter
      const q = lessonSearchInput.value.toLowerCase().trim();
      if (q && !lesson.title.toLowerCase().includes(q) && !lesson.chapterTitle.toLowerCase().includes(q)) {
        return;
      }

      if (!chapters[lesson.chapterId]) {
        chapters[lesson.chapterId] = {
          title: lesson.chapterTitle,
          lessons: []
        };
      }
      chapters[lesson.chapterId].lessons.push({ lesson, index });
    });

    Object.keys(chapters).forEach(chId => {
      const ch = chapters[chId];
      const hasActiveLesson = ch.lessons.some(item => item.index === currentLessonIndex);
      
      const chapterItem = document.createElement('div');
      chapterItem.className = `chapter-item ${hasActiveLesson ? 'open' : ''}`;

      const completedCount = ch.lessons.filter(item => completedLessons.has(item.lesson.id)).length;

      chapterItem.innerHTML = `
        <div class="chapter-header">
          <div class="chapter-title-wrapper">
            <span class="chapter-chevron">▶</span>
            <span class="chapter-title">${ch.title}</span>
          </div>
          <span class="chapter-badge">${completedCount}/${ch.lessons.length}</span>
        </div>
        <div class="chapter-lessons"></div>
      `;

      // Accordion click
      chapterItem.querySelector('.chapter-header').addEventListener('click', () => {
        chapterItem.classList.toggle('open');
      });

      const lessonsContainer = chapterItem.querySelector('.chapter-lessons');

      ch.lessons.forEach(({ lesson, index }) => {
        const isCompleted = completedLessons.has(lesson.id);
        const isActive = index === currentLessonIndex;

        const lessonEl = document.createElement('div');
        lessonEl.className = `lesson-item ${isActive ? 'active' : ''}`;
        lessonEl.innerHTML = `
          <div class="lesson-item-left">
            <span class="lesson-status-icon ${isCompleted ? 'completed' : 'not-started'}">
              ${isCompleted ? '✓' : '○'}
            </span>
            <span title="${lesson.title}">${lesson.title}</span>
          </div>
          <span style="font-size: 11px; opacity: 0.6;">${lesson.duration}</span>
        `;

        lessonEl.addEventListener('click', () => {
          selectLesson(index);
        });

        lessonsContainer.appendChild(lessonEl);
      });

      curriculumListEl.appendChild(chapterItem);
    });

    updateProgressBar();
  }

  // ==========================================
  // 4. LESSON SELECTION & RENDERING
  // ==========================================
  function selectLesson(index) {
    if (index < 0 || index >= SQLCurriculum.length) return;
    currentLessonIndex = index;
    localStorage.setItem('learnsql_last_lesson', index);

    const lesson = SQLCurriculum[currentLessonIndex];

    // Auto-switch dataset if lesson demands sales dataset
    if (lesson.dataset === 'sales' && SQLDatabase.getCurrentDataset() !== 'sales') {
      switchDataset('sales', false);
    } else if (lesson.dataset === 'student' && SQLDatabase.getCurrentDataset() !== 'student') {
      switchDataset('student', false);
    }

    // Update Theory View
    breadcrumbChapter.textContent = lesson.chapterTitle;
    breadcrumbLesson.textContent = lesson.title;
    lessonTitleEl.textContent = lesson.title;
    metaDurationEl.textContent = `⏱️ ${lesson.duration}`;
    metaDifficultyEl.textContent = `🌱 ${lesson.difficulty}`;
    metaDatasetEl.textContent = lesson.dataset === 'sales' ? '🛒 Dataset: Bán Hàng' : '🎓 Dataset: Điểm Học Viên';
    lessonContentEl.innerHTML = lesson.theory;

    // Update Completion button state
    updateCompletionButtonState();

    // Load default query into code editor
    sqlInput.value = lesson.defaultQuery.trim();
    updateLineNumbers();

    // Update Solution Tab
    tabSolution.innerHTML = `
      <div style="color: var(--accent-emerald); font-weight: 700; margin-bottom: 8px;">💡 GỢI Ý & ĐÁP ÁN THỰC HIỆN:</div>
      <p style="margin-bottom: 12px; color: var(--text-muted);">${lesson.hint}</p>
      <div class="syntax-box">
        <div class="syntax-label">CÂU LỆNH MẪU</div>
        <code>${escapeHtml(lesson.solution)}</code>
      </div>
      <button id="btn-apply-solution" class="btn-secondary" style="margin-top: 8px;">
        Áp dụng vào Trình Soạn Thảo
      </button>
    `;

    document.getElementById('btn-apply-solution')?.addEventListener('click', () => {
      sqlInput.value = lesson.solution;
      updateLineNumbers();
      switchConsoleTab('results');
      executeSQL();
      showToast('Đã nạp đáp án mẫu!', 'info');
    });

    // Auto-execute default query for instant preview
    executeSQL();

    // Re-render sidebar to highlight active item
    renderCurriculum();
  }

  function updateCompletionButtonState() {
    const lesson = SQLCurriculum[currentLessonIndex];
    if (completedLessons.has(lesson.id)) {
      btnToggleComplete.innerHTML = '<span>✓</span> Đã hoàn thành (Bấm để hủy)';
      btnToggleComplete.style.background = '#059669';
    } else {
      btnToggleComplete.innerHTML = '<span>○</span> Đánh dấu hoàn thành';
      btnToggleComplete.style.background = 'var(--bg-surface)';
    }
  }

  function updateProgressBar() {
    const total = SQLCurriculum.length;
    const completed = completedLessons.size;
    const pct = Math.round((completed / total) * 100);

    progressFill.style.width = `${pct}%`;
    progressText.textContent = `${completed}/${total} (${pct}%)`;
  }

  // ==========================================
  // 5. SQL EXECUTION ENGINE
  // ==========================================
  function executeSQL() {
    const query = sqlInput.value.trim();
    if (!query) {
      showToast('Vui lòng nhập câu lệnh SQL!', 'warning');
      return;
    }

    execStatus.className = 'status-badge';
    execStatus.textContent = 'Đang chạy...';

    setTimeout(() => {
      const res = SQLDatabase.execute(query);

      if (res.success) {
        execStatus.className = 'status-badge success';
        execStatus.textContent = 'Thành công';
        execRows.textContent = `${res.rowCount} dòng`;
        execTime.textContent = `${res.timeMs} ms`;

        // Render Table Grid
        renderTableResult(res.columns, res.values);

        // Update Messages Tab
        tabMessages.className = 'terminal-messages';
        if (res.isTSQLMessage) {
          tabMessages.textContent = res.values.map(r => r[0]).join('\n');
          switchConsoleTab('messages');
        } else if (res.isDML) {
          tabMessages.textContent = res.message || 'Lệnh DML thực thi hoàn tất!';
          switchConsoleTab('results');
        } else {
          tabMessages.textContent = `Truy vấn hoàn tất trong ${res.timeMs} ms. Đã trả về ${res.rowCount} bản ghi.`;
          switchConsoleTab('results');
        }

        // Auto mark as completed if user successfully runs the query
        const curLesson = SQLCurriculum[currentLessonIndex];
        if (!completedLessons.has(curLesson.id)) {
          completedLessons.add(curLesson.id);
          localStorage.setItem('learnsql_completed', JSON.stringify([...completedLessons]));
          updateCompletionButtonState();
          updateProgressBar();
          renderCurriculum();
        }

      } else {
        execStatus.className = 'status-badge error';
        execStatus.textContent = 'Lỗi cú pháp';
        execRows.textContent = '0 dòng';
        execTime.textContent = `${res.timeMs} ms`;

        tabMessages.className = 'terminal-messages error-msg';
        tabMessages.textContent = `❌ LỖI SQL:\n${res.error}\n\n💡 Gợi ý: Hãy kiểm tra đúng tên bảng, tên cột và dấu phẩy giữa các trường! Xem thêm tab 'Gợi ý & Đáp án'.`;
        switchConsoleTab('messages');
      }
    }, 10);
  }

  function renderTableResult(columns, values) {
    tableHead.innerHTML = '';
    tableBody.innerHTML = '';

    if (!columns || columns.length === 0) {
      tableHead.innerHTML = '<th>Thông báo</th>';
      tableBody.innerHTML = '<tr><td>Không có kết quả trả về</td></tr>';
      return;
    }

    // Build Header
    columns.forEach(col => {
      const th = document.createElement('th');
      th.textContent = col;
      tableHead.appendChild(th);
    });

    // Build Body
    values.forEach(row => {
      const tr = document.createElement('tr');
      row.forEach(val => {
        const td = document.createElement('td');
        td.textContent = val === null ? 'NULL' : String(val);
        if (val === null) td.style.color = 'var(--text-faint)';
        tr.appendChild(td);
      });
      tableBody.appendChild(tr);
    });
  }

  // ==========================================
  // 6. SCHEMA INSPECTOR
  // ==========================================
  function renderSchemaView() {
    const tables = SQLDatabase.getSchemaInfo();
    tabSchema.innerHTML = '';

    if (tables.length === 0) {
      tabSchema.innerHTML = '<p style="color: var(--text-muted);">Đang nạp lược đồ cơ sở dữ liệu...</p>';
      return;
    }

    tables.forEach(tbl => {
      const card = document.createElement('div');
      card.className = 'table-card';

      let colsHtml = '';
      tbl.columns.forEach(col => {
        colsHtml += `
          <li class="column-item">
            <span class="column-name ${col.pk ? 'pk' : ''}">${col.pk ? '🔑 ' : ''}${col.name}</span>
            <span class="column-type">${col.type || 'TEXT'}${col.notnull ? ' NOT NULL' : ''}</span>
          </li>
        `;
      });

      card.innerHTML = `
        <div class="table-card-head">
          <span class="table-card-name">📋 ${tbl.name}</span>
          <span class="table-card-count">${tbl.count} dòng</span>
        </div>
        <ul class="column-list">${colsHtml}</ul>
        <button class="btn-icon" style="width: 100%; margin-top: 8px; justify-content: center;" onclick="window.previewTable('${tbl.name}')">
          👁️ Xem 5 dòng mẫu
        </button>
      `;

      tabSchema.appendChild(card);
    });
  }

  window.previewTable = function(tableName) {
    sqlInput.value = `SELECT * FROM ${tableName} LIMIT 5;`;
    updateLineNumbers();
    switchConsoleTab('results');
    executeSQL();
    showToast(`Đang xem 5 dòng của bảng ${tableName}`, 'info');
  };

  // ==========================================
  // 7. LINE NUMBERS & FORMATTER
  // ==========================================
  function updateLineNumbers() {
    const lines = sqlInput.value.split('\n').length;
    let numbers = '';
    for (let i = 1; i <= Math.max(lines, 1); i++) {
      numbers += i + '\n';
    }
    lineNumbers.textContent = numbers;
  }

  sqlInput.addEventListener('input', updateLineNumbers);
  sqlInput.addEventListener('scroll', () => {
    lineNumbers.scrollTop = sqlInput.scrollTop;
  });

  // Support Tab key indentation
  sqlInput.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = sqlInput.selectionStart;
      const end = sqlInput.selectionEnd;
      sqlInput.value = sqlInput.value.substring(0, start) + '  ' + sqlInput.value.substring(end);
      sqlInput.selectionStart = sqlInput.selectionEnd = start + 2;
      updateLineNumbers();
    }
    // Ctrl + Enter or Cmd + Enter to Run SQL
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      executeSQL();
    }
  });

  // Basic SQL Beautifier
  btnFormatSql.addEventListener('click', () => {
    const raw = sqlInput.value;
    const formatted = raw
      .replace(/\s+/g, ' ')
      .replace(/\s*(SELECT|FROM|WHERE|GROUP BY|HAVING|ORDER BY|INNER JOIN|LEFT JOIN|RIGHT JOIN|OUTER JOIN|UNION ALL|UNION|WITH|BEGIN|END|SET|VALUES)\s+/gi, '\n$1 ')
      .trim();
    sqlInput.value = formatted;
    updateLineNumbers();
    showToast('Đã căn lề câu lệnh SQL!', 'info');
  });

  btnResetCode.addEventListener('click', () => {
    const lesson = SQLCurriculum[currentLessonIndex];
    sqlInput.value = lesson.defaultQuery.trim();
    updateLineNumbers();
    showToast('Đã phục hồi câu lệnh bài học gốc!', 'info');
  });

  // ==========================================
  // 8. TABS & DATASET SWITCHERS
  // ==========================================
  function switchConsoleTab(tabName) {
    activeTab = tabName;
    consoleTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabName);
    });

    document.getElementById('tab-results').style.display = tabName === 'results' ? 'block' : 'none';
    document.getElementById('tab-messages').style.display = tabName === 'messages' ? 'block' : 'none';
    document.getElementById('tab-schema').style.display = tabName === 'schema' ? 'grid' : 'none';
    document.getElementById('tab-solution').style.display = tabName === 'solution' ? 'block' : 'none';

    if (tabName === 'schema') {
      renderSchemaView();
    }
  }

  consoleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchConsoleTab(tab.dataset.tab);
    });
  });

  function switchDataset(type, notify = true) {
    SQLDatabase.resetDatabase(type);
    btnDatasetStudent.classList.toggle('active', type === 'student');
    btnDatasetSales.classList.toggle('active', type === 'sales');
    if (notify) {
      showToast(`Đã chuyển sang bộ dữ liệu: ${type === 'student' ? 'Điểm Học Viên (HVKTQS)' : 'Bán Hàng'}`, 'success');
      executeSQL();
      if (activeTab === 'schema') renderSchemaView();
    }
  }

  btnDatasetStudent.addEventListener('click', () => switchDataset('student'));
  btnDatasetSales.addEventListener('click', () => switchDataset('sales'));

  btnResetDb.addEventListener('click', () => {
    if (confirm('Khôi phục toàn bộ bảng CSDL về trạng thái ban đầu?')) {
      SQLDatabase.resetDatabase(SQLDatabase.getCurrentDataset());
      executeSQL();
      showToast('Đã khôi phục CSDL về dữ liệu gốc!', 'success');
    }
  });

  // Navigation Next / Previous
  btnPrevLesson.addEventListener('click', () => {
    if (currentLessonIndex > 0) selectLesson(currentLessonIndex - 1);
  });

  btnNextLesson.addEventListener('click', () => {
    if (currentLessonIndex < SQLCurriculum.length - 1) selectLesson(currentLessonIndex + 1);
  });

  btnToggleComplete.addEventListener('click', () => {
    const lesson = SQLCurriculum[currentLessonIndex];
    if (completedLessons.has(lesson.id)) {
      completedLessons.delete(lesson.id);
      showToast('Đã chuyển bài học sang trạng thái Chưa hoàn thành.', 'info');
    } else {
      completedLessons.add(lesson.id);
      showToast('🎉 Tuyệt vời! Bạn đã hoàn thành bài học này.', 'success');
    }
    localStorage.setItem('learnsql_completed', JSON.stringify([...completedLessons]));
    updateCompletionButtonState();
    updateProgressBar();
    renderCurriculum();
  });

  // Filter pills
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilter = pill.dataset.filter;
      renderCurriculum();
    });
  });

  lessonSearchInput.addEventListener('input', () => {
    renderCurriculum();
  });

  // Run SQL button
  btnRunSql.addEventListener('click', executeSQL);

  // Keyboard shortcut Ctrl + K for search
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      lessonSearchInput.focus();
    }
  });

  // Modals & Tools
  btnCheatsheet.addEventListener('click', () => openModal('modal-cheatsheet'));
  btnDesktopInfo.addEventListener('click', () => openModal('modal-desktop'));

  // Theme toggle
  btnThemeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('learnsql_theme', next);
  });

  const savedTheme = localStorage.getItem('learnsql_theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  // Initial load
  selectLesson(currentLessonIndex);
});

// Modal helpers
function openModal(id) {
  document.getElementById(id).classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

// Toast helper
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  const icon = type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
