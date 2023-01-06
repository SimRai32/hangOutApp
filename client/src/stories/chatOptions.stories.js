import React from "react";
import { within, userEvent } from '@storybook/testing-library';
import { withRouter } from 'storybook-addon-react-router-v6';
import ChatOptions from "../components/ChatOptions";

const data = {
  dog: {
    chatName: 'dog',
    password: 'dog',
    id: 0
  },
  cat: {
    chatName: 'cat',
    password: 'cat',
    id: 1
  },
  sad: {
    chatName: 'sad',
    password: 'sad',
    id: 2
  },
};

export default {
  title: 'Chat Options',
  component: ChatOptions,
  argTypes: { onClick: { action: 'clicked' } },
  decorators: [ withRouter ],
  parameters: {
    reactRouter: {
      routePath: '/options'
    }
  }
};

const Template = () => < ChatOptions test={ 'testing' } roomTest={ data } />;


export const noClick = Template.bind({});
export const createClick = Template.bind({});
export const createChatEmptyError = Template.bind({});
export const createChatRoomExistsError = Template.bind({});
export const createChatSuccessful = Template.bind({});
export const joinClick = Template.bind({});
export const joinChatEmptyError = Template.bind({});
export const joinChatCredError = Template.bind({});
export const joinChatSuccessful = Template.bind({});
export const joinChatList = Template.bind({});

createClick.play = async ({ canvasElement }) => {

  const canvas = within( canvasElement );
  await userEvent.click( canvas.getByTestId( 'Create Chat' ) );

};

createChatEmptyError.play = async ({ canvasElement }) => {

  const canvas = within( canvasElement );
  await userEvent.click( canvas.getByTestId( 'Create Chat' ) );
  await userEvent.click( canvas.getByText( 'Create' ) );

};

createChatRoomExistsError.play = async ({ canvasElement }) => {

  const canvas = within( canvasElement );
  await userEvent.click( canvas.getByTestId( 'Create Chat' ) );
  await userEvent.type( canvas.getByTestId( 'Chat Name' ), 'dog' );
  await userEvent.type( canvas.getByTestId( 'Password' ),  'cat' );
  await userEvent.click( canvas.getByText( 'Create' ) );

};

createChatSuccessful.play = async ({ canvasElement }) => {

  const canvas = within( canvasElement );
  await userEvent.click( canvas.getByTestId( 'Create Chat' ) );
  await userEvent.type( canvas.getByTestId( 'Chat Name' ), 'goodbye' );
  await userEvent.type( canvas.getByTestId( 'Password' ),  'hello' );
  await userEvent.click( canvas.getByText( 'Create' ) );

};

joinClick.play = async ({ canvasElement }) => {

  const canvas = within( canvasElement );
  await userEvent.click( canvas.getByTestId( 'Join Chat' ) );

};

joinChatList.play = async ({ canvasElement }) => {

  const canvas = within( canvasElement );
  await userEvent.click( canvas.getByTestId( 'Join Chat' ) );
  await userEvent.click( canvas.getByTestId( 'Chat List' ) );

};

joinChatEmptyError.play = async ({ canvasElement }) => {

  const canvas = within( canvasElement );
  await userEvent.click( canvas.getByTestId( 'Join Chat' ) );
  await userEvent.click( canvas.getByText( 'Join' ) );

};

joinChatCredError.play = async ({ canvasElement }) => {

  const canvas = within( canvasElement );
  await userEvent.click( canvas.getByTestId( 'Join Chat' ) );
  await userEvent.type( canvas.getByTestId( 'Chat Name' ), 'cat' );
  await userEvent.type( canvas.getByTestId( 'Password' ),  'dog' );
  await userEvent.click( canvas.getByText( 'Join' ) );

};

joinChatSuccessful.play = async ({ canvasElement }) => {

  const canvas = within( canvasElement );
  await userEvent.click( canvas.getByTestId( 'Join Chat' ) );
  await userEvent.type( canvas.getByTestId( 'Chat Name' ), 'cat' );
  await userEvent.type( canvas.getByTestId( 'Password' ),  'cat' );
  await userEvent.click( canvas.getByText( 'Join' ) );
  
};