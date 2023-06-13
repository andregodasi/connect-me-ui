import React from 'react';
import { ConfigProvider } from 'antd';
import 'dayjs/locale/pt-br';
import locale from 'antd/locale/pt_BR';

const fontFamily =
  'Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji';
const colorBgHover = 'rgb(241 245 249/1)';
const borderRadius = 9999;
const colorPrimary = '#2563eb';

const withTheme = (node: React.ReactNode) => (
  <>
    <ConfigProvider
      locale={locale}
      theme={{
        token: {
          wireframe: false,
          colorPrimary,
          borderRadius: 8,
          fontFamily,
        },
        components: {
          Button: {
            colorBgTextHover: colorBgHover,
            controlHeight: 32,
            controlHeightLG: 40,
          },
          DatePicker: {
            borderRadius: 6,
            fontFamily,
            controlItemBgHover: colorBgHover,
            borderRadiusLG: 6,
            colorBgContainer: '#F9FAFB',
          },
          Pagination: {
            borderRadius,
            colorBgTextHover: colorBgHover,
            fontFamily,
          },
          Steps: {
            fontFamily,
          },
          Radio: {
            fontFamily,
          },
          Popover: {
            fontFamily,
          },
          Timeline: {
            fontFamily,
          },
          Modal: {
            fontFamily,
          },
          Typography: {
            fontFamilyCode: fontFamily,
          },
          Breadcrumb: {
            fontFamily,
          },
          Menu: {
            fontFamily,
          },
          Cascader: {
            fontFamily,
          },
          Checkbox: {
            fontFamily,
          },
          Form: {
            fontFamily,
            borderRadius: 6,
            borderRadiusLG: 6,
          },
          Input: {
            colorPrimaryHover: colorPrimary,
            fontFamily,
            borderRadius: 6,
            borderRadiusLG: 6,
            colorBgContainer: '#F9FAFB',
          },
          InputNumber: {
            colorPrimaryHover: colorPrimary,
            fontFamily,
            borderRadius: 6,
            borderRadiusLG: 6,
          },
          Select: {
            colorPrimaryHover: colorPrimary,
            fontFamily,
            borderRadius: 6,
            borderRadiusLG: 6,
          },
          Slider: {
            fontFamily,
          },
          Switch: {
            fontFamily,
          },
          TreeSelect: {
            fontFamily,
          },
          Upload: {
            colorPrimaryHover: colorPrimary,
            fontFamily,
          },
          Badge: {
            fontFamily,
          },
          Calendar: {
            fontFamily,
          },
          Card: {
            fontFamily,
          },
          List: {
            fontFamily,
          },
          Table: {
            fontFamily,
          },
          Tag: {
            fontFamily,
          },
          Anchor: {
            fontFamily,
          },
        },
      }}
    >
      {node}
    </ConfigProvider>
  </>
);

export default withTheme;
