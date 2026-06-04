import type { BadgeProps, AvatarProps, TagProps, TabsPaneContext } from 'element-plus'
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
  title: string
  contents?: MessageListItem[]
}

export interface NoticeActionItem extends IconProps {
  title: string
  color?: string
  style?: CSSProperties
  click: () => void
}

export interface NoticeMessageListProps {
  lists: NoticeMessageListOptions[]
  actions: NoticeActionItem[]
  wrapClass?: string
  wrapStyle?: CSSProperties
}

export interface NoticeMessageListEmits {
  avatarClick: [avatar?: AvatarProps]
  itemClick: [item: MessageListItem]
  tabClick: [pane: TabsPaneContext, event: Event]
}

export interface NoticeProps extends NoticeMessageListProps, NotificationProps {}
