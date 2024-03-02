# KanjiGami

Website luyện tập tiếng nhật thông qua game

## Giới thiệu

- [Yêu cầu hệ thống](#Yêu-cầu-hệ-thống)
- [Hướng dẫn chạy dự án](#setup-and-configuration)
- [Các chức năng](#usage)
- [License](#license)

## Yêu cầu hệ thống

- Docker >= 20.10
- Docker compose plugin

## Hướng dẫn chạy dự án

Sau khi clone project thực hiện những bước sau:

1. Khởi động docker container:

```bash
make devup
```

2. Cài đặt các package cần thiết:

```bash
make devinstall

```

3. Tạo database:

```bash
make prisma-generate
make prisma-deploy
make prisma-seed
```

4. Tạo một dự án firebase và thêm các thông tin cấu hình tướng ứng vào 2 file: `./client/.env` và `./server/.env`

5. Lấy gmail app key và thêm vào file `./server/.env`

6. Tạo private key cho jwt và thêm vào file `./server/.env` bằng câu lệnh:

```bash
make genkey
```

6. Chạy dự án:

```bash
make devrun
```

## Các chức năng

1. Cấu trúc thư mục:

```
├── .github         # Github actions
├── client          # Frontend
├── deploy          # Deploy Dockerfile
└── server          # Backend
```

2. Domain truy cập:

- Client: [http://kanjigami.localhost:3000](http://kanjigami.localhost:3000)
- Server: [http://kanjigami.localhost:3000/api/](http://kanjigami.localhost:3000/api/)
- Traefik: [http://traefik.localhost:3000](http://traefik.localhost:3000)

## License

This project is licensed under the [MIT License](LICENSE).
