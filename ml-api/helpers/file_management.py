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
