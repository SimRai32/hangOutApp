import React from "react";
import { within, userEvent } from '@storybook/testing-library';
import { action } from '@storybook/addon-actions';
import Home from "../components/Home";
import { withRouter } from 'storybook-addon-react-router-v6';


export default {
  title: 'Home',
  component: Home,
  argTypes: { onClick: { action: 'clicked' } },
  decorators: [withRouter],
  parameters: {
    reactRouter: {
      routePath: '/'
    }
  }
};

const Template = () => <Home />;

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing

export const name = Template.bind({});
name.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByTestId('username'), 'SimRai32');
  //await userEvent.click(canvas.getByTestId('usernameSubmit'));
}




