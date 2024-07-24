import { apiSlice } from "../api/apiSlice";

const studentEndpoint = "/students"
const enrollmentEndpoint = "/enrollments"
const classEndpoint = "/classrooms"

export type Student = {
    id: string;
    first_name: string;
    last_name: string;
    date_of_birth: Date;
    phone_number: string;
    street: string;
    number: number;
    city: string;
    createdAt: Date;
}

export type Enrollment = {
    id: string;
    student_id: string;
    class_id: string;
    enrollment_date: Date;
    status: string;
    created_at: Date;
}

export type ClassRoomName = {
    id: string;
    grade_level: string;
}


function getStudents(){
    return {
        url: `${studentEndpoint}`,
        method: "GET"
    }
}

function getOneStudent({id}: {id: string}){
    return {
        url: `${studentEndpoint}/${id}`
    }
}

function updateStudent(student: Student){
    return{
        url: `${studentEndpoint}`,
        method: "PATCH",
        body: student
    }
}

function getEnrollment({id}: {id: string}){
    return {
        url: `${enrollmentEndpoint}/${id}`
    }
}

function getClassRoom({id}: {id: string}){
    return {
        url: `${classEndpoint}/${id}`
    }
}

export const studentsApiSlice = apiSlice.injectEndpoints({
    endpoints: ({query, mutation}) => ({
        getStudents: query<Student[], {}>({
            query: getStudents,
            providesTags: ["Students"]
        }),
        getOneStudent: query<Student, {id: string}>({
            query: getOneStudent,
            providesTags: ["Students"]
        }),
        updateStudent: mutation<Student, Student>({
            query: updateStudent,
            invalidatesTags: ["Students"]
        }),
        getEnrollment: query<Enrollment, {id?: string}>({
            query: getEnrollment,
            providesTags: ["Enrollment"]
        }),
        getClassRoom: query<ClassRoomName, {id?: string}>({
            query: getClassRoom,
            providesTags: ["ClassRoom"]
        })
    })
})

export const {useGetStudentsQuery, useGetOneStudentQuery, useUpdateStudentMutation, useGetEnrollmentQuery, useGetClassRoomQuery} = studentsApiSlice