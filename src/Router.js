import Home from "./components/Home"
import Task from "./components/Task"
import Login from "./components/Login"


const routers = [
  {
    path:"/Home",
    component: Home,
    name:Home,
    redirect:"/Home/Task",
    children:
    [
      {
        path:"Task",
        component:Task,
        name:Task,

      },
    ]
   },
  {
    path:"/",
    component:Login,
    name:Login,

  }

]

export default routers
