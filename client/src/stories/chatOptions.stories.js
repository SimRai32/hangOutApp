import React from "react";
import { within, userEvent } from '@storybook/testing-library';
import chatOptions from "../components/CreateChat";
import { withRouter } from 'storybook-addon-react-router-v6';
import ChatOptions from "../components/ChatOptions";

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

const Template = () => < ChatOptions />;


export const noClick = Template.bind({});
export const createClick = Template.bind({});
export const joinClick = Template.bind({});
createClick.play = async ({ canvasElement }) => {
  const canvas = within( canvasElement );
  await userEvent.click( canvas.getByTestId( 'Create Chat' ) );
}
joinClick.play = async ({ canvasElement }) => {
  const canvas = within( canvasElement );
  await userEvent.click( canvas.getByTestId( 'Join Chat' ) );
}