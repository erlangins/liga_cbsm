
#!/bin/bash

echo "📦 Menambahkan semua perubahan..."
git add .

echo "📝 Commit perubahan..."
read -p "Masukkan pesan commit: " pesan
git commit -m "$pesan"

echo "🚀 Push ke GitHub..."
git push

echo "✅ Selesai! Cek Vercel untuk update-nya."

