# 年会抽奖系统

一个简单易用的网页版年会抽奖系统，支持自定义抽奖名单、多个奖项设置，并具有动态抽奖效果和中奖记录显示功能。

## 功能特点

- 支持上传自定义抽奖名单（TXT 文件格式）
- 预设四个奖项等级（特等奖、一等奖、二等奖、三等奖）
- 动态抽奖效果展示
- 实时显示中奖记录
- 支持重置抽奖结果
- 自动排除已中奖人员
- 响应式设计，支持各种设备

## 奖项设置

- 特等奖：1名
- 一等奖：3名
- 二等奖：5名
- 三等奖：10名

## 使用说明

1. **准备名单**
   - 创建一个文本文件（.txt格式）
   - 每行输入一个参与者姓名
   - 保存文件为 UTF-8 编码

2. **上传名单**
   - 点击"上传名单文件"按钮
   - 选择准备好的 txt 文件
   - 系统会自动加载名单

3. **开始抽奖**
   - 从下拉菜单选择要抽取的奖项
   - 点击"开始抽奖"按钮开始随机展示名字
   - 再次点击按钮停止并确定中奖者
   - 中奖结果会自动记录在下方的中奖记录区域

4. **重置功能**
   - 点击"重置"按钮可以清空所有中奖记录
   - 重置后可以重新开始抽奖

## 技术实现

- 前端技术：HTML5、CSS3、JavaScript
- 页面布局：Flexbox
- 动画效果：CSS transitions
- 文件处理：FileReader API
- 随机算法：Math.random()

## 项目结构 