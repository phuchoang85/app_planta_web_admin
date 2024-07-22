import { useEffect, useState } from 'react'
import '../Product/popup.css'
import { Button } from 'react-bootstrap'
import CatalogApi from '../../api/CatalogApi'

const InsertAndUpdate = (props) => {
  const { setformUpdate, setshowPopup, reload, formUpdate } = props
  const [showaddPrototy, setshowaddPrototy] = useState(false);
  const [form, setform] = useState({
    title: formUpdate?.title || '',
    prototy: formUpdate?.prototy?.length > 0 ? formUpdate?.properties : [],
    titlePrototy: ''
  })

  console.log(formUpdate)

  const submit =async () => {
    if (formUpdate?._id) {
      await update()
    } else {
      await  addCategory()
    }
  }

  const update =async () => {
    const body = {
      title: form.title,
      manUpdated: 'phuc',
      prototy: form.prototy
    }

    const result = await CatalogApi.updatecatalog(body,formUpdate._id);
    if (result.status) {
      setshowPopup(false)
    }
    reload();
  } 

  const addCategory = async () => {
    const body = {
      title: form.title,
      manUpdated: 'phuc',
      prototy: form.prototy
    }

    const result = await CatalogApi.addCatalog(body);
    if (result.status) {
      setshowPopup(false)
    }
    reload();
  }


  const addPrototy = () => {
    let trungten = false;

    form.prototy.map(ele => {
      if (ele === form.titlePrototy) {
        trungten = true;
      }
    })
    if (!form.titlePrototy)
      trungten = true;

    if (trungten) {
      console.log('lỗi')
    } else {
      setform(prev => (
        {
          ...prev,
          prototy: [...form.prototy, form.titlePrototy],
          titlePrototy: ''
        }
      ))
    }
  }

  console.log(form)

  const removePrototy = (item) => {
    let rePrototy;
    if (item?._id) {
      rePrototy = form.prototy.map(ele => {
        if (ele._id == item._id) {
          return { ...ele, isExist: !ele.isExist }
        }

        return { ...ele }
      })

    } else {
      rePrototy = form.prototy.filter(ele => ele.toString() !== item.toString())
    }

    setform(prev => ({
      ...prev,
      prototy: rePrototy
    }))

  }

  const handleTxt = (e) => {
    setform(prev => (
      {
        ...prev,
        [e.target.name]: e.target.value
      }
    ))
  }

  return (
    <div
      onClick={() => {
        setshowPopup(false);
        setformUpdate({})
      }}
      className="containerPopup">
      <div
        onClick={(e) => { e.stopPropagation(); }}
        className="popup-content containerInsidePopup">

        <div className="mb-3 mt-3">
          <label className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter title catalog"
            value={form.title}
            name="title"
            onChange={handleTxt}
          />
        </div>

        <div className="mb-3 mt-3">
          <label className="form-label">Prototy:</label>
          <div>
            {form &&
              form?.prototy?.map((ele) => {
                return (
                  <div key={ele._id || ele} style={{ position: 'relative', width: 'fit-content', }}>
                    <h5>{ele.title || ele}</h5>
                    <img onClick={() => { removePrototy(ele) }} style={{ width: 10, height: 10, position: 'absolute', top: 0, right: -10 }}
                      src={!ele._id ? 'https://cdn-icons-png.flaticon.com/512/1828/1828665.png' :
                        ele.isExist ? 'https://cdn-icons-png.flaticon.com/512/1828/1828665.png' :
                          'https://cdn-icons-png.flaticon.com/512/1828/1828819.png'} />
                  </div>
                )
              })
            }
            <div style={{ flexDirection: 'row', display: 'flex' }}>
              <Button onClick={() => { setshowaddPrototy(!showaddPrototy) }}>
                <img className='image-icon' src={showaddPrototy ? '	https://cdn-icons-png.flaticon.com/512/43/43625.png' : 'https://cdn-icons-png.flaticon.com/512/748/748113.png'} alt='add proty' />
              </Button>
              {
                showaddPrototy &&
                <div style={{ flexDirection: 'row', display: 'flex' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter title prototy"
                    value={form.titlePrototy}
                    name="titlePrototy"
                    onChange={handleTxt}
                  />
                  <Button onClick={addPrototy}>add</Button>
                </div>
              }
            </div>

          </div>
        </div>

        <Button onClick={submit}>Save </Button>
      </div>
    </div>
  )
}

export default InsertAndUpdate