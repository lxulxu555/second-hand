import React, {Component} from 'react'
import {Upload, Icon, message} from 'antd'
import {connect} from "react-redux";
import {UploadImage} from '../../redux/action/user'

class uploadImage extends Component {


    state = {
        loading: false,
    };


    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done') {
            const result = info.file.response
            if (result.code === 0) {
                message.success('上传图片成功')
                const {thumbnailName, thumbnailUrl} = result.data
                info.file.name = thumbnailName
                info.file.url = thumbnailUrl
                this.props.UploadImage(thumbnailUrl)
                this.setState({
                    loading: false,
                })
            } else {
                message.error('上传图片失败')
            }
        }
    };


    render() {
        const {user, uploadImage} = this.props
        const {image} = uploadImage
        const uploadButton = user.img ?
            <img src={user.img} alt="avatar" style={{width: '100%'}}/>
            :
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                <div className="ant-upload-text">Upload</div>
            </div>

        return (
            <Upload
                action='http://47.93.240.205:8800/api/upload/image'
                listType="picture-card"
                name="file"
                accept='image/*'
                className="avatar-uploader"
                showUploadList={false}
                onChange={this.handleChange}
            >
                {
                    image
                        ? <img src={image} alt="avatar" style={{width: '100%'}}/>
                        : uploadButton
                }
            </Upload>
        )
    }
}

const mapStateToProps = ({uploadImage}) => ({
    uploadImage
})

const mapDispatchToProps = (dispatch) => ({
    UploadImage: (url) => dispatch(UploadImage(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(uploadImage)


