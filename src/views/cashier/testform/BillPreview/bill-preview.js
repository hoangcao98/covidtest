/* eslint-disable multiline-ternary */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback, useRef } from 'react'
// ** Custom Components
import { StyledBillPreview } from './style'
import './index.css'
// ** Store & Actions
// import { addUser } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import QRCode from 'react-qr-code'
import {
  refetchList,
  selectTestFormList,
} from '../../../../redux/analysisCertificate'
import { useReactToPrint } from 'react-to-print'
import moment from 'moment'
import { analysisCertificateService } from '../../../../services/analysisCertificateCervice'
const baseURL = process.env.REACT_APP_BASE_QR_URL
//Service
const BillPreview = ({ openBillPreview, toggleBillPreview }) => {
  // ** States
  const dispatch = useDispatch()
  const [dataView, setDataView] = useState([])
  const handleSidebarClosed = () => {
    dispatch(selectTestFormList([]))
  }
  const componentRef = useRef()
  const analysisCertificateState = useSelector(
    (state) => state.analysisCertificate
  )
  useEffect(() => {
    if (analysisCertificateState?.selectedTestFormList?.length > 0) {
      const listDate = analysisCertificateState?.selectedTestFormList
      const selectedItemsFinal = listDate.map((item) => {
        return {
          ...item,
          qrUrl: `${baseURL}/${item?.searchCode}/${item?.password}`,
        }
      })
      setDataView(selectedItemsFinal)
    }
  }, [analysisCertificateState?.selectedTestFormList])
  // ** Store Vars
  const handlePrintBill = useReactToPrint({
    content: () => componentRef.current,
  })
  const printBill = () => {
    analysisCertificateState?.selectedTestFormList?.map((item) => {
      const dataUpdate = {
        patientUuids: item?.patientUuids,
        agencyUuid1: item?.agencyUuid1,
        testTypeUuid: item?.testTypeUuid,
        state: 'PAID',
        printStatus: 1,
      }
      analysisCertificateService
        .update(item?.uuid, dataUpdate)
        .then((res) => console.log(res))
        .catch((error) => console.log(error))
    })
    dispatch(refetchList())
    handlePrintBill()
  }
  return (
    <StyledBillPreview
      size='lg'
      open={openBillPreview}
      title='Phi???u thu'
      headerClassName='mb-1'
      contentClassName='pt-0 pt-0'
      toggleSidebar={toggleBillPreview}
      onClosed={handleSidebarClosed}
      titleButtonFooter='In Phi???u Thu'
      onClickButtonFooter={() => printBill()}
    >
      <div
        ref={componentRef}
        style={{ padding: '2cm 16px', boxSizing: 'border-box' }}
      >
        {dataView.length > 0 &&
          dataView.map((item, index) => {
            console.log(item)
            return (
              <div id='print-me' key={index}>
                <table style={{ width: '100%', textAlign: 'center' }}>
                  <tbody>
                    <tr style={{ textAlign: 'left' }}>
                      <td>
                        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                          C??NG TY CP NGHI??N C???U KHOA H???C - X??T NGHI???M C??NG NGH???
                          CAO H???P L???C
                        </div>
                        <div style={{ fontSize: '16px' }}>
                          595 Nguy???n Ch?? Thanh, Ph?????ng ????ng Th???, Th??nh ph??? Thanh
                          H??a, t???nh Thanh H??a, Vi???t Nam
                        </div>
                        <p></p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                          Phi???u thu
                        </div>
                        <div>(Li??n 2: Giao Kh??ch H??ng)</div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        {moment().format('DD-MM-YYYY')}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <td style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        I. TH??NG TIN KH??CH H??NG
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ width: '50%', lineHeight: '1.1' }}>
                        H??? v?? t??n : <span>{item?.payerName}</span>
                      </td>
                      <td style={{ lineHeight: '1.1' }}>
                        M?? BN : <span>{item?.payer?.code}</span>
                      </td>
                      <td
                        rowSpan='6'
                        style={{
                          textAlign: 'right',
                          paddingRight: '2rem',
                          lineHeight: '1.1',
                        }}
                      >
                        <QRCode value={item?.qrUrl} size={110} />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: '50%', lineHeight: '1.1' }}>
                        Ng??y sinh :
                        {/* <span style={{ fontStyle: 'italic' }}>
                          (Birthday)
                        </span>:{' '} */}
                        <span>
                          {item?.payer?.dateOfBirth !== undefined
                            ? moment(item?.payer?.dateOfBirth).format(
                                'DD-MM-YYYY'
                              )
                            : ''}
                        </span>
                      </td>
                      <td style={{ width: '50%', lineHeight: '1.1' }}>
                        Gi???i t??nh :
                        {/* <span style={{ fontStyle: 'italic' }}>(Sex)</span>:{' '} */}
                        <span>
                          {item?.payer?.sex === 0
                            ? 'Nam'
                            : item?.payer?.sex === 1
                            ? 'N???'
                            : ''}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ lineHeight: '1.1' }}>
                        ????n v???:{item.agency}
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td style={{ lineHeight: '1.1' }}>
                        N??i ch??? ?????nh: <span>{item?.agencyName}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ lineHeight: '1.1' }}>
                        H???n tr??? KQ:&nbsp;
                        <span>
                          {moment(item?.returnTime).format('HH:mm DD-MM-YYYY')}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ lineHeight: '1.1' }}>
                        ?????a ??i???m: <span>{item?.agencyName1}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p></p>
                <p></p>
                <table style={{ width: '100%', textAlign: 'center' }}>
                  <tbody>
                    <tr style={{ fontWeight: 'bold' }}>
                      <td style={{ border: '1px solid', width: '5%' }}>STT</td>
                      <td style={{ border: '1px solid', width: '25%' }}>
                        N???i dung
                      </td>
                      <td style={{ border: '1px solid', width: '45%' }}>
                        Ghi ch??
                      </td>
                      <td style={{ border: '1px solid', width: '5%' }}>
                        ????n v??? t??nh
                      </td>
                      <td style={{ border: '1px solid', width: '20%' }}>
                        Th??nh ti???n
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{ border: '1px solid', textAlign: 'left' }}
                        colSpan='6'
                      >
                        X??t nghi???m
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: '1px solid' }}>1</td>
                      <td style={{ border: '1px solid' }}>{item?.payFor}</td>
                      <td style={{ border: '1px solid' }}>{item?.note}</td>
                      <td style={{ border: '1px solid' }}>
                        {item?.patients?.length}
                      </td>
                      <td style={{ border: '1px solid' }}>{item?.amount}</td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          border: '1px solid',
                          fontWeight: 'bold',
                          textAlign: 'left',
                        }}
                        colSpan='4'
                      >
                        T???ng c???ng
                      </td>
                      <td style={{ border: '1px solid' }}>{item?.amount}</td>
                    </tr>
                  </tbody>
                </table>
                <p></p>
                <table style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <td colSpan='5'>
                        Danh s??ch kh??ch h??ng g???m k??m : {item?.patients?.length}{' '}
                        ng?????i
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        style={{
                          border: '1px solid',
                          width: '10%',
                          fontWeight: 'bold',
                        }}
                      >
                        STT
                      </td>
                      <td
                        style={{
                          border: '1px solid',
                          width: '35%',
                          fontWeight: 'bold',
                        }}
                      >
                        B???nh nh??n
                      </td>
                      <td
                        style={{
                          border: '1px solid',
                          width: '35%',
                          fontWeight: 'bold',
                        }}
                      >
                        ?????a ch???
                      </td>
                      <td
                        style={{
                          border: '1px solid',
                          width: '20%',
                          fontWeight: 'bold',
                        }}
                      >
                        S??? ??i???n tho???i
                      </td>
                    </tr>
                    {item?.patients?.map((a, b) => {
                      return (
                        <tr key={b}>
                          <td style={{ border: '1px solid' }}>{b + 1}</td>
                          <td style={{ border: '1px solid' }}>{a.name}</td>
                          <td style={{ border: '1px solid' }}>{a.address}</td>
                          <td style={{ border: '1px solid' }}>{a.phone}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <p></p>
                <table style={{ width: '100%' }}>
                  <tbody>
                    <tr>
                      <td style={{ width: '50%' }}></td>
                      <td style={{ textAlign: 'center' }}>
                        <div
                          style={{
                            fontWeight: 'bold',
                          }}
                        >
                          Ti???n m???t: {item?.amount}
                        </div>
                        <div
                          style={{
                            fontWeight: 'bold',
                          }}
                        >
                          Thu ng??n
                        </div>
                        <div>(K??, ghi r?? h??? t??n)</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p></p>
                <p></p>
                <table style={{ width: '100%' }}>
                  <tbody>
                    <tr>
                      <td>
                        1. H??M TH?? G??P ?? ONLINE
                        <div>
                          Truy c???p https://hstc.hopluc.com ????? g??p ?? ch???t l?????ng
                        </div>
                      </td>
                      <td style={{ textAlign: 'left' }}>
                        2. H?????NG D???N TRA C???U K???T QU???
                        <div>B?????c 1: H?????ng d???n tra c???u k???t qu???</div>
                        <div>
                          B?????c 2: S??? d???ng ph???n m???m QR CODE v?? qu??t m?? QR tr??n
                          phi???u thu n??y
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p></p>
                <p></p>
                <p></p>
                <table style={{ width: '100%' }}>
                  <tbody>
                    <tr>
                      <td>
                        1. H??a ????n GTGT ch??? xu???t trong ng??y v?? th??ng tin h??a ????n
                        ???????c xu???t theo th??ng tin kh??ch h??ng khai b??o ????ng k??
                        kh??m
                        <div>
                          2. N???u c?? c??c y???u t??? d???ch t??? ho???c nghi nhi???m COVID-19,
                          ????? ngh??? KH kh??ng ra v??? tr?????c khi c?? k???t qu??? v?? vui
                          l??ng ch??? t???i khu v???c h?????ng d???n c???a nh??n vi??n y t???.
                          Li??n h??? t???ng ????i t?? v???n: 0942225095
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )
          })}
      </div>
    </StyledBillPreview>
  )
}

export default BillPreview
