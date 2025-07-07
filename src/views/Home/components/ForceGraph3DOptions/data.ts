export default {
    "nodes": [ // 拥有的节点及扩展数据
		{
            "id": "1",
            "user": "mbostock",
            "description": "Force-Directed Graph",
            color:'yellow'
        },
        {
            "id": "2",
            "user": "mbostock",
            "description": "Force-Directed Graph"
        },
        {
            "id": "3",
            "user": "mbostock",
            "description": "Force-Directed Graph"
        },
                {
            "id": "4",
            "user": "mbostock",
            "description": "Force-Directed Graph"
        },
                {
            "id": "5",
            "user": "mbostock",
            "description": "Force-Directed Graph"
        },
                        {
            "id": "6",
            "user": "mbostock",
            "description": "Force-Directed Graph"
        },
	],
    "links": [ // 建立节点关系，根据nodes的id字段进行关联
    {
            "source": "1",
            "target": "2"
        },
            {
            "source": "2",
            "target": "3"
        },
        {
            "source": "2",
            "target": "3"
        },
        {
            "source": "1",
            "target": "3"
        },
        {
            "source": "2",
            "target": "6"
       },
    ]
}