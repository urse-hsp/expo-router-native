import { Link } from 'expo-router'
import { StyleSheet, Text, View, Platform } from 'react-native'
import Animated, { SlideInDown } from 'react-native-reanimated'
import { StatusBar } from 'expo-status-bar'
import { Form, Input, Button } from '@ant-design/react-native'
import { FormItemStyles, styles, wrapperStyle } from '@/app/login'
import { pay } from 'react-native-alipay'

import { Alert } from 'react-native'
import React, { useState } from 'react'

export default function Modal() {
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)
  // 请求后端获取订单信息
  const getOrderInfoFromServer = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://your-api.com/get-alipay-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: '1234567890', // 订单 ID
        }),
      })

      const data = await response.json()
      setLoading(false)

      if (data.success) {
        return data.orderInfo // 返回后端签名后的 `orderInfo`
      } else {
        Alert.alert('获取订单失败', data.message)
        return null
      }
    } catch (error) {
      setLoading(false)
      Alert.alert('网络错误', '无法连接到服务器')
      return null
    }
  }

  // 调用支付宝支付
  const handleAlipay = async () => {
    // const orderInfo = `
    //   app_id=9021000146609633
    //   &method=alipay.trade.app.pay
    //   &charset=utf-8
    //   &sign_type=RSA2
    //   &timestamp=2025-03-11 10:00:00
    //   &version=1.0
    //   &biz_content={"out_trade_no":"daniel88AAAA000032333389","total_amount":1,"subject":"测试商品","product_code":"QUICK_MSECURITY_PAY"}
    //   &sign=xxx
    // `.replace(/\s+/g, '') // 去除空格
    const orderInfo = {
      app_id: '9021000146609633',
      method: 'alipay.trade.app.pay',
      format: 'json',
      charset: 'utf-8',
      sign_type: 'RSA2',
      timestamp: '2025-03-12 12:00:00',
      version: '1.0',
      biz_content: JSON.stringify({
        out_trade_no: 'daniel88AAAA000032333329',
        total_amount: 1,
        subject: '测试商品',
        product_code: 'QUICK_MSECURITY_PAY',
      }),
      sign: 'your_generated_sign', // 需要使用私钥生成签名
    }

    if (!orderInfo) return
    console.log('Alipay SDK:', pay)

    try {
      const result = await pay(orderInfo)
      console.log(result, 'result')

      // 解析支付宝支付结果
      if (result.resultStatus === '9000') {
        Alert.alert('支付成功', '订单已支付')
      } else if (result.resultStatus === '6001') {
        Alert.alert('支付取消', '用户取消了支付')
      } else {
        Alert.alert('支付失败', result.memo || '支付未完成')
      }
    } catch (error: any) {
      Alert.alert('支付异常', error.message || '请重试')
      console.log('支付异常', error.message || '请重试')
    }
  }

  const onSubmit = () => {
    form.submit()
  }

  const onFinish = async (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <View>
      <Form
        name="vertical"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          email: '',
        }}
        layout="vertical"
        style={styles.form}
        styles={{
          Body: {
            borderWidth: 0, // 确保没有边框
          },
          BodyBottomLine: {
            display: 'none',
          },
        }}
      >
        <Form.Item
          label="地址"
          name="email"
          validateDebounce={700}
          // rules={[
          //   {
          //     required: true,
          //   },
          // ]}
          required={false}
          style={styles.formItem}
          styles={FormItemStyles}
          wrapperStyle={wrapperStyle}
        >
          <Input placeholder="请输入地址" style={styles.formItemInput} />
        </Form.Item>

        <Form.Item style={styles.formItem} styles={FormItemStyles}>
          <Button type="primary" onPress={onSubmit} style={styles.btn}>
            兑换
          </Button>
        </Form.Item>
      </Form>
      <Button onPress={handleAlipay}>支付宝支付 (沙箱测试)</Button>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}
