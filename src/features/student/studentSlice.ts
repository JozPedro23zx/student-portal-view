import { apiSlice } from "../api/apiSlice";

const endpoint = "/students"

export type Student = {
    id: string;
    first_name: string;
    last_name: string;
    date_of_birth: Date;
    phone_number: string;
    address: string;
    createdAt: Date;
}

function getStudents({ids}: {ids?: string[]}){
    return {
        url: `${endpoint}`,
        method: "GET",
        body: ids != undefined ? ids : []
    }
}

export const studentsApiSlice = apiSlice.injectEndpoints({
    endpoints: ({query, mutation}) => ({
        getStudents: query<Student[], {ids?: string[]}>({
            query: getStudents,
            providesTags: ["Students"]
        })
    })
})

export const {useGetStudentsQuery} = studentsApiSlice