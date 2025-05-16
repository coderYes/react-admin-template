import styled from 'styled-components'

export const DataSheetGridWrapper = styled.div<{
  $dark: boolean
  $darkBgContainer: string
}>`
  .dsg-cell,
  .dsg-add-row {
    background-color: ${({ $dark, $darkBgContainer }) => ($dark ? $darkBgContainer : '#ffffff')};
  }

  .dsg-cell-header-active,
  .dsg-cell-gutter-active,
  .dsg-add-row,
  .dsg-container {
    color: ${({ $dark, $darkBgContainer }) => ($dark ? 'rgb(157, 166, 171)' : $darkBgContainer)};
  }
`
