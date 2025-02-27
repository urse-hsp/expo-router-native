import { StyleSheet } from 'react-native';
import PagesScrollView from '@/components/PagesScrollView';
import React, { useContext } from 'react';
import { AppContext } from '@/models/app';
import { useTopicDetails, useTopicDetailsTrigger } from '@/services/login'
import {
  Form,
  Input,
  Button,
  Radio,
  Flex as Row,
} from '@ant-design/react-native'


export default function LoginScreen() {
  const { appInfo, toggleApp }: any = useContext(AppContext);
  const { data, loading } = useTopicDetails()
  const { loading: loading_1, trigger } = useTopicDetailsTrigger()
  const [form] = Form.useForm()

  const onSubmit = () => {
    form.submit()
  }

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const pickerRef = React.useRef(null)

  return <PagesScrollView options={{
    title: '登录',
    headerShown: true
  }}>
    <Form
      // name="basic"
      // form={form}
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      // initialValues={{
      //   doorNumber: '',
      //   username: '',
      //   phoneNumber: '',
      //   isDefault: false,
      // }}
      renderHeader="水平布局菜单">
      <Form.Item
        label="收货人"
        name="username"
        extra={
          <Form.Item name="gender" noStyle>
            <Radio.Group>
              <Row>
                <Radio value={1}>先生</Radio>
                <Radio value={2}>女士</Radio>
              </Row>
            </Radio.Group>
          </Form.Item>
        }>
        <Input placeholder="请输入收货人姓名" />
      </Form.Item>

      <Form.Item
        label="手机号"
        name="phoneNumber"
        hasFeedback
        validateDebounce={500}
        rules={[{ pattern: /^1[3456789]\d{9}$/ }, { required: true }]}>
        <Input type="number" placeholder="请输入手机号" />
      </Form.Item>
    </Form>


    <Button onPress={() => {
      toggleApp(appInfo+1)
    }}>models数据管理测试:{appInfo}</Button>
    <Button onPress={() => {
      try {
        trigger?.()

      } catch (error) {

      }
    }}>接口测试</Button>
  </PagesScrollView>
}

const styles = StyleSheet.create({
  // headerImage: {
  //   color: '#808080',
  //   bottom: -90,
  //   left: -35,
  //   position: 'absolute',
  // },
  // titleContainer: {
  //   flexDirection: 'row',
  //   gap: 8,
  // },
});