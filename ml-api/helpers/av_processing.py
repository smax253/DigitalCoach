import os
import moviepy.editor as mp
from configs.definitions import ROOT_DIR

def extract_audio(fname, des_fname):
    path = os.path.join(ROOT_DIR, 'data', fname)
    des_path = os.path.join(ROOT_DIR, 'data', des_fname)
    try:
        mv_clip = mp.VideoFileClip(path)
        mv_clip.audio.write_audiofile(des_path)
        return {
            'path_to_file': str(des_path)
        }
    except OSError as exception:
        return {
            'errors': str(exception)
        }