import sys
from Adafruit_IO import MQTTClient
import time

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

while True:
    counter -= 1
    if counter <= 0:
        counter = 10
        # TODO: Thu thập dữ liệu cảm biến
        temp = 30.33
        humid = 40.5
        latitude = 10.345678
        longitude = 106.345678
        people_num = 30

        # Chuyển đổi giá trị float sang chuỗi
        latitude_str = "{:.6f}".format(latitude)
        longitude_str = "{:.6f}".format(longitude)

        client.publish("temperature", temp)
        client.publish("humidity", humid)
        client.publish("latitude", latitude_str)
        client.publish("longitude", longitude_str)
        client.publish("people_num", people_num)

    time.sleep(1)
