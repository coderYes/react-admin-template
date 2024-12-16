/** Header config */
interface IAdminLayoutHeaderConfig {
  /**
   * Header height
   *
   * @default 56px
   */
  headerHeight?: number
}

/** Tab config */
interface IAdminLayoutTabConfig {
  /**
   * Tab height
   *
   * @default 48px
   */
  tabHeight?: number
}

/** Sider config */
interface IAdminLayoutSiderConfig {
  /**
   * Sider collapse status
   *
   * @default false
   */
  siderCollapse?: boolean
  /**
   * Sider width when collapse is false
   *
   * @default '220px'
   */
  siderWidth?: number
  /**
   * Sider width when collapse is true
   *
   * @default '64px'
   */
  siderCollapsedWidth?: number
}

/** Admin layout props */
export interface IAdminLayoutProps
  extends IAdminLayoutHeaderConfig,
    IAdminLayoutTabConfig,
    IAdminLayoutSiderConfig {
  /**
   * The common class of the layout
   *
   * Is can be used to configure the transition animation
   *
   * @default 'transition-all-300'
   */
  commonClass?: string
  /**
   * The max z-index of the layout
   *
   * The z-index of Header,Tab,Sider and Footer will not exceed this value
   */
  maxZIndex?: number
}

export type LayoutCssVarsProps = Pick<
  IAdminLayoutProps,
  'headerHeight' | 'tabHeight' | 'siderWidth' | 'siderCollapsedWidth'
> & {
  headerZIndex?: number
  tabZIndex?: number
  siderZIndex?: number
}

type Kebab<S extends string> = S extends Uncapitalize<S> ? S : `-${Uncapitalize<S>}`

type KebabCase<S extends string> = S extends `${infer Start}${infer End}`
  ? `${Uncapitalize<Start>}${KebabCase<Kebab<End>>}`
  : S

type Prefix = '--ill-'
export type LayoutCssVars = {
  [K in keyof LayoutCssVarsProps as `${Prefix}${KebabCase<K>}`]: string | number
}
