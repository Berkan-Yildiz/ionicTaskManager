# Görev Planlayıcı Uygulaması

## Proje Açıklaması

Bu proje, günlük hayattaki görevleri kategorilere ayırarak takip etmeyi sağlayan Ionic tabanlı bir mobil uygulamadır. Firebase ile entegre çalışarak kullanıcının görevlerini bulut üzerinde saklar ve organize eder.

## Temel Özellikler

- **Kategorilere Göre Görev Düzenleme**: Kullanıcılar görevlerini iş, müzik, yolculuk, ders, spor ve alışveriş gibi kategorilere ayırabilir.

- **Dinamik Görev Ekleme**: Sağ alt köşedeki artı butonuna tıklanarak açılan form ile yeni görevler eklenebilir. Form, başlık, açıklama, tarih ve kategori alanlarını içerir.

- **Firebase Entegrasyonu**: Eklenen tüm görevler Firebase veritabanına kaydedilir, böylece veriler güvenle saklanır ve cihazlar arasında senkronize edilebilir.

- **Zaman Bazlı Organizasyon**: Görevler, bugünün tarihine göre otomatik olarak şu sekmelere yerleştirilir:
    - Gelen Yapılacaklar
    - Bugün Yapılacaklar
    - Yapılanlar
    - Geçen Yapılacaklar

- **Sezgisel Etkileşim**: Görevleri sağa kaydırarak silme işlemi, sola kaydırarak ise tamamlama işlemi gerçekleştirilebilir. Tamamlanan görevler üstü çizili olarak gösterilir.

## Teknik Altyapı

- **Frontend**: Ionic Framework ve Angular
- **Backend**: Firebase Realtime Database
- **Kimlik Doğrulama**: Firebase Authentication
- **Depolama**: Cloud Firestore

Bu uygulama, günlük görevlerin organize edilmesi ve takibi için pratik bir çözüm sunar. Kategori bazlı yaklaşımı ve sezgisel kullanıcı arayüzü sayesinde farklı yaşam alanlarındaki görevleri kolayca yönetmeyi mümkün kılar.