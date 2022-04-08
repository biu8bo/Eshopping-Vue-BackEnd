import Config from "@/settings"
import { Notification } from 'element-ui';
export function initWebSokcet(){
    window.ws = new WebSocket(Config.webSocketUrl); 
    //申请一个WebSocket对象，参数是服务端地址，同http协议使用http://开头一样，WebSocket协议的url使用ws://开头，另外安全的WebSocket协议使用wss://开头
    window.ws.onopen = function(){
    　　//当WebSocket创建成功时，触发onopen事件
    }
    window.ws.onmessage = function(e){
    　　//当客户端收到服务端发来的消息时，触发onmessage事件，参数e.data包含server传递过来的数据
    Notification.success({
        title: '消息',
        message: e.data,
        duration: 3000
      });
    }
    window.ws.onclose = function(e){
    　　//当客户端收到服务端发送的关闭连接请求时，触发onclose事件
    Notification.success({
        title: '消息',
        message: "消息即时通讯已关闭",
        duration:3000
      });
    }
    window.ws.onerror = function(e){
    　　//如果出现连接、处理、接收、发送数据失败的时候触发onerror事件
    　 Notification.success({
        title: '消息',
        message: "消息即时通讯出错",
        duration: 3000
      });
    }
            }
export default {
    initWebSokcet
}