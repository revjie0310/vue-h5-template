<!-- home -->
<template>
    <div class="test-container">
        <div class="warpper">
            <div class="list">
                <message-item v-for="message in messageList" :key="message.ID" :message="message"/>
            </div>
        </div>
    </div>
</template>

<script>
import mytim from '../../utils/Tim/tim'
import MessageItem from '../../components/message/message-item'


  export default {
  data(){
    return {
      userID: 'user6',
      userSig:'',
      messageList:[],
      nextReqMessageID:'',
      conversationID:'C2Cuser2'
    }
  },
    components: {
      MessageItem
    },
  mounted() {
    var userSig = window.genTestUserSig('user6')
    this.userSig = userSig.userSig
    // 初始化监听器
    this.initListener()
  },
  methods:{
    initListener() {
      // 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
      mytim.on(this.TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this)
      // SDK NOT READT
      mytim.on(this.TIM.EVENT.SDK_NOT_READY, this.onReadyStateUpdate, this)
      // 被踢出
      // mytim.on(TIM.EVENT.KICKED_OUT, this.onKickOut)
      // SDK内部出错
      // mytim.on(TIM.EVENT.ERROR, this.onError)
      // 收到新消息
      mytim.on(this.TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage)
      // 会话列表更新
      // mytim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, this.onUpdateConversationList)
      // 群组列表更新
      // mytim.on(TIM.EVENT.GROUP_LIST_UPDATED, this.onUpdateGroupList)
      // 网络监测
      // mytim.on(TIM.EVENT.NET_STATE_CHANGE, this.onNetStateChange)
      // 已读回执
      // mytim.on(TIM.EVENT.MESSAGE_READ_BY_PEER, this.onMessageReadByPeer)
      // 开始登录
      mytim.login({userID:this.userID , userSig: this.userSig});

    },
    onReceiveMessage({ data: messageList }) {
      var _this = this;
      console.log(_this.messageList)
      console.log(messageList)
      if (Array.isArray(messageList)) {
        // 筛选出当前会话的消息
        const result = messageList.filter(item => item.conversationID === _this.conversationID)
        _this.messageList = _this.messageList.concat(result)
      } else if (data.conversationID === _this.conversationID) {
        _this.messageList = _this.messageList.concat(messageList)
      }
      // _this.messageList = [...messageList,_this.messageList]
        console.log(_this.messageList);
    },

    onReadyStateUpdate({ name }) {
      var _this = this;
      const isSDKReady = name === this.TIM.EVENT.SDK_READY ? true : false
      if(isSDKReady){
        // 打开某个会话时，第一次拉取消息列表
        let promise = mytim.getMessageList({conversationID:this.conversationID, count: 15});
        promise.then(function(imResponse) {
          const messageList = imResponse.data.messageList; // 消息列表。
          _this.messageList = messageList
          _this.nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
          const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
        });
      }
    },
  }
}


</script>
