import { useEffect, useState, FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../hook/redux'
import { getCategories, deleteCategory, addCategory, updateCategory } from '../../api/categories'
import { TCategory } from '../../types/categories'

export default function Categories() {
  const dispatch = useAppDispatch()
  const { categories: allCategories, categoriesLoading } = useAppSelector(state => state.categories)

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [displayCategories, setDisplayCategories] = useState<TCategory[]>([])

  const [isEditing, setIsEditing] = useState(false)
  const [editCategory, setEditCategory] = useState<TCategory | null>(null)

  const [name, setName] = useState('')
  const [status, setStatus] = useState('active')

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  useEffect(() => {
    let filtered = allCategories

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(cat =>
        cat.name.toLowerCase().includes(query)
      )
    }

    if (statusFilter) {
      filtered = filtered.filter(cat => (cat.status || 'active') === statusFilter)
    }

    setDisplayCategories(filtered)
  }, [allCategories, searchQuery, statusFilter])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (isEditing && editCategory) {
      dispatch(updateCategory({ id: editCategory.id, name, status }))
    } else {
      dispatch(addCategory({ name, status }))
    }

    resetForm()
  }

  const resetForm = () => {
    setIsEditing(false)
    setEditCategory(null)
    setName('')
    setStatus('active')
  }

  const handleEdit = (cat: TCategory) => {
    setIsEditing(true)
    setEditCategory(cat)
    setName(cat.name)
    setStatus(cat.status || 'active')
  }

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center"> Categories Manager</h1>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="border p-6 mb-8 rounded-xl bg-white shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          {isEditing ? 'Edit Category' : 'Add New Category'}
        </h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg shadow-md hover:opacity-90"
            >
              {isEditing ? 'Update Category' : 'Add Category'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-lg shadow-md hover:opacity-90"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Loader */}
      {categoriesLoading ? (
        <div className="animate-pulse text-gray-500">Loading categories...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border divide-y divide-gray-300 text-sm">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">ID</th>
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {displayCategories.length > 0 ? (
                displayCategories.map(cat => (
                  <tr key={cat.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{cat.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{cat.name}</td>
                    <td className="px-4 py-3 capitalize">{cat.status || 'active'}</td>
                    <td className="px-4 py-3 flex flex-wrap gap-2">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="px-4 py-1 bg-gradient-to-r from-blue-400 to-blue-900 text-white rounded hover:opacity-90"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => dispatch(deleteCategory(cat.id))}
                        className="px-4 py-1 bg-gradient-to-r from-red-400 to-red-800 text-white rounded hover:opacity-90"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
