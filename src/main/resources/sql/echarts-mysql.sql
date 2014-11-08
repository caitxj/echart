
drop PROCEDURE if EXISTS add_dec_res;
/******
times:执行次数
chartName:报表类型名
type:文件类型
baseUrl:访问基本地址
sysType:所属系统
decType:资源类型
dstate:资源状态
insetUser:添加人
***/
create PROCEDURE add_dec_res(IN times INT,IN chartName VARCHAR(20),IN type VARCHAR(10),IN baseUrl VARCHAR(50),IN sysType varchar(30),IN decType varchar(30),IN dstate VARCHAR(20),IN insertUser VARCHAR(30))
BEGIN
DECLARE fileName VARCHAR(30) DEFAULT chartName;
DECLARE fileUrl VARCHAR(100) DEFAULT  baseUrl;
DECLARE guid VARCHAR(30) DEFAULT 'echarts_';
DECLARE sysType VARCHAR(30) DEFAULT sysType;
DECLARE decType VARCHAR(30) DEFAULT decType;
DECLARE state VARCHAR(30) DEFAULT dstate;
DECLARE insertUser VARCHAR(30) DEFAULT insertUser;
DECLARE insertTime VARCHAR(30) DEFAULT NOW();
DECLARE i int DEFAULT 1;
WHILE i<=times do
	set fileName=CONCAT(chartName,i);
	set fileUrl=CONCAT(baseUrl,chartName,"/",fileName,".",type);
	set guid=CONCAT(guid,chartName,i);
	insert into d_dec_res_tbl VALUES(guid,sysType,decType,fileName,fileUrl,fileUrl,'','',state,insertUser,insertTime,null,null);
	set i=i+1;
	set fileName='';
	set fileUrl='';
	set guid='echarts_';
END WHILE;
END;
/**
 * 分类执行echarts报表
 * bar:柱状图
 * chord:和弦图
 * force:力导分布图
 * funnel:漏斗图
 * gauge:仪表图
 * k:k线图
 * line:折线图
 * map:地图
 * mix:混合图
 * other:其他
 * pie:饼图
 * plugin:组件图
 * radar:雷达图
 * scatter:散点图
 * */
CALL add_dec_res(13,'bar','html','http://127.0.0.1:8989/echart/demo/','报表','统计报表','未分配','root');
CALL add_dec_res(3,'chord','html','http://127.0.0.1:8989/echart/demo/','报表','统计报表','未分配','root');
CALL add_dec_res(5,'force','html','http://127.0.0.1:8989/echart/demo/','报表','统计报表','未分配','root');
CALL add_dec_res(4,'funnel','html','http://127.0.0.1:8989/echart/demo/','报表','统计报表','未分配','root');
CALL add_dec_res(6,'gauge','html','http://127.0.0.1:8989/echart/demo/','报表','统计报表','未分配','root');
CALL add_dec_res(2,'k','html','http://127.0.0.1:8989/echart/demo/','报表','统计报表','未分配','root');
CALL add_dec_res(7,'line','html','http://127.0.0.1:8989/echart/demo/','报表','统计报表','未分配','root');
CALL add_dec_res(21,'map','html','http://127.0.0.1:8989/echart/demo/','报表','统计报表','未分配','root');
CALL add_dec_res(12,'mix','html','http://127.0.0.1:8989/echart/demo/','报表','统计报表','未分配','root');
CALL add_dec_res(4,'other','html','http://127.0.0.1:8989/echart/demo/','报表','统计报表','未分配','root');
CALL add_dec_res(8,'pie','html','http://127.0.0.1:8989/echart/demo/','报表','统计报表','未分配','root');
CALL add_dec_res(6,'plugin','html','http://127.0.0.1:8989/echart/demo/','报表','统计报表','未分配','root');
CALL add_dec_res(4,'radar','html','http://127.0.0.1:8989/echart/demo/','报表','统计报表','未分配','root');
CALL add_dec_res(6,'scatter','html','http://127.0.0.1:8989/echart/demo/','报表','统计报表','未分配','root');
