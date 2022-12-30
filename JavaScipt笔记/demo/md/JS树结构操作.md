<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: xiliang
 * @Date: 2021-06-11 14:30:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-17 17:54:23
-->
[TOC]

![](https://i0.hdslb.com/bfs/album/0fafeb92e2e6fef089737d7427e725fc95e8af3b.png)

## 遍历树结构


### 树结构介绍

```js
let tree = [
  {
    id: '1',
    title: '节点1',
    children: [
      {
        id: '1-1',
        title: '节点1-1'
      },
      {
        id: '1-2',
        title: '节点1-2'
      }
    ]
  },
  {
    id: '2',
    title: '节点2',
    children: [
      {
        id: '2-1',
        title: '节点2-1'
      }
    ]
  }
]

```
为了更通用，可以用存储了树根节点的列表表示一个树形结构，每个节点的children属性（如果有）是一颗子树，如果没有children属性或者children长度为0，则表示该节点为叶子节点。

### 树结构遍历方法介绍

- 广度优先，访问树结构的第n+1层前必须先访问完第n层
- 深度优先，访问完一颗子树再去访问后面的子树,访问子树的时候，先访问根再访问根的子树，成为先序遍历;先访问子树再访问根，称为后序遍历


### 广度优先遍历的实现
广度优先的思路是 维护一个队列，队列的初始值为树结构根节点组成的列表，重复取出队列中的第一个元素，进行访问相关操作，然后将其后代元素（如果有）全部追加到队列最后，直到队列为空。

```js
    function  treeHandle(data,fun){
        let arr=[...data],node
        while (node=arr.shift()) {
          fun(node)
          node.children&&node.children?.length>0&&arr.push(...node.children)
        }
        
      }
      treeHandle(tree,node=>{
        console.log(node.title)
      })
      
      //节点1
      //节点2
      //节点1-1
      //节点1-2
      //节点2-1

```


### 深度优先遍历的递归实现

后序遍历
```js
    function  treeHandle(data,fun){
        data.forEach(node => {
          node.children&&node.children?.length>0&&treeHandle(node.children,fun)// 遍历子树
          fun(node)
        });
      }
      treeHandle(tree,node=>{
        console.log(node.title)
      })

   //节点1-1
   //节点1-2
   //节点1
   //节点2-1
   //节点2
```

先序遍历
```js
    function  treeHandle(data,fun){
        data.forEach(node => {
          fun(node)
          node.children&&node.children?.length>0&&treeHandle(node.children,fun)// 遍历子树
        });
      }
      treeHandle(tree,node=>{
        console.log(node.title)
      })

   //节点1
   //节点1-1
   //节点1-2
   //节点2
   //节点2-1
```


### 深度优先循环实现

先序遍历,和广度优先循环实现类似，只是把不同的子节点追加到队列最前面
```js
   function  treeHandle(data,fun){
        let arr=[...data],node
        while (node=arr.shift()) {
          fun(node)
          node.children&&node.children?.length>0&&arr.unshift(...node.children)
        }
        
      }
      treeHandle(tree,node=>{
        console.log(node.title)
      })
```
后序遍历
```js
  function  treeHandle(data,fun){
        let node, list = [...tree], i =  0

        while (node = list[i]) {
          let childCount = node.children ? node.children.length : 0
          if (!childCount || node.children[childCount - 1] === list[i - 1]) {
              fun(node)
              i++
            } else {
              list.splice(i, 0, ...node.children)
            }
        }
      }

      treeHandle(tree,node=>{
        console.log(node.title)
      })
```




## 列表和树结构相互转换

### 列表转为树

```js
let list = [
  {
    id: '1',
    title: '节点1',
    parentId: '',
  },
  {
    id: '1-1',
    title: '节点1-1',
    parentId: '1'
  },
  {
    id: '1-2',
    title: '节点1-2',
	  parentId: '1'
  },
  {
    id: '2',
    title: '节点2',
    parentId: ''
  },
  {
    id: '2-1',
    title: '节点2-1',
  	parentId: '2'
  }
]

```
列表结构转为树结构，就是把所有非根节点放到对应父节点的chilren数组中

通过info建立id和item之间的映射，对象时间复杂度O(1)，在通过parentId与id之间关系
```js
   //  info和list的children之间是引用关系
    function listToTree(list){
        const info=list.reduce((acc,item)=>{
          item.children=[]
          acc[item.id]=item
          return acc
        },{})
        return list.filter(item=>{
          info[item.parentId]?.children.push(item)
          return !item.parentId
        })
      }



//  [
//   {
//     id: '1',
//     title: '节点1',
//     children: [
//       {
//         id: '1-1',
//         title: '节点1-1',
//         children:[]  
//       },
//       {
//         id: '1-2',
//         title: '节点1-2',
//         children:[]  
//       }
//     ]
//   },
//   {
//     id: '2',
//     title: '节点2',  
//     children: [
//       {
//         id: '2-1',
//         title: '节点2-1',
//         children:[]  
//       }
//     ]
//   },
// ]

```


### 树结构转列表结构

```js

  function treeToList (tree,result = [], level = 0) {
        tree.forEach(item=>{
          result.push(item)
          item.level=level+1
          item.children?.length&&treeToList(item.children,result,level+1)
        })
        return result
      }
```
![](https://www.hualigs.cn/image/60c96f7081b32.jpg)


### 树结构筛选

树结构过滤符合条件的节点，裁剪其他节点，如果一个节点的后代节点符合条件的话，会返回后代节点以及自己父节点。可以传入一个函数描述符合条件的节点


```js

    function treeFilter (tree, fun) {
        return tree.map(item=>({...item})).filter(node=>{
          node.children= node.children&&treeFilter(node.children,fun) // 类似后序遍历
          return fun(node)|| node.children?.length
        })
      }
     const result =  treeFilter(tree,item => item.id == '2-1')      
     console.log(result) 

    // [{
    //   id: '2',
    //   title: '节点2',
    //   children: [
    //     {
    //       id: '2-1',
    //       title: '节点2-1'
    //     }
    //   ]
    // }]
```


###  查找节点

查找节点其实就是一个遍历的过程，遍历到满足条件的节点则返回,遍历完成未找到则返回null,类似数组find
```js
  function treeFind (tree, fun) {
        for (const item of tree) {
          if (fun(item)) return item
          const res= item.children?.length&& treeFind(item.children,fun)
          if(res) return res
        }
        return null
    }

    const callback = node => node.id == '2-1'

    console.log(treeFind(tree,callback));
    // {id: "2-1", title: "节点2-1"}
```

### 查找节点路径

 回溯算法的定义
>回溯法 采用试错的思想，它尝试分步的去解决一个问题。在分步解决问题的过程中，当它通过尝试发现现有的分步答案不能得到有效的正确的解答的时候，它将取消上一步甚至是上几步的计算，再通过其它的可能的分步解答再次尝试寻找问题的答案。回溯法通常用最简单的递归方法来实现，在反复重复上述的步骤后可能出现两种情况：


> 本质上它是一种遍历算法，时间复杂度很高

- 找到一个可能存在的正确的答案
- 在尝试了所有可能的分步方法后宣告该问题没有答案


```js
 function treeFindPath (tree, fun, path = []) {
        if(!tree) return []
        for (const item of tree) {
          path.push(item.id)
          if(fun(item)) return path
          if(item.children){
            const findChildren=treeFindPath(item.children,fun,path)
            if(findChildren.length) return findChildren
          }
          path.pop()  
        }
        return []
      }

      let result = treeFindPath(tree, nod
      e => node.id === '2-1')
      console.log(result)
      // ["2", "2-1"]
```

## 查找多条节点路径

```js

  function treeFindPath (tree, func, path = [], result = []) {
      for (const data of tree) {
        path.push(data.id)
        func(data) && result.push([...path])
        data.children && treeFindPath(data.children, func, path, result)
        path.pop()
      }
      return result
    }


      let result = treeFindPath(tree, node => node.id === '2')
      console.log(result)
```










