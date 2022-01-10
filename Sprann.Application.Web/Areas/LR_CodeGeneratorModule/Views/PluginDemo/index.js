/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.03.22
 * 描 述：力软插件演示页面	
 */
var bootstrap = function ($, sp) {
    "use strict";
   
    var page = {
        init: function () {
            page.bind();
            page.initLeftTree();
        },
        bind: function () {
            $(".sp-tab-scroll-content").spscroll();
        },
        initLeftTree: function () {
            $('#plugin_list').sptree({
                data: pluginList,
                nodeClick: function (item) {
                    switch (item.value)
                    {
                        case 'sptree':
                            $('#title_info').text(item.text);
                            $('#sp_tree_area').parent().find('.showarea-list-item.active').removeClass('active');
                            $('#sp_tree_area').addClass('active');
                            pluginlist.treeinit();
                            break;
                        case 'spselect':
                            $('#title_info').text(item.text);
                            $('#sp_select_area').parent().find('.showarea-list-item.active').removeClass('active');
                            $('#sp_select_area').addClass('active');
                            pluginlist.selectinit();
                            break;
                        case 'spuserselect':
                            $('#title_info').text(item.text);
                            $('#sp_selectuser_area').parent().find('.showarea-list-item.active').removeClass('active');
                            $('#sp_selectuser_area').addClass('active');
                            pluginlist.selectUserinit();
                            break;
                        case 'jfGrid':
                            $('#title_info').text(item.text);
                            $('#jfgrid_area').parent().find('.showarea-list-item.active').removeClass('active');
                            $('#jfgrid_area').addClass('active');
                            pluginlist.jfgridinit();
                            break;
                        case 'webUploader':
                            $('#title_info').text(item.text);
                            $('#uploader_area').parent().find('.showarea-list-item.active').removeClass('active');
                            $('#uploader_area').addClass('active');
                            pluginlist.uploaderInit();
                            break;
                    }
                }
            });
        }
    };

    //树插件
    var treeCode = {
        base:
function () {
    $('#tree_show_base').sptree({
        data: [{
            id: '0',
            text: '父节点',
            value: 'no',
            hasChildren: true,
            isexpand: true,
            complete: true,
            ChildNodes: [
                {
                    id: '1',
                    text: '子节点一',
                    value: 'sptree',
                    hasChildren: true,
                    isexpand: true,
                    complete: true,
                    ChildNodes: [
                        {
                            id: '2',
                            text: '子节点二',
                            value: 'sptree',
                            complete: true
                        }
                    ]
                }
            ]
        }]
    });
},
        ajax:
function () {
    $('#tree_show_ajax').sptree({
        url: top.$.rootUrl + '/LR_SystemModule/DataItem/GetClassifyTree'
    });
},
        checkbox:
function () {
    $('#tree_show_checkbox').sptree({
        data: [{
            id: '0',
            text: '父节点',
            value: 'no',
            showcheck: true,
            hasChildren: true,
            isexpand: true,
            complete: true,
            ChildNodes: [
                {
                    id: '1',
                    text: '子节点一',
                    value: 'sptree',
                    hasChildren: true,
                    isexpand: true,
                    complete: true,
                    ChildNodes: [
                        {
                            id: '2',
                            text: '子节点二',
                            value: 'sptree',
                            showcheck:true,
                            complete: true
                        },
                        {
                            id: '3',
                            text: '子节点三',
                            value: 'sptree',
                            showcheck: true,
                            complete: true
                        }, {
                            id: '4',
                            text: '子节点四',
                            value: 'sptree',
                            showcheck: true,
                            complete: true
                        }
                    ]
                },
                {
                    id: '11',
                    text: '子节点一一',
                    value: 'sptree',
                    showcheck: true,
                    hasChildren: true,
                    isexpand: true,
                    complete: true,
                    ChildNodes: [
                        {
                            id: '12',
                            text: '子节点一二',
                            value: 'sptree',
                            showcheck: true,
                            complete: true
                        }
                    ]
                }
            ]
        }]
    });
}
    }

    // jfgrid
    var initGrid = function () {
        $('#sp_jfgrid').jfGrid({
            isPage:true,
            isMultiselect: true,

            isSubGrid: true,    // 是否有子表单
            subGridRowExpanded: function () {

            },
            rowdatas: [
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 }
            ],
            headData: [
                { label: 'A', name: 'A', width: 80, align: 'left', frozen: true },
                {
                    label: 'B', name: 'B', width: 80, align: 'center', frozen: true,
                    children: [
                         { label: 'B1', name: 'B1', width: 80, align: 'center' },
                         {
                             label: 'B2', name: 'B2', width: 80, align: 'center',
                             children: [
                                  { label: 'B21', name: 'B21', width: 80, align: 'center' },
                                  {
                                      label: 'B21', name: 'B22', width: 80, align: 'center'
                                  }
                             ]
                         }
                    ]
                },
                { label: 'C', name: 'C', width: 80, align: 'right' },
                {
                    label: 'D', name: 'D', width: 80, align: 'center',
                    children: [
                        { label: 'D1', name: 'D1', width: 80, align: 'center' },
                        { label: 'D2', name: 'D2', width: 80, align: 'center' }
                    ]
                },
                {
                    label: "E", name: "E", width: 300, align: "left",
                    formatter: function (cellvalue) {
                        return cellvalue == 1 ? "<i class=\"fa fa-toggle-on\"></i>" : "<i class=\"fa fa-toggle-off\"></i>";
                    }
                }
            ]
        });
    };


    var pluginlist = {
        treeinit: function () {
            treeCode.base();

            treeCode.ajax();

            treeCode.checkbox();
        },
        selectinit: function () {
            var dfop = {
                type: 'tree',
                // 展开最大高度
                maxHeight: 200,
                // 是否允许搜索
                allowSearch: true,
                // 访问数据接口地址
                url: top.$.rootUrl + '/LR_OrganizationModule/Company/GetTree',
                // 访问数据接口参数
                param: { parentId: '0' },
            }
            $('#select1').spselect(dfop);


            var dfop2 = {
                // 字段
                value: "F_AreaCode",
                text: "F_AreaName",
                title: "F_AreaName",
                // 展开最大高度
                maxHeight: 200,
                // 是否允许搜索
                allowSearch: true,
                // 访问数据接口地址
                url: top.$.rootUrl + '/LR_SystemModule/Area/Getlist',
                // 访问数据接口参数
                param: { parentId: '' },
            }

            $('#select2').spselect(dfop2);

            $('#select4').spselect({
                // 字段
                value: "F_AreaCode",
                text: "F_AreaName",
                title: "F_AreaName",
                type: 'multiple',
                // 展开最大高度
                maxHeight: 200,
                // 是否允许搜索
                allowSearch: true,
                // 访问数据接口地址
                url: top.$.rootUrl + '/LR_SystemModule/Area/Getlist',
                // 访问数据接口参数
                param: { parentId: '' },
            });

            $('#select5').spGirdSelect({
                // 字段
                url: top.$.rootUrl + '/LR_SystemModule/DataItem/GetDetailList',
                param: { itemCode: 'Client_ProductInfo' },
                selectWord: 'F_ItemName',
                value: 'F_ItemValue',
                text: 'F_ItemName',
                headData: [{ label: "商品编号", name: "F_ItemValue", width: 100, align: "left" },
                    { label: "商品名称", name: "F_ItemName", width: 450, align: "left" }],
                select: function (item) {
                }

            });

            $('#select3').spselect({
                type: 'treemultiple',
                allowSearch: true,
                //type: 'tree',
                select: function (items) {
                },
                data: [{
                    id: '0',
                    text: '父节点',
                    value: 'no',
                    showcheck: true,
                    hasChildren: true,
                    isexpand: true,
                    complete: true,
                    ChildNodes: [
                        {
                            id: '1',
                            text: '子节点一',
                            value: 'sptree',
                            hasChildren: true,
                            isexpand: true,
                            complete: true,
                            ChildNodes: [
                                {
                                    id: '2',
                                    text: '子节点二',
                                    value: 'sptree',
                                    showcheck: true,
                                    complete: true
                                },
                                {
                                    id: '3',
                                    text: '子节点三',
                                    value: 'sptree',
                                    showcheck: true,
                                    complete: true
                                }, {
                                    id: '4',
                                    text: '子节点四',
                                    value: 'sptree',
                                    showcheck: true,
                                    complete: true
                                }
                            ]
                        },
                        {
                            id: '11',
                            text: '子节点一一',
                            value: 'sptree',
                            showcheck: true,
                            hasChildren: true,
                            isexpand: true,
                            complete: true,
                            ChildNodes: [
                                {
                                    id: '12',
                                    text: '子节点一二',
                                    value: 'sptree',
                                    showcheck: true,
                                    complete: true
                                }
                            ]
                        }
                    ]
                }]
            });

            $('#select6').splayerselect({
                treeCode: 'dataitemc',
                treeParentId: 'f_parentid',
                treeValueId: 'f_itemid',
                treeTextId: 'f_itemname',
                
                dataCode: 'dataitem',
                dataTreeId: 'f_itemid',
                dataValueId: 'f_itemdetailid',
                dataTextId: 'f_itemname',

                grid: [
                    { label: '项目名', name: 'f_itemname', width: 175, align: 'left' },
                    { label: '项目值', name: 'f_itemvalue', width: 175, align: 'left' },
                    { label: "备注", name: "f_description", width: 200, align: "left" }
                ],
                select: function (values, texts) {
                    //console.log(values, texts);
                }

            });
            //$('#select6').splayerselectSet('79e2b36d-73e6-42ff-aca2-e6b6bd885662,ed650fb0-5649-43b3-957d-73ceae26c313');
            //console.log($('#select6').splayerselectGet(),'获取数据');
            $('#select7').splayerselect({
                treeCode: 'dataitemc',
                treeParentId: 'f_parentid',
                treeValueId: 'f_itemid',
                treeTextId: 'f_itemname',

                dataCode: 'dataitem',
                dataTreeId: 'f_itemid',
                dataValueId: 'f_itemdetailid',
                dataTextId: 'f_itemname',

                grid: [
                    { label: '项目名', name: 'f_itemname', width: 175, align: 'left' },
                    { label: '项目值', name: 'f_itemvalue', width: 175, align: 'left' },
                    { label: "备注", name: "f_description", width: 200, align: "left" }
                ],
                select: function (values, texts) {
                },
                isMultiple: false

            });
        },
        selectUserinit: function () {
            $('#selectuser1').spformselect({
                layerUrl: top.$.rootUrl + '/LR_OrganizationModule/User/SelectForm',
                layerUrlW: 800,
                layerUrlH: 520,
                dataUrl:''
            });
        },
        jfgridinit:function(){
            initGrid();
        },
        uploaderInit: function () {
            $('#sp_uploader').spUploader();
        }
    }

    page.init();
}