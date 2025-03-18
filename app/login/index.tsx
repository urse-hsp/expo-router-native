import { StyleSheet } from 'react-native'
import PagesScrollView from '@/components/PagesScrollView'
import React, { useContext, useState } from 'react'
import { AppContext } from '@/models/app'
import { Form, Input, Button } from '@ant-design/react-native'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { APP_NAME } from '@/constants/config'
import { useRouter, Href, useRootNavigationState } from 'expo-router'
import useCountdown from '@/hooks/useCountdown'
import {
  useTopicLogin,
  useSendEmailVerification,
  useRegister,
} from '@/services/login'
import Toast from 'react-native-toast-message'

const typeDic = {
  login: '登录',
  create: '注册',
}

const passrules = [
  {
    min: 6,
    message: '密码最少6位',
  },
  {
    required: true,
  },
]

export default function LoginScreen(props: any) {
  const type: 'login' | 'create' = props.type || 'login'
  const { appInfo, setAppData }: any = useContext(AppContext)
  const [form] = Form.useForm()
  const router = useRouter()
  const navigationState = useRootNavigationState()
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { time, start, isActive } = useCountdown(10)

  const { trigger: logintrigger } = useTopicLogin()
  const { trigger: sendEmailVerification } = useSendEmailVerification()
  const { trigger: register } = useRegister()

  const onSubmit = () => {
    form.submit()
  }

  const handleBackPress = (path: Href = '/') => {
    if (navigationState.index > 0) {
      // 如果可以返回，则执行返回操作
      router.back()
    } else {
      // 如果不能返回，则重新定位到指定页面
      router.replace(path) // 替换为你想要重新定位的页面路径
    }
  }

  const onFinish = async (values: any) => {
    if (type === 'login') {
      // 登录
      try {
        const res = await logintrigger(values)
        if (res?.code === 0) {
          setAppData(res.data, () => {
            handleBackPress()
          })
        }
      } catch (error) {}
    } else {
      // 注册
      try {
        const res = await register(values)
        if (res?.code === 0) {
          Toast.show({
            type: 'success',
            text1: '注册成功',
            onShow() {
              setTimeout(() => handleBackPress('/login'), 150)
            },
          })
        }
      } catch (error) {}
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  // 验证码
  const handleSendEmailVerification = async () => {
    try {
      const email = form.getFieldValue('email')
      if (!email) {
        form.validateFields(['email'])
        return
      }

      const res = await sendEmailVerification({ email })
      if (res?.code === 0) {
        start()
        Toast.show({
          type: 'success',
          text1: '发送成功',
        })
      }
    } catch (error) {
      console.error('Failed to send email verification:', error)
    }
  }

  const Tiele = typeDic[type]

  const props_ = {
    ...props,
    options: {
      title: Tiele,
      headerShown: true,
    },
  }

  const initialValues =
    type === 'login'
      ? { email: 'hsp_email@163.com', password: '123456' }
      : {
          email: '',
          password: '',
          password2: '',
          verification_code: '',
          nick_name: '',
        }

  return (
    <PagesScrollView options={props_.options}>
      <ThemedText style={styles.title}>
        欢迎你, {Tiele}
        {APP_NAME}
      </ThemedText>

      <Form
        name="vertical"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={initialValues}
        layout="vertical"
        style={styles.form}
        styles={{
          Body: {
            // borderBottomWidth: 0, // 去掉下划线
            borderWidth: 0, // 确保没有边框
          },
          BodyBottomLine: {
            display: 'none',
          },
        }}
      >
        {type === 'create' && (
          <Form.Item
            label="用户昵称"
            name="nick_name"
            rules={[
              {
                required: true,
              },
            ]}
            required={false}
            style={styles.formItem}
            styles={FormItemStyles}
          >
            <Input placeholder="请输入昵称" style={styles.formItemInput} />
          </Form.Item>
        )}

        <Form.Item
          label="邮箱"
          name="email"
          validateDebounce={700}
          rules={[
            {
              pattern:
                /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
              message: '邮箱格式不正确',
            },
            {
              max: 50,
              message: '邮箱不得超过50字符',
            },
            {
              required: true,
            },
          ]}
          required={false}
          style={styles.formItem}
          styles={FormItemStyles}
        >
          <Input placeholder="请输入邮箱" style={styles.formItemInput} />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          validateDebounce={700}
          rules={passrules}
          required={false}
          style={styles.formItem}
          styles={FormItemStyles}
        >
          <Input
            placeholder="请输入密码"
            style={styles.formItemInput}
            onChangeText={(value) => {
              setShowConfirmPassword(!!value)
            }}
          />
        </Form.Item>

        {type === 'create' && showConfirmPassword && (
          <>
            <Form.Item
              label="确认密码"
              name="password2"
              validateDebounce={700}
              rules={[
                ...passrules,
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('两次输入的密码不一致'))
                  },
                }),
              ]}
              required={false}
              style={styles.formItem}
              styles={FormItemStyles}
            >
              <Input placeholder="请输入密码" style={styles.formItemInput} />
            </Form.Item>

            <Form.Item
              label={
                <ThemedView
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <ThemedText>验证码</ThemedText>
                  <>
                    {isActive === false ? (
                      <ThemedText onPress={handleSendEmailVerification}>
                        获取验证码
                      </ThemedText>
                    ) : (
                      <ThemedText>{time}秒</ThemedText>
                    )}
                  </>
                </ThemedView>
              }
              name="verification_code"
              rules={[
                {
                  min: 6,
                  message: '验证码最少6位',
                },
                {
                  required: true,
                  message: '请输入验证码',
                },
              ]}
              required={false}
              style={styles.formItem}
              styles={FormItemStyles}
              labelStyle={{
                width: '100%',
              }}
            >
              <Input placeholder="请输入验证码" style={styles.formItemInput} />
            </Form.Item>
          </>
        )}

        <Form.Item style={styles.formItem} styles={FormItemStyles}>
          {type === 'login' && (
            <ThemedView
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
            >
              <ThemedText
                onPress={() => {
                  router.push('/login/create')
                }}
              >
                去注册
              </ThemedText>
            </ThemedView>
          )}

          <Button type="primary" onPress={onSubmit} style={styles.btn}>
            {Tiele}
          </Button>
        </Form.Item>
      </Form>
    </PagesScrollView>
  )
}

export const FormItemStyles = {
  Line: {
    borderWidth: 0,
  },

  Content: {
    paddingLeft: 13,
  },
}

export const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 20,
  },
  form: {
    backgroundColor: 'transparent',
  },

  formItem: {
    paddingLeft: 0,
    backgroundColor: 'transparent',
    // height: 93,
  },
  formItemInput: {
    marginTop: 20,
    backgroundColor: '#252827',
    height: 50,
    padding: 10,
    borderRadius: 10,
  },
  btn: {
    borderRadius: 30,
    backgroundColor:
      'background: linear-gradient(52deg, rgb(145, 144, 243) 0%, rgb(250, 127, 178) 100%);',
    marginTop: 20,
  },
})
