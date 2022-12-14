import React from "react";
import { action } from '@storybook/addon-actions';
import UserButton from "../components/UserButton";


export default {
  title: 'Username Button',
  component: UserButton,
};

const Template = () => <UserButton buttonName={"Submit"} onClick={action('username submitted')} test={false}/>;
export const submit = Template.bind({});
