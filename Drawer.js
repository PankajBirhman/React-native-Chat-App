
import React from 'react'
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer'
import A from './Dashboard';
import { View, Image, TouchableOpacity } from 'react-native';

import Chat from './chat';
import ManageUser from './ManageUser';
import ManageDoc from './ManageDoc';
import profile from './profile';


const CreateDrawer = createDrawerNavigator();
const getData=JSON.parse(localStorage.getItem('currentUser'));


export default function Drawer() {

	return (
		
			<CreateDrawer.Navigator initialRouteName="Dashboard">
				
				
				<CreateDrawer.Screen name="Dashboard" component={A} />
				<CreateDrawer.Screen name="Profile" component={profile} />
				<CreateDrawer.Screen name="groupChat" component={Chat} />
				<CreateDrawer.Screen name='ManageUser' component={ManageUser} />
				<CreateDrawer.Screen name='ManageDoc' component={ManageDoc} />
			</CreateDrawer.Navigator>


	);

};