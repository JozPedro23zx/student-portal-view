import { apiSlice } from "../api/apiSlice";

const endpoint = "/enrollments"

export type EnrollmentResult = {
    id: string;
    student_id: string;
    class_id: string;
    enrollment_date: Date;
    status: string;
    created_at: Date;
}

export type EnrollmentCreateInput = {
    student_id: string;
    class_id: string;
    enrollment_date: Date;
    status: string;
}

export type EnrollmentUpdateInput = {
    id: string;
    class_id: string;
    status: string;
}

function getEnrollments(){
    return {
        url: `${endpoint}`,
        method: "GET"
    }
}

function getOneEnrollment({id}: {id: string}){
    return {
        url: `${endpoint}/${id}`
    }
}

function createEnrollmet(enrollment: EnrollmentCreateInput){
    return {
        url: `${endpoint}`,
        method: "POST",
        body: enrollment
    }
}

function updateEnrollment(enrollment: EnrollmentUpdateInput){
    return{
        url: `${endpoint}`,
        method: "PATCH",
        body: enrollment
    }
}

function deleteEnrollmet({id}: {id: string}){
    return{
        url: `${endpoint}/${id}`,
        method: "DELETE"
    }
}

export const enrollmentApiSlice = apiSlice.injectEndpoints({
    endpoints: ({query, mutation}) =>({
        createEnrollmet: mutation<EnrollmentResult, EnrollmentCreateInput>({
            query: createEnrollmet,
            invalidatesTags: ["Enrollment"]
        }),
        getEnrollments: query<EnrollmentResult[], {}>({
            query: getEnrollments,
            providesTags: ["Enrollment"]
        }),
        getOneEnrollment: query<EnrollmentResult, {id?: string}>({
            query: getOneEnrollment,
            providesTags: ["Enrollment"]
        }),
        updateEnrollment: mutation<EnrollmentResult, EnrollmentUpdateInput>({
            query: updateEnrollment,
            invalidatesTags: ["Enrollment"]
        }),
        deleteEnrollmet: mutation<null, {id: string}>({
            query: deleteEnrollmet,
            invalidatesTags: ["Enrollment"]
        }),
    })
})

export const {
    useGetEnrollmentsQuery,
    useGetOneEnrollmentQuery,
    useCreateEnrollmetMutation,
    useUpdateEnrollmentMutation,
    useDeleteEnrollmetMutation
} = enrollmentApiSlice