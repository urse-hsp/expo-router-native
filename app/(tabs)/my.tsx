import React, { useState } from 'react';
import { View, Switch, Image, StyleSheet, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';




const ProfileScreen = ({ navigation }: any) => {
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+123456789',
    avatar: 'https://a.520gexing.com/uploads/allimg/2021042109/uqaqhuvavt0.jpg', // 用户头像的URL
    interests: ['Reading', 'Traveling', 'Photography'], // 用户的兴趣爱好
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View>
          <ThemedText style={styles.name}>{user.name}</ThemedText>
          <ThemedText style={styles.email}>{user.email}</ThemedText>
          <ThemedText style={styles.phone}>{user.phone}</ThemedText>
        </View>
      </View>}>

      {/* <Switch onValueChange={toggleSwitch}
        value={isEnabled}>主题</Switch> */}

      <FlatList
        data={['Reading', 'Traveling', 'Photography', 'Cooking', 'Music']}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.interestItem,
            ]}
          >
            <ThemedText>{item}</ThemedText>
          </TouchableOpacity>
        )}
      // keyExtractor={(item) => item}
      />

      {/* 退出登录按钮 */}
      <Button title="退出登录" onPress={() => { }} />
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    color: '#555',
  },

  interestItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },


  // 
  header: {
    height: '100%',
    padding: 22,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default ProfileScreen;
