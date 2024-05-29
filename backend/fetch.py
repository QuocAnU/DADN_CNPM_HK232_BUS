import requests

# Thông tin tài khoản Adafruit IO
username = "vantri15042003"  # Thay bằng tên người dùng Adafruit IO của bạn
aio_key = "aio_TqTL604jyFhny1rFjxYGiiaIAwaa"  # Thay bằng khóa API Adafruit IO của bạn

# Danh sách feeds cần truy xuất
feeds = ["humidity", "latitude", "longitude", "people-num", "temperature"]

# URL cơ sở của API Adafruit IO
base_url = f"https://io.adafruit.com/api/v2/{username}/feeds/"

# Headers chứa khóa API
headers = {"X-AIO-Key": aio_key}


# Hàm để lấy dữ liệu cuối cùng từ một feed
def get_last_data(feed_key):
    url = f"{base_url}{feed_key}/data/last"
    print("url: ", url)
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        print(
            f"Lỗi khi lấy dữ liệu từ feed {feed_key}:",
            response.status_code,
            response.text,
        )
        return None


# Tạo một dictionary để chứa dữ liệu cuối cùng từ tất cả các feeds
last_data_dict = {}


# Lấy dữ liệu cuối cùng từ mỗi feed và trả về
def get_all_last_data():
    all_last_data = {}
    for feed in feeds:
        last_data = get_last_data(feed)
        if last_data:
            all_last_data[feed] = last_data.get("value")
    return all_last_data


# Trả về dữ liệu cuối cùng từ tất cả các feeds
last_data = get_all_last_data()
print("Dữ liệu cuối cùng từ tất cả các feeds:")
print(last_data)
