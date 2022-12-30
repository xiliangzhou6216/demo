 const result=[{
	"id": "5fcd8d9dc493c8e16e2f92a2",
	"name": "兼职客服部",
	"users": [{
		"id": "5f59dfd4c493c8e16e291765",
		"name": "B座对接"
	}, {
		"id": "5fd31179c029a900126080ae",
		"name": "朴树"
	}, {
		"id": "5fd6dfea43576955d6c5397d",
		"name": "朴树"
	}, {
		"id": "5fe97902c493c8e16e877663",
		"name": "PTCS0000T"
	}]
}, {
	"id": "5fb4e989c493c8e16e5d2196",
	"name": "证券一部",
	"users": [{
		"id": "5f57342dc493c8e16efd37ec",
		"name": "刘建忠"
	}, {
		"id": "5f57342fc493c8e16efd3bc0",
		"name": "姜成乐"
	}, {
		"id": "5f57342fc493c8e16efd3d1b",
		"name": "赖思海"
	}, {
		"id": "5f573430c493c8e16efd3e04",
		"name": "刘祥兵"
	}, {
		"id": "5f573430c493c8e16efd3e2d",
		"name": "邹文红"
	}, {
		"id": "5f573430c493c8e16efd3fe4",
		"name": "王莉"
	}, {
		"id": "5f573431c493c8e16efd407c",
		"name": "刘惠"
	}, {
		"id": "5f573431c493c8e16efd40c3",
		"name": "莫素温"
	}, {
		"id": "5f573431c493c8e16efd4133",
		"name": "李玉生"
	}, {
		"id": "5f573431c493c8e16efd41ea",
		"name": "苏华根"
	}, {
		"id": "5f573431c493c8e16efd4319",
		"name": "张达"
	}, {
		"id": "5fb64013c493c8e16e81d5e9",
		"name": "RTS1M0000T"
	}, {
		"id": "5fb64013c493c8e16e81d5ea",
		"name": "RTS1SC0000T"
	}, {
		"id": "5fb64013c493c8e16e81d5f2",
		"name": "RTS1S0000T"
	}, {
		"id": "5fbb5aa3221c2b86b1b9c6d5",
		"name": "朴树"
	}, {
		"id": "5fbe19f7c493c8e16e1638e3",
		"name": "刘婷"
	}, {
		"id": "5fbe19f7c493c8e16e1638e9",
		"name": "张凯彬"
	}, {
		"id": "5fbe19f7c493c8e16e1638ed",
		"name": "杨希"
	}, {
		"id": "5fbe19f7c493c8e16e1638f4",
		"name": "赵威"
	}, {
		"id": "5fbe19f7c493c8e16e1638f6",
		"name": "张帆"
	}, {
		"id": "5fbe19f7c493c8e16e1638f7",
		"name": "欧阳鹏"
	}, {
		"id": "5ff67c03aff1ed00120ee109",
		"name": "test3"
	}]
}, {
	"id": "5fb4e989c493c8e16e5d2192",
	"name": "证券二部",
	"users": [{
		"id": "5f57342ec493c8e16efd3aa5",
		"name": "赵阳"
	}, {
		"id": "5f57342fc493c8e16efd3c39",
		"name": "唐国福"
	}, {
		"id": "5fb64013c493c8e16e81d5dd",
		"name": "RTS2M0000T"
	}, {
		"id": "5fb64013c493c8e16e81d5e3",
		"name": "RTS2SC0000T"
	}, {
		"id": "5fb64013c493c8e16e81d5ee",
		"name": "RTS2S0000T"
	}, {
		"id": "5fbb62eb02eec18e3af69795",
		"name": "朴树"
	}, {
		"id": "5fbb630802eec18e3af6979b",
		"name": "朴树"
	}, {
		"id": "5fbe19f7c493c8e16e163900",
		"name": "孙祥"
	}, {
		"id": "5fbe19f7c493c8e16e163908",
		"name": "姚磊"
	}, {
		"id": "5fbe19f7c493c8e16e163909",
		"name": "胡龙"
	}, {
		"id": "5fbe19f7c493c8e16e16390a",
		"name": "池雁婷"
	}, {
		"id": "5fbe19f7c493c8e16e16390e",
		"name": "刘翔"
	}, {
		"id": "5fbe19f7c493c8e16e163910",
		"name": "游亮"
	}, {
		"id": "5fbe19f7c493c8e16e163913",
		"name": "李康"
	}, {
		"id": "5fbe19f7c493c8e16e163917",
		"name": "梁志炯"
	}]
}]

export const s=1

export default result

export let tree = [
  {
    id: '1',
    title: '节点1',
    children: [
      {
        id: '1-1',
        title: '节点1-1'
      },
      {
        id: '1-2',
        title: '节点1-2'
      }
    ]
  },
  {
    id: '2',
    title: '节点2',
    children: [
      {
        id: '2-1',
        title: '节点2-1',
      },
			{
        id: '2-2',
        title: '节点2-2'
      }
    ]
  },
]



export let list = [
	{
		id: '1',
		title: '节点1',
		parentId: '',
	},
	{
		id: '1-1',
		title: '节点1-1',
		parentId: '1'
	},	
	{
		id: '2',
		title: '节点2',
		parentId: ''
	},
	{
		id: '2-1',
		title: '节点2-1',
		parentId: '2'
	},
	{
		id: '2-133',
		title: '节点2-133',
		parentId: '2-1'
	},{
		id: '1-2',
		title: '节点1-2',
		parentId: '1'
	},
]



