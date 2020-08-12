##前言
在 `yaml`文件中,只能使用`空格`来划分意群(`层级关系`):

- 以`短线`开头的是定一个`数组`
- 以`标识符`紧接着`冒号:`和衣蛾`空格`开始的,是定一个`对象`

## 基本语法
- 大小写敏感
- 使用缩进表示层级关系
- 缩进不允许使用tab，只允许空格
- 缩进的空格数不重要，只要相同层级的元素左对齐即可
- '#'表示注释

## 纯量
单个的不可再分的值:`字符串`,`布尔值`,`整数`,`浮点数`,`Null`,`时间`,`日期`.

_**纯量不能单独存在,必须依附于对象或者数组**_.
```yaml
boolean: 
    - TRUE  #true,True都可以
    - FALSE  #false，False都可以
float:
    - 3.14
    - 6.8523015e+5  #可以使用科学计数法
int:
    - 123
    - 0b1010_0111_0100_1010_1110    #二进制表示
null:
    nodeName: 'node'
    parent: ~  #使用~表示null
string:
    - 哈哈
    - 'Hello world'  #可以使用双引号或者单引号包裹特殊字符
    - newline
      newline2    #字符串可以拆成多行，每一行会被转化成一个空格
date:
    - 2018-02-17    #日期必须使用ISO 8601格式，即yyyy-MM-dd
datetime: 
    -  2018-02-17T15:02:31+08:00    #时间使用ISO 8601格式，时间和日期之间使用T连接，最后使用+代表时区
```

## 对象
对象具有属性名和属性值,在`yaml`中,以`键值对`的形式出现.
## 数组
一组按次序排列的值，又称为序列（`sequence`） / 列表（`list`）.

短线 `-`+`空格`定义数组的一个元素.

```
- A
- B
- C
```
`["A","B","C"]`

YAML 支持多维数组，可以使用行内表示:
```
key: [value1, value2]
```
```json
{"key":["value1","value2"]}
```
数据结构的子成员是一个数组，则可以在该项下面缩进一个空格:
```
-
 - A
 - B
 - C
```
`[["A","B","C"]]`

## 引用和锚点

```yaml
defaults: &defaults
  adapter:  postgres
  host:     localhost

development:
  database: myapp_development
  <<: *defaults

test:
  database: myapp_test
  <<: *defaults
```
相当于:
```yaml
defaults:
  adapter:  postgres
  host:     localhost

development:
  database: myapp_development
  adapter:  postgres
  host:     localhost

test:
  database: myapp_test
  adapter:  postgres
  host:     localhost
```
`&` 用来建立锚点（defaults），`<<`  表示合并到当前数据，`*` 用来引用锚点。

下面是另一个例子:
```yaml
- &showell Steve 
- Clark 
- Brian 
- Oren 
- *showell 
```
转为 JavaScript 代码如下:
`[ 'Steve', 'Clark', 'Brian', 'Oren', 'Steve' ]`