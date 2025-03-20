import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosRequest } from '../utils/axiosRequest'

export const getCategories = createAsyncThunk("categories/getCategories", async () => {
  try {
    const { data } = await axiosRequest.get("/categories")
    return data?.data
  } catch (error) {
    console.log(error)
  }
})

export const deleteCategory = createAsyncThunk("categories/deleteCategory", async (categoryId: number, { dispatch }) => {
  try {
    await axiosRequest.delete(`/categories?id=${categoryId}`)
    dispatch(getCategories())
  } catch (error) {
    console.log(error)
  }
})

export const addCategory = createAsyncThunk("categories/addCategory", async (category: { name: string,  status?: string }, { dispatch }) => {
  try {
    const { data } = await axiosRequest.post('/categories', category)
    dispatch(getCategories())
    return data?.data
  } catch (error) {
    console.log(error)
  }
})

export const updateCategory = createAsyncThunk("categories/updateCategory", async (category: { id: number, name: string,  status?: string }, { dispatch }) => {
  try {
    const { data } = await axiosRequest.put(`/categories?id=${category.id}`, category)
    dispatch(getCategories())
    return data?.data
  } catch (error) {
    console.log(error)
  }
})

export const searchCategory = createAsyncThunk("categories/searchCategory", async (query: string) => {
  try {
    const { data } = await axiosRequest.get(`/categories/search?query=${query}`)
    return data?.data
  } catch (error) {
    console.log(error)
  }
})

export const filterCategoryByStatus = createAsyncThunk("categories/filterCategoryByStatus", async (status: string) => {
  try {
    const { data } = await axiosRequest.get(`/categories?status=${status}`)
    return data?.data
  } catch (error) {
    console.log(error)
  }
})
