<template>
  <div class="login-box">
    <a-form
      :model="form"
      :wrapperCol="{ span: 24 }"
      @finish="onSubmit"
      ref="form"
      class="login-form"
    >
      <div class="third-platform">
        <div class="third-title">第三方登录：</div>
        <div class="third-list">
          <WechatOutlined class="icon wechat" />
          <TwitterOutlined class="icon twitter" />
          <QqOutlined class="icon qq" />
        </div>
      </div>
      <a-divider>Or</a-divider>
      <a-form-item :required="true" name="username">
        <a-input
          v-model:value="form.username"
          autocomplete="new-username"
          placeholder="请输入用户名或邮箱: admin"
          class="login-input"
        />
      </a-form-item>
      <a-form-item :required="true" name="password">
        <a-input
          v-model:value="form.password"
          autocomplete="new-password"
          placeholder="请输入登录密码: 888888"
          class="login-input"
          type="password"
        />
      </a-form-item>
      <a-button
        @click="validate"
        htmlType="submit"
        class="login-button"
        type="primary"
        :loading="loading"
      >
        登录
      </a-button>
      <a-divider></a-divider>
      <a-typography class="terms">
        登录即代表您同意我们的
        <a-typography-text strong>用户条款</a-typography-text
        >、<a-typography-text strong>数据使用协议</a-typography-text>、以及
        <a-typography-text strong>Cookie使用协议</a-typography-text>。
      </a-typography>
    </a-form>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { LoginForm } from '@/types';

  export interface LoginFormProps {
    username: string;
    password: string;
  }

  export default defineComponent({
    name: 'LoginBox',
    emits: ['login'],
    props: {
      loading: Boolean,
    },
    data() {
      return {
        form: {
          username: undefined,
          password: undefined,
        },
      };
    },
    methods: {
      validate() {
        // @ts-ignore
        this.$refs.form.validateFields();
      },
      onSubmit(values: LoginForm) {
        this.$emit('login', values);
      },
    },
  });
</script>
<style lang="less" scoped>
  .login-box {
    .login-form {
      height: fit-content;
      width: 460px;
      @apply border-border pl-10 pr-10 p-6 rounded-base text-text bg-content;
      .third-platform {
        .third-title {
          @apply text-left mb-md;
          font-size: 16px;
        }
        .third-list {
          @apply flex;
          .icon {
            @apply text-gray-400 flex-1 hover:text-primary-500 cursor-pointer;
            font-size: 28px;
            &.wechat {
              @apply hover:text-green-600;
            }
            &.twitter {
              @apply hover:text-blue-400;
            }
            &.qq {
              @apply hover:text-red-600;
            }
          }
        }
      }
      .login-input,
      .login-button {
        @apply rounded-base;
        margin-top: 16px;
        height: 40px;
        width: 100%;
      }
      .terms {
      }
    }
  }
</style>
