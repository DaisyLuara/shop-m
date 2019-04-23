import React, { Component } from 'react'
import { List, TextareaItem, ImagePicker, Toast } from 'antd-mobile'
import {
  saveKeyToService,
  getQiniuToken,
  saveImgToQiniu
} from '../../../../../../api/upload/upload'
import { saveFeedback } from '../../../../../../api/feedback/feedback'
import './FeedbackSave.scss'
// @ts-ignore 没有ts.d文件
import { createForm } from 'rc-form'

class FeedbackSave extends Component<any> {
  state = {
    files: [],
    photo_media_ids: [],
    qiniuToken: ''
  }
  _isMounted = false
  componentDidMount() {
    this._isMounted = true
  }
  componentWillUnmount() {
    this._isMounted = false
  }

  qiniuToken = async () => {
    let res = await getQiniuToken()
    if (this._isMounted) {
      this.setState({
        qiniuToken: res
      })
    }
  }

  onChange = (files: Array<any>, type: any, index: any) => {
    const { photo_media_ids } = this.state
    let media_ids: any = photo_media_ids
    if (type === 'add') {
      let length = files.length
      let size = files[length - 1].file.size
      let file = files[length - 1].file
      if (size / 1024 / 1024 < 3) {
        this.setState({
          files
        })
      } else {
        Toast.info('图片大小不能超过3MB!')
        files.splice(length - 1, 1)
        this.setState({
          files: files
        })
        return
      }
      let name = file.name
      let time = new Date().getTime()
      let random = parseInt(String(Math.random() * 10 + 1), 10)
      let suffix = time + '_' + random + '_' + name
      let key = encodeURI(`${suffix}`)
      let args: any = new FormData()
      args.append('file', file)
      args.append('token', this.state.qiniuToken)
      args.append('key', key)
      saveImgToQiniu(args)
        .then((res: any) => {
          let toServiceArgs = {
            key: res.key,
            name: name,
            size: size
          }
          saveKeyToService(toServiceArgs)
            .then((response: any) => {
              media_ids.push(response.id)
              this.setState({
                photo_media_ids: media_ids
              })
            })
            .catch(e => {
              Toast.fail(e.response.data.message)
            })
        })
        .catch(err => {
          Toast.fail(err)
        })
    } else {
      photo_media_ids.splice(index, 1)
      this.setState({
        files: files,
        photo_media_ids: photo_media_ids
      })
    }
  }
  componentWillMount() {
    this.qiniuToken()
  }
  onSubmit = async () => {
    const { photo_media_ids } = this.state
    this.props.form.validateFields({ force: true }, (error: any) => {
      if (!error) {
        let args = this.props.form.getFieldsValue()
        photo_media_ids.length > 0
          ? (args.photo_media_ids = photo_media_ids)
          : null
        let length = this.state.files.length
        if (length === photo_media_ids.length) {
          this.save(args)
        } else {
          Toast.fail('图片正在上传，请稍后.')
        }
      } else {
        if (error.content && error.title) {
          Toast.fail('请先填写!')
        } else if (error.content) {
          Toast.fail(error.content.errors[0].message)
        } else if (error.title) {
          Toast.fail(error.title.errors[0].message)
        }
      }
    })
  }
  save = async (args: any) => {
    try {
      await saveFeedback(args)
      Toast.success('反馈成功')
      this.props.TabToList()
    } catch (e) {
      console.dir(e)
    }
  }
  render() {
    const { files } = this.state
    const { getFieldProps } = this.props.form
    return (
      <div className="feedback-list-add-wrap">
        <div className="feedback-list-add-wrap-title">
          <List className="feedback-list_title">
            <TextareaItem
              {...getFieldProps('title', {
                rules: [{ required: true, message: '标题不能为空' }]
              })}
              clear
              title="标题"
              placeholder="请填写标题"
              rows={1}
              count={14}
            />
          </List>
        </div>
        <List>
          <TextareaItem
            {...getFieldProps('content', {
              rules: [{ required: true, message: '内容不能为空' }]
            })}
            rows={5}
            count={140}
            placeholder="您的反馈对我们很重要"
          />
        </List>
        <h4 className="feedback-list_img-title">图片</h4>
        <ImagePicker
          files={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 5}
          multiple={false}
        />

        <div className="feedback-list_btn" onClick={this.onSubmit}>
          确认提交
        </div>
      </div>
    )
  }
}

export default createForm()(FeedbackSave)
