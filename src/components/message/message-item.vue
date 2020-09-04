<template>
    <div class="message-wrapper">
        <div class="content-wrapper">
            <message-text
                    v-if="message.type === TIM.TYPES.MSG_TEXT"
                    :isMine="isMine"
                    :payload="message.payload"
                    :message="message"
            />
        </div>
    </div>
</template>

<script>
import MessageText from './message-text'
  export default {
    name: 'MessageItem',
    props: {
      message: {
        type: Object,
        required: true
      }
    },
    components: {
      MessageText
    },
    data() {
      return {
        renderDom: []
      }
    },
    computed: {


      isMine() {
        // console.log(this.currentUserProfile, this.currentConversation);
        return this.message.flow === 'out'
      },
      messagePosition() {
        if (
          ['TIMGroupTipElem', 'TIMGroupSystemNoticeElem'].includes(
            this.message.type
          )
        ) {
          return 'position-center'
        }
        if (this.message.isRevoked) { // 撤回消息
          return 'position-center'
        }
        if (this.isMine) {
          return 'position-right'
        } else {
          return 'position-left'
        }
      },
    },
    methods: {
    }
  }
</script>
