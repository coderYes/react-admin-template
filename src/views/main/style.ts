import styled from 'styled-components'

export const MainWrapper = styled.div`
  height: 100%;
  .ant-layout {
    .sidebar-logo-container {
      position: relative;
      width: 100%;
      height: 50px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .ant-layout-header {
      position: relative;
      padding: 0;
      height: 84px;
      line-height: 84px;
      background: #ffffff;
      .navbar {
        width: 100%;
        height: 50px;
        overflow: hidden;
        position: relative;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
        .hamburger-container {
          padding: 0 15px;
          line-height: 46px;
          height: 100%;
          float: left;
          cursor: pointer;
          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
          .ant-btn > span {
            display: inline-flex;
          }
        }
        .right-menu {
          float: right;
          height: 100%;
          .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            line-height: 46px;
            color: #5a5e66;
            vertical-align: text-bottom;
          }
        }
      }
    }
    .ant-layout-content {
      box-sizing: border-box;
      padding: 20px;
      overflow-y: auto;
    }
  }
`
