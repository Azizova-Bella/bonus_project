import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
import { TCategory } from '../../../types/categories'
import { deleteCategory, getCategories } from '../../../api/categories'
import toast from 'react-hot-toast'

interface CategoriesState {
	categories: TCategory[] | []
	categoriesLoading: boolean
 }

 const initialState: CategoriesState = {
	categories: [],
	categoriesLoading: false
 }

 export const categoriesSlice = createSlice({
	name: "categories",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getCategories.pending, (state) => {
			state.categoriesLoading = true
		})
		builder.addCase(getCategories.fulfilled, (state,action) => {
			state.categories = action.payload
			state.categoriesLoading = false
			toast.success('Successfully');
		})
		builder.addCase(getCategories.rejected, (state) => {
			state.categoriesLoading = false
			toast.error('This is an error!');
		})
		builder.addCase(deleteCategory.fulfilled, () => {
			toast.success('Successfully delete');
		})
		builder.addCase(deleteCategory.rejected, () => {
			toast.error('This is an error!');
		})
	}
 })

 export default categoriesSlice.reducer