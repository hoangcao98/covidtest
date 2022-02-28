// ** React Imports
import {useState} from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import {User, Mail, Calendar, Lock, X, Compass, Smartphone} from 'react-feather'

// ** Reactstrap Imports
import {Modal, Input, Label, Button, ModalHeader, ModalBody, InputGroup, InputGroupText} from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import {patientService} from "../../../services/patientService"
import moment from "moment"

const EditModal = ({open, item, handleModal, setRefreshTable}) => {
    console.log('item:', item)
    // ** State
    const [name, setName] = useState(item?.name)
    const [phone, setPhone] = useState(item?.phone)
    const [address, setAddress] = useState(item?.address)
    const [email, setEmail] = useState(item?.email)
    const [identityNumber, setIdentityNumber] = useState(item?.identityNumber)
    const [picker, setPicker] = useState(item?.dateOfBirth)
    // ** Custom close btn
    const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal}/>
    const handleSubmit = () => {
        console.log('handleSubmit:', name, email, address, phone, identityNumber, picker)
        patientService.update(item?.uuid, {
            code: item.code,
            name,
            email,
            phone,
            identityNumber,
            address,
            dateOfBirth: picker ? moment(Date(picker)).format('DD-MM-YYYY') : null
        }).then(r => {
            console.log('handleSubmit:response:', r)
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
            <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
                <h5 className='modal-title'>Edit Record</h5>
            </ModalHeader>
            <ModalBody className='flex-grow-1'>
                <div className='mb-1'>
                    <Label className='form-label' for='name'>
                        Tên
                    </Label>
                    <InputGroup>
                        <InputGroupText>
                            <User size={15}/>
                        </InputGroupText>
                        <Input id='name'
                               defaultValue={item?.name}
                               onChange={e => setName(e.target.value)}/>
                    </InputGroup>
                </div>
                <div className='mb-1'>
                    <Label className='form-label' for='phone'>
                        Điện thoại
                    </Label>
                    <InputGroup>
                        <InputGroupText>
                            <Smartphone size={15}/>
                        </InputGroupText>
                        <Input id='number' placeholder=''
                               defaultValue={item?.phone}
                               onChange={e => setPhone(e.target.value)}/>
                    </InputGroup>
                </div>
                <div className='mb-1'>
                    <Label className='form-label' for='address'>
                        Địa chỉ
                    </Label>
                    <InputGroup>
                        <InputGroupText>
                            <User size={15}/>
                        </InputGroupText>
                        <Input id='address' placeholder='146 Đội Cấn'
                               defaultValue={item?.address}
                               onChange={e => setAddress(e.target.value)}/>
                    </InputGroup>
                </div>
                <div className='mb-1'>
                    <Label className='form-label' for='email'>
                        Email
                    </Label>
                    <InputGroup>
                        <InputGroupText>
                            <Mail size={15}/>
                        </InputGroupText>
                        <Input id='email' placeholder='tupa@hstc.com.vn'
                               defaultValue={item?.email}
                               onChange={e => setEmail(e.target.value)}/>
                    </InputGroup>
                </div>
                <div className='mb-1'>
                    <Label className='form-label' for='identityNumber'>
                        CMND/CCCD
                    </Label>
                    <InputGroup>
                        <InputGroupText>
                            <Mail size={15}/>
                        </InputGroupText>
                        <Input id='identityNumber' placeholder='1435434344545'
                               defaultValue={item?.identityNumber}
                               onChange={e => setIdentityNumber(e.target.value)}/>
                    </InputGroup>
                </div>
                <div className='mb-1'>
                    <Label className='form-label' for='dateOfBirth'>
                        Ngày sinh
                    </Label>
                    <InputGroup>
                        <InputGroupText>
                            <Lock size={15}/>
                        </InputGroupText>
                        <Flatpickr
                            value={item?.dateOfBirth}
                            id='hf-picker'
                            className='form-control'
                            onChange={date => setPicker(date)}
                            options={{
                                altInput: true,
                                altFormat: 'F j, Y',
                                dateFormat: 'Y-m-d',
                                defaultDate: [item?.dateOfBirth]
                            }}
                        />
                    </InputGroup>
                </div>
                <div className='mb-1'>
                    <Label className='form-label' for='gender'>
                        Giới tính
                    </Label>
                    <InputGroup>
                        <InputGroupText>
                            <Lock size={15}/>
                        </InputGroupText>

                    </InputGroup>
                </div>
                <Button className='me-1' color='primary' onClick={handleSubmit}>
                    Submit
                </Button>
                <Button color='secondary' onClick={handleModal} outline>
                    Cancel
                </Button>
            </ModalBody>
        </Modal>
    )
}

export default EditModal