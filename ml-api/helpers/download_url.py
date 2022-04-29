import urllib.request
import os
from configs.definitions import ROOT_DIR


def download_video_link(url):
    dest = os.path.join(ROOT_DIR, "data", "video.mp4")
    try:
        urllib.request.urlretrieve(url, dest)
        return dest
    except Exception as e:
        return {"errors": e}
