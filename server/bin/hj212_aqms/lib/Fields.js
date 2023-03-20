const Fields = {
    "systemtime":{
        "Fields":"SystemTime",
        "Discription":"系统时间",
        "Length":"N14",
        "DataType":"Date"
    },
    "qnrtn":{
        "Fields":"QnRtn",
        "Discription":"请求回应代码",
        "Length":"N3",
        "DataType":"Number"
    },
    "exertn":{
        "Fields":"ExeRtn",
        "Discription":"执行结果回应代码",
        "Length":"N3",
        "DataType":"Number"
    },
    "polid":{
        "Fields":"PolId",
        "Discription":"污染因子的编码",
        "Length":"C3",
        "DataType":"String"
    },
    "infoid":{
        "Fields":"InfoId",
        "Discription":"现场端信息",
        "Length":"C6",
        "DataType":"String"
    },
    "xxxxxx-sn":{
        "Fields":"xxxxx-SN",
        "Discription":"在线监控仪器仪表编码",
        "Length":"C24",
        "DataType":"String"
    }
}

function formatFieldsVal(field,val){
    if(field in Fields){
        switch(Fields[field]){
            case "Date":
                return mo
                break;
            case "":
                break;
            case "":
                break;
            case "":
                break;
                case "":
                break;
        }

    }
}