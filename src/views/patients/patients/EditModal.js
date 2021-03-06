/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
// ** React Imports
// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import {
  User,
  Mail,
  Calendar,
  Lock,
  X,
  Compass,
  Smartphone,
} from 'react-feather'

// ** Reactstrap Imports
import {
  Modal,
  Input,
  Label,
  Button,
  ModalHeader,
  ModalBody,
  InputGroup,
  InputGroupText,
  Form,
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { patientService } from '../../../services/patientService'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import moment from 'moment'
import Select from 'react-select'
import classnames from 'classnames'

const defaultValues = {
  name: '',
  phone: '',
  address: '',
  email: 'tupa@hstc.com',
  identityNumber: '1334343434',
  dateOfBirth: moment().format('DD-MM-YYYY'),
  sex: 0,
}
const EditModal = ({ open, item, handleModal, setRefreshTable }) => {
  // ** State
  // ** Custom close btn
  const CloseBtn = (
    <X className='cursor-pointer' size={15} onClick={handleModal} />
  )
  const genderOptions = [
    {
      value: 0,
      label: 'Nam',
    },
    {
      value: 1,
      label: 'Nữ',
    },
  ]
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues })
  useEffect(() => {
    const dataForm = {
      name: item?.name,
      phone: item?.phone,
      address: item?.address,
      email: item?.email,
      identityNumber: item?.identityNumber,
      dateOfBirth: moment(item?.dateOfBirth).format('DD-MM-YYYY'),
      sex: genderOptions.find((e) => item?.sex === e.value),
    }
    for (const key in dataForm) {
      setValue(key, dataForm[key])
    }
  }, [item])

  const onHandleSubmit = (data) => {
    patientService
      .update(item?.uuid, {
        code: item?.code,
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        identityNumber: data?.identityNumber,
        address: data?.address,
        dateOfBirth: moment(data?.dateOfBirth).format('DD-MM-YYYY'),
        sex: data?.sex?.value,
      })
      .then((r) => {
        handleModal()
        setRefreshTable()
      })
  }

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader
        className='mb-1'
        toggle={handleModal}
        close={CloseBtn}
        tag='div'
      >
        <h5 className='modal-title'>Sửa bệnh nhân</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <Form onSubmit={handleSubmit(onHandleSubmit)}>
          <div className='mb-1'>
            <Label className='form-label' for='name'>
              Tên
            </Label>
            <InputGroup>
              <InputGroupText>
                <User size={15} />
              </InputGroupText>
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name='name'
                control={control}
                render={({ field }) => (
                  <Input
                    id='name'
                    placeholder='Phùng Anh Tú'
                    invalid={errors.name && true}
                    {...field}
                  />
                )}
              />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='phone'>
              Điện thoại
            </Label>
            <InputGroup>
              <InputGroupText>
                <Smartphone size={15} />
              </InputGroupText>
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name='phone'
                control={control}
                render={({ field }) => (
                  <Input
                    id='phone'
                    placeholder='0942225095'
                    invalid={errors.phone && true}
                    {...field}
                  />
                )}
              />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='address'>
              Địa chỉ
            </Label>
            <InputGroup>
              <InputGroupText>
                <User size={15} />
              </InputGroupText>
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name='address'
                control={control}
                render={({ field }) => (
                  <Input
                    id='address'
                    placeholder='146 Đội Cấn'
                    invalid={errors.address && true}
                    {...field}
                  />
                )}
              />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='email'>
              Email
            </Label>
            <InputGroup>
              <InputGroupText>
                <Mail size={15} />
              </InputGroupText>
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name='email'
                control={control}
                render={({ field }) => (
                  <Input
                    id='email'
                    placeholder='tupa@hstc.com.vn'
                    invalid={errors.email && true}
                    {...field}
                  />
                )}
              />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='identityNumber'>
              CMND/CCCD
            </Label>
            <InputGroup>
              <InputGroupText>
                <Mail size={15} />
              </InputGroupText>
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name='identityNumber'
                control={control}
                render={({ field }) => (
                  <Input
                    id='identityNumber'
                    placeholder='1435434344545'
                    invalid={errors.identityNumber && true}
                    {...field}
                  />
                )}
              />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='dateOfBirth'>
              Ngày sinh
            </Label>
            <InputGroup>
              <InputGroupText>
                <Lock size={15} />
              </InputGroupText>
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name='dateOfBirth'
                control={control}
                render={({ field }) => (
                  <Input
                    id='dateOfBirth'
                    className='date-picker'
                    name='dateOfBirth'
                    placeholder='Ngày sinh'
                    invalid={errors.dateOfBirth && true}
                    {...field}
                  />
                )}
              />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='gender'>
              Giới tính
            </Label>
            <InputGroup>
              <InputGroupText>
                <Lock size={15} />
              </InputGroupText>
              <Controller
                rules={
                  {
                    // required: true,
                  }
                }
                name='sex'
                control={control}
                render={({ field }) => (
                  // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                  <Select
                    isClearable={false}
                    classNamePrefix='select'
                    options={genderOptions}
                    className={classnames('react-select', {
                      'is-invalid': errors.sex,
                    })}
                    {...field}
                  />
                )}
              />
            </InputGroup>
          </div>
          <Button type='submit' className='me-1' color='primary'>
            Submit
          </Button>
          <Button color='secondary' onClick={handleModal} outline>
            Cancel
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default EditModal
