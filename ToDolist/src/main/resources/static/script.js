const API_URL = "http://localhost:8080/api/tasks";
const AUTH_URL = "http://localhost:8080/auth";

// Sayfa açılınca token kontrolü yap
window.onload = function () {
    const token = localStorage.getItem("token");
    if (token) {
        showTaskContainer();
        loadTasks();
    } else {
        showAuthContainer();
    }
};

// Giriş ekranını göster
function showAuthContainer() {
    document.getElementById("auth-container").style.display = "block";
    document.getElementById("task-container").style.display = "none";
}

// Görev ekranını göster
function showTaskContainer() {
    document.getElementById("auth-container").style.display = "none";
    document.getElementById("task-container").style.display = "block";
}

// Giriş sekmesi
function showLogin() {
    document.getElementById("login-form").style.display = "flex";
    document.getElementById("register-form").style.display = "none";
    document.getElementById("tab-login").className = "tab-active";
    document.getElementById("tab-register").className = "";
}

// Kayıt sekmesi
function showRegister() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "flex";
    document.getElementById("tab-login").className = "";
    document.getElementById("tab-register").className = "tab-active";
}

// Kayıt ol
function register() {
    const username = document.getElementById("register-username").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value.trim();

    if (!username || !email || !password) {
        showAuthError("register-error", "Tüm alanları doldurunuz!");
        return;
    }

    fetch(AUTH_URL + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    showAuthError("register-error", Object.values(err).join("\n"));
                });
            }
            return response.json().then(data => {
                alert("Kayıt başarılı! Giriş yapabilirsiniz.");
                showLogin();
            });
        });
}

// Giriş yap
function login() {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!username || !password) {
        showAuthError("login-error", "Kullanıcı adı ve şifre boş olamaz!");
        return;
    }

    fetch(AUTH_URL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
        .then(response => {
            if (!response.ok) {
                showAuthError("login-error", "Kullanıcı adı veya şifre hatalı!");
                return;
            }
            return response.json().then(data => {
                localStorage.setItem("token", data.token);
                showTaskContainer();
                loadTasks();
            });
        });
}

// Çıkış yap
function logout() {
    localStorage.removeItem("token");
    showAuthContainer();
}

// Token ile istek at
function authFetch(url, options = {}) {
    const token = localStorage.getItem("token");
    return fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            ...options.headers
        }
    });
}

// Tüm görevleri getir
function loadTasks() {
    authFetch(API_URL)
        .then(response => response.json())
        .then(tasks => {
            const list = document.getElementById("task-list");
            list.innerHTML = "";

            tasks.forEach(task => {
                const li = document.createElement("li");

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = task.tamamlandi_mi;
                checkbox.onchange = function () {
                    toggleTask(task.id, task.baslik, task.aciklama, checkbox.checked);
                };

                const span = document.createElement("span");
                span.textContent = task.baslik + " — " + task.aciklama;
                if (task.tamamlandi_mi) {
                    span.style.textDecoration = "line-through";
                    span.style.color = "#aaa";
                }

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Sil";
                deleteBtn.className = "btn-delete";
                deleteBtn.onclick = function () { deleteTask(task.id); };

                const editBtn = document.createElement("button");
                editBtn.className = "btn-edit";
                editBtn.textContent = "Düzenle";
                editBtn.onclick = function () { editTask(task); };

                li.appendChild(checkbox);
                li.appendChild(span);
                li.appendChild(editBtn);
                li.appendChild(deleteBtn);
                list.appendChild(li);
            });
        });
}

// Yeni görev oluştur
function createTask() {
    const baslik = document.getElementById("baslik").value.trim();
    const aciklama = document.getElementById("aciklama").value.trim();

    if (baslik === "") { showError("Görev başlığı boş olamaz!"); return; }
    if (aciklama === "") { showError("Açıklama boş olamaz!"); return; }

    authFetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ baslik, aciklama, tamamlandi_mi: false })
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => showError(Object.values(err).join("\n")));
            }
            return response.json().then(() => {
                loadTasks();
                document.getElementById("baslik").value = "";
                document.getElementById("aciklama").value = "";
                hideError();
            });
        });
}

// Görevi sil
function deleteTask(id) {
    authFetch(API_URL + "/" + id, { method: "DELETE" })
        .then(() => loadTasks());
}

// Düzenle
function editTask(task) {
    document.getElementById("baslik").value = task.baslik;
    document.getElementById("aciklama").value = task.aciklama;

    const btn = document.querySelector("#task-container .form-area button");
    btn.textContent = "Güncelle";
    btn.onclick = function () { updateTask(task.id); };
}

// Güncelle
function updateTask(id) {
    const baslik = document.getElementById("baslik").value.trim();
    const aciklama = document.getElementById("aciklama").value.trim();

    if (baslik === "") { showError("Görev başlığı boş olamaz!"); return; }
    if (aciklama === "") { showError("Açıklama boş olamaz!"); return; }

    authFetch(API_URL + "/" + id, {
        method: "PUT",
        body: JSON.stringify({ baslik, aciklama, tamamlandi_mi: false })
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => showError(Object.values(err).join("\n")));
            }
            return response.json().then(() => {
                loadTasks();
                document.getElementById("baslik").value = "";
                document.getElementById("aciklama").value = "";
                const btn = document.querySelector("#task-container .form-area button");
                btn.textContent = "Ekle";
                btn.onclick = createTask;
                hideError();
            });
        });
}

// Tamamlandı toggle
function toggleTask(id, baslik, aciklama, tamamlandi_mi) {
    authFetch(API_URL + "/" + id, {
        method: "PUT",
        body: JSON.stringify({ baslik, aciklama, tamamlandi_mi })
    }).then(() => loadTasks());
}

function showError(mesaj) {
    const el = document.getElementById("error-mesaj");
    el.textContent = mesaj;
    el.style.display = "block";
}

function hideError() {
    const el = document.getElementById("error-mesaj");
    el.style.display = "none";
}

function showAuthError(id, mesaj) {
    const el = document.getElementById(id);
    el.textContent = mesaj;
    el.style.display = "block";
}