/**
 * Created by caiqingliang on 2014/10/29.
 */
$(function(){
    initChartCode();
    $("#refreshChart").on("click",refreshChart);
});

function initChartCode(){
    $("#sidebar-code").hide();
    $("#chartArea").parent().removeClass().addClass("span12");
}
function triggerChartCode(){
    var codeStyle=$("#sidebar-code").css("display");
    var option=eval(document.getElementById("code").innerHTML);
    if(codeStyle=="none") {
        $("#sidebar-code").show().removeClass().addClass("span4");
        $("#chartArea").parent().removeClass().addClass("span8");
        $("#chartArea").children("div:eq(0)").css("width",parseInt($("#chartArea").css("width"),10)-20);
        $("#chartNote").addClass('offset4');
        $("#mainKey").css("margin-left",48);
        option.legend.x="left";
        option.toolbox.x="center";
        option.toolbox.feature.expand.title="关闭编辑"
        $(".echarts-dataview").css("width",parseInt($("#chartArea").css("width"),10)-20);
    }else{
        $("#sidebar-code").hide();
        $("#chartArea").parent().removeClass().addClass("span12");
        $("#chartArea").children("div:eq(0)").css("width",parseInt($("#chartArea").css("width"),10));
        $("#chartNote").removeClass('offset4');
        $("#mainKey").css("margin-left",35);
        option.legend.x="center";
        option.toolbox.x="right";
        option.toolbox.feature.expand.title="编辑代码"

    }
    myChart.setOption(option);
    $("#theme-select").themeSelector({"chart":myChart});
}
function refreshChart(){
    var myChart =echart.init(document.getElementById('chartArea'));
    myChart.setOption(eval(eval(editor.doc.getValue())));
    $("#theme-select").themeSelector({"chart":myChart});

}
