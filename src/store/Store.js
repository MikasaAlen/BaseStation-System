import Vuex from 'vuex'
import vue from "vue"

vue.use(Vuex)

export default new Vuex.Store({
  state: {
    orderInfo: {},
    taskInfo:{},
    testPoint: [
      { code: "1",
        description:"浙大城院",
        value1:"1.12",
        value2:"2.12",
        value3:"3.22",
        value4:"2.11",
        value5:"1.01"
      },
      { code: "2",
        description:"西湖",
        value1:"1.08",
        value2:"3.21",
        value3:"0.22",
        value4:"1.11",
        value5:"0.01"
      },
    ],
    orderDetail:
      {
        "202011240001":[
          {
            baseStationName:"浙大城院",
            baseStationAddress:"拱墅区湖州街48号",
            assignmentDate:"2020-12-12",
            detectionTime:"2020-12-12",
            status:"待检测",
            inspector:"吴智宏",
            checker:"吴旭东",
            auditor:"陈云",
            action:"",
          },
          {
            baseStationName:"西湖广告大厦",
            baseStationAddress:"西湖区西园一路18号",
            assignmentDate:"2020-08-04",
            detectionTime:"2021-01-04",
            status:"待检测",
            inspector:"吴智宏",
            checker:"汪刚毅",
            auditor:"陆瀛",
            action:"",
          },
        ],
      },
    orderDetailInfo:
      [
        {
          baseStationNumber:"317012250001",
          baseStationName:"浙大城院",
          area:"拱墅区",
          buildingAddress:"湖州街48号",
          longitude:"120°8'54 E",
          latitude:"30°19'26 N",
          fileReport:"202012120001",
          projectPeriods:"3",
          towerType:"单管塔",
          aerialHeight:"12m",
        },
        {
          baseStationNumber:"317012250002",
          baseStationName:"西湖广告大厦",
          area:"西湖区",
          buildingAddress:"西湖区西园一路18号",
          longitude:"120°28'54 E",
          latitude:"30°12'26 N",
          fileReport:"202012120002",
          projectPeriods:"1",
          towerType:"自立铁塔",
          aerialHeight:"30m",
        },
      ]
  },
  mutations: {
    setOrder: (state,data) => {
      Object.assign(state.orderInfo,data)
    },
    setTask:(state,data) => {
      Object.assign(state.taskInfo,data)
    },
    addTaskInfo:(state,data)=>{
      var object={}
      Object.assign(object,state.taskInfo,data)
      Object.assign(state.taskInfo,object)
    }
  }
  ,
  actions: {
    getOrderDetail:(state)=>{

    }
  }
});
