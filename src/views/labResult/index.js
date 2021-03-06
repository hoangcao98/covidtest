/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
import './style.css'
import { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { analysisCertificateService } from '../../services/analysisCertificateCervice'
import moment from 'moment'
import QRCode from 'react-qr-code'
import { useReactToPrint } from 'react-to-print'
import { useDispatch, useSelector } from 'react-redux'
const labResultQrcode = () => {
  const [dataView, setDataView] = useState([])
  const componentRef = useRef()
  const { code, password } = useParams()
  const analysisCertificateState = useSelector(
    (state) => state.analysisCertificate
  )
  const baseURL = process.env.REACT_APP_BASE_QR_URL
  useEffect(() => {
    analysisCertificateService.qrcode(code, password).then((res) => {
      if (res.data.code === 600 && res.data.payload !== null) {
        let selectedItemsFinal = []
        const fullCustomers = res?.data?.payload?.patients
        res?.data?.payload?.patients.forEach((item) => {
          const partners = fullCustomers.filter((i) => i.uuid !== item.uuid)
          selectedItemsFinal.push({
            ...res.data.payload,
            customers: item,
            qrUrl: `${baseURL}/${res.data.payload.searchCode}/${res.data.payload.password}`,
            partners: partners,
          })
        })
        setDataView(selectedItemsFinal)
      }
    })
  }, [])
  const handlePrintTestForm = useReactToPrint({
    content: () => componentRef.current,
  })
  const printTestForm = () => {
    analysisCertificateState.selectedTestFormList.map((item) => {
      const dataUpdate = {
        patientUuids: item.patientUuids,
        agencyUuid1: item.agencyUuid1,
        testTypeUuid: item.testTypeUuid,
        state: item.state,
        printStatus: 1,
      }
      analysisCertificateService
        .update(item.uuid, dataUpdate)
        .then((res) => console.log(res))
        .catch((error) => console.log(error))
    })
    handlePrintTestForm()
  }
  return (
    <>
      <div ref={componentRef} style={{ padding: '2cm 16px' }}>
        {dataView.length > 0 ? (
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
                <></>
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
                        {item.sampleState ? '????? m???u' : 'Kh??ng ????? m???u'}
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
                      <td style={{ border: '1px solid' }}>
                        {item.labResultName}
                      </td>
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
                <p></p>
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
          })
        ) : (
          <h1>Ch??a c?? k???t qu???</h1>
        )}
      </div>
      <div className='button-wrapper'>
        <button onClick={() => printTestForm()} className='print-button'>
          In k???t qu???
        </button>
      </div>
    </>
  )
}
export default labResultQrcode
