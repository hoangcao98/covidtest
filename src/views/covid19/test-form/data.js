/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
// ** Custom Components

// ** Third Party Components
// ** Reactstrap Imports

export const statusOptions = [
  {
    label: 'Chưa đóng tiền',
    value: 'NOT_PAID',
  },
  {
    label: 'Treo công nợ',
    value: 'DEBT',
  },
  {
    label: 'Đã đóng tiền',
    value: 'PAID',
  },
  {
    label: 'Chờ lấy mẫu',
    value: 'WAITING_TAKEN_SAMPLE',
  },
  {
    label: 'Đã lấy mẫu',
    value: 'TAKEN_SAMPLE',
  },
  {
    label: 'Không đủ mẫu',
    value: 'NOT_ENOUGH_SAMPLE',
  },
  {
    label: 'Đủ mẫu',
    value: 'ENOUGH_SAMPLE',
  },
  {
    label: 'Có kết quả',
    value: 'RETURN_RESULT',
  },
  {
    label: 'Đã trả kết quả',
    value: 'COMPLETED',
  },
]
export const samplestateOptions = [
  {
    label: 'Đủ mẫu',
    value: true,
  },
  {
    label: 'Không đủ mẫu',
    value: false,
  },
]
export const disableOptions = (option, selectValue) => {
  switch (selectValue[0].value) {
    case 'NOT_PAID': {
      if (option.value === 'PAID' || option.value === 'DEBT') {
        return false
      }
      return true
    }
    case 'PAID': {
      if (option.value === 'WAITING_TAKEN_SAMPLE') {
        return false
      }
      return true
    }
    case 'DEBT': {
      if (option.value === 'PAID') {
        return false
      }
      return true
    }
    case 'WAITING_TAKEN_SAMPLE': {
      if (option.value === 'TAKEN_SAMPLE') {
        return false
      }
      return true
    }
    case 'TAKEN_SAMPLE': {
      if (
        option.value === 'ENOUGH_SAMPLE' ||
        option.value === 'NOT_ENOUGH_SAMPLE'
      ) {
        return false
      }
      return true
    }
    case 'ENOUGH_SAMPLE': {
      if (option.value === 'RETURN_RESULT') {
        return false
      }
      return true
    }
    case 'NOT_ENOUGH_SAMPLE': {
      if (option.value === 'ENOUGH_SAMPLE') {
        return false
      }
      return true
    }

    case 'RETURN_RESULT': {
      if (option.value === 'COMPLETED' || option.value === 'RETURN_RESULT') {
        return false
      }
      return true
    }
    default:
      return false
  }
}
