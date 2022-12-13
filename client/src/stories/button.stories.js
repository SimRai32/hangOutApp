import React from "react";
import { action } from '@storybook/addon-actions';
import UserButton from "../components/UserButton";
import { withRouter } from 'storybook-addon-react-router-v6';


export default {
  title: 'Username Button',
  component: UserButton,
  decorators: [withRouter],
  parameters: {
    actions: {
      handles: ['mouseover', 'click .btn'],
    },
    reactRouter: {
      routePath: '/'
    }
  }
};

const Template = () => <UserButton buttonName={"Submit"} onClick={action('username submitted')} test={false}/>;
export const submit = Template.bind({});
