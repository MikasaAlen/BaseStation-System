import Home from "./components/Home"
import Task from "./components/Task"
import Instrument from "./components/Instrument"
import Order from "./components/Order"
import User from "./components/User"
import Login from "./components/Login"
import OrderDetail from "./components/OrderDetail"
// import test from "./components/test"


const routers = [
  {
    path:"/Home",
    component: Home,
    redirect:"/Home/Task",
    children:
    [
      {
        path:"Task",
        component:Task,

      },
      {
        path:"Instrument",
        component:Instrument,
      },
      {
        path:"Order",
        component:Order,
      },
      {
        path:"Order/OrderDetail",
        component:OrderDetail,
      },
      {
        path:"User",
        component:User,
      }

    ]
   },
  {
    path:"/",
    component:Login,

  },
];

export default routers
