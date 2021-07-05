## Giá Vàng Hôm Nay

Một crawler nhỏ lấy dữ liệu giá vàng hàng ngày ở các website Việt Nam.

Hiện tại hỗ trợ các site:
- [https://www.24h.com.vn](https://www.24h.com.vn)

Cài đặt:

Clone repo này về máy tính của bạn sau đó `cd` tới thư mục bạn vừa clone rồi chạy câu lệnh sau:

`yarn install`

- Để chạy trên môi trường development thì bạn chạy `yarn dev`
- Để chạy trên môi trường production thì bạn chạy `yarn start`

Sau đó mở link sau trên trình duyệt của bạn [http://localhost:8080](http://localhost:8080)

## API

### GET `/`

Parameters:
* `date`: __optional__: A date with format: Y-m-d. Eg: 2021-07-05

Response:
```json
{
  status: "ok",
  data: [
    {
      name: (string),
      provider: (string),
      selling_price: (int),
      buying_price: (int)
    }
  ]
}
```
