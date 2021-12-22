DROPBOX LINK: https://www.dropbox.com/sh/vlnub9pj1vuxgtc/AACxU9IjtaAqQeyoCMToCBxPa?dl=0


MIT INTERVIEW DATASET
=====================

The MIT Interview Dataset contains the audio-visual recordings of 138 mock job interviews, conducted by professional career counselors with 69 undergraduate MIT students. We publish both the video and audio recordings of each interview, several pre-computed features, and additional annotations by Amazon Mechanical Turk workers. 

The dataset is organized in several sub-directories, which are described below.

Videos:
======
This directory contains 138 videos of 69 participants. Each participant was interviewed twice, once before and once after counselor intervention. Each video file name looks like either “P#.avi” or “PP#.avi”, where # is the participant id. 

  - Video files with names like “P#.avi” indicate pre-intervention interviews.
  - Video files with names like “PP#.avi” indicate post-intervention interviews.

Audios:
======
This directory contains audio recordings for 138 interviews, in the similar format as the video files.

Facial_Features:
===============
This directory contains one CSV file for each interview video. Each CSV file contains face tracking features extracted from each individual frame in the video.

The most crucial features are the first 12 features: 
- Pitch 
- Yaw 
- Roll
- Left Inner Eyebrow (inBrL) 
- Left Outer Eyebrow (otBrL) 
- Right Inner Eyebrow (inBrR) 
- Right Outer Eyebrow (otBrR)
- Left Outer Eye (EyeOL) 
- Right Outer Eye (EyeOR)
- Outer Lip Height (oLipH) 
- Inner Lip Height (iLipH)
- Lip Corner Distance (LipCDt)

SmileData:
==========

This directory contains facial features extracted via SHORE. This directory contains two sub-directories: (1) pre and (2) post. The directory “pre” contains SHORE features extracted from the pre-intervention videos. The directory “post” contains SHORE features extracted from post-intervention videos. 

The first three columns in each text file were used in our experiments: 
(1) smile intensity
(2) head nod 
(3) head shake.

Prosody:
========
This directory contains one CSV file, containing the prosodic features. Each line in the CSV file stores the aggregated PRAAT features for one of the questions in one of the interviews.


Labels:
======
Finally, the directory “Labels” contains the annotations from Amazon Mechanical Turk workers. It contains two CSV files:

(1) interview_transcripts_by_turkers.csv: contains the speech transcripts for each of the 138 video files.

(2) turker_scores_full_interview.csv: contains the Turkers’ ratings for full interviews. For each video, we collect ratings from multiple Turkers. The CSV file contains both the participant/video id and worker id.

We aggregate the ratings from multiple Turkers, and compute one aggregated rating using Expectation Maximization. The aggregated rating is marked as worker id “AGGR”. 


Note: There are two ratings related to “Engagement”: (1) Engaging Tone and (2) Engagement. We used Engaging Tone in our experiment, as the ratings for Engagement were unreliable.  

================================================================================
================================================================================

Acknowledgements:
================

We thank the MIT undergraduate students who participated in this study and gave us permission to share their data with other researchers to help advance science.

Due to the sensitive nature of the dataset, anyone accessing the dataset must agree to the terms and conditions of using the dataset. Please read the terms and conditions carefully and provide the answer to the questions in the following form. We will get back to you with a link to download the dataset.

================================================================================
================================================================================

Terms and Conditions:
====================

You are given this data strictly for research purposes. You can not redistribute the data to anyone else or put it publicly on a website. Once you complete your research, you will destroy the original video files. You can not reveal any of the participants identifying information other than their faces publicly or in a research paper/presentations. If you publish using this dataset, please cite the following paper. 

I. Naim, I. Tanveer, D. Gildea, M. E. Hoque, Automated Analysis and Prediction of Job Interview Performance, to appear in IEEE Transactions on Affective Computing.

================================================================================
================================================================================

Contact:
=======
For questions related to the dataset, please send an email to:

Iftekhar Naim (inaim AT {cs dot rochester dot edu})
Iftekhar Tanveer (itanveer AT {cs dot rochester dot edu})
Mohammed Ehsan Hoque (mehoque AT {cs dot rochester dot edu})
