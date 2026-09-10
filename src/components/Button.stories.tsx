import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, userEvent, within } from 'storybook/test';

import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Action principale',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Action secondaire',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Action contour',
  },
};

export const Interactive: Story = {
  args: {
    variant: 'primary',
    children: 'Cliquez ici',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /Cliquez ici/i });
    await expect(button).toBeInTheDocument();
    await userEvent.click(button);
  },
};
