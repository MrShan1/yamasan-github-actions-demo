import type { BadgeProps } from 'element-plus'

export interface NotificationProps extends Partial<BadgeProps> {
  icon?: string
  iconColor?: string
  iconSize?: number
  color?: string
  size?: number
  scale?: number
}
