import { useTodos } from "../hooks/todos/useTodos";
import { useCreateTodo } from "../hooks/todos/useCreateTodo";
import { useUpdateTodo } from "../hooks/todos/useUpdateTodo";
import { useDeleteTodo } from "../hooks/todos/useDeleteTodo";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

export default function Todos() {
  const { data, isLoading } = useTodos();
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();
  const logout = useAuth((s) => s.logout);
  const [editingTodo, setEditingTodo] = useState<any | null>(null);
  const [editValues, setEditValues] = useState({ title: "", description: "" });


  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (values: any) => {
    createTodo.mutate(values, {
      onSuccess: () => reset()
    });
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    
    <div className="min-h-screen  p-6">
      {editingTodo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Todo</h2>

            <input
              value={editValues.title}
              onChange={(e) =>
                setEditValues({ ...editValues, title: e.target.value })
              }
              className="w-full p-3 border rounded-lg mb-3"
              placeholder="Title"
            />

            <input
              value={editValues.description}
              onChange={(e) =>
                setEditValues({ ...editValues, description: e.target.value })
              }
              className="w-full p-3 border rounded-lg mb-4"
              placeholder="Description (optional)"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  updateTodo.mutate(
                    {
                      id: editingTodo._id,
                      data: {
                        title: editValues.title,
                        description: editValues.description,
                      },
                    },
                    {
                      onSuccess: () => {
                        setEditingTodo(null);
                      },
                    }
                  );
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save
              </button>

              <button
                onClick={() => setEditingTodo(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-xl mx-auto">

        <div className="flex justify-between items-center mb-1 bg-white p-2 rounded-lg">
          <h1 className="text-3xl font-bold">Your Todos</h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg 
                       hover:bg-red-700 active:bg-red-800 transition"
          >
            Logout
          </button>
        </div>

        <div className="bg-white shadow-md rounded-xl p-5 mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Todo</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <input
              {...register("title")}
              placeholder="Title"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              {...register("description")}
              placeholder="Description (optional)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg 
                         hover:bg-blue-700 active:bg-blue-800 transition-colors"
            >
              {createTodo.isLoading ? "Adding..." : "Add Todo"}
            </button>
          </form>
        </div>

        <div className="space-y-4">
          {data?.length === 0 && (
            <p className="text-center text-gray-600">No todos yet.</p>
          )}

          {data?.map((todo: any) => (
            <div
              key={todo._id}
              className="bg-white shadow-sm rounded-lg p-4 flex justify-between items-center border border-gray-200"
            >
              <div className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    updateTodo.mutate({
                      id: todo._id,
                      data: { completed: !todo.completed }
                    })
                  }
                  className="w-5 h-5 text-blue-600 rounded focus:ring-0 cursor-pointer"
                />

                <div>
                  <p
                    className={`text-lg font-medium ${todo.completed ? "line-through text-gray-500" : ""
                      }`}
                  >
                    {todo.title}
                  </p>

                  {todo.description && (
                    <p className="text-sm text-gray-600">{todo.description}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">

              <button
                onClick={() => {
                  setEditingTodo(todo);
                  setEditValues({
                    title: todo.title,
                    description: todo.description || ""
                  });
                }}
                className="text-white px-5 rounded-lg bg-blue-600 "
                >
                Edit
              </button>


              <button
                onClick={() => deleteTodo.mutate(todo._id)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg 
                hover:bg-red-600 active:bg-red-700 transition"
                >
                Delete
              </button>
                </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
