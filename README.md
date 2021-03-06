# 小象垃圾分类小程序从开始到结束
> 一年前写的，发生了很多事情，所以没有发出去，前几天看到深圳要实行垃圾分类了，突然想到这个，写都写了，就发吧；

github地址：https://github.com/NSGUF/xiaoxiang

## 1、前言
> 之前看了个github上一个垃圾分类的小程序，觉得挺有意思的，现在国家正在推进垃圾分类的制度，将在2020年底前很多省都会实行；所以提前看看分类也是可以的哈；
这个小程序功能简单，但是其实主要就是这个数据比较难搞，看到了https://github.com/qi19901212/Garbage这里有个数据，我就跟着也做了一个，本来想直接fork的，
但是因为每个人的写法都不太一样，改别人的代码其实还没有自己重新写快，所以就直接重新建立了个项目；

## 2、云开发
> 云开发确实是给前端程序员的福利噢，只需要注册个人账号，就可以使用微信的云开发，常用的后端操作：数据库（NoSql），文件存储，云函数，增强了前端的能力；基本上我们搞个账号可以免费玩一下；

参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)


## 3、文件夹
* cloudfunctions 云函数
* database 数据库数据
* miniprogram 小程序代码

## 4、数据库设计
> 创建以下集合，然后将项目目录中database中的数据集classify、examineCollection、product导入对应集合中  
classify：垃圾类别信息  
commit：用户帮忙上传的数据库里没有的垃圾信息    
product：所有的垃圾信息   
examineCollection： 趣味测试题  
user：用户基本信息  

## 5、思路
> app.js中获取openId,然后使用前端去操作数据库,原本我觉得云函数就是操作数据库的,所以先把所有需要的业务逻辑都封装到云函数里面,后来发现,好像云函数的调用次数是有限制的,而前端操作却没有次数限制,所以又改成只有获取openId和_id才掉云函数(或者其他开放接口);


## 6、显示
> 已经在线上发布，可以查看；
![搜索](https://github.com/NSGUF/xiaoxiang/tree/master/images/search.png)  

![首页](https://github.com/NSGUF/xiaoxiang/tree/master/images/home.jpg)  

![测试](https://github.com/NSGUF/xiaoxiang/tree/master/images/task.jpg)  

![任务](https://github.com/NSGUF/xiaoxiang/tree/master/images/my.jpg)



## 最后：遇到过的问题
* 前端操作取不到数据（数据库的集合可能没开权限）
> 操作如下: 云开发->数据库->选中对应的数据集->权限设置->所有用户可读写
* 前端操作单个update,doc传的是_id，不是id；
