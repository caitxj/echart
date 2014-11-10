/**
 * Created by caiqingliang on 2014/10/30.
 */
var myChart;
var charMain=document.getElementById('char_main');
var chartNote=document.getElementById('chartNote');
var domCode = document.getElementById('sidebar-code');
var domGraphic = document.getElementById('graphic');
var domMain = document.getElementById('chartArea');
var domMessage = document.getElementById('wrong-message');
var iconResize = document.getElementById('icon-resize');
var needRefresh = false;

var hash = location.hash.replace('#','')? 'default' :location.hash.replace('#','');
var curTheme;
var echarts;

function checkIsIE8(){
    var browser=navigator.appName
    var b_version=navigator.appVersion
    var version=b_version.split(";");
    var trim_Version="";
    if(version[1]){
        trim_Version=version[1].replace(/[ ]/g,"");
    }
    return browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0";
}
function requireCallback (ec, defaultTheme) {
    curTheme = themeSelector
        ? defaultTheme
        : {};
    echarts = ec;
    if(checkIsIE8())
    {
     $(domMain).removeAttr("style").css('height',500);
     $(domMain).wrap("<div style='border:1px solid #ccc;'></div>");
    }
    refresh();
    window.onresize = myChart.resize;
}

var themeSelector = $('#theme-select');
if (themeSelector) {
    themeSelector.html(
            '<option selected="true" name="macarons">macarons</option>'
            + '<option name="infographic">infographic</option>'
            + '<option name="shine">shine</option>'
            + '<option name="dark">dark</option>'
            + '<option name="blue">blue</option>'
            + '<option name="green">green</option>'
            + '<option name="red">red</option>'
            + '<option name="gray">gray</option>'
            + '<option name="default">default</option>'
    );
    $(themeSelector).on('change', function(){
        selectChange($(this).val());
    });
    function selectChange(value){
        var theme = value;
        myChart.showLoading();
        $(themeSelector).val(theme);
        if (theme != 'default') {
            window.location.hash = value;
            require(['theme/' + theme], function(tarTheme){
                curTheme = tarTheme;
                setTimeout(refreshTheme, 500);
            })
        }
        else {
            window.location.hash = '';
            curTheme = {};
            setTimeout(refreshTheme, 500);
        }
    }
    function refreshTheme(){
        myChart.hideLoading();
        myChart.setTheme(curTheme);
    }
    if ($(themeSelector).val(hash).val() != hash) {
        $(themeSelector).val('macarons');
        hash = 'macarons';
        window.location.hash = hash;
    }
}

function autoResize() {
    if ($(iconResize).hasClass('icon-resize-full')) {
        focusCode();
        iconResize.className = 'icon-resize-small';
    } else {
        needRefresh=true;
        focusGraphic();
        iconResize.className = 'icon-resize-full';
    }
}

function focusCode() {
    domCode.className = 'span8';
    domGraphic.className = 'span4';
    domGraphic.style.overflow='hidden';
    if(checkIsIE8()){
        var option=eval(editor.doc.getValue());
        option.legend.x="left";
        option.toolbox.show=false;
        option.toolbox.feature.expand.title='关闭编辑';
        myChart.setOption(option, true);
    }
    setTimeout(function(){
       themeSelector.focus();
    },500);
    $(chartNote).find("div").hide();
}

function focusGraphic() {
    var display=domCode.style.display;
    if(display!="none"){
        domCode.className = 'span4';
        domGraphic.className = 'span8';
    }
    if (needRefresh) {
       // myChart.showLoading();
        setTimeout(refresh, 100);
    }
    $(chartNote).find("div").show();
}

var editor = CodeMirror.fromTextArea(
    document.getElementById("code"),
    { lineNumbers: true }
);
editor.setOption("theme", 'monokai');
editor.on('change', function(){needRefresh = true;});

function refresh(isBtnRefresh){
    if (isBtnRefresh) {
        needRefresh = true;
        focusGraphic();
        return;
    }
    var display=domCode.style.display;
        needRefresh = false;
        if (myChart && myChart.dispose) {
            myChart.dispose();
        }
        myChart = echarts.init(domMain, curTheme);
        window.onresize = myChart.resize;
        if(display=="none"){
            myChart.setOption(eval(editor.doc.getValue()), true)
        }else{
            var option=eval(editor.doc.getValue());
            option.legend.x="left";
            option.toolbox.show=true;
      //      option.toolbox.feature.expand.title='关闭编辑';
            myChart.setOption(option, true);
        }
       // domMessage.innerHTML = '';
}

// 按需加载
require(
    [
        'echarts',
            'theme/' + hash,
        'echarts/chart/line',
        'echarts/chart/bar',
        'echarts/chart/scatter',
        'echarts/chart/k',
        'echarts/chart/pie',
        'echarts/chart/radar',
        'echarts/chart/force',
        'echarts/chart/chord',
        'echarts/chart/gauge',
        'echarts/chart/funnel'
       // needMap() ? 'echarts/chart/map' : 'echarts'
    ],
    requireCallback
);

function triggerChartCode(){
    var codeStyle=$("#sidebar-code").css("display");
    //显示editor
    if(codeStyle=="none") {
        $("#sidebar-code").show().removeClass().addClass("span4");
        //如果为ie8
        if(checkIsIE8()){
            $("#chartNote").find('div:eq(0)').css('margin-left',85);
            $("#chartArea").parent().parent().removeClass().addClass("span8");
        }else{
            $("#chartNote").find('div:eq(0)').css('margin-left',33);
            $("#chartArea").parent().removeClass().addClass("span8");
        }
        $("#chartArea").children("div:eq(0)").css("width",parseInt($("#chartArea").css("width"),10)-20);
        $("#chartNote").addClass('offset4');
      //  $(".echarts-dataview").css("width",parseInt($("#chartArea").css("width"),10)-60);
        //正确显示chart图片信息
       // setTimeout(function(){
           /** var option=eval(editor.doc.getValue());
            option.legend.x="left";
           option.toolbox.x="right";
            option.toolbox.feature.expand.title='关闭编辑';
            myChart.setOption(option, true);**/
        refresh(true);
       // },500);
    }else{
        //全屏显示chart
        $("#sidebar-code").hide();
        if(checkIsIE8()){
            $("#chartArea").parent().parent().removeClass().addClass("span11");
        }else{
            $("#chartArea").parent().removeClass().addClass("span11");
        }
        $("#chartArea").children("div:eq(0)").css("width",parseInt($("#chartArea").css("width"),10));
        $("#chartNote").removeClass('offset4');
        //$("#mainKey").css("margin-left",35);
        refresh(true);
    }
    setTimeout(function(){
        editor.refresh();
    },500);
}



