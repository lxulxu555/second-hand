import React, {Component} from 'react'
import {Upload, Icon, message, Modal} from 'antd'
import {connect} from "react-redux";
import {UploadAvatarImage} from '../redux/action/user'
import {SaveProductImage} from '../redux/action/product'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class uploadImage extends Component {


    state = {
        previewVisible: false,
        previewImage: '',
        loading: false,
    };

    constructor(props) {
        super(props);
        const {type, images} = this.props
        if (type !== 'avatar') {
            if (images) {
                let fileList = []
                const file = images.split(",")
                if (file && file.length > 0) {
                    fileList = file.map((file, index) => ({
                            uid: -index, // 每个file都有自己唯一的id
                            status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
                            url: file
                        })
                    )
                }
                this.props.SaveProductImage(fileList)
            }
        }
    }

    handleCancel = () => this.setState({previewVisible: false});

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleAvatarChange = (info) => {
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
                this.props.UploadAvatarImage(thumbnailUrl)
                this.setState({
                    loading: false,
                });
            } else {
                message.error('上传图片失败')
            }
        }
    }

    handleChange = ({fileList, file}) => {
        if (file.status === 'done') {
            const result = file.response
            if (result.code === 0) {
                message.success('上传图片成功')
                const {thumbnailName, thumbnailUrl} = result.data
                file = fileList[fileList.length - 1]
                file.name = thumbnailName
                file.url = thumbnailUrl
            } else {
                message.error('上传图片失败')
            }
        }
        this.props.SaveProductImage(fileList)
    };


    render() {
        const {previewVisible, previewImage,loading} = this.state;
        const {user, uploadAvatarImage, type, productImage} = this.props
        const {image} = uploadAvatarImage
        const uploadButton = user.img ?
            <img src={user.img} alt="avatar" style={{width: '100%'}}/>
            :
            <div>
                <Icon type={loading ? 'loading' : 'plus'}/>
                <div className="ant-upload-text">Upload</div>
            </div>

        return (
            <div>
                {
                    type === 'avatar' ?
                        <Upload
                            action='api/upload/image'
                            listType="picture-card"
                            name="file"
                            accept='image/*'
                            className="avatar-uploader"
                            showUploadList={false}
                            onChange={this.handleAvatarChange}

                        >
                            {
                                image
                                    ? <img src={image} alt="avatar" style={{width: '100%'}}/>
                                    : uploadButton
                            }
                        </Upload>
                        : <Upload
                            action='api/upload/image'
                            listType="picture-card"
                            name="file"
                            accept='image/*'
                            fileList={productImage.imageList}
                            onChange={this.handleChange}
                            onPreview={this.handlePreview}
                        >
                            {
                                productImage.imageList.length >= 4 ? null :
                                    <div>
                                        <Icon type="plus"/>
                                        <div>Upload</div>
                                    </div>
                            }
                        </Upload>

                }

                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = ({uploadAvatarImage, user, productImage}) => ({
    uploadAvatarImage, user, productImage
})

const mapDispatchToProps = (dispatch) => ({
    UploadAvatarImage: (url) => dispatch(UploadAvatarImage(url)),
    SaveProductImage: (fileList) => dispatch(SaveProductImage(fileList))
})

export default connect(mapStateToProps, mapDispatchToProps)(uploadImage)


