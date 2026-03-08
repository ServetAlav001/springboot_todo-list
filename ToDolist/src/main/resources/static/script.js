const API_URL = "http://localhost:8080/api/tasks";

// Sayfa açılınca görevleri getir
window.onload = function () {
    loadTasks();
};

// Tüm görevleri getir ve ekrana yaz
function loadTasks() {
    fetch(API_URL)
        .then(response => response.json())
        .then(tasks => {
            const list = document.getElementById("task-list");
            list.innerHTML = "";

            tasks.forEach(task => {
                const li = document.createElement("li");

                // Checkbox
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = task.tamamlandi_mi;
                checkbox.onchange = function () {
                    toggleTask(task.id, task.baslik, task.aciklama, checkbox.checked);
                };

                const span = document.createElement("span");
                span.textContent = task.baslik + " — " + task.aciklama;

                // Tamamlandıysa üzeri çizili
                if (task.tamamlandi_mi) {
                    span.style.textDecoration = "line-through";
                    span.style.color = "#aaa";
                }

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Sil";
                deleteBtn.className = "btn-delete";
                deleteBtn.onclick = function () {
                    deleteTask(task.id);
                };

                const editBtn = document.createElement("button");
                editBtn.className = "btn-edit";
                editBtn.textContent = "Düzenle";
                editBtn.onclick = function () {
                    editTask(task);
                };

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

    if (baslik === "") {
        showError("Görev başlığı boş olamaz!");
        return;
    }

    if (aciklama === "") {
        showError("Açıklama boş olamaz!");
        return;
    }
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ baslik: baslik, aciklama: aciklama, tamamlandi_mi: false })
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    const mesajlar = Object.values(err).join("\n");
                    showError(mesajlar);
                });
            }
            return response.json().then(() => {
                loadTasks();
                document.getElementById("baslik").value = "";
                document.getElementById("aciklama").value = "";
                hideError();
            });
        });
}

//görevi sil
function deleteTask(id) {
    fetch(API_URL + "/" + id, {
        method: "DELETE"
    })
        .then(() => loadTasks());
}

//güncelle
function editTask(task) {
    document.getElementById("baslik").value = task.baslik;
    document.getElementById("aciklama").value = task.aciklama;

    const btn = document.querySelector("button[onclick='createTask()']");
    btn.textContent = "Güncelle";
    btn.onclick = function () {
        updateTask(task.id);
    };
}

function updateTask(id) {
    const baslik = document.getElementById("baslik").value.trim();
    const aciklama = document.getElementById("aciklama").value.trim();

    if (baslik === "") {
        showError("Görev başlığı boş olamaz!");
        return;
    }

    if (aciklama === "") {
        showError("Açıklama boş olamaz!");
        return;
    }

    fetch(API_URL + "/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ baslik: baslik, aciklama: aciklama, tamamlandi_mi: false })
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    const mesajlar = Object.values(err).join("\n");
                    showError(mesajlar);
                });
            }
            return response.json().then(() => {
                loadTasks();
                document.getElementById("baslik").value = "";
                document.getElementById("aciklama").value = "";

                // Butonu eski haline döndür
                const btn = document.querySelector("button");
                btn.textContent = "Ekle";
                btn.onclick = createTask;
                hideError();
            });
        });
}

function showError(mesaj) {
    let errorDiv = document.getElementById("error-mesaj");
    errorDiv.textContent = mesaj;
    errorDiv.style.display = "block";
}

function hideError() {
    let errorDiv = document.getElementById("error-mesaj");
    errorDiv.style.display = "none";
}

function toggleTask(id, baslik, aciklama, tamamlandi_mi) {
    fetch(API_URL + "/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ baslik: baslik, aciklama: aciklama, tamamlandi_mi: tamamlandi_mi })
    })
        .then(() => loadTasks());
}