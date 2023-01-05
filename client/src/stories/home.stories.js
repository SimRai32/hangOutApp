import React from "react";
import { within, userEvent } from '@storybook/testing-library';
import Home from "../components/Home";
import { withRouter } from 'storybook-addon-react-router-v6';


export default {
  title: 'Home',
  component: Home,
  argTypes: { onClick: { action: 'clicked' } },
  decorators: [ withRouter ],
  parameters: {
    reactRouter: {
      routePath: '/'
    }
  }
};

const Template = () => < Home  test={ "testing" } />;


export const noName = Template.bind({});
export const name = Template.bind({});
export const nameError = Template.bind({});
name.play = async ({ canvasElement }) => {
  const canvas = within( canvasElement );
  await userEvent.type( canvas.getByLabelText( 'Username' ), 'SimRai32' );
}

nameError.play = async ({ canvasElement }) => {
  const canvas = within( canvasElement );
  await userEvent.click( canvas.getByTestId( 'Confirm' ) );
}





