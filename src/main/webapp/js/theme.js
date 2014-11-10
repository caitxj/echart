/**
 * Created by caiqingliang on 2014/10/28.
 * 图表皮肤更换
 */
$.fn.themeSelector=function(options){
    var colorStyle='<option selected="true" name="macarons">macarons</option>'
        + '<option name="infographic">infographic</option>'
        + '<option name="shine">shine</option>'
        + '<option name="dark">dark</option>'
        + '<option name="blue">blue</option>'
        + '<option name="green">green</option>'
        + '<option name="red">red</option>'
        + '<option name="gray">gray</option>'
        + '<option name="default">default</option>',
        curTheme,
        themeSelector =$(this),
        myChart=options.chart;
    if (themeSelector) {
        themeSelector.html(colorStyle);
        $(themeSelector).on('change', function () {
            selectChange($(this).val());
        });
        function selectChange(value){
            var theme = value;
            myChart.showLoading();
            $(themeSelector).val(theme);
            if (theme != 'default') {
                require(['theme/' + theme], function(tarTheme){
                    curTheme = tarTheme;
                    setTimeout(refreshTheme, 500);
                })
            }
            else {
                curTheme = {};
                setTimeout(refreshTheme, 500);
            }
        }
        function refreshTheme(){
            myChart.hideLoading();
            myChart.setTheme(curTheme);
        }
    }
}