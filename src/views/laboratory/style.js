import styled from 'styled-components'
import Sidebar from '../components/sidebar'
import { Card } from 'reactstrap'

export const StyledCard = styled(Card)`
  .add-new-test-form {
    margin-left: 1rem;
  }

  .react-select {
    width: 90%;

    .select__menu .select__menu-list .select__option {
      color: #fff;
    }

    .select__menu .select__menu-list .select__option--is-disabled {
      color: #848e9c;
    }

    .select__menu .select__menu-list .select__option--is-selected,
    .select__menu .select__menu-list .select__option--is-focused {
      color: #fff;
    }
  }

  .ant-table {
    color: #848e9c;
    background-color: transparent;
    font-size: 12px;
    font-weight: 400;

    .ant-table-container {
      border: none;
      min-height: 300px;

      .ant-table-thead > tr > th {
        position: relative;
        color: inherit;
        font-weight: 500;
        text-align: center;
        background: transparent;
        padding: 0;
        border-bottom: 1px solid #3b4253;
      }

      .ant-table-tbody > tr {
        .ant-table-cell-fix-right {
          z-index: 1;
        }
      }

      .ant-table-tbody > tr.ant-table-row:hover > td,
      .ant-table-tbody > tr > td.ant-table-cell-row-hover {
        background: #3b4253;
      }

      .ant-table-tbody > tr > td {
        border-bottom: none;
        padding: 4px 0px;

        .white-color {
          color: #ffffff;
        }
      }

      .ant-table-tbody {
        .ant-table-placeholder {
          .ant-empty-normal {
            color: #ffffff;
          }

          &:hover {
            .ant-table-cell {
              background: #3b4253;
            }
          }
        }
      }

      .ant-table-tbody {
        td.ant-table-column-sort {
          background: #283046;
        }
      }

      .ant-table-tbody > tr.ant-table-row-selected > td {
        background: #3b4253;
      }
    }
  }

  .ant-pagination {
    .ant-pagination-prev,
    .ant-pagination-next,
    .ant-pagination-item {
      height: 25px;
      line-height: 22px;
      min-width: 24px;

      a {
        background-color: transparent;
        /* color: #; */
      }
    }

    .ant-pagination-item-active {
      /* background: #7367f0; */
      border-color: #ffffff;

      a {
        color: #f0b90b !important;
      }
    }

    .ant-pagination-prev > button,
    .ant-pagination-next > button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      color: #7367f0;
    }
  }

  .ant-table-cell-scrollbar {
    box-shadow: none;
  }

  .ant-table-cell-fix-right {
    background-color: transparent;
  }

  .select-action {
    z-index: 9999;
  }

  .print-test-form {
    margin-right: 1rem;
  }

  .pagination {
    margin: 2rem 1rem;
    float: right;
  }
  .ant-table-expanded-row {
    background: #292e39;
    color: #f0f0f0;
    td {
      background: #292e39 !important;
    }
  }
`
export const StyledExpander = styled.table`
  thead {
    text-align: center;
    font-weight: bold;
    tr {
      td {
        width: 20%;
        border: 1px solid;
      }
    }
  }
  /* background: #ccc; */
  .link-to-history {
    color: #f0f0f0;
  }
  tbody {
    text-align: center;
  }
`
export const StyledFilterList = styled(Card)`
  .select-filter {
    width: 100%;

    .select__menu {
      z-index: 2;
    }
  }
  .ant-picker {
    background: transparent;
    border: 1px solid #404656;
    color: #7367f0;
    border-radius: 4px;
    .ant-picker-suffix {
      color: #7367f0;
    }
  }
  .ant-picker-input > input {
    color: #fff;
  }
`
export const StyledTestFormUploadCSV = styled(Sidebar)`
  @media (min-width: 768px) {
    width: 80vw !important;
  }

  .patients {
    height: 50vh;

    .patient {
      display: flex;
      justify-content: left;
      align-items: center;
      border: 1px solid whitesmoke;

      &-item {
        width: 8%;
      }
    }
  }
`
