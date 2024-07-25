import { apiSlice } from "../api/apiSlice";

const endpoint = "/classrooms"

export type ClassRoomResult = {
    id: string;
    grade_level: string;
    start_date: Date;
    end_date: Date;
    createdAt: Date;
}

export type ClassRoomCreateInput = {
    grade_level: string;
    start_date: Date;
    end_date: Date;
}

export type ClassRoomUpdateInput = {
    id: string;
    grade_level?: string;
    start_date?: Date;
    end_date?: Date;
}

function getClassRooms(){
    return {
        url: `${endpoint}`,
        method: "GET"
    }
}

function getOneClassRoom({id}: {id: string}){
    return {
        url: `${endpoint}/${id}`
    }
}

function createClassroom(classroom: ClassRoomCreateInput){
    return {
        url: `${endpoint}`,
        method: "POST",
        body: classroom
    }
}

function updateClasrroom(classroom: ClassRoomUpdateInput){
    return{
        url: `${endpoint}`,
        method: "PATCH",
        body: classroom
    }
}

function deleteClassroom({id}: {id: string}){
    return{
        url: `${endpoint}/${id}`,
        method: "DELETE"
    }
}

export const classroomApiSlice = apiSlice.injectEndpoints({
    endpoints: ({query, mutation}) =>({
        createClassroom: mutation<ClassRoomResult, ClassRoomCreateInput>({
            query: createClassroom,
            invalidatesTags: ["ClassRoom"]
        }),
        getClassRooms: query<ClassRoomResult[], {}>({
            query: getClassRooms,
            providesTags: ["ClassRoom"]
        }),
        getOneClassRoom: query<ClassRoomResult, {id: string}>({
            query: getOneClassRoom,
            providesTags: ["ClassRoom"]
        }),
        updateClasrroom: mutation<ClassRoomResult, ClassRoomUpdateInput>({
            query: updateClasrroom,
            invalidatesTags: ["ClassRoom"]
        }),
        deleteClassroom: mutation<null, {id: string}>({
            query: deleteClassroom,
            invalidatesTags: ["ClassRoom"]
        }),
    })
})

export const {
    useGetClassRoomsQuery,
    useGetOneClassRoomQuery,
    useCreateClassroomMutation,
    useUpdateClasrroomMutation,
    useDeleteClassroomMutation
} = classroomApiSlice