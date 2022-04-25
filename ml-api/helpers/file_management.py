import os
import shutil
from configs.definitions import ROOT_DIR


def move_cv_files():
    data_csv_path = os.path.join(ROOT_DIR, "data.csv")
    data_path = os.path.join(ROOT_DIR, "data")
    output_path = os.path.join(ROOT_DIR, "output")

    if os.path.exists(data_csv_path):
        shutil.move(data_csv_path, data_path)

    if os.path.exists(output_path):
        shutil.move(output_path, data_path)


def cleanup_data_folder():
    data_path = os.path.join(ROOT_DIR, "data")
    for files in os.listdir(data_path):
        path = os.path.join(data_path, files)
        try:
            shutil.rmtree(path)
        except OSError:
            os.remove(path)


def cleanup_data_persist_video():
    data_path = os.path.join(ROOT_DIR, "data")
    filelist = [f for f in os.listdir(data_path) if not f.endswith(".mov")]
    for f in filelist:
        path = os.path.join(data_path, f)
        try:
            shutil.rmtree(path)
        except OSError:
            os.remove(path)
