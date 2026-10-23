from pydantic import BaseModel

class Certificate(BaseModel):
    serial_number: str
    student_name: str
    course: str
    issued_by: str
    issue_date: str