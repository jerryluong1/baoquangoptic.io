# Bao Quang Optic — Final Homepage Pack

Gói này giữ NGUYÊN toàn bộ trang chủ bạn gửi (Framer export), chỉ bổ sung:
- SEO meta + Open Graph + Twitter Card
- Favicon SVG + Apple touch icon
- Preconnect Google Fonts
- Countdown (chỉ cho mục “Sản phẩm đang sản xuất”)
- Slider prev/next cho mục “Sản phẩm đang sản xuất”
- Hero banner auto-slide
- Navigation hover + Smooth scroll

## 1) Đổi domain (1 lần duy nhất)
Trong file:
- `index.html` (thẻ `<head>`): thay **YOUR-DOMAIN** bằng domain thật của bạn (vd: `baoquangoptic.vn`).
- `robots.txt` và `sitemap.xml`: thay **YOUR-DOMAIN** tương tự.

Bạn có thể dùng chức năng **Find → Replace** của trình soạn thảo để thay toàn bộ `YOUR-DOMAIN` trước khi upload.

## 2) Upload lên GitHub
Upload cả thư mục này (bao gồm `index.html`, `assets/`, `robots.txt`, `sitemap.xml`) vào repo `username.github.io` (hoặc repo đang dùng cho Pages), sau đó bật **Settings → Pages → Deploy from a branch** (main / root).

## 3) Đặt deadline cho từng sản phẩm
Trong `index.html`, mỗi product có thể có `data-deadline="YYYY-MM-DDTHH:mm:ss+07:00"`. Nếu không có, script dùng `data-deadline-all` của cả section; nếu vẫn không, sẽ tự đặt **+14 ngày**.
