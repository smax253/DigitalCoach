import urllib.request


def download_video_link(url, dest="/data/video.mp4"):
    try:
        urllib.request.urlretrieve(url, dest)
        return dest
    except Exception as e:
        return {"errors": e}
