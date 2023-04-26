import os
import shutil
from configs.definitions import ROOT_DIR
import psutil
import subprocess

def move_cv_files():
    """
    If the data.csv file exists in the root directory, move it to the data directory. If the output
    directory exists in the root directory, move it to the data directory
    """
    data_csv_path = os.path.join(ROOT_DIR, "data.csv")
    data_path = os.path.join(ROOT_DIR, "data")
    output_path = os.path.join(ROOT_DIR, "output")

    if os.path.exists(data_csv_path):
        shutil.move(data_csv_path, data_path)

    if os.path.exists(output_path):
        shutil.move(output_path, data_path)


def cleanup_data_folder():
    """
    It deletes all the files and folders in the data folder
    """
    data_path = os.path.join(ROOT_DIR, "data")
    for files in os.listdir(data_path):
        path = os.path.join(data_path, files)
        try:
            shutil.rmtree(path)
            os.remove(path)
        except OSError:
            print("Error while deleting file: ", path)

def cleanup_data_persist_video():
    """
    It deletes all files in the data directory that don't end with .mp4
    """
    data_path = os.path.join(ROOT_DIR, "data")
    filelist = [f for f in os.listdir(data_path) if not f.endswith(".mp4")]
    for f in filelist:
        path = os.path.join(data_path, f)
        try:
            shutil.rmtree(path)
        except OSError:
            os.remove(path)
