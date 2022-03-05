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
import moment from 'moment'
import Select from 'react-select'
import classnames from 'classnames'

const defaultValues = {
  name: 'Phùng Anh Tú',
  phone: '09444148485',
  address: '',
  email: 'tupa@hstc.com.vn',
  identityNumber: '1234343434343',
  dateOfBirth: moment().format('DD-MM-YYYY'),
  sex: 0,
}
const AddNewModal = ({ open, handleModal, setRefreshTable }) => {
  // ** State
  // ** Custom close btn
  const CloseBtn = (
    <X className='cursor-pointer' size={15} onClick={handleModal} />
  )
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues })
  const onHandleSubmit = (data) => {
    // console.log('handleSubmit:', data, name, email, address, phone, identityNumber, picker)
    patientService
      .create({
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        identityNumber: data?.identityNumber,
        address: data?.address,
        dateOfBirth: data?.dateOfBirth,
        sex: data?.sex?.value,
      })
      .then((r) => {
        console.log('handleSubmit:response:', r)
        handleModal()
        setRefreshTable()
      })
  }

  const genderOptions = [
    {
      value: 0,
      label: 'Name',
    },
    {
      value: 1,
      label: 'Nữ',
    },
  ]
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
        <h5 className='modal-title'>Edit Record</h5>
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
          <Button className='me-1' color='primary'>
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

export default AddNewModal
