/**
 * 商品列表
 * author hale(hzhayue@corp.netease.com)
 */

define([
    'base/element',
    'base/util',
    'base/event',
    'text!./relate.html',
    'pro/base/util',
    '../ListComponent.js',
    'pro/base/config'
], function(_e,_u,_v, tpl, ut, ListComponent,config) {
    var List = ListComponent.extend({
        config: function(data) {
            ut.extend(data, {
                total: 1,
                current: 1,
                limit: 50,
                list: []
            });

            this.$watch('total', function(total) {
                 var $ele = _e._$get('count');
                 $ele && ( $ele.innerHTML = total );
                 
            });

            this.$watch('current', function(){
                this.__getList();
            }) 
        },
        xdrOption: function() {
            return {
                method: "post"
            };
        },
        init: function() {
            this.supr();

        },
        deleteItem:function(item) {
            if ( this.delModal ){
                this.delModal.close();
            }

            var _self = this;

            var _url    = this.data.action.del; 
                _config = {
                    data:{'newSkuId':item.id},
                    onload:function(json) {
                        var _config = {id:item.id};
                        _config.canDel = json.success;

                        this.delModal = new DelModal({data:_config});
                        this.delModal.$inject(_e._$get('dialog'));
                        this.delModal.$on('success', function(arg) {
                            _self._$remove(arg);
                        });
                    },
                    onerror:function() {}
                };

            this.$request(_url, _config);
            
        }
    });
    List.filter('importType', function(_type) {
        var map = {
            0: '直邮',
            1: '保税',
            2: '海淘'
        };
        return map[_type] || '未知类型';
    });
    return List;

});