import Vuex from 'vuex'
import vue from "vue"

vue.use(Vuex);

export default new Vuex.Store({
  state: {
    orderInfo: {},
    taskInfo:{},
    userInfo:[
      {
        id:"1",
        userName:"Mikasa",
        pwd:"www5050796",
      },
      {
        id:"2",
        userName:"chenyun",
        pwd:"123123123",
      }
    ],
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
      ],
    tableUser:[
      {
        unitName: '成功软件有限公司',
        zipCode: '310000',
        phone: '15988879470',
        contact: '吴智宏',
        address: '西湖广告大厦',
        remark: '无',
        province: "浙江省",
        city: "杭州市",
        area: "西湖区",
      }
    ],
    tableOrder:[
      {
        orderId:"202011240001",
        startTime:"2020-11-29 ",
        finishTime:"2020-11-30 ",
        status:"待检测",
        post:"成功软件有限公司",
        action:"",
      }
    ],
    tableInstrument:[
      {
        instrumentName: '射频综合场强仪',
        standard: 'NBM550',
        frequency: '0.1MHz～3000MHz',
        probeModel: 'EF0391',
        manufacturer: '德国nadar',
        applianceNumber: 'B1218/A1288',
        verificationUnit:'上海市计量测试委员会',
        verificationNumber:'2019F33-10-1901451',
      },
    ],
  },
  mutations: {
    setOrder: (state,data) => {
      Object.assign(state.orderInfo,data)
    },
    setTask:(state,data) => {
      Object.assign(state.taskInfo,data)
    },
    addTaskInfo:(state,data)=>{
      var object={};
      Object.assign(object,state.taskInfo,data);
      Object.assign(state.taskInfo,object);
    },
    addUserInfo:(state,data)=>{
      var object={};
      Object.assign(object,state.tableUser,data);
      // Object.assign(state.tableUser,object)
      state.tableUser.push(object);
    },
    addOrderInfo:(state,data)=>{
      var object={};
      Object.assign(object,state.tableOrder,data);
      state.tableOrder.push(object);
    },
    addInstrumentInfo:(state,data)=>{
      var object={};
      Object.assign(object,state.tableInstrument,data);
      state.tableInstrument.push(object);
    },
  },
  actions: {
    getOrderDetail:(state)=>{

    },
  },
});
