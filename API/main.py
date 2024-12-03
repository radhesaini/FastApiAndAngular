from fastapi import FastAPI, Form
import mysql.connector
from fastapi.middleware.cors import CORSMiddleware
from typing import Union

app = FastAPI()


conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="1234567890",
    port=3306,
    database="mydb"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@app.get("/")
def root():
    return {"message": "Hello World!"}

@app.get("/get_tasks")
def get_tasks():
    cursor = conn.cursor(dictionary=True)
    cursor.execute("Select * from ToDo")
    records = cursor.fetchall()
    return records

@app.get("/tasks/{task_id}")
def read_task(task_id, q: Union[str, None] = None):
    cursor = conn.cursor(dictionary=True)
    if task_id:
        cursor.execute(f'Select * from ToDo where id = {task_id}')
    else:
        cursor.execute(f'Select * from ToDo where task like %{q}%')
    records = cursor.fetchall()
    return records

@app.post("/task")
def add_task(task: str = Form(...)):
    cursor = conn.cursor()
    try:
        cursor.execute('insert into ToDo (task) values (%s)', (task,))
        conn.commit()
    except Exception as  e:
        return e
    return {"msg": "SuccessFully Created"}


@app.put("/task/{task_id}")
def update_task(task_id, task: str = Form(...)):
    cursor = conn.cursor()
    try:
        cursor.execute('UPDATE ToDo SET task = %s WHERE id = %s', (task, task_id))
        conn.commit()
    except Exception as  e:
        return e
    return {"msg": "SuccessFully Updated"}

@app.delete("/task/{task_id}")
def remove_task(task_id):
    cursor = conn.cursor()
    try:
        cursor.execute('delete from ToDo where id = %s', (task_id,))
        conn.commit()
    except Exception as  e:
        return e
    return {"msg": "SuccessFully Deleted"}