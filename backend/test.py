import sys
from Adafruit_IO import MQTTClient
import time
import random
import math

AIO_FEED_ID = ["humidity", "latitude", "longitude", "people_num", "temperature"]
AIO_USERNAME = "vantri15042003"
AIO_KEY = "aio_TqTL604jyFhny1rFjxYGiiaIAwaa"


def connected(client):
    print("Ket noi thanh cong ...")
    for topic in AIO_FEED_ID:
        client.subscribe(topic)


def subscribe(client, userdata, mid, granted_qos):
    print("Subscribe thanh cong ...")


def disconnected(client):
    print("Ngat ket noi ...")
    sys.exit(1)


def message(client, feed_id, payload):
    print("Nhan du lieu: " + payload + ", feed id: " + feed_id)


client = MQTTClient(AIO_USERNAME, AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

counter = 10
sensor_type = 0

# Khoảng cách muốn di chuyển (đơn vị: mét)
distance = 100  # 100 meters
# Bán kính Trái Đất
R = 6371000
# Hàm tạo tọa độ ngẫu nhiên trong khoảng cách cho trước
def random_location_within_distance(latitude, longitude, distance):
    # Chọn ngẫu nhiên một góc giữa 0 và 360 độ
    angle = random.uniform(0, 360)
    angle_rad = math.radians(angle)
    
    # Tính tọa độ mới
    new_latitude = latitude + (distance / R) * (180 / math.pi) * math.sin(angle_rad)
    new_longitude = longitude + (distance / R) * (180 / math.pi) * math.cos(angle_rad) / math.cos(math.radians(latitude))
    
    return new_latitude, new_longitude

while True:
    counter -= 1
    if counter <= 0:
        counter = 10
        # TODO: Thu thập dữ liệu cảm biến
        temp = 30.33
        humid = 40.5
        latitude = 10.77
        longitude = 106.345678
        people_num = 30

        # Tạo tọa độ ngẫu nhiên trong khoảng cách cho trước
        new_latitude, new_longitude = random_location_within_distance(latitude, longitude, distance)

        # Chuyển đổi giá trị float sang chuỗi
        latitude_str = "{:.6f}".format(new_latitude)
        longitude_str = "{:.6f}".format(new_longitude)

        client.publish("temperature", temp)
        client.publish("humidity", humid)
        client.publish("latitude", latitude_str)
        client.publish("longitude", longitude_str)
        client.publish("people_num", people_num)

    time.sleep(1)
