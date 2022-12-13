import React from "react";
import { within, userEvent } from '@storybook/testing-library';
import { action } from '@storybook/addon-actions';
import UserButton from "../components/UserButton";
import { withRouter } from 'storybook-addon-react-router-v6';
import { Button } from "@mui/material";


export default {
  title: 'Username Button',
  component: UserButton,
  argTypes: { onClick: { action: 'clicked' } },
  decorators: [withRouter],
  parameters: {
    reactRouter: {
      routePath: '/'
    }
  }
};

const Template = () => <UserButton buttonName={"Submit"} onClick={action('username submitted')} test={false}/>;
export const submit = Template.bind({});
