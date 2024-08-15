import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../types/task";
import { taskService } from "../services"

export interface taskListState {
    taskList: Task[],
    lastId: number
}

const taskList =  await taskService.getTask()
const lastId = (taskList[(taskList.length)-1].id)+1

const initialState: taskListState= {
    taskList: taskList,
    lastId: lastId
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers:{
        addTask: (state, action: PayloadAction<string>) => {
            const taskList = state.taskList
            let newTask = {completed: false, title: action.payload }
            taskService.createTask(newTask)
            state.taskList = [...taskList, {id: state.lastId++, completed: false, title: action.payload }]
        },
        toogleTask: (state, action: PayloadAction<number>) => {
            const id = action.payload
            const taskList = state.taskList
            const taskUpdate = taskList.filter((task) => task.id === action.payload)
            taskService.updateTask(taskUpdate[0])
            state.taskList = taskList.map(task => task.id === id ? {id: id, title: task.title, completed: !task.completed} : task)
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            const taskList = state.taskList
            taskService.deleteTask(action.payload)
            state.taskList = taskList.filter(task => task.id != action.payload)
            
        }
    }

})


export const { addTask, toogleTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;

