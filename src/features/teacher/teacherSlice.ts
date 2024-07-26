import { apiSlice } from "../api/apiSlice";

const endpoint = "teachers"

export type TeacherResult = {
    id: string;
    first_name: string;
    last_name: string;
    subject_specialization: string[];
    date_of_birth: Date;
    street: string;
    number: number;
    city: string;
    phone_number: string;
    createdAt: Date;
}

export type TeacherCreateInput = {
    first_name: string;
    last_name: string;
    subject_specialization: string[];
    date_of_birth: Date;
    street: string;
    number: number;
    city: string;
    phone_number?: string;
}

export type TeacherUpdateInput = {
    id: string;
    first_name?: string;
    last_name?: string;
    subject_specialization?: string[];
    subject_to_add?: string;
    subject_to_remove?: string;
    date_of_birth?: Date;
    address?: {
        street?: string;
        number?: number;
        city?: string;
    };
    phone_number?: string;
}

function getTeachers(){
    return {
        url: `${endpoint}`,
        method: "GET"
    }
}

function getOneTeacher({id}: {id: string}){
    return {
        url: `${endpoint}/${id}`
    }
}

function createTeacher(Teacher: TeacherCreateInput){
    return {
        url: `${endpoint}`,
        method: "POST",
        body: Teacher
    }
}

function updateTeacher(Teacher: TeacherUpdateInput){
    return{
        url: `${endpoint}`,
        method: "PATCH",
        body: Teacher
    }
}

function deleteTeacher({id}: {id: string}){
    return{
        url: `${endpoint}/${id}`,
        method: "DELETE"
    }
}

export const teacherApiSlice = apiSlice.injectEndpoints({
    endpoints: ({query, mutation}) => ({
        createTeacher: mutation<TeacherResult, TeacherCreateInput>({
            query: createTeacher,
            invalidatesTags: ["Teacher"]
        }),
        getTeachers: query<TeacherResult[], {}>({
            query: getTeachers,
            providesTags: ["Teacher"]
        }),
        getOneTeacher: query<TeacherResult, {id: string}>({
            query: getOneTeacher,
            providesTags: ["Teacher"]
        }),
        updateTeacher: mutation<TeacherResult, TeacherUpdateInput>({
            query: updateTeacher,
            invalidatesTags: ["Teacher"]
        }),
        deleteTeacher: mutation<null, {id: string}>({
            query: deleteTeacher,
            invalidatesTags: ["Teacher"]
        }),
    })
})

export const {
    useGetTeachersQuery,
    useGetOneTeacherQuery,
    useCreateTeacherMutation,
    useUpdateTeacherMutation,
    useDeleteTeacherMutation
} = teacherApiSlice