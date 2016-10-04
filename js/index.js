//localStorage.clear();
angular.module("mynote",[])
    .controller("notepad",["$scope","$filter",function ($scope,$filter) {
        $scope.list=localStorage.message?JSON.parse(localStorage.message):[];

        $scope.currId=$scope.list.length?$scope.list[0]:null;
        $scope.currContain=$scope.list.length?$scope.list[getIndex($scope.currId.id)]:null;

        $scope.search="";
        $scope.$watch("search",function () {
            $scope.isShow=true;
            var arr=$filter("filter")($scope.list,$scope.search);
            $scope.currId=arr[0].id;
            $scope.currContain=$scope.list.length?$scope.list[getIndex($scope.currId)]:null;
        });

        $scope.add=function () {
            $scope.isShow=true;
            var num=getMaxId($scope.list)+1;
            var newtitle = prompt("请输入任务", "任务" + num);
            var newobj = {
                id: num,
                title: newtitle,
                son:[]
            };
            $scope.list.push(newobj);
            localStorage.message=JSON.stringify($scope.list);
            $scope.currContain=$scope.list[$scope.list.length-1]
        }

        $scope.del=function (id) {
            $scope.isShow=true;
            angular.forEach($scope.list,function (val,index) {
                if($scope.list.length==1){
                    $scope.currId=null;
                    $scope.currContain=[]
                }else if(id==$scope.list[$scope.list.length-1].id){
                    $scope.currId=$scope.list[$scope.list.length-2].id
                    $scope.currContain=$scope.list.length?$scope.list[getIndex($scope.currId)]:null
                }else if(id==$scope.list[0].id){
                    $scope.currId=$scope.list[1].id
                    $scope.currContain=$scope.list.length?$scope.list[getIndex($scope.currId)]:null
                }else{
                    $scope.currId=$scope.list[1].id+1
                    $scope.currContain=$scope.list.length?$scope.list[getIndex($scope.currId)]:null
                }
                if(val.id==id){
                    $scope.list.splice(index,1)
                    localStorage.message=JSON.stringify($scope.list);
                }
            })
        }

        $scope.blur=function (id) {
            angular.forEach($scope.list,function (val,index) {
                if(val.id==id){
                    localStorage.message=JSON.stringify($scope.list);
                }
            })
        }

        $scope.getcurr=function (id) {
            $scope.isShow=true;
            for(var i=0;i<$scope.list.length;i++){
                if(id==$scope.list[i].id){
                    $scope.currId=$scope.list[i];
                    $scope.currContain=$scope.list.length?$scope.list[getIndex($scope.currId.id)]:null;
                }
            }
        }
        
        $scope.addSon=function (id) {
            for(var i=0;i<$scope.list.length;i++){
                var num=getMaxId($scope.list[i].son)+1;
                if(id==$scope.list[i].id){
                    var newobj={
                        id:num,
                        title:"我是子内容"+num
                    }
                    $scope.list[i].son.push(newobj)
                }
            }
            localStorage.message=JSON.stringify($scope.list);

        }


        $scope.success=localStorage.success?JSON.parse(localStorage.success):[];

        $scope.over=function (id) {
            var index=getIndex(id,$scope.currContain.son)
            var obj=$scope.currContain.son[index];
            obj.id=getMaxId($scope.success)+1
            $scope.success.push(obj)

            $scope.currContain.son.splice(index,1)

            localStorage.success=JSON.stringify($scope.success);
            localStorage.message=JSON.stringify($scope.list);

        }


        $scope.delover=function (id) {
            angular.forEach($scope.success,function (val,index) {
                if(val.id==id){
                    $scope.success.splice(index,1)
                    localStorage.success=JSON.stringify($scope.success);
                }
            })
        }

        function getMaxId(arr) {
            var num;
            if(arr.length>0){
                num=arr[0].id;
                for(var i=0;i<arr.length;i++){
                    if(num<arr[i].id){
                        num=arr[i].id
                    }
                }
            }else{
                num=0
            }
            return parseInt(num);
        }

        function getIndex(id,arr) {
            var arrs=arr||$scope.list;
            for(var i=0;i<arrs.length;i++){
                if(id==arrs[i].id){
                    return i;
                }
            }
        }
    }])








    

