/*
* 该案例旨在熟悉fullpage插件的使用，以及相关动画的设置。fullpage插件相关的函数可以查阅相关的文档。
*/
$(function(){
    //screenHeight表示当前屏幕的高度
    let screenHeight = $(window).height();
    let flag = false;
    //点击继续往下，跳转到下一屏
    $(".next").click(function () {
        $.fn.fullpage.moveSectionDown();
    })
	$('#fullpage').fullpage({
        //fullpage的参数是以对象形式传递

        //navigation表示是否显示项目导航，默认不显示，设置true为显示
        navigation:true,
        navigationPosition: 'right',  //注意这个navigationPosition的属性值是一个string，要加引号
        scrollingSpeed:1400,   //默认滚动速度是700，单位是毫秒
        /*afterLoad是滚动结束后，一旦加载了部分，就会触发回调的回调函数，接收两个参数：
        *   1、anchorLink：表示锚链接的名称
        *   2、index：表示屏幕的页号，从1开始
        */
        afterLoad:function (anchorLink,index) {
            // alert(index);   //当滚动到某一屏，弹出当前屏的序号
            //这里表示当滚动到第二屏的时候，调用回调函数
            //滚动到第二屏并且flag为false才执行，这样当从第三屏滚回第二屏的时候，就不会触发该事件再执行一遍。
            if(index === 2 && flag === false){
                $(".next").hide();
                //animate是一个动画函数，$(selector).animate(styles,speed,easing,callback)
                // show()函数是将图片显示出来，然后该语句链式调用animate动画函数
                $(".search").show().animate({"right":370},1500,"easeOutBack",function () {
                    //该函数的功能是将.search图片向左移动到距离右边370px处。
                    $(".search-words").animate({opacity:1},500,function () {
                        //当search和words移入到屏幕中央后立马隐藏，用hide()函数
                        $(".search").hide();
                        //图片往上走并且缩小
                        $(".search-02-1").show().animate({height:30,right:240,bottom:450},1000);
                        //同时，沙发图片显示并且变大
                        $(".goods-02").show().animate({height: 218},1000,function () {
                            $(".next").show();
                            flag = true;
                        })
                    })
                });
            }
            //直接第八屏的动画
            if(index === 8 ){
                $(".next").hide();
                //鼠标移入移出a标签的样式改变
                // $(".beginShoping").mouseenter(function(event) {
                //     $(".btn-08-a").show();
                // }).mouseleave(function(event) {
                //    $(".btn-08-a").hide();
                // });
                // hover 来替代更简洁  以后一个盒子鼠标经过显示离开隐藏  我们就可以用hover和toggle混搭
                $(".beginShoping").hover(function () {
                    $(".btn-08-a").toggle();  //toggle用来切换样式
                });

                //获取鼠标位置，让网页中的手跟随鼠标移动
                $(document).mousemove(function (e) {
                    let x = e.pageX - 60;    //x表示鼠标的x轴坐标
                    let y = e.pageY + 5;    //y表示鼠标的y轴坐标
                    // 手的top 值不能小于 这个大小minY   当前屏幕的高度 K  减去手的高度  449
                    let minY = screenHeight - 449;
                    if(y<minY){
                        y = minY;
                    }
                    //让网页中的手跟随鼠标移动
                    $(".hand-08").css({left:x,top: y});
                });
                // 当我们点击 再来一次的 时候， 分两步进行
                $(".again").click(function() {
                    // 1. 返回第1屏幕
                    $.fn.fullpage.moveTo(1);
                    // 2. 所有的动画都复原 就是原来没有看过的样子
                    // 核心原理就是  让我们的图片（做动画的元素 清除 行内样式就可以）
                    // 所有带有动画的div 盒子 添加 move 类名
                    $("img, .move").attr("style", "");
                    //
                    flag = false;
                });
            }
        },

        /*onLeave是刚开始滚动屏幕就触发的回调函数,有三个参数：
        *   1、index：表示当前屏幕页面号
        *   2、nextIndex：表示即将滚动到的页面号   index和nextIndex都是从1开始计算
        *   3、direction：判断向下滚动还是向上滚动，值是up或down
        */
        onLeave :function (index,nextIndex,direction) {
            $(".next").hide();
            // alert(index);
            //第二屏到第三屏的滚动
            if(index === 2 && nextIndex === 3){
                //第二屏往第三屏滚动的时候，沙发显示，并且往下掉，同时白色盒子遮挡原沙发
                //当前是第二屏，要掉落到第三屏，表示该沙发的bottom值要为一个负数，同时大小变回原来大小
                //bottom的值为：当前屏幕的高度 - 第三屏中沙发距离底部的高度，且为负值。
                //即bottom:-(当前屏幕高度screenHeight - 250)
                //同时要注意：第三屏的z-index和第二屏的z-index一样，所以从第二屏降落到第三屏的时候，会被第三屏覆盖掉
                $(".shirt-02").show().animate({bottom: -(screenHeight - 250),width:207,left:260},2000,function () {
                    //让选中样式和购物车的图片显示出来
                    $(".img2").animate({opacity: 1},500);
                    $(".btn2").animate({opacity: 1},500,function () {
                        $(".next").show();
                    });
                });
                $(".cover").show();
            }
            //第三屏到第四屏的滚动
            if(index === 3 && nextIndex === 4){
                //让倾斜沙发显示,正常沙发隐藏
                $(".shirt-02").hide();
                $(".t1f").show().animate({bottom: -(screenHeight - 200),left: 250},1500,function () {
                    $(this).hide();
                    $(".car-img").show();
                    $(".car").animate({left: "150%"},2000,"easeInElastic",function () {
                        $(".note").show();
                        $(".img-note").animate({opacity: 1},1000);
                        $(".words-04-a").animate({opacity: 1},1000,function () {
                            $(".next").show();
                        })
                    });
                });
            }
            if(index === 4 && nextIndex === 5){
                $(".hand-05").animate({bottom: 0},1000,function () {
                    // 鼠标显示
                    $(".mouse-05-a").animate({"opacity": 1});
                    // 沙发从 800 到  70
                    $(".t1f-05").show().animate({"bottom": 70}, 1000, function() {
                        // 单子上走 走完之后， 我们的文字翻转
                        $(".order-05").animate({"bottom": 390}, function() {
                            $(".words-05").addClass("words-05-a");
                            $(".next").show();
                        });
                    })
                })
            }
            if(index === 5 && nextIndex === 6){
                $(".t1f-05").animate({bottom: - (screenHeight - 500),left:"40%",width: 65},1500,function () {
                    $(".t1f-05").hide();
                });
                $(".box-06").animate({left: "38%"},1500,function () {
                    $(this).animate({bottom: 40},500,function () {
                        $(".box-06").hide();

                        //行走的过程就是背景向左移动的过程  backgroundPositionX背景X轴向左边移动
                        $(".section6").animate({backgroundPositionX:"100%"},3000,function () {
                            $(".pop-06").show();
                            $(".man-06").show().animate({height:305,bottom: 120},1000,function () {
                                $(this).animate({right:500},500,function () {
                                    //女人开门
                                    $(".door-06").animate({opacity:1},300,function () {
                                        $(".women-06").show().animate({height:294,right:400},700,function () {
                                            $(".receive-06").show();
                                            $(".next").show();
                                        });
                                    });
                                });
                            });
                            $(".words-06-a").show().animate({left:"30%"},1000,"easeOutElastic");
                        });
                    });
                })
            }
            if(index === 6 && nextIndex === 7){
                setTimeout(function () {
                    $(".star-07").animate({width:120},500,function () {
                        $(".good-07").show();
                        $(".next").show();
                    })
                },1000);
            }
        },
    });
});