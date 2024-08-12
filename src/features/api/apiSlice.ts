import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { keycloak } from "../../keycloak.config";

export const baseUrl = "http://localhost:3000";

export const apiSlice = createApi({
    reducerPath: "api",
    tagTypes: ["Students", "Enrollment", "ClassRoom", "Teacher", "Grade"],
    endpoints: (builder) => ({}),
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            if (keycloak.token) {
                headers.set("Authorization", `Bearer ${keycloak.token}`);
            }
            return headers;
        }
    }),
})