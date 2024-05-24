import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().global.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "adminApi",
  tagTypes: ["User", "Warehouses", "Reports"],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `user/getUser/${id}`,
      providesTags: ["User"],
    }),
    getWarehouses: build.query({
      query: () => "wms/get-all-warehouses",
      providesTags: ["Warehouses"],
    }),
    getReports: build.query({
      query: () => "report/get-all-reports",
      providesTags: ["Reports"],
    }),
    getOverview: build.query({
      query: () => "wms/overview",
      providesTags: ["Warehouses"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetWarehousesQuery,
  useGetReportsQuery,
  useGetOverviewQuery,
} = api;
