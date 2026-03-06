# 📝 Spring Boot To-Do List API

Bu proje, modern Java teknolojileri kullanılarak geliştirilmiş, görevleri (tasks) yönetmeyi sağlayan **RESTful** bir API uygulamasıdır. Başlangıçta bellek üzerinde (RAM) çalışan sistem, geliştirilerek tam kapsamlı bir veritabanı entegrasyonuna dönüştürülmüştür.

## ✨ Özellikler

* **Tam CRUD Desteği:** Görev ekleme, listeleme, güncelleme ve silme işlemleri.
* **Veritabanı Kalıcılığı:** Spring Data JPA ve H2/MySQL entegrasyonu ile veriler uygulama kapansa bile silinmez.
* **Otomatik ID Yönetimi:** Görevler için benzersiz kimlik numaraları veritabanı tarafından otomatik olarak atanır.
* **İnteraktif Dokümantasyon:** Swagger UI (OpenAPI) entegrasyonu sayesinde API uç noktaları görsel bir arayüzden test edilebilir.

## 🛠️ Kullanılan Teknolojiler

* **Java 25
* **Spring Boot 4.0.3 (Web, Data JPA)
* **Database:** H2 (Geliştirme aşaması için) / MySQL-PostgreSQL uyumlu
* **Build Tool:** Maven
* **Documentation:** Swagger / OpenAPI

---

## 🚀 API Uç Noktaları (Endpoints)

| Metot | Uç Nokta (Endpoint) | Açıklama |
| :--- | :--- | :--- |
| **GET** | `/api/tasks` | Tüm görevleri listeler. |
| **GET** | `/api/tasks/{id}` | Belirli bir görevi ID ile getirir. |
| **POST** | `/api/tasks` | Yeni bir görev oluşturur. |
| **PUT** | `/api/tasks/{id}` | Var olan bir görevi günceller. |
| **DELETE** | `/api/tasks/{id}` | Bir görevi sistemden siler. |

---

## 🖥️ Kurulum ve Çalıştırma

1.  Projeyi bir IDE (IntelliJ IDEA önerilir) ile açın.
2.  `pom.xml` dosyasındaki bağımlılıkların yüklendiğinden emin olun.
3.  `Application.java` sınıfını çalıştırın.
4.  API'yi test etmek için tarayıcınızdan şu adrese gidin:
    > `http://localhost:8080/swagger-ui/index.html`

---

## 📂 Proje Yapısı



* `model/`: Veritabanı tablolarını temsil eden Entity sınıfları.
* `repository/`: Veritabanı sorgularını yöneten JpaRepository arayüzleri.
* `controller/`: HTTP isteklerini karşılayan ve yanıt dönen REST kontrolcüleri.

