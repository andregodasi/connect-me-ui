import React from 'react';
import { ConfigProvider } from 'antd';

const fontFamily =
  'Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji';
const colorBgHover = 'rgb(241 245 249/1)';
const borderRadius = 9999;
const colorPrimary = '#2563eb';

const withTheme = (node: JSX.Element) => (
  <>
    <ConfigProvider
      theme={{
        token: {
          wireframe: false,
          colorPrimary: colorPrimary,
          borderRadius: 8,
          fontFamily: fontFamily,
        },
        components: {
          Button: {
            colorBgTextHover: colorBgHover,
            controlHeight: 32,
            controlHeightLG: 40,
          },
          DatePicker: {
            borderRadius: 6,
            fontFamily: fontFamily,
            controlItemBgHover: colorBgHover,
            borderRadiusLG: 6,
          },
          Pagination: {
            borderRadius: borderRadius,
            colorBgTextHover: colorBgHover,
            fontFamily: fontFamily,
          },
          Steps: {
            fontFamily: fontFamily,
          },
          Radio: {
            fontFamily: fontFamily,
          },
          Popover: {
            fontFamily: fontFamily,
          },
          Timeline: {
            fontFamily: fontFamily,
          },
          Modal: {
            fontFamily: fontFamily,
          },
          Typography: {
            fontFamilyCode: fontFamily,
          },
          Breadcrumb: {
            fontFamily: fontFamily,
          },
          Menu: {
            fontFamily: fontFamily,
          },
          Cascader: {
            fontFamily: fontFamily,
          },
          Checkbox: {
            fontFamily: fontFamily,
          },
          Form: {
            fontFamily: fontFamily,
            borderRadius: 6,
            borderRadiusLG: 6,
          },
          Input: {
            colorPrimaryHover: colorPrimary,
            fontFamily: fontFamily,
            borderRadius: 6,
            borderRadiusLG: 6,
          },
          InputNumber: {
            colorPrimaryHover: colorPrimary,
            fontFamily: fontFamily,
            borderRadius: 6,
            borderRadiusLG: 6,
          },
          Select: {
            colorPrimaryHover: colorPrimary,
            fontFamily: fontFamily,
            borderRadius: 6,
            borderRadiusLG: 6,
          },
          Slider: {
            fontFamily: fontFamily,
          },
          Switch: {
            fontFamily: fontFamily,
          },
          TreeSelect: {
            fontFamily: fontFamily,
          },
          Upload: {
            colorPrimaryHover: colorPrimary,
            fontFamily: fontFamily,
          },
          Badge: {
            fontFamily: fontFamily,
          },
          Calendar: {
            fontFamily: fontFamily,
          },
          Card: {
            fontFamily: fontFamily,
          },
          List: {
            fontFamily: fontFamily,
          },
          Table: {
            fontFamily: fontFamily,
          },
          Tag: {
            fontFamily: fontFamily,
          },
          Anchor: {
            fontFamily: fontFamily,
          },
        },
      }}
    >
      {node}
    </ConfigProvider>
  </>
);

export default withTheme;
