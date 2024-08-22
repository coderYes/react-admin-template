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
    .custom-scroll-bar {
      width: 100%;
      height: calc(100vh - 50px);
    }
    .ant-menu-root {
      /* height: calc(100vh - 50px);
      overflow-y: auto;
      box-sizing: border-box;
      padding-bottom: 20px; */
    }
    .ant-layout-header {
      height: auto;
      line-height: normal;
      position: relative;
      padding: 0;
      background: #ffffff;
      overflow: hidden;
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
      .tabs {
        box-sizing: border-box;
        padding: 2px 2px 0;
        .ant-tabs {
          height: 40px;
        }
        .ant-tabs-nav {
          margin: 0;
        }
        .ant-tabs-content-holder {
          display: none;
        }
        .ant-tabs-tab-active {
          border-bottom-color: #f0f0f0;
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
