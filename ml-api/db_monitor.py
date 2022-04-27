import time
import requests

ALL_JOBS = []


def _update_all_jobs(redis_conn):
    keys = redis_conn.keys("*")
    for key in keys:
        if "rq:job" in key:
            ALL_JOBS.append(key)


def _send_job_results():
    for job in ALL_JOBS:
        print(job)


def poll_connection(redis_connection):
    print("This is the redis connection: ")
    print(redis_connection)
    while True:
        print("looping...")
        _update_all_jobs(redis_connection)
        print(ALL_JOBS)
        if len(ALL_JOBS) != 0:
            _send_job_results()
        print("sleeping for five seconds...")
        time.sleep(5)
