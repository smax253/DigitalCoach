import time
import ast
import requests

ALL_JOBS = set()
RESULT_ENCODING = "result".encode('utf-8') 
FINISHED_ENCODING = 'finished'.encode('utf-8')

def _update_all_jobs(redis_conn):
    keys = redis_conn.keys("*")
    for key in keys:
        key_str = key.decode("utf-8")
        print(key_str)
        if "rq:job" in key_str:
            status = redis_conn.hgetall(key)
            status = {key.decode('utf-8'):value for key, value in status.items()}
            print(status['status'])
            print(status['status'] == FINISHED_ENCODING)
            if status['status'] == FINISHED_ENCODING:
                ALL_JOBS.add(key)


def _send_job_results(redis_conn):
    print('in the send function')
    for job in ALL_JOBS:
        print(job)
        result = redis_conn.hget(job, RESULT_ENCODING)
        print(result)
        print(type(result))
        b_arr = bytearray(result)
        str_res = ''.join(chr(a) for a in b_arr)
        str_res = str_res[16:]
        str_res = str_res[:-2]
        parsed_res = ast.literal_eval(str_res)
        print('parsed result here...')
        print(parsed_res)
        
        #result_str = result.decode("utf-8")
        #send the job to the functions url 
        #delete the job from the list


def poll_connection(redis_connection):
    print("This is the redis connection: ")
    print(redis_connection)
    while True:
        print("looping...")
        _update_all_jobs(redis_connection)
        print(ALL_JOBS)
        if len(ALL_JOBS) != 0:
            _send_job_results(redis_connection)
        print("sleeping for five seconds...")
        time.sleep(5)
