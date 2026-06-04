import type { BadgeProps, AvatarProps, TagProps } from 'element-plus'
import type { IconProps } from '@iconify/vue'

export interface NotificationProps extends Partial<BadgeProps> {
  icon?: string
  iconColor?: string
  iconSize?: number
  color?: string
  size?: number
  scale?: number
}

export interface MessageListItem {
  title: string
  avatar?: AvatarProps
  content?: string
  time?: string
  tagProps?: TagProps
  tag?: string
}

export interface NoticeMessageListOptions {
  name: string
  title: string
  contents?: MessageListItem[]
}

export interface NoticeActionItem {
  title: string
  icon?: IconProps
  click: () => void
}

export interface NoticeMessageListProps {
  lists: NoticeMessageListOptions[]
  actions: NoticeActionItem[]
}

export interface NoticeProps extends NoticeMessageListProps, NotificationProps {}
