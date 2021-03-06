/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback, useRef } from 'react'
// ** Custom Components
import { StyledTestFormPreview } from './style'
import './index.css'
// ** Store & Actions
// import { addUser } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import QRCode from 'react-qr-code'
import { selectTestFormList } from '../../../redux/analysisCertificate'
import { useReactToPrint } from 'react-to-print'
import moment from 'moment'
// import { analysisCertificateService } from '../../../services/analysisCertificateCervice'

//Service
const TestFormPreview = ({ openTestFormPreview, toggleTestFormPreview }) => {
  // ** States
  const dispatch = useDispatch()
  const baseURL = process.env.REACT_APP_BASE_QR_URL
  const [dataView, setDataView] = useState([])
  const handleSidebarClosed = () => {
    dispatch(selectTestFormList([]))
  }
  const componentRef = useRef()
  const analysisCertificateState = useSelector(
    (state) => state.analysisCertificate
  )
  useEffect(() => {
    if (analysisCertificateState.selectedTestFormList.length > 0) {
      const listData = analysisCertificateState.selectedTestFormList
      let selectedItemsFinal = []
      listData.forEach((item) => {
        const fullCustomers = item.patients
        item.patients.forEach((it) => {
          const partners = fullCustomers.filter((itx) => itx.uuid !== it.uuid)
          let isMix = partners.length > 0
          selectedItemsFinal.push({
            ...item,
            customers: it,
            qrUrl: `${baseURL}/${item.searchCode}/${item.password}`,
            partners: partners,
            isMix: isMix,
          })
        })
      })
      setDataView(selectedItemsFinal)
    }
  }, [analysisCertificateState.selectedTestFormList])
  // ** Store Vars
  const handlePrintTestForm = useReactToPrint({
    content: () => componentRef.current,
  })
  const printTestForm = () => {
    handlePrintTestForm()
  }
  return (
    <StyledTestFormPreview
      size='lg'
      open={openTestFormPreview}
      title='K???t qu??? x??t nghi???m'
      headerClassName='mb-1'
      contentClassName='pt-0 pt-0'
      toggleSidebar={toggleTestFormPreview}
      onClosed={handleSidebarClosed}
      titleButtonFooter='In k???t qu???'
      onClickButtonFooter={() => printTestForm()}
    >
      <div
        ref={componentRef}
        style={{ padding: '2cm 16px', boxSizing: 'border-box' }}
      >
        {dataView.length > 0 &&
          dataView.map((item, index) => {
            return (
              <div id='print-me' key={index}>
                <table style={{ width: '100%', textAlign: 'center' }}>
                  <tbody>
                    <tr>
                      <td style={{ fontSize: '24px', fontWeight: 'bold' }}>
                        Phi???u tr??? k???t qu??? x??t nghi???m
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: '24px', fontWeight: 'bold' }}>
                        TESTING RESULT REPORT
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        M?? phi???u: {item.code}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <td style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        I. TH??NG TIN B???NH NH??N(PATIENT INFORMATION)
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ width: '50%' }}>
                        H??? v?? t??n
                        <span style={{ fontStyle: 'italic' }}>
                          (F.Name)
                        </span>: <span>{item.customers.name}</span>
                      </td>
                      <td>
                        M?? BN
                        <span style={{ fontStyle: 'italic' }}>
                          (Patient code)
                        </span>
                        : <span>{item.customers.code}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Ng??y sinh
                        <span style={{ fontStyle: 'italic' }}>
                          (Birthday)
                        </span>:{' '}
                        <span>
                          {moment(item.customers.dateOfBirth).format(
                            'DD-MM-YYYY'
                          )}
                        </span>
                      </td>
                      <td>
                        Gi???i t??nh
                        <span style={{ fontStyle: 'italic' }}>(Sex)</span>:{' '}
                        <span>{item.customers.sex === 0 ? 'Nam' : 'N???'}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        CMND/CCCD
                        <span style={{ fontStyle: 'italic' }}>
                          (Personal Identity Number/Passport)
                        </span>
                        : <span>{item.customers.identityNumber}</span>
                      </td>
                      <td
                        rowSpan='5'
                        style={{ textAlign: 'right', paddingRight: '2rem' }}
                      >
                        <QRCode value={item.qrUrl} size={120} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        ?????a ch???
                        <span style={{ fontStyle: 'italic' }}>
                          (Address)
                        </span>: <span>{item.customers.address}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Qu???c t???ch
                        <span style={{ fontStyle: 'italic' }}>
                          (Nationality)
                        </span>{' '}
                        :<span>{item.customers.nationality}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        ????n v??? l???y m???u
                        <span style={{ fontStyle: 'italic' }}>
                          (Sample collecting unit)
                        </span>
                        : <span>{item.agencyName2}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Y??u c???u x??t nghi???m
                        <span style={{ fontStyle: 'italic' }}>
                          (Required test)
                        </span>
                        : <span>{item.testTypeName}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p></p>
                <table style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <td>?????i t?????ng g???p c??ng :</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ border: '1px solid' }}>
                        T??n<div>(Partner's name)</div>
                      </td>
                      <td style={{ border: '1px solid' }}>
                        ?????a ch???<div>(Partner's address)</div>
                      </td>
                    </tr>
                    {item.partners?.map((a, b) => {
                      return (
                        <tr key={b}>
                          <td style={{ border: '1px solid' }}>{a.name}</td>
                          <td style={{ border: '1px solid' }}>{a.address}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <p
                  style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    width: '100%',
                  }}
                >
                  II. TH??NG TIN B???NH PH???M(SAMPLE INFORMATION)
                </p>
                <table style={{ width: '100%' }}>
                  <tbody style={{ textAlign: 'center' }}>
                    <tr>
                      <td style={{ border: '1px solid', width: '20%' }}>
                        M???u<div style={{ fontStyle: 'italic' }}>(Sample)</div>
                      </td>
                      <td style={{ border: '1px solid', width: '20%' }}>
                        L???n l???y m???u
                        <div style={{ fontStyle: 'italic' }}>
                          (Time of sampling)
                        </div>
                      </td>
                      <td style={{ border: '1px solid', width: '20%' }}>
                        Th???i gian l???y m???u
                        <div style={{ fontStyle: 'italic' }}>
                          (Date of sampling)
                        </div>
                      </td>
                      <td style={{ border: '1px solid', width: '20%' }}>
                        Th???i gian nh???n m???u
                        <div style={{ fontStyle: 'italic' }}>
                          (Date of receipt)
                        </div>
                      </td>
                      <td style={{ border: '1px solid', width: '20%' }}>
                        T??nh tr???ng m???u
                        <div style={{ fontStyle: 'italic' }}>
                          (Sample status):
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: '1px solid', textAlign: 'left' }}>
                        ??? {item.sampleTypeName}
                      </td>
                      <td style={{ border: '1px solid' }}>
                        {item.sampleNumber}
                      </td>
                      <td style={{ border: '1px solid' }}>
                        {moment(item.takeSampleTime).format('HH:mm DD-MM-YYYY')}
                      </td>
                      <td style={{ border: '1px solid' }}>
                        {moment(item.receiveSampleTime).format(
                          'HH:mm DD-MM-YYYY'
                        )}
                      </td>
                      <td style={{ border: '1px solid' }}>
                        {item.sampleState ? '?????t' : 'Kh??ng ?????t'}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p
                  style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    width: '100%',
                  }}
                >
                  II. K???T QU??? X??T NGHI???M(TEST RESULT)
                </p>
                <table style={{ width: '100%' }}>
                  <tbody style={{ textAlign: 'center', border: '1px solid' }}>
                    <tr>
                      <td style={{ border: '1px solid', width: '20%' }}>
                        M???u<div style={{ fontStyle: 'italic' }}>(Sample)</div>
                      </td>
                      <td style={{ border: '1px solid', width: '20%' }}>
                        L???n XN
                        <div style={{ fontStyle: 'italic' }}>
                          (Time of testing)
                        </div>
                      </td>
                      <td style={{ border: '1px solid', width: '20%' }}>
                        K??? thu???t
                        <div style={{ fontStyle: 'italic' }}>
                          (Testing method)
                        </div>
                      </td>
                      <td style={{ border: '1px solid', width: '20%' }}>
                        Ng??y th???c hi???n
                        <div style={{ fontStyle: 'italic' }}>
                          (Testing date)
                        </div>
                      </td>
                      <td style={{ border: '1px solid', width: '20%' }}>
                        K???t qu???
                        <div style={{ fontStyle: 'italic' }}>(Result)</div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: '1px solid', textAlign: 'left' }}>
                        ??? {item.sampleTypeName}
                      </td>
                      <td style={{ border: '1px solid' }}>{item.testNumber}</td>
                      <td style={{ border: '1px solid' }}>
                        {item.testTypeName}
                      </td>
                      <td style={{ border: '1px solid' }}>
                        {moment(item.performTime).format('HH:mm DD-MM-YYYY')}
                      </td>
                      <td style={{ border: '1px solid' }}>{item.diagnosis}</td>
                    </tr>
                    <tr style={{ textAlign: 'left', border: '1px solid' }}>
                      <td colSpan='5'>
                        <div style={{ marginBottom: '0px' }}>
                          K???T LU???N: <span>{item.diagnosis}</span>
                        </div>
                        <div>
                          (Conclusion): <span>{item.diagnosisEng}</span>
                        </div>
                      </td>
                    </tr>
                    <tr style={{ textAlign: 'left', border: '1px solid' }}>
                      <td colSpan='5'>
                        Th???i gian tr??? k???t qu??? (Time release of result):{' '}
                        <span>
                          {moment(item.returnTime).format('HH:mm DD-MM-YYYY')}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div>
                  ** K???t qu??? x??t nghi???m ch??? c?? gi?? tr??? t???i th???i ??i???m l???y m???u /
                  The test result is only valid from time of sample collection
                </div>
                <table style={{ width: '100%' }}>
                  <tbody>
                    <tr>
                      <td>
                        S??? ti???n: <span>{item.amount}</span> VN??
                        <div>Ng?????i th???c hi???n(Tester): {item.staffName2}</div>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        Thanh H??a, ng??y {moment().format('DD')} th??ng{' '}
                        {moment().format('MM')} n??m {moment().format('YYYY')}
                        <div>TL.TR?????NG PH??NG</div>
                        <div>(HEAD OF DEPARTMENT)</div>
                        <div>(???? k??)</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )
          })}
      </div>
    </StyledTestFormPreview>
  )
}

export default TestFormPreview
