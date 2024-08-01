import { apiSlice } from "../api/apiSlice";

const endpoint = "grades"

export type GradeResult = {
    id: string;
    student_id: string;
    subject: string;
    exam: number;
    assignment: number;
    others: number;
}

export type GradeCreateInput = {
    student_id: string;
    subject: string;
    exam: number;
    assignment: number;
    others: number;
}

export type GradeUpdateInput = {
    id: string;
    student_id?: string;
    subject?: string;
    exam?: number;
    assignment?: number;
    others?: number;
}

function getGrades({id}: {id: string}){
    return {
        url: `${endpoint}/student/${id}`,
        method: "GET"
    }
}

function getOneGrade({id}: {id: string}){
    return {
        url: `${endpoint}/${id}`
    }
}

function createGrade(grade: GradeCreateInput){
    return {
        url: `${endpoint}`,
        method: "POST",
        body: grade
    }
}

function updateGrade(grade: GradeUpdateInput){
    return{
        url: `${endpoint}`,
        method: "PATCH",
        body: grade
    }
}

function deleteGrade({id}: {id: string}){
    return{
        url: `${endpoint}/${id}`,
        method: "DELETE"
    }
}

export const gradeApiSlice = apiSlice.injectEndpoints({
    endpoints: ({query, mutation}) => ({
        createGrade: mutation<GradeResult, GradeCreateInput>({
            query: createGrade,
            invalidatesTags: ["Grade"]
        }),
        getGrades: query<GradeResult[], {id: string}>({
            query: getGrades,
            providesTags: ["Grade"]
        }),
        getOneGrade: query<GradeResult, {id: string}>({
            query: getOneGrade,
            providesTags: ["Grade"]
        }),
        updateGrade: mutation<GradeResult, GradeUpdateInput>({
            query: updateGrade,
            invalidatesTags: ["Grade"]
        }),
        deleteGrade: mutation<null, {id: string}>({
            query: deleteGrade,
            invalidatesTags: ["Grade"]
        }),
    })
})

export const {useGetGradesQuery} = gradeApiSlice